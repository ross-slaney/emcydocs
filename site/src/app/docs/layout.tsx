import Link from "next/link";
import { DocsLayout } from "@emcy/docs";
import { docsSource } from "@/lib/docs-source";
import { searchDocsAction } from "@/app/doc-actions";

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout
      navigation={docsSource.getNavigation()}
      searchAction={searchDocsAction}
      brand={
        <Link href="/" className="font-semibold text-stone-950">
          EmcyDocs
        </Link>
      }
      topLinks={[
        { href: "/notebook", label: "Notebook" },
        { href: "/minimal", label: "Minimal" },
        { href: "/embedded/docs", label: "Embedded" },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
