import DocumentLanguage from "@/components/DocumentLanguage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { RouteLocale } from "@/lib/site-i18n";

export default function MarketingShell({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: RouteLocale;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden overscroll-x-none bg-background">
      <DocumentLanguage locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
