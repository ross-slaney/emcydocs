"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { DocsNavSection } from "../types";

export default function DocsSidebar({
  navigation,
  variant = "desktop",
  onNavigate,
}: {
  navigation: DocsNavSection[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const sections = useMemo(
    () => navigation.filter((section) => section.items.length > 0),
    [navigation]
  );
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() =>
    getInitialCollapsedState(sections, pathname, variant)
  );

  useEffect(() => {
    if (variant !== "mobile") {
      return;
    }

    setCollapsed(getInitialCollapsedState(sections, pathname, variant));
  }, [pathname, sections, variant]);

  return (
    <nav
      aria-label="Documentation navigation"
      className={variant === "desktop" ? "emcydocs-sidebar" : "emcydocs-sidebar-mobile"}
    >
      {sections.map((section) => {
        const isCollapsed = collapsed[section.key] ?? false;
        const sectionId = `emcydocs-sidebar-section-${section.key || "root"}`;

        return (
          <section key={section.key || "root"} className="emcydocs-sidebar-section">
            <button
              type="button"
              className="emcydocs-sidebar-section-toggle"
              aria-controls={sectionId}
              aria-expanded={!isCollapsed}
              onClick={() =>
                setCollapsed((current) => ({
                  ...current,
                  [section.key]: !current[section.key],
                }))
              }
            >
              <span>{section.label}</span>
              <span aria-hidden="true">{isCollapsed ? "+" : "−"}</span>
            </button>
            {!isCollapsed ? (
              <ul id={sectionId} className="emcydocs-sidebar-list">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={["emcydocs-sidebar-link", isActive ? "is-active" : ""]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={onNavigate}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </section>
        );
      })}
    </nav>
  );
}

function getInitialCollapsedState(
  sections: DocsNavSection[],
  pathname: string,
  variant: "desktop" | "mobile"
) {
  if (variant !== "mobile") {
    return {};
  }

  const activeSection = sections.find((section) =>
    section.items.some((item) => item.href === pathname)
  );
  const expandedSectionKey = activeSection?.key ?? sections[0]?.key;

  return sections.reduce<Record<string, boolean>>((state, section) => {
    state[section.key] = section.key !== expandedSectionKey;
    return state;
  }, {});
}
