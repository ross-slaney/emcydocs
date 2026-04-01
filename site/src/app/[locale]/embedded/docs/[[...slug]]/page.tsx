import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { embeddedSource } from "@/lib/docs-source";
import { getDocsPageDictionary } from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export function generateStaticParams() {
  return embeddedSource.getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  return embeddedSource.getMetadata(slug, locale);
}

export default async function LocaleEmbeddedRoutePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const homeCopy = getDocsPageDictionary(locale, "docsEmbeddedHome");
  if (!embeddedSource.getSupportedLocales().includes(locale)) {
    notFound();
  }

  if (locale === embeddedSource.getDefaultLocale()) {
    redirect(embeddedSource.getHref(slug, locale));
  }

  const resolved = embeddedSource.resolveRoute(slug, locale);
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
        navigation={embeddedSource.getNavigation(locale)}
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
      backHref={embeddedSource.getHref([], locale)}
      variant="docs"
    />
  );
}
