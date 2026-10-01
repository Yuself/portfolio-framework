import { describe, expect, it } from "vitest";
import { gitEnvironment, scanText } from "../scripts/check-public-safety.mjs";

describe("scanText", () => {
  it("rejects local Windows paths", () => {
    expect(scanText("README.md", "open C:\\Users\\PrivateUser\\project")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rule: "absolute-windows-path" }),
      ]),
    );
  });

  it("rejects non-example email addresses", () => {
    const privateAddress = ["real-person", "private.test"].join("@");
    expect(scanText("content.ts", `contact: ${privateAddress}`)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rule: "non-example-email" }),
      ]),
    );
  });

  it("rejects credential-like assignments without echoing the value", () => {
    const keyName = ["api", "key"].join("_");
    const fakeValue = ["123456789", "secret"].join("-");
    const findings = scanText("config.ts", `${keyName} = "${fakeValue}"`);
    expect(findings).toEqual([
      expect.objectContaining({ rule: "credential-assignment", match: "[redacted]" }),
    ]);
  });

  it("allows fictional example.com addresses", () => {
    expect(scanText("content.ts", "contact: hello@example.com")).toEqual([]);
  });
});

describe("gitEnvironment", () => {
  it("disables unreadable system Git configuration", () => {
    expect(gitEnvironment({ PATH: "test-path" })).toEqual({
      PATH: "test-path",
      GIT_CONFIG_NOSYSTEM: "1",
    });
  });
});
