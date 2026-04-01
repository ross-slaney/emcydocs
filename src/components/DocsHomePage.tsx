import Link from "next/link";
import type { DocsEntry, DocsNavSection } from "../types";
import { DocsMdx } from "../mdx";

const sectionIcons: Record<string, React.ReactNode> = {
  "getting started": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  guides: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  layouts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  internationalization: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  reference: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

function getSectionIcon(label: string): React.ReactNode {
  const key = label.toLowerCase();
  return sectionIcons[key] || (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

export default async function DocsHomePage({
  entry,
  navigation,
  title,
  description,
}: {
  entry?: DocsEntry | null;
  navigation: DocsNavSection[];
  title?: string;
  description?: string;
}) {
  const pageTitle = title ?? entry?.title ?? "Documentation";
  const pageDescription = description ?? entry?.description ?? "";

  return (
    <div className="emcydocs-home">
      <section className="emcydocs-home-hero">
        <span className="emcydocs-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          EmcyDocs
        </span>
        <h1>{pageTitle}</h1>
        {pageDescription ? <p>{pageDescription}</p> : null}
      </section>

      {entry ? (
        <section className="emcydocs-home-content">
          <DocsMdx entry={entry} />
        </section>
      ) : null}

      <section className="emcydocs-home-grid">
        {navigation.map((section) => (
          <article key={section.key || "root"} className="emcydocs-home-card">
            <div className="emcydocs-home-card-head">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "1.75rem",
                  height: "1.75rem",
                  borderRadius: "0.5rem",
                  background: "var(--emcydocs-accent-soft)",
                  color: "var(--emcydocs-accent-light)",
                }}>
                  <span style={{ width: "1rem", height: "1rem" }}>
                    {getSectionIcon(section.label)}
                  </span>
                </span>
                <h2>{section.label}</h2>
              </div>
              <span>{section.items.length} pages</span>
            </div>
            <ul>
              {section.items.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
              {section.items.length > 5 && (
                <li>
                  <Link href={section.items[0].href} style={{ color: "var(--emcydocs-accent-light)" }}>
                    View all {section.items.length} pages →
                  </Link>
                </li>
              )}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
