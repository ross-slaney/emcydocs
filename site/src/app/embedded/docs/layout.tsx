import Header from "@/components/Header";
import { DocsLayout } from "@emcy/docs";
import { embeddedSource } from "@/lib/docs-source";
import { searchEmbeddedAction } from "@/app/doc-actions";

export default function EmbeddedDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div id="embedded-host-header">
        <Header />
      </div>
      <DocsLayout
        navigation={embeddedSource.getNavigation()}
        searchAction={searchEmbeddedAction}
        mode="embedded"
        mobileHeaderId="embedded-host-header"
      >
        {children}
      </DocsLayout>
    </div>
  );
}
