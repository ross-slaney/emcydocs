import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { minimalSource } from "@/lib/docs-source";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return minimalSource.getStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return minimalSource.getMetadata(slug);
}

export default async function MinimalRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = minimalSource.resolveRoute(slug);

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
        navigation={minimalSource.getNavigation()}
        title="Minimal layout"
        description="A stripped-down markdown reading experience for docs that need as little chrome as possible."
      />
    );
  }

  return (
    <DocsPage
      entry={resolved.entry}
      previousEntry={resolved.previousEntry}
      nextEntry={resolved.nextEntry}
      backHref={minimalSource.getHref()}
      variant="minimal"
    />
  );
}
