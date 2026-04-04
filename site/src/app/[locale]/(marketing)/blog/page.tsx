import { notFound, redirect } from "next/navigation";
import SiteBlogDirectoryPage from "@/components/SiteBlogDirectoryPage";
import { blogSource } from "@/lib/blog-source";
import { isSupportedRouteLocale } from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return blogSource.getMetadata(undefined, locale);
}

export default async function LocalizedBlogDirectoryRoute({
  params,
  searchParams,
}: PageProps) {
  const { locale } = await params;
  if (!isSupportedRouteLocale(locale)) {
    notFound();
  }

  if (locale === blogSource.getDefaultLocale()) {
    redirect(blogSource.getHref(undefined, locale));
  }

  return <SiteBlogDirectoryPage locale={locale} searchParams={await searchParams} />;
}
