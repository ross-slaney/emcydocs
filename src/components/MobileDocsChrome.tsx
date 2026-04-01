"use client";

import type { ReactNode } from "react";

export default function MobileDocsChrome({
  currentTitle,
  isNavOpen,
  onToggleNav,
  topOffset,
  children,
}: {
  currentTitle: string;
  isNavOpen: boolean;
  onToggleNav: () => void;
  topOffset: number;
  children?: ReactNode;
}) {
  return (
    <div className="emcydocs-mobile" style={{ top: topOffset }}>
      <div className="emcydocs-mobile-row">
        <div className="emcydocs-mobile-copy">
          <span className="emcydocs-mobile-label">Documentation</span>
          <span className="emcydocs-mobile-title">{currentTitle}</span>
        </div>
        <button type="button" className="emcydocs-button" onClick={onToggleNav}>
          {isNavOpen ? "Close" : "Browse"}
        </button>
      </div>
      {children ? <div className="emcydocs-mobile-search">{children}</div> : null}
    </div>
  );
}
