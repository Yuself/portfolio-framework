import { describe, expect, it } from "vitest";
import { demoContent } from "@/content/demo-content";
import {
  assertValidPortfolioContent,
  validatePortfolioContent,
} from "@/lib/portfolio-schema";

describe("validatePortfolioContent", () => {
  it("accepts the complete fictional demo content", () => {
    expect(validatePortfolioContent(demoContent)).toEqual([]);
  });

  it("rejects contact addresses outside example.com", () => {
    const invalidEmail = ["private", "example.net"].join("@");
    expect(
      validatePortfolioContent({ ...demoContent, email: invalidEmail }),
    ).toContain("email must use example.com");
  });

  it("throws before composition when content is invalid", () => {
    const invalidEmail = ["private", "example.net"].join("@");

    expect(() =>
      assertValidPortfolioContent({ ...demoContent, email: invalidEmail }),
    ).toThrow("Portfolio content is invalid: email must use example.com");
  });

  it.each(["title", "summary", "stack", "category", "highlights"])(
    "rejects a project without %s",
    (field) => {
      const project = { ...demoContent.projects[0] } as Record<string, unknown>;
      delete project[field];
      const candidate = { ...demoContent, projects: [project] };

      expect(validatePortfolioContent(candidate)).toContain(
        `projects[0].${field} is required`,
      );
    },
  );
});
