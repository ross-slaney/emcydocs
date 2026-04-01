import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { minimalSource } from "@/lib/docs-source";
import { getDocsPageDictionary } from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export function generateStaticParams() {
  return minimalSource.getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  return minimalSource.getMetadata(slug, locale);
}

export default async function LocaleMinimalRoutePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const homeCopy = getDocsPageDictionary(locale, "docsMinimalHome");

  if (!minimalSource.getSupportedLocales().includes(locale)) {
    notFound();
  }

  if (locale === minimalSource.getDefaultLocale()) {
    redirect(minimalSource.getHref(slug, locale));
  }

  const resolved = minimalSource.resolveRoute(slug, locale);

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
        navigation={minimalSource.getNavigation(locale)}
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
      backHref={minimalSource.getHref([], locale)}
      variant="minimal"
    />
  );
}
