import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsLayout } from "@emcy/docs";
import { docsSource } from "@/lib/docs-source";
import { searchDocsAction } from "@/app/doc-actions";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleDocsLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  if (!docsSource.getSupportedLocales().includes(locale)) {
    notFound();
  }

  return (
    <DocsLayout
      navigation={docsSource.getNavigation(locale)}
      searchAction={searchDocsAction}
      locale={locale}
      brand={
        <Link href="/" className="font-semibold text-stone-950">
          EmcyDocs
        </Link>
      }
      topLinks={[
        { href: "/docs", label: "Default docs" },
        { href: "/notebook", label: "Notebook" },
        { href: "/minimal", label: "Minimal" },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
