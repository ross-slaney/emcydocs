"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
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
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const sections = useMemo(
    () => navigation.filter((section) => section.items.length > 0),
    [navigation]
  );

  return (
    <nav
      aria-label="Documentation navigation"
      className={variant === "desktop" ? "emcydocs-sidebar" : "emcydocs-sidebar-mobile"}
    >
      {sections.map((section) => (
        <section key={section.key || "root"} className="emcydocs-sidebar-section">
          <button
            type="button"
            className="emcydocs-sidebar-section-toggle"
            onClick={() =>
              setCollapsed((current) => ({
                ...current,
                [section.key]: !current[section.key],
              }))
            }
          >
            <span>{section.label}</span>
            <span aria-hidden="true">{collapsed[section.key] ? "+" : "−"}</span>
          </button>
          {!collapsed[section.key] ? (
            <ul className="emcydocs-sidebar-list">
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
      ))}
    </nav>
  );
}
