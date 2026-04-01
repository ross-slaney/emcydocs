import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { DocsLayout } from "@emcy/docs";
import { embeddedSource } from "@/lib/docs-source";
import { searchEmbeddedAction } from "@/app/doc-actions";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleEmbeddedDocsLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  if (!embeddedSource.getSupportedLocales().includes(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div id="embedded-host-header">
        <Header />
      </div>
      <DocsLayout
        navigation={embeddedSource.getNavigation(locale)}
        searchAction={searchEmbeddedAction}
        locale={locale}
        mode="embedded"
        mobileHeaderId="embedded-host-header"
      >
        {children}
      </DocsLayout>
    </div>
  );
}
