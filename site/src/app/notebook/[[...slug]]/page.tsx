import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { notebookSource } from "@/lib/docs-source";
import { defaultSiteLocale, getDocsPageDictionary } from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return notebookSource.getStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return notebookSource.getMetadata(slug);
}

export default async function NotebookRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const homeCopy = getDocsPageDictionary(defaultSiteLocale, "docsNotebookHome");
  const resolved = notebookSource.resolveRoute(slug);

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
        navigation={notebookSource.getNavigation()}
        title={homeCopy.title}
        description={homeCopy.description}
      />
    );
  }

  return (
    <DocsPage
      entry={resolved.entry}
      previousEntry={resolved.previousEntry}
      nextEntry={resolved.nextEntry}
      backHref={notebookSource.getHref()}
      variant="notebook"
    />
  );
}
