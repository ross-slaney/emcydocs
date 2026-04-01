import MarketingHomePage from "@/components/MarketingHomePage";
import { defaultSiteLocale } from "@/lib/site-i18n";

export default function Home() {
  return <MarketingHomePage locale={defaultSiteLocale} />;
}
