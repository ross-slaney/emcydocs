export const siteLocales = ["en", "es"] as const;
export type SiteLocale = (typeof siteLocales)[number];

export const defaultSiteLocale: SiteLocale = "en";
export const hideDefaultSiteLocaleInUrl = true;

const localizedRouteBases = ["/embedded/docs", "/docs"] as const;

export function isSupportedSiteLocale(locale: string): locale is SiteLocale {
  return siteLocales.includes(locale as SiteLocale);
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
  return splitLocalePrefix(pathname).locale;
}

export function buildLocalizedHref(
  basePath: string,
  locale: SiteLocale,
  slug: string[] = []
) {
  const normalizedBasePath = normalizePathname(basePath);
  const suffix = slug.length > 0 ? `/${slug.join("/")}` : "";

  if (locale === defaultSiteLocale && hideDefaultSiteLocaleInUrl) {
    return `${normalizedBasePath}${suffix}`;
  }

  return `/${locale}${normalizedBasePath}${suffix}`;
}

export function getRouteLevelLanguageHref(pathname: string, locale: SiteLocale) {
  for (const basePath of localizedRouteBases) {
    const match = matchLocalizedDocsPath(pathname, basePath);
    if (match) {
      return buildLocalizedHref(basePath, locale, match.slug);
    }
  }

  return buildLocalizedHref("/docs", locale);
}

function matchLocalizedDocsPath(pathname: string, basePath: string) {
  const normalizedBasePath = normalizePathname(basePath);
  const { pathname: withoutLocale } = splitLocalePrefix(pathname);

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
  if (!isSupportedSiteLocale(candidateLocale)) {
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
