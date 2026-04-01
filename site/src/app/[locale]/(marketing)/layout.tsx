import { notFound } from "next/navigation";
import MarketingShell from "@/components/MarketingShell";
import { isSupportedMarketingLocale } from "@/lib/site-i18n";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocalizedMarketingLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  if (!isSupportedMarketingLocale(locale)) {
    notFound();
  }

  return <MarketingShell locale={locale}>{children}</MarketingShell>;
}
