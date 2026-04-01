import { notFound, redirect } from "next/navigation";
import { DocsHomePage, DocsPage } from "@emcy/docs";
import { docsSource } from "@/lib/docs-source";

interface PageProps {
  params: Promise<{ locale: string; slug?: string[] }>;
}

export function generateStaticParams() {
  return docsSource.getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  return docsSource.getMetadata(slug, locale);
}

export default async function LocaleDocsRoutePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!docsSource.getSupportedLocales().includes(locale)) {
    notFound();
  }

  if (locale === docsSource.getDefaultLocale()) {
    redirect(docsSource.getHref(slug, locale));
  }

  const resolved = docsSource.resolveRoute(slug, locale);
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
        navigation={docsSource.getNavigation(locale)}
        title="Localized docs with route-aware locale prefixes"
        description="The default locale stays clean at /docs while non-default locales can live under /es/docs without changing the content model."
      />
    );
  }

  return (
    <DocsPage
      entry={resolved.entry}
      previousEntry={resolved.previousEntry}
      nextEntry={resolved.nextEntry}
      backHref={docsSource.getHref([], locale)}
      variant="docs"
    />
  );
}
