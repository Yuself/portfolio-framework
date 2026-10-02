import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { SiteHeader } from "@/components/portfolio/site-header";

describe("portfolio home", () => {
  it("renders the fictional profile with semantic project articles", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Avery Morgan",
    );
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /hello@example.com/i })).toHaveAttribute(
      "href",
      "mailto:hello@example.com",
    );
  });

  it("filters projects with accessible pressed-state buttons", () => {
    render(<Home />);

    const aiFilter = screen.getByRole("button", { name: "AI UI" });
    fireEvent.click(aiFilter);

    expect(aiFilter).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Signal Canvas" })).toBeInTheDocument();
  });

  it("connects every labelled section to an existing heading", () => {
    const { container } = render(<Home />);

    for (const section of container.querySelectorAll("section[aria-labelledby]")) {
      const headingId = section.getAttribute("aria-labelledby");
      expect(headingId).toBeTruthy();
      expect(container.querySelector(`#${headingId}`)).toBeInTheDocument();
    }
  });

  it("derives the wordmark from the configured display name", () => {
    render(<SiteHeader displayName="Jordan Lee" />);

    expect(screen.getByRole("link", { name: "Jordan Lee, home" })).toHaveTextContent(
      "JL/PF",
    );
  });
});
