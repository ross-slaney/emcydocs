"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  getLanguageLabel,
  getRouteLevelLanguageHref,
  type RouteLocale,
} from "@/lib/site-i18n";

interface LanguageSwitcherProps {
  onNavigate?: () => void;
  className?: string;
  locales: readonly RouteLocale[];
  fallbackBasePath?: string;
}

export default function LanguageSwitcher({
  onNavigate,
  className,
  locales,
  fallbackBasePath = "/",
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <div
      className={[
        "inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Language switcher"
      role="group"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={getRouteLevelLanguageHref(pathname, locale, fallbackBasePath)}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-md px-2.5 py-1 text-xs font-semibold tracking-[0.06em] transition-all duration-200",
              isActive
                ? "text-white"
                : "text-zinc-400 hover:bg-white/10 hover:text-white",
            ].join(" ")}
            style={isActive ? { background: "var(--accent)" } : undefined}
            onClick={onNavigate}
          >
            {getLanguageLabel(locale)}
          </Link>
        );
      })}
    </div>
  );
}
