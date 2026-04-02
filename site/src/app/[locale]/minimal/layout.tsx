import Link from "next/link";
import { notFound } from "next/navigation";
import { MinimalLayout } from "@emcy/docs";
import DocumentLanguage from "@/components/DocumentLanguage";
import DocsThemeSwitcher from "@/components/DocsThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { searchMinimalAction } from "@/app/doc-actions";
import { minimalSource } from "@/lib/docs-source";
import { docsMinimalTheme } from "@/lib/docs-themes";
import {
  buildLocalizedHref,
  docsLocales,
  getDocsDictionary,
  isSupportedDocsLocale,
} from "@/lib/site-i18n";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleMinimalLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  if (!isSupportedDocsLocale(locale)) {
    notFound();
  }

  const copy = getDocsDictionary(locale).layout;

  return (
    <>
      <DocumentLanguage locale={locale} />
      <MinimalLayout
        navigation={minimalSource.getNavigation(locale)}
        searchAction={searchMinimalAction}
        locale={locale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/minimal" />
        }
        themeSwitcher={<DocsThemeSwitcher defaults={docsMinimalTheme} />}
        theme={docsMinimalTheme}
        brand={
          <Link
            href={buildLocalizedHref("/minimal", locale)}
            className="flex items-center gap-2 font-semibold"
          >
            <span>{copy.minimal}</span>
          </Link>
        }
        topLinks={[
          { href: buildLocalizedHref("/docs", locale), label: copy.classicDocs },
          { href: buildLocalizedHref("/notebook", locale), label: copy.notebook },
        ]}
      >
        {children}
      </MinimalLayout>
    </>
  );
}
