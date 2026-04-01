import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { docsSource } from "@/lib/docs-source";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return docsSource.getStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return docsSource.getMetadata(slug);
}

export default async function DocsRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = docsSource.resolveRoute(slug);

  if (resolved.type === "redirect" && resolved.href) {
    redirect(resolved.href);
  }

  if (resolved.type !== "entry" || !resolved.entry) {
    notFound();
  }

  if (resolved.entry.isHome) {
    return (
      <DocsHomePage
        entry={resolved.entry}
        navigation={docsSource.getNavigation()}
        title="A Next.js docs library that feels at home in SaaS apps"
        description="EmcyDocs packages repo-local MDX, SEO-friendly App Router docs, mobile docs UX, search, heading links, and locale-aware routes into one npm package."
      />
    );
  }

  return (
    <DocsPage
      entry={resolved.entry}
      previousEntry={resolved.previousEntry}
      nextEntry={resolved.nextEntry}
      backHref={docsSource.getHref()}
      variant="docs"
    />
  );
}
