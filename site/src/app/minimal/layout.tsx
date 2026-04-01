import Link from "next/link";
import { MinimalLayout } from "@emcy/docs";
import { minimalSource } from "@/lib/docs-source";
import { searchMinimalAction } from "@/app/doc-actions";

export default function MinimalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MinimalLayout
      navigation={minimalSource.getNavigation()}
      searchAction={searchMinimalAction}
      brand={
        <Link href="/" className="font-semibold text-stone-950">
          EmcyDocs Minimal
        </Link>
      }
      topLinks={[
        { href: "/docs", label: "Classic docs" },
        { href: "/notebook", label: "Notebook" },
      ]}
    >
      {children}
    </MinimalLayout>
  );
}
