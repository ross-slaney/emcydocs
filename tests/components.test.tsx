import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DocsSidebar from "../src/components/DocsSidebar";
import DocsToc from "../src/components/DocsToc";
import type { DocsNavSection } from "../src/types";

vi.mock("next/navigation", () => ({
  usePathname: () => "/docs/getting-started",
}));

const navigation: DocsNavSection[] = [
  {
    key: "getting-started",
    label: "Getting Started",
    items: [
      {
        slug: "getting-started",
        slugs: ["getting-started"],
        href: "/docs/getting-started",
        title: "Getting started",
        description: "Intro",
        order: 1,
        section: "getting-started",
        sectionLabel: "Getting Started",
        locale: "en",
        contentLocale: "en",
        availableLocales: ["en"],
        isHome: false,
      },
    ],
  },
];

describe("docs components", () => {
  it("renders sidebar navigation and marks the active link", () => {
    render(<DocsSidebar navigation={navigation} />);

    const link = screen.getByRole("link", { name: "Getting started" });
    expect(link).toHaveAttribute("href", "/docs/getting-started");
    expect(link.className).toContain("is-active");
  });

  it("renders the table of contents from server-provided headings", () => {
    render(
      <DocsToc
        headings={[
          { id: "authentication", text: "Authentication", level: 2 },
          { id: "search", text: "Search", level: 3 },
        ]}
      />
    );

    expect(screen.getByText("On this page")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Authentication" })).toHaveAttribute(
      "href",
      "#authentication"
    );
    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute(
      "href",
      "#search"
    );
  });
});
