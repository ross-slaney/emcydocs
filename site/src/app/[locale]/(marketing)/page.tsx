import { notFound } from "next/navigation";
import MarketingHomePage from "@/components/MarketingHomePage";
import {
  defaultSiteLocale,
  isSupportedMarketingLocale,
  marketingLocales,
} from "@/lib/site-i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return marketingLocales
    .filter((locale) => locale !== defaultSiteLocale)
    .map((locale) => ({ locale }));
}

export default async function LocalizedMarketingPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isSupportedMarketingLocale(locale)) {
    notFound();
  }

  return <MarketingHomePage locale={locale} />;
}
