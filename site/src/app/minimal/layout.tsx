import Link from "next/link";
import { MinimalLayout } from "@emcy/docs";
import DocumentLanguage from "@/components/DocumentLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { searchMinimalAction } from "@/app/doc-actions";
import { minimalSource } from "@/lib/docs-source";
import {
  buildLocalizedHref,
  defaultSiteLocale,
  docsLocales,
  getDocsDictionary,
} from "@/lib/site-i18n";

export default function MinimalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const copy = getDocsDictionary(defaultSiteLocale).layout;

  return (
    <>
      <DocumentLanguage locale={defaultSiteLocale} />
      <MinimalLayout
        navigation={minimalSource.getNavigation()}
        searchAction={searchMinimalAction}
        locale={defaultSiteLocale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/minimal" />
        }
        brand={
          <Link
            href={buildLocalizedHref("/minimal", defaultSiteLocale)}
            className="flex items-center gap-2 font-semibold"
          >
            <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#logo-grad-min)" />
              <path d="M8 10h16M8 16h12M8 22h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="24" cy="22" r="3" fill="white" fillOpacity="0.9" />
              <defs>
                <linearGradient id="logo-grad-min" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="hsl(var(--emcydocs-hue, 270) 80% 65%)" />
                  <stop offset="1" stopColor="hsl(var(--emcydocs-hue, 270) 75% 50%)" />
                </linearGradient>
              </defs>
            </svg>
            <span>{copy.minimal}</span>
          </Link>
        }
        topLinks={[
          {
            href: buildLocalizedHref("/docs", defaultSiteLocale),
            label: copy.classicDocs,
          },
          {
            href: buildLocalizedHref("/notebook", defaultSiteLocale),
            label: copy.notebook,
          },
        ]}
      >
        {children}
      </MinimalLayout>
    </>
  );
}
