import Link from "next/link";
import { notFound } from "next/navigation";
import { NotebookLayout, ThemeSwitcher } from "@emcy/docs";
import DocumentLanguage from "@/components/DocumentLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { searchNotebookAction } from "@/app/doc-actions";
import { notebookSource } from "@/lib/docs-source";
import { docsNotebookTheme } from "@/lib/docs-themes";
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

export default async function LocaleNotebookLayout({
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
      <NotebookLayout
        navigation={notebookSource.getNavigation(locale)}
        searchAction={searchNotebookAction}
        locale={locale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/notebook" />
        }
        themeSwitcher={<ThemeSwitcher />}
        theme={docsNotebookTheme}
        brand={
          <Link
            href={buildLocalizedHref("/notebook", locale)}
            className="flex items-center gap-2 font-semibold"
          >
            <span>{copy.notebook}</span>
          </Link>
        }
        topLinks={[
          { href: buildLocalizedHref("/docs", locale), label: copy.classicDocs },
          { href: buildLocalizedHref("/minimal", locale), label: copy.minimal },
        ]}
      >
        {children}
      </NotebookLayout>
    </>
  );
}
