import { DocsLayout, DocsSearch } from "@emcy/docs";
import DocsThemeEditor from "@/components/DocsThemeEditor";
import DocumentLanguage from "@/components/DocumentLanguage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { searchDocsAction } from "@/app/doc-actions";
import { docsSource } from "@/lib/docs-source";
import { docsClassicTheme } from "@/lib/docs-themes";
import { defaultSiteLocale, docsLocales } from "@/lib/site-i18n";

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocumentLanguage locale={defaultSiteLocale} />
      <Header locale={defaultSiteLocale} />
      <DocsLayout
        navigation={docsSource.getNavigation()}
        searchAction={searchDocsAction}
        locale={defaultSiteLocale}
        variant="embedded"
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/docs" />
        }
        themeSwitcher={<DocsThemeEditor defaults={docsClassicTheme} />}
        theme={docsClassicTheme}
        sidebarHeader={
          <DocsSearch
            searchAction={searchDocsAction}
            locale={defaultSiteLocale}
            placeholder="Search..."
          />
        }
        sidebarFooter={<DocsThemeEditor defaults={docsClassicTheme} />}
      >
        {children}
      </DocsLayout>
      <Footer locale={defaultSiteLocale} />
    </>
  );
}
