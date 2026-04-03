"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getLocaleFromPathname,
  getLanguageLabel,
  getRouteLevelLanguageHref,
  type RouteLocale,
} from "@/lib/site-i18n";
import { cn } from "@/lib/utils";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Globe className="h-4 w-4" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link
                href={getRouteLevelLanguageHref(pathname, locale, fallbackBasePath)}
                hrefLang={locale}
                lang={locale}
                className={cn(isActive && "bg-accent")}
                onClick={onNavigate}
              >
                {getLanguageLabel(locale)}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
