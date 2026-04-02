import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DocumentLanguage from "@/components/DocumentLanguage";
import DocsThemeSwitcher from "@/components/DocsThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DocsLayout } from "@emcy/docs";
import { embeddedSource } from "@/lib/docs-source";
import { docsEmbeddedTheme } from "@/lib/docs-themes";
import { searchEmbeddedAction } from "@/app/doc-actions";
import { docsLocales, isSupportedDocsLocale } from "@/lib/site-i18n";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleEmbeddedDocsLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  if (!isSupportedDocsLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <DocumentLanguage locale={locale} />
      <div id="embedded-host-header">
        <Header locale={locale} locales={docsLocales} />
      </div>
      <DocsLayout
        navigation={embeddedSource.getNavigation(locale)}
        searchAction={searchEmbeddedAction}
        locale={locale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/embedded/docs" />
        }
        themeSwitcher={<DocsThemeSwitcher defaults={docsEmbeddedTheme} />}
        theme={docsEmbeddedTheme}
        mode="embedded"
        mobileHeaderId="embedded-host-header"
      >
        {children}
      </DocsLayout>
    </div>
  );
}
