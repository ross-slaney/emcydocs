import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsLayout, ThemeSwitcher } from "@emcy/docs";
import DocumentLanguage from "@/components/DocumentLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { docsSource } from "@/lib/docs-source";
import { docsClassicTheme } from "@/lib/docs-themes";
import { searchDocsAction } from "@/app/doc-actions";
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

export default async function LocaleDocsLayout({
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
      <DocsLayout
        navigation={docsSource.getNavigation(locale)}
        searchAction={searchDocsAction}
        locale={locale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/docs" />
        }
        themeSwitcher={<ThemeSwitcher />}
        theme={docsClassicTheme}
        brand={
          <Link href={buildLocalizedHref("/docs", locale)} className="font-semibold">
            {copy.brand}
          </Link>
        }
        topLinks={[
          { href: buildLocalizedHref("/docs", locale), label: copy.defaultDocs },
          { href: buildLocalizedHref("/notebook", locale), label: copy.notebook },
          { href: buildLocalizedHref("/minimal", locale), label: copy.minimal },
        ]}
      >
        {children}
      </DocsLayout>
    </>
  );
}
