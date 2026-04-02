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
          <button
            type="button"
            className="emcydocs-button emcydocs-mobile-toggle"
            aria-controls="emcydocs-mobile-nav"
            aria-expanded={isNavOpen}
            aria-label={
              isNavOpen
                ? "Collapse documentation contents"
                : "Expand documentation contents"
            }
            data-state={isNavOpen ? "open" : "closed"}
            onClick={onToggleNav}
          >
            <span>Contents</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4 6 4 4 4-4" />
            </svg>
          </button>
        ) : null}
      </div>
      {children ? <div className="emcydocs-mobile-search">{children}</div> : null}
    </div>
  );
}
