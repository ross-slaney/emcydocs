import path from "node:path";
import { describe, expect, it } from "vitest";
import { createBlogSource } from "../src/server/blog";

const source = createBlogSource({
  contentDir: path.join(process.cwd(), "tests/fixtures/blog"),
  basePath: "/blog",
  defaultLocale: "en",
  locales: ["en", "es"],
  hideDefaultLocaleInUrl: true,
  siteTitle: "Fixture Blog",
});

describe("createBlogSource", () => {
  it("loads localized entries and preserves clean default-locale routes", () => {
    const english = source.getEntry("blog-foundation", "en");
    const spanish = source.getEntry("blog-foundation", "es");

    expect(english?.title).toBe("Blog foundation");
    expect(english?.href).toBe("/blog/blog-foundation");
    expect(spanish?.title).toBe("Base del blog");
    expect(spanish?.href).toBe("/es/blog/blog-foundation");
  });

  it("falls back to the default locale for missing translations", () => {
    const entry = source.getEntry("locale-routing", "es");

    expect(entry?.title).toBe("Locale routing");
    expect(entry?.contentLocale).toBe("en");
    expect(entry?.href).toBe("/es/blog/locale-routing");
  });

  it("normalizes frontmatter aliases and supports legacy flat files", () => {
    const aliased = source.getEntry("mdx-pipeline");
    const legacy = source.getEntry("legacy-flat-post");

    expect(aliased?.description).toBe(
      "Use one MDX renderer and component map for docs and blog."
    );
    expect(aliased?.publishedAt).toBe("2026-03-17");
    expect(aliased?.authorImage).toBe("/authors/mdx.png");
    expect(aliased?.image).toBe("/images/mdx-pipeline.png");
    expect(aliased?.tags).toEqual(["mdx", "components", "nextjs"]);
    expect(legacy?.title).toBe("Legacy flat post");
    expect(legacy?.contentLocale).toBe("en");
  });

  it("builds directory responses with categories, paging, and ranked search results", () => {
    const categories = source.getCategories("en");
    const directory = source.getDirectory({
      locale: "en",
      category: "Product",
      page: 1,
      pageSize: 1,
    });
    const search = source.search("ranking", "en");

    expect(categories).toEqual([
      "Architecture",
      "Legacy",
      "Localization",
      "Product",
      "Search",
    ]);
    expect(directory.totalItems).toBe(2);
    expect(directory.totalPages).toBe(2);
    expect(directory.items[0]?.slug).toBe("blog-foundation");
    expect(search.results[0]?.slug).toBe("discovery-systems");
    expect(search.results[0]?.href).toBe("/blog/discovery-systems#ranking-rules");
  });

  it("supports related, recent, and manual suggestion strategies", () => {
    const related = source.getSuggestedEntries("blog-foundation", {
      strategy: "related",
      limit: 2,
    });
    const recent = source.getSuggestedEntries("editorial-picks", {
      strategy: "recent",
      limit: 2,
    });
    const manual = source.getSuggestedEntries("editorial-picks", {
      strategy: "manual",
      limit: 3,
    });

    expect(related.map((entry) => entry.slug)).toEqual([
      "editorial-picks",
      "discovery-systems",
    ]);
    expect(recent.map((entry) => entry.slug)).toEqual([
      "discovery-systems",
      "blog-foundation",
    ]);
    expect(manual.map((entry) => entry.slug)).toEqual([
      "discovery-systems",
      "locale-routing",
      "blog-foundation",
    ]);
  });
});
