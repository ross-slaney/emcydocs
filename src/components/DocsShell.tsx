"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type {
  DocsHeaderSlotProps,
  DocsLayoutCommonProps,
  DocsLayoutSlot,
  DocsSidebarSlotProps,
} from "../types";
import {
  getDocsThemeStyle,
  resolveDocsThemeDensity,
  resolveDocsThemeMode,
  resolveDocsThemePreset,
} from "../theme";
import DocsSearch from "./DocsSearch";
import DocsSidebar from "./DocsSidebar";
import MobileDocsChrome from "./MobileDocsChrome";

export default function DocsShell({
  navigation,
  children,
  brand,
  topLinks,
  header,
  sidebar,
  languageSwitcher,
  themeSwitcher,
  searchAction,
  locale,
  theme,
  className,
}: DocsLayoutCommonProps) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsNavOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  const currentTitle = useMemo(() => {
    const current = navigation
      .flatMap((section) => section.items)
      .find((item) => item.href === pathname);

    return current?.title ?? "Documentation";
  }, [navigation, pathname]);

  const themePreset = resolveDocsThemePreset(theme);
  const themeMode = resolveDocsThemeMode(theme);
  const themeDensity = resolveDocsThemeDensity(theme);
  const themeStyle = getDocsThemeStyle(theme);
  const hasSidebar = sidebar !== null;

  const headerSlotProps: Omit<DocsHeaderSlotProps, "isMobile"> = {
    navigation,
    brand,
    topLinks,
    languageSwitcher,
    themeSwitcher,
    searchAction,
    locale,
    currentTitle,
    isNavigationOpen: isNavOpen,
    openNavigation: () => setIsNavOpen(true),
    closeNavigation: () => setIsNavOpen(false),
    toggleNavigation: () => setIsNavOpen((current) => !current),
  };

  const sidebarSlotProps: Omit<DocsSidebarSlotProps, "isMobile"> = {
    navigation,
    locale,
    currentTitle,
    closeNavigation: () => setIsNavOpen(false),
  };

  const desktopHeader = renderSlot(header, { ...headerSlotProps, isMobile: false }, () => (
    <div className="emcydocs-header-inner">
      <div className="emcydocs-header-brand">
        {brand ?? <span>Documentation</span>}
      </div>
      <div className="emcydocs-header-search">
        <DocsSearch searchAction={searchAction} locale={locale} />
      </div>
      {themeSwitcher ? (
        <div className="emcydocs-header-theme">{themeSwitcher}</div>
      ) : null}
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
    </div>
  ));

  const mobileHeader = renderSlot(header, { ...headerSlotProps, isMobile: true }, () => (
    <MobileDocsChrome
      currentTitle={currentTitle}
      isNavOpen={isNavOpen}
      onToggleNav={() => setIsNavOpen((current) => !current)}
      showNavigationToggle={hasSidebar}
    >
      <DocsSearch searchAction={searchAction} locale={locale} variant="mobile" />
      {themeSwitcher ? (
        <div className="emcydocs-mobile-theme">{themeSwitcher}</div>
      ) : null}
      {languageSwitcher ? (
        <div className="emcydocs-mobile-language">{languageSwitcher}</div>
      ) : null}
    </MobileDocsChrome>
  ));

  const desktopSidebar = hasSidebar
    ? renderSlot(sidebar, { ...sidebarSlotProps, isMobile: false }, () => (
        <DocsSidebar navigation={navigation} />
      ))
    : null;

  const mobileSidebar = hasSidebar
    ? renderSlot(sidebar, { ...sidebarSlotProps, isMobile: true }, () => (
        <DocsSidebar
          navigation={navigation}
          variant="mobile"
          onNavigate={() => setIsNavOpen(false)}
        />
      ))
    : null;

  return (
    <div
      className={[
        "emcydocs-shell",
        hasSidebar ? "" : "emcydocs-shell-sidebarless",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-emcydocs-preset={themePreset}
      data-emcydocs-mode={themeMode}
      data-emcydocs-density={themeDensity}
      style={themeStyle}
    >
      {desktopHeader ? <header className="emcydocs-header">{desktopHeader}</header> : null}

      {mobileHeader ? (
        <div
          className={["emcydocs-mobile-wrap", isNavOpen ? "is-open" : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="emcydocs-mobile-inner">{mobileHeader}</div>
          {mobileSidebar ? (
            <div className="emcydocs-mobile-inner">
              <div
                id="emcydocs-mobile-nav"
                className={["emcydocs-mobile-nav-panel", isNavOpen ? "is-open" : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!isNavOpen}
              >
                {mobileSidebar}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="emcydocs-frame">
        {desktopSidebar ? (
          <aside className="emcydocs-desktop-nav">{desktopSidebar}</aside>
        ) : null}
        <main className="emcydocs-main">{children}</main>
      </div>
    </div>
  );
}

function renderSlot<Props>(
  slot: DocsLayoutSlot<Props> | undefined,
  props: Props,
  fallback: () => ReactNode
) {
  if (slot === undefined) {
    return fallback();
  }

  if (slot === null) {
    return null;
  }

  if (typeof slot === "function") {
    return slot(props);
  }

  return slot;
}
