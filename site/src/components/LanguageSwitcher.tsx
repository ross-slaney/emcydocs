"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  getRouteLevelLanguageHref,
  siteLocales,
  type SiteLocale,
} from "@/lib/site-i18n";

const languageLabels: Record<SiteLocale, string> = {
  en: "EN",
  es: "ES",
};

interface LanguageSwitcherProps {
  onNavigate?: () => void;
  className?: string;
}

export default function LanguageSwitcher({
  onNavigate,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <div
      className={[
        "inline-flex items-center rounded-lg border border-stone-200 bg-white p-1 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Language switcher"
      role="group"
    >
      {siteLocales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={getRouteLevelLanguageHref(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-md px-2.5 py-1 text-xs font-semibold tracking-[0.08em] transition-colors",
              isActive
                ? "bg-stone-950 text-white"
                : "text-stone-500 hover:bg-stone-100 hover:text-stone-950",
            ].join(" ")}
            onClick={onNavigate}
          >
            {languageLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
