import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { notebookSource } from "@/lib/docs-source";
import { getDocsPageDictionary } from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export function generateStaticParams() {
  return notebookSource.getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  return notebookSource.getMetadata(slug, locale);
}

export default async function LocaleNotebookRoutePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const homeCopy = getDocsPageDictionary(locale, "docsNotebookHome");

  if (!notebookSource.getSupportedLocales().includes(locale)) {
    notFound();
  }

  if (locale === notebookSource.getDefaultLocale()) {
    redirect(notebookSource.getHref(slug, locale));
  }

  const resolved = notebookSource.resolveRoute(slug, locale);

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
        navigation={notebookSource.getNavigation(locale)}
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
      backHref={notebookSource.getHref([], locale)}
      variant="notebook"
    />
  );
}
