import Link from "next/link";
import { DocsLayout } from "@emcy/docs";
import DocumentLanguage from "@/components/DocumentLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { searchDocsAction } from "@/app/doc-actions";
import { docsSource } from "@/lib/docs-source";
import {
  buildLocalizedHref,
  defaultSiteLocale,
  docsLocales,
  getDocsDictionary,
} from "@/lib/site-i18n";

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const copy = getDocsDictionary(defaultSiteLocale).layout;

  return (
    <>
      <DocumentLanguage locale={defaultSiteLocale} />
      <DocsLayout
        navigation={docsSource.getNavigation()}
        searchAction={searchDocsAction}
        locale={defaultSiteLocale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/docs" />
        }
        brand={
          <Link
            href={buildLocalizedHref("/docs", defaultSiteLocale)}
            className="flex items-center gap-2 font-semibold"
          >
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
              <path d="M8 10h16M8 16h12M8 22h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="24" cy="22" r="3" fill="white" fillOpacity="0.9" />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="hsl(var(--emcydocs-hue, 270) 80% 65%)" />
                  <stop offset="1" stopColor="hsl(var(--emcydocs-hue, 270) 75% 50%)" />
                </linearGradient>
              </defs>
            </svg>
            <span>{copy.brand}</span>
          </Link>
        }
        topLinks={[
          {
            href: buildLocalizedHref("/notebook", defaultSiteLocale),
            label: copy.notebook,
          },
          {
            href: buildLocalizedHref("/minimal", defaultSiteLocale),
            label: copy.minimal,
          },
          {
            href: buildLocalizedHref("/embedded/docs", defaultSiteLocale),
            label: copy.embedded,
          },
        ]}
      >
        {children}
      </DocsLayout>
    </>
  );
}
