import Header from "@/components/Header";
import DocumentLanguage from "@/components/DocumentLanguage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { DocsLayout } from "@emcy/docs";
import { embeddedSource } from "@/lib/docs-source";
import { searchEmbeddedAction } from "@/app/doc-actions";
import { defaultSiteLocale, docsLocales } from "@/lib/site-i18n";

export default function EmbeddedDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <DocumentLanguage locale={defaultSiteLocale} />
      <div id="embedded-host-header">
        <Header locale={defaultSiteLocale} locales={docsLocales} />
      </div>
      <DocsLayout
        navigation={embeddedSource.getNavigation()}
        searchAction={searchEmbeddedAction}
        locale={defaultSiteLocale}
        languageSwitcher={
          <LanguageSwitcher locales={docsLocales} fallbackBasePath="/embedded/docs" />
        }
        mode="embedded"
        mobileHeaderId="embedded-host-header"
      >
        {children}
      </DocsLayout>
    </div>
  );
}
