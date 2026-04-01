import en from "../locales/en.json";
import es from "../locales/es.json";

export const routeLocales = ["en", "es", "zh"] as const;
export const marketingLocales = ["en", "es"] as const;
export const docsLocales = ["en", "es", "zh"] as const;

export type RouteLocale = (typeof routeLocales)[number];
export type MarketingLocale = (typeof marketingLocales)[number];
export type DocsLocale = (typeof docsLocales)[number];
export type SiteDictionary = typeof en;
export type SitePageNamespace = keyof SiteDictionary["pages"];

const configuredDefaultLocale = process.env.NEXT_PUBLIC_EMCYDOCS_DEFAULT_LOCALE;

export const defaultSiteLocale: RouteLocale = isSupportedRouteLocale(
  configuredDefaultLocale ?? ""
)
  ? (configuredDefaultLocale as RouteLocale)
  : "en";

export const hideDefaultSiteLocaleInUrl = true;

const localizedRouteBases = [
  "/embedded/docs",
  "/docs",
  "/notebook",
  "/minimal",
  "/",
] as const;

const siteDictionaries = {
  en,
  es,
} satisfies Record<MarketingLocale, SiteDictionary>;

const docsDictionaries = {
  en: {
    layout: siteDictionaries.en.docs.layout,
    pages: {
      docsClassicHome: siteDictionaries.en.pages.docsClassicHome,
      docsNotebookHome: siteDictionaries.en.pages.docsNotebookHome,
      docsMinimalHome: siteDictionaries.en.pages.docsMinimalHome,
      docsEmbeddedHome: siteDictionaries.en.pages.docsEmbeddedHome,
    },
  },
  es: {
    layout: siteDictionaries.es.docs.layout,
    pages: {
      docsClassicHome: siteDictionaries.es.pages.docsClassicHome,
      docsNotebookHome: siteDictionaries.es.pages.docsNotebookHome,
      docsMinimalHome: siteDictionaries.es.pages.docsMinimalHome,
      docsEmbeddedHome: siteDictionaries.es.pages.docsEmbeddedHome,
    },
  },
  zh: {
    layout: {
      brand: "EmcyDocs",
      classicDocs: "经典文档",
      defaultDocs: "默认文档",
      notebook: "Notebook",
      minimal: "Minimal",
      embedded: "嵌入式",
    },
    pages: {
      docsClassicHome: {
        title: "带有路由感知语言前缀的本地化文档",
        description:
          "默认语言可以保持在 docs 下的简洁路径中，而非默认语言可以通过带前缀的路径暴露出来，同时不改变内容模型。",
      },
      docsNotebookHome: {
        title: "Notebook 布局",
        description:
          "适合产品团队的紧凑型文档外壳，保留持久化导航和搜索，同时拥有更强的应用感。",
      },
      docsMinimalHome: {
        title: "Minimal 布局",
        description:
          "一个尽可能减少 chrome 的 Markdown 阅读体验，适合希望把注意力完全放在内容上的文档。",
      },
      docsEmbeddedHome: {
        title: "支持路由级语言切换的嵌入式文档模式",
        description:
          "嵌入式演示保留同一套文档外壳，同时让本地化路由在嵌入式文档 URL 之间切换。",
      },
    },
  },
} as const;

const languageLabels: Record<RouteLocale, string> = {
  en: "EN",
  es: "ES",
  zh: "ZH",
};

export function isSupportedRouteLocale(locale: string): locale is RouteLocale {
  return routeLocales.includes(locale as RouteLocale);
}

export function isSupportedMarketingLocale(
  locale: string
): locale is MarketingLocale {
  return marketingLocales.includes(locale as MarketingLocale);
}

export function isSupportedDocsLocale(locale: string): locale is DocsLocale {
  return docsLocales.includes(locale as DocsLocale);
}

export function normalizeRouteLocale(locale?: string): RouteLocale {
  return isSupportedRouteLocale(locale ?? "")
    ? (locale as RouteLocale)
    : defaultSiteLocale;
}

export function getLocaleFromPathname(pathname: string): RouteLocale {
  return splitLocalePrefix(pathname).locale;
}

export function getMarketingDictionary(locale?: string): SiteDictionary {
  const resolvedLocale = normalizeRouteLocale(locale);
  return siteDictionaries[resolvedLocale === "es" ? "es" : "en"];
}

export function getPageDictionary<PageKey extends SitePageNamespace>(
  locale: string | undefined,
  page: PageKey
): SiteDictionary["pages"][PageKey] {
  return getMarketingDictionary(locale).pages[page];
}

export function getSiteChromeDictionary(locale?: string) {
  const dictionary = getMarketingDictionary(locale);

  return {
    common: dictionary.common,
    header: dictionary.header,
    footer: dictionary.footer,
  };
}

export function getDocsDictionary(locale?: string) {
  return docsDictionaries[normalizeRouteLocale(locale)];
}

export function getDocsPageDictionary<
  PageKey extends keyof (typeof docsDictionaries)["en"]["pages"],
>(locale: string | undefined, page: PageKey) {
  return getDocsDictionary(locale).pages[page];
}

export function getLanguageLabel(locale: RouteLocale) {
  return languageLabels[locale];
}

export function buildLocalizedHref(
  basePath: string,
  locale: RouteLocale,
  slug: string[] = []
) {
  const normalizedBasePath = normalizePathname(basePath);
  const suffix = slug.length > 0 ? `/${slug.join("/")}` : "";

  if (locale === defaultSiteLocale && hideDefaultSiteLocaleInUrl) {
    return normalizedBasePath === "/" ? `/${slug.join("/")}` || "/" : `${normalizedBasePath}${suffix}`;
  }

  if (normalizedBasePath === "/") {
    return slug.length > 0 ? `/${locale}/${slug.join("/")}` : `/${locale}`;
  }

  return `/${locale}${normalizedBasePath}${suffix}`;
}

export function getRouteLevelLanguageHref(
  pathname: string,
  locale: RouteLocale,
  fallbackBasePath = "/"
) {
  for (const basePath of localizedRouteBases) {
    const match = matchLocalizedPath(pathname, basePath);
    if (match) {
      return buildLocalizedHref(basePath, locale, match.slug);
    }
  }

  return buildLocalizedHref(fallbackBasePath, locale);
}

function matchLocalizedPath(pathname: string, basePath: string) {
  const normalizedBasePath = normalizePathname(basePath);
  const { pathname: withoutLocale } = splitLocalePrefix(pathname);

  if (normalizedBasePath === "/") {
    return withoutLocale === "/" ? { slug: [] as string[] } : null;
  }

  if (withoutLocale === normalizedBasePath) {
    return { slug: [] as string[] };
  }

  const nestedPrefix = `${normalizedBasePath}/`;
  if (!withoutLocale.startsWith(nestedPrefix)) {
    return null;
  }

  return {
    slug: withoutLocale.slice(nestedPrefix.length).split("/").filter(Boolean),
  };
}

function splitLocalePrefix(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return {
      locale: defaultSiteLocale,
      pathname: normalizedPath,
    };
  }

  const [candidateLocale, ...rest] = segments;
  if (!isSupportedRouteLocale(candidateLocale)) {
    return {
      locale: defaultSiteLocale,
      pathname: normalizedPath,
    };
  }

  return {
    locale: candidateLocale,
    pathname: rest.length > 0 ? `/${rest.join("/")}` : "/",
  };
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, "");
}
