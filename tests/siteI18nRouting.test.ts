import { describe, expect, it } from "vitest";
import {
  buildLocalizedHref,
  getLocaleFromPathname,
  getRouteLevelLanguageHref,
} from "../site/src/lib/site-i18n";

describe("site locale routing", () => {
  it("keeps the default locale unprefixed", () => {
    expect(buildLocalizedHref("/docs", "en")).toBe("/docs");
    expect(buildLocalizedHref("/blog", "en")).toBe("/blog");
    expect(buildLocalizedHref("/embedded/docs", "en", ["guides", "search"])).toBe(
      "/embedded/docs/guides/search"
    );
  });

  it("prefixes non-default locales in URLs", () => {
    expect(buildLocalizedHref("/docs", "es")).toBe("/es/docs");
    expect(buildLocalizedHref("/blog", "es")).toBe("/es/blog");
    expect(buildLocalizedHref("/embedded/docs", "es", ["guides", "search"])).toBe(
      "/es/embedded/docs/guides/search"
    );
  });

  it("preserves the current docs slug when switching languages", () => {
    expect(getRouteLevelLanguageHref("/docs/guides/search", "es")).toBe(
      "/es/docs/guides/search"
    );
    expect(getRouteLevelLanguageHref("/es/embedded/docs/guides/search", "en")).toBe(
      "/embedded/docs/guides/search"
    );
    expect(getRouteLevelLanguageHref("/es/blog/locale-aware-blog-routing", "zh")).toBe(
      "/zh/blog/locale-aware-blog-routing"
    );
  });

  it("falls back to the localized marketing home outside routed sections", () => {
    expect(getRouteLevelLanguageHref("/", "es")).toBe("/es");
  });

  it("derives the active locale from the current pathname", () => {
    expect(getLocaleFromPathname("/docs")).toBe("en");
    expect(getLocaleFromPathname("/es/embedded/docs")).toBe("es");
  });
});
