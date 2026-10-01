import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const textRules = [
  {
    rule: "absolute-windows-path",
    pattern: /\b[A-Z]:\\(?:Users|Documents|Desktop|AppData)\\[^\s"']+/gi,
  },
  {
    rule: "non-example-email",
    pattern: /\b[A-Z0-9._%+-]+@(?!example\.com\b)[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  },
  {
    rule: "credential-assignment",
    pattern:
      /\b(?:api[_-]?key|token|password|secret)\s*["']?\s*[:=]\s*["'][^"']{8,}["']/gi,
  },
];

const forbiddenFilePattern =
  /(^|\/)(?:\.env(?:\..*)?|[^/]+\.(?:pem|key|p12|docx)|(?!(?:demo|sample)[^/]*\.pdf$)[^/]+\.pdf)$/i;

function normalizePath(filePath) {
  return filePath.replaceAll("\\", "/");
}

function isBinary(buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8_192));
  return sample.includes(0);
}

export function gitEnvironment(baseEnvironment = process.env) {
  return { ...baseEnvironment, GIT_CONFIG_NOSYSTEM: "1" };
}

function runGit(args, options = {}) {
  return execFileSync("git", args, {
    ...options,
    env: gitEnvironment(options.env),
  });
}

export function scanText(filePath, content) {
  const findings = [];
  for (const { rule, pattern } of textRules) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) {
      findings.push({ path: normalizePath(filePath), rule, match: "[redacted]" });
    }
  }
  return findings;
}

function scanFileName(filePath, objectId) {
  const normalized = normalizePath(filePath);
  return forbiddenFilePattern.test(normalized)
    ? [{ path: normalized, rule: "forbidden-public-file", match: objectId ?? "[redacted]" }]
    : [];
}

export function scanWorkingTree(root = process.cwd()) {
  const output = runGit(
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: root },
  ).toString("utf8");
  const files = output.split("\0").filter(Boolean);
  const findings = [];

  for (const file of files) {
    findings.push(...scanFileName(file));
    const buffer = readFileSync(path.join(root, file));
    if (!isBinary(buffer)) {
      findings.push(...scanText(file, buffer.toString("utf8")));
    }
  }

  return findings;
}

export function scanHistory(root = process.cwd()) {
  const objects = runGit(["rev-list", "--objects", "--all"], {
    cwd: root,
  })
    .toString("utf8")
    .split(/\r?\n/)
    .filter(Boolean);
  const findings = [];

  for (const line of objects) {
    const separator = line.indexOf(" ");
    if (separator === -1) continue;
    const objectId = line.slice(0, separator);
    const file = line.slice(separator + 1);
    findings.push(...scanFileName(file, objectId));

    const type = runGit(["cat-file", "-t", objectId], { cwd: root })
      .toString("utf8")
      .trim();
    if (type !== "blob") continue;

    const buffer = runGit(["cat-file", "blob", objectId], {
      cwd: root,
      maxBuffer: 5 * 1024 * 1024,
    });
    if (!isBinary(buffer)) {
      findings.push(...scanText(file, buffer.toString("utf8")));
    }
  }

  return findings;
}

function printResult(findings, passMessage) {
  if (findings.length === 0) {
    console.log(passMessage);
    return;
  }

  for (const finding of findings) {
    console.error(`${finding.rule}: ${finding.path} (${finding.match})`);
  }
  process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const mode = process.argv[2];
  if (mode === "--working-tree") {
    printResult(scanWorkingTree(), "PUBLIC_SAFETY_PASS");
  } else if (mode === "--history") {
    printResult(scanHistory(), "HISTORY_SAFETY_PASS");
  } else {
    console.error("Usage: node scripts/check-public-safety.mjs --working-tree|--history");
    process.exitCode = 2;
  }
}
