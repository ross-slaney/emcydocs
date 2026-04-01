import MarketingShell from "@/components/MarketingShell";
import { defaultSiteLocale } from "@/lib/site-i18n";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingShell locale={defaultSiteLocale}>{children}</MarketingShell>;
}
