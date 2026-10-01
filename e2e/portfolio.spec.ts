import { expect, test } from "@playwright/test";

test("renders without page errors or horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );

  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Avery Morgan");
});

test("supports keyboard project filtering", async ({ page }) => {
  await page.goto("/");
  const aiFilter = page.getByRole("button", { name: "AI UI" });

  await aiFilter.focus();
  await page.keyboard.press("Enter");

  await expect(aiFilter).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Signal Canvas" })).toBeVisible();
});

test("honors reduced motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const duration = await page.locator(".reveal").first().evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).animationDuration),
  );
  expect(duration).toBeLessThanOrEqual(0.001);
});
