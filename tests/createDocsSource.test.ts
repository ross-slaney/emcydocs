import path from "node:path";
import { describe, expect, it } from "vitest";
import { createDocsSource } from "../src/server/docs";

const source = createDocsSource({
  contentDir: path.join(process.cwd(), "tests/fixtures/docs"),
  basePath: "/docs",
  defaultLocale: "en",
  locales: ["en", "es"],
  hideDefaultLocaleInUrl: true,
  sectionLabels: {
    "": "Getting Started",
    "getting-started": "Getting Started",
    reference: "Reference",
  },
  sectionOrder: ["getting-started", "reference"],
  siteTitle: "Fixture Docs",
});

const redirectedHomeSource = createDocsSource({
  contentDir: path.join(process.cwd(), "tests/fixtures/docs"),
  basePath: "/docs",
  defaultLocale: "en",
  locales: ["en", "es"],
  hideDefaultLocaleInUrl: true,
  homeRedirect: "getting-started",
  sectionLabels: {
    "": "Getting Started",
    "getting-started": "Getting Started",
    reference: "Reference",
  },
  sectionOrder: ["getting-started", "reference"],
  siteTitle: "Fixture Docs",
});

describe("createDocsSource", () => {
  it("loads locale folder entries and preserves clean default-locale routes", () => {
    const english = source.getEntry(["getting-started"], "en");
    const spanish = source.getEntry(["getting-started"], "es");

    expect(english?.title).toBe("Getting started");
    expect(english?.href).toBe("/docs/getting-started");
    expect(spanish?.title).toBe("Primeros pasos");
    expect(spanish?.href).toBe("/es/docs/getting-started");
  });

  it("falls back to the default locale for missing translated files", () => {
    const entry = source.getEntry(["reference", "api"], "es");

    expect(entry?.title).toBe("API reference");
    expect(entry?.contentLocale).toBe("en");
    expect(entry?.href).toBe("/es/docs/reference/api");
  });

  it("supports legacy flat files and section landing redirects", () => {
    const flat = source.getEntry(["reference", "flat-file"]);
    const redirect = source.resolveRoute(["reference"]);

    expect(flat?.title).toBe("Legacy flat file");
    expect(redirect.type).toBe("redirect");
    expect(redirect.href).toBe("/docs/reference/api");
  });

  it("extracts headings and deep-links search results into sections", () => {
    const entry = source.getEntry(["getting-started"]);
    const search = source.search("authenticate");

    expect(entry?.headings.map((heading) => heading.id)).toContain("authentication");
    expect(search.results[0]?.href).toBe("/docs/getting-started#authentication");
  });

  it("can redirect the docs root to a configured entry", () => {
    expect(redirectedHomeSource.resolveRoute([])).toEqual({
      type: "redirect",
      href: "/docs/getting-started",
    });
    expect(redirectedHomeSource.resolveRoute([], "es")).toEqual({
      type: "redirect",
      href: "/es/docs/getting-started",
    });
  });

  it("uses the redirect target for root metadata and static params", () => {
    expect(redirectedHomeSource.getMetadata([])).toEqual({
      title: "Getting started | Fixture Docs",
      description: "Learn the first steps.",
    });
    expect(
      redirectedHomeSource.getStaticParams().some((param) => (param.slug ?? []).length === 0)
    ).toBe(true);
    expect(
      redirectedHomeSource
        .getLocaleStaticParams()
        .some((param) => param.locale === "es" && (param.slug ?? []).length === 0)
    ).toBe(true);
  });
});
