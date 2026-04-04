import { blogSource } from "@/lib/blog-source";
import { defaultSiteLocale } from "@/lib/site-i18n";
import SiteBlogPostPage from "@/components/SiteBlogPostPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogSource.getStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return blogSource.getMetadata(slug, defaultSiteLocale);
}

export default async function BlogPostRoute({ params }: PageProps) {
  const { slug } = await params;
  return <SiteBlogPostPage locale={defaultSiteLocale} slug={slug} />;
}
