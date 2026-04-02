import type { ReactNode } from "react";

export interface DocsHeading {
  id: string;
  text: string;
  level: number;
}

export interface DocsSearchResult {
  slug: string;
  slugs: string[];
  href: string;
  title: string;
  description: string;
  section: string | null;
  sectionLabel: string;
  snippet: string;
  matchedFields: Array<"title" | "description" | "content">;
  sectionTitle?: string;
  sectionAnchor?: string;
  locale: string;
  contentLocale: string;
}

export interface DocsSearchResponse {
  query: string;
  total: number;
  results: DocsSearchResult[];
}

export interface DocsEntryMeta {
  slug: string;
  slugs: string[];
  href: string;
  title: string;
  description: string;
  order: number;
  section: string | null;
  sectionLabel: string;
  locale: string;
  contentLocale: string;
  availableLocales: string[];
  isHome: boolean;
}

export interface DocsEntry extends DocsEntryMeta {
  content: string;
  headings: DocsHeading[];
  filePath: string;
}

export interface DocsNavItem extends DocsEntryMeta {}

export interface DocsNavSection {
  key: string;
  label: string;
  items: DocsNavItem[];
}

export interface DocsRouteResolution {
  type: "entry" | "redirect" | "notFound";
  entry?: DocsEntry;
  href?: string;
  previousEntry?: DocsNavItem | null;
  nextEntry?: DocsNavItem | null;
}

export interface DocsMetadata {
  title: string;
  description: string;
}

export interface DocsSourceConfig {
  contentDir: string;
  basePath: string;
  defaultLocale?: string;
  locales?: string[];
  hideDefaultLocaleInUrl?: boolean;
  docsIndexSlug?: string;
  siteTitle?: string;
  titleSuffix?: string;
  sectionLabels?: Record<string, string>;
  sectionOrder?: string[];
  searchLimit?: number;
}

export interface DocsSource {
  config: Required<
    Omit<
      DocsSourceConfig,
      "siteTitle" | "titleSuffix" | "sectionLabels" | "sectionOrder"
    >
  > & {
    siteTitle?: string;
    titleSuffix?: string;
    sectionLabels: Record<string, string>;
    sectionOrder: string[];
  };
  getSupportedLocales(): string[];
  getDefaultLocale(): string;
  getAllEntries(locale?: string): DocsEntry[];
  getNavigation(locale?: string): DocsNavSection[];
  getEntry(slugs?: string[] | string, locale?: string): DocsEntry | null;
  getHomeEntry(locale?: string): DocsEntry | null;
  getSectionLanding(section: string, locale?: string): DocsNavItem | null;
  getAdjacentEntries(slugs?: string[] | string, locale?: string): {
    previousEntry: DocsNavItem | null;
    nextEntry: DocsNavItem | null;
  };
  search(query: string, locale?: string): DocsSearchResponse;
  getHref(slugs?: string[] | string, locale?: string): string;
  resolveRoute(slugs?: string[] | string, locale?: string): DocsRouteResolution;
  getMetadata(slugs?: string[] | string, locale?: string): DocsMetadata;
  getStaticParams(locale?: string): Array<{ slug?: string[] }>;
  getLocaleStaticParams(): Array<{ locale: string; slug?: string[] }>;
}

export interface DocsLayoutLink {
  href: string;
  label: string;
}

export interface DocsHeaderSlotProps {
  navigation: DocsNavSection[];
  brand?: ReactNode;
  topLinks?: DocsLayoutLink[];
  languageSwitcher?: ReactNode;
  themeSwitcher?: ReactNode;
  searchAction?: DocsSearchAction;
  locale?: string;
  currentTitle: string;
  isMobile: boolean;
  isNavigationOpen: boolean;
  openNavigation: () => void;
  closeNavigation: () => void;
  toggleNavigation: () => void;
}

export interface DocsSidebarSlotProps {
  navigation: DocsNavSection[];
  locale?: string;
  currentTitle: string;
  isMobile: boolean;
  closeNavigation: () => void;
}

export type DocsLayoutSlot<Props> =
  | ReactNode
  | ((props: Props) => ReactNode)
  | null;

export type DocsThemePreset = "neutral" | "dusk" | "ocean" | "sqlos";
export type DocsThemeMode = "light" | "dark";
export type DocsThemeRadius = "md" | "lg" | "xl";
export type DocsThemeDensity = "comfortable" | "compact";

export interface DocsThemeConfig {
  preset?: DocsThemePreset;
  mode?: DocsThemeMode;
  density?: DocsThemeDensity;
  accentHue?: number;
  layoutWidth?: string;
  contentWidth?: string;
  sidebarWidth?: string;
  tocWidth?: string;
  radius?: DocsThemeRadius;
}

export type DocsSearchAction = (
  query: string,
  locale?: string
) => Promise<DocsSearchResponse>;

export interface DocsLayoutCommonProps {
  navigation: DocsNavSection[];
  children: ReactNode;
  brand?: ReactNode;
  topLinks?: DocsLayoutLink[];
  header?: DocsLayoutSlot<DocsHeaderSlotProps>;
  sidebar?: DocsLayoutSlot<DocsSidebarSlotProps>;
  languageSwitcher?: ReactNode;
  themeSwitcher?: ReactNode;
  searchAction?: DocsSearchAction;
  locale?: string;
  theme?: DocsThemeConfig;
  className?: string;
}
