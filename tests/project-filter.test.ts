import { describe, expect, it } from "vitest";
import { demoContent } from "@/content/demo-content";
import { filterProjects } from "@/lib/project-filter";

describe("filterProjects", () => {
  it("returns a copy of every project for All", () => {
    const result = filterProjects(demoContent.projects, "All");
    expect(result).toEqual(demoContent.projects);
    expect(result).not.toBe(demoContent.projects);
  });

  it.each(["AI UI", "Frontend Systems", "Developer Tools"] as const)(
    "returns only %s projects",
    (category) => {
      const result = filterProjects(demoContent.projects, category);
      expect(result).not.toHaveLength(0);
      expect(result.every((project) => project.category === category)).toBe(true);
    },
  );

  it("returns an empty list for empty input", () => {
    expect(filterProjects([], "All")).toEqual([]);
  });

  it("does not mutate the input", () => {
    const original = structuredClone(demoContent.projects);
    filterProjects(demoContent.projects, "AI UI");
    expect(demoContent.projects).toEqual(original);
  });
});
