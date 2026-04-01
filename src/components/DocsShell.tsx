"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { DocsLayoutCommonProps } from "../types";
import DocsSearch from "./DocsSearch";
import DocsSidebar from "./DocsSidebar";
import MobileDocsChrome from "./MobileDocsChrome";
import ThemeSwitcher from "./ThemeSwitcher";

export default function DocsShell({
  navigation,
  children,
  brand,
  topLinks,
  languageSwitcher,
  searchAction,
  locale,
  mode = "standalone",
  mobileHeaderId,
  className,
  variant = "docs",
}: DocsLayoutCommonProps & {
  variant?: "docs" | "notebook" | "minimal";
}) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => {
    const updateTopOffset = () => {
      if (!mobileHeaderId) {
        setTopOffset(0);
        return;
      }

      const header = document.getElementById(mobileHeaderId);
      if (!header) {
        setTopOffset(0);
        return;
      }

      setTopOffset(Math.max(0, Math.round(header.getBoundingClientRect().bottom)));
    };

    updateTopOffset();
    window.addEventListener("scroll", updateTopOffset, { passive: true });
    window.addEventListener("resize", updateTopOffset);
    return () => {
      window.removeEventListener("scroll", updateTopOffset);
      window.removeEventListener("resize", updateTopOffset);
    };
  }, [mobileHeaderId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsNavOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    if (!isNavOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isNavOpen]);

  const currentTitle = useMemo(() => {
    const current = navigation
      .flatMap((section) => section.items)
      .find((item) => item.href === pathname);

    return current?.title ?? "Documentation";
  }, [navigation, pathname]);

  return (
    <div
      className={[
        "emcydocs-shell",
        `emcydocs-shell-${variant}`,
        mode === "embedded" ? "emcydocs-shell-embedded" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {mode === "standalone" ? (
        <header className="emcydocs-header">
          <div className="emcydocs-header-brand">{brand ?? <span>Documentation</span>}</div>
          <div className="emcydocs-header-search">
            <DocsSearch searchAction={searchAction} locale={locale} />
          </div>
          <ThemeSwitcher />
          {languageSwitcher ? (
            <div className="emcydocs-header-language">{languageSwitcher}</div>
          ) : null}
          {topLinks?.length ? (
            <nav className="emcydocs-header-links" aria-label="Top level docs links">
              {topLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          ) : null}
        </header>
      ) : null}

      <div className="emcydocs-mobile-wrap">
        <MobileDocsChrome
          currentTitle={currentTitle}
          isNavOpen={isNavOpen}
          onToggleNav={() => setIsNavOpen((current) => !current)}
          topOffset={topOffset}
        >
          <DocsSearch searchAction={searchAction} locale={locale} variant="mobile" />
          {languageSwitcher ? (
            <div className="emcydocs-mobile-language">{languageSwitcher}</div>
          ) : null}
        </MobileDocsChrome>
      </div>

      <div className="emcydocs-frame">
        <aside className="emcydocs-desktop-nav">
          <DocsSidebar navigation={navigation} />
        </aside>
        <main className="emcydocs-main">{children}</main>
      </div>

      {isNavOpen ? (
        <>
          <button
            type="button"
            aria-label="Close mobile documentation navigation"
            className="emcydocs-overlay"
            onClick={() => setIsNavOpen(false)}
          />
          <div className="emcydocs-drawer" style={{ top: topOffset + 116 }}>
            <DocsSidebar
              navigation={navigation}
              variant="mobile"
              onNavigate={() => setIsNavOpen(false)}
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
