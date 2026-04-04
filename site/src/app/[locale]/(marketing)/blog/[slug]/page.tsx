import { notFound, redirect } from "next/navigation";
import SiteBlogPostPage from "@/components/SiteBlogPostPage";
import { blogSource } from "@/lib/blog-source";
import { isSupportedRouteLocale } from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return blogSource.getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  return blogSource.getMetadata(slug, locale);
}

export default async function LocalizedBlogPostRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isSupportedRouteLocale(locale)) {
    notFound();
  }

  if (locale === blogSource.getDefaultLocale()) {
    redirect(blogSource.getHref(slug, locale));
  }

  return <SiteBlogPostPage locale={locale} slug={slug} />;
}
