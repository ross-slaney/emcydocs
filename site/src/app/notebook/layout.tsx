import Link from "next/link";
import { NotebookLayout } from "@emcy/docs";
import { notebookSource } from "@/lib/docs-source";
import { searchNotebookAction } from "@/app/doc-actions";

export default function NotebookRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotebookLayout
      navigation={notebookSource.getNavigation()}
      searchAction={searchNotebookAction}
      brand={
        <Link href="/" className="font-semibold text-stone-950">
          EmcyDocs Notebook
        </Link>
      }
      topLinks={[
        { href: "/docs", label: "Classic docs" },
        { href: "/minimal", label: "Minimal" },
      ]}
    >
      {children}
    </NotebookLayout>
  );
}
