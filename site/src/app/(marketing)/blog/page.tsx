import { blogSource } from "@/lib/blog-source";
import { defaultSiteLocale } from "@/lib/site-i18n";
import SiteBlogDirectoryPage from "@/components/SiteBlogDirectoryPage";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

export async function generateMetadata() {
  return blogSource.getMetadata(undefined, defaultSiteLocale);
}

export default async function BlogDirectoryRoute({ searchParams }: PageProps) {
  return (
    <SiteBlogDirectoryPage
      locale={defaultSiteLocale}
      searchParams={await searchParams}
    />
  );
}
