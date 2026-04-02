"use client";

import type { ReactNode } from "react";

export default function MobileDocsChrome({
  currentTitle,
  isNavOpen,
  onToggleNav,
  showNavigationToggle = true,
  children,
}: {
  currentTitle: string;
  isNavOpen: boolean;
  onToggleNav: () => void;
  showNavigationToggle?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="emcydocs-mobile">
      <div className="emcydocs-mobile-row">
        <div className="emcydocs-mobile-copy">
          <span className="emcydocs-mobile-label">Documentation</span>
          <span className="emcydocs-mobile-title">{currentTitle}</span>
        </div>
        {showNavigationToggle ? (
          <button type="button" className="emcydocs-button" onClick={onToggleNav}>
            {isNavOpen ? "Close" : "Browse"}
          </button>
        ) : null}
      </div>
      {children ? <div className="emcydocs-mobile-search">{children}</div> : null}
    </div>
  );
}
