"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import {
  buildLocalizedHref,
  getLocaleFromPathname,
  getSiteChromeDictionary,
  isSupportedMarketingLocale,
  marketingLocales,
  type RouteLocale,
} from "@/lib/site-i18n";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
      <path
        d="M8 10h16M8 16h12M8 22h14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="3" fill="white" fillOpacity="0.9" />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface HeaderProps {
  locale?: RouteLocale;
  locales?: readonly RouteLocale[];
}

export default function Header({
  locale,
  locales = marketingLocales,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const currentLocale = locale ?? getLocaleFromPathname(pathname);
  const copy = getSiteChromeDictionary(currentLocale);

  const navLinks = [
    { href: buildLocalizedHref("/docs", currentLocale), label: copy.header.nav.docs },
  ];
  const docsHomeHref = buildLocalizedHref("/docs", currentLocale);
  const marketingHomeHref = isSupportedMarketingLocale(currentLocale)
    ? buildLocalizedHref("/", currentLocale)
    : docsHomeHref;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };
    desktopQuery.addEventListener("change", handleDesktopChange);
    return () => desktopQuery.removeEventListener("change", handleDesktopChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#0a0a0b]/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="px-6">
        <div className="mx-auto max-w-5xl">
          <nav className="flex h-16 items-center justify-between">
            <Link
              href={marketingHomeHref}
              className="flex items-center gap-2.5 text-base font-bold tracking-tight text-white transition-opacity hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo className="h-7 w-7" />
              <span>{copy.common.brand}</span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="ml-2 h-5 w-px bg-white/10" />

              <ThemeSwitcher className="ml-2" />
              <LanguageSwitcher
                className="ml-2"
                locales={locales}
                fallbackBasePath={isSupportedMarketingLocale(currentLocale) ? "/" : "/docs"}
              />

              <a
                href="https://github.com/ross-slaney/emcydocs"
                target="_blank"
                rel="noreferrer"
                aria-label={copy.header.githubAria}
                className="ml-2 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              <Link
                href={docsHomeHref}
                className="ml-2 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              >
                {copy.header.cta}
              </Link>
            </div>

            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="marketing-mobile-nav"
              aria-label={
                isMenuOpen
                  ? copy.header.menu.closeAria
                  : copy.header.menu.openAria
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-white/20 hover:text-white lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMenuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </nav>

          {isMenuOpen ? (
            <div
              id="marketing-mobile-nav"
              className="border-t border-white/[0.08] py-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://github.com/ross-slaney/emcydocs"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {copy.common.github}
                </a>
                <div className="px-3 pt-3">
                  <LanguageSwitcher
                    locales={locales}
                    fallbackBasePath={isSupportedMarketingLocale(currentLocale) ? "/" : "/docs"}
                    onNavigate={() => setIsMenuOpen(false)}
                  />
                </div>
                <Link
                  href={docsHomeHref}
                  className="mt-3 inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {copy.header.cta}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
