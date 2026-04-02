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
  const totalPages = navigation.reduce((count, section) => count + section.items.length, 0);
  const heroLinks = navigation
    .flatMap((section) =>
      section.items.slice(0, 1).map((item) => ({
        ...item,
        sectionLabel: section.label,
      }))
    )
    .slice(0, 4);

  return (
    <div className="emcydocs-home">
      <section className="emcydocs-home-hero">
        <div className="emcydocs-home-hero-main">
          <span className="emcydocs-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            EmcyDocs
          </span>
          <h1>{pageTitle}</h1>
          {pageDescription ? <p>{pageDescription}</p> : null}
          <div className="emcydocs-home-metrics">
            <div className="emcydocs-home-metric">
              <strong>{navigation.length}</strong>
              <span>Namespaces</span>
            </div>
            <div className="emcydocs-home-metric">
              <strong>{totalPages}</strong>
              <span>Pages</span>
            </div>
            <div className="emcydocs-home-metric">
              <strong>{entry?.availableLocales.length ?? 1}</strong>
              <span>Locales</span>
            </div>
          </div>
        </div>

        {heroLinks.length ? (
          <aside className="emcydocs-home-hero-panel">
            <div className="emcydocs-home-hero-panel-head">
              <div>
                <p>Start here</p>
                <h2>Recommended first stops</h2>
              </div>
              <span>{heroLinks.length} picks</span>
            </div>
            <div className="emcydocs-home-hero-links">
              {heroLinks.map((item) => (
                <Link key={item.href} href={item.href} className="emcydocs-home-hero-link">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.sectionLabel}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
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
              <div className="emcydocs-home-card-heading">
                <span className="emcydocs-home-card-icon">
                  <span>{getSectionIcon(section.label)}</span>
                </span>
                <div>
                  <p className="emcydocs-home-card-eyebrow">Namespace</p>
                  <h2>{section.label}</h2>
                </div>
              </div>
              <span className="emcydocs-home-card-count">{section.items.length} pages</span>
            </div>
            {getSectionSummary(section.items) ? (
              <p className="emcydocs-home-card-summary">{getSectionSummary(section.items)}</p>
            ) : null}
            <div className="emcydocs-home-card-links">
              {section.items.slice(0, 4).map((item) => (
                <Link key={item.href} href={item.href} className="emcydocs-home-card-link">
                  <div>
                    <strong>{item.title}</strong>
                    {item.description ? <span>{truncateText(item.description, 68)}</span> : null}
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
            {section.items.length > 4 ? (
              <Link href={section.items[0].href} className="emcydocs-home-card-more">
                Browse all {section.items.length} pages
              </Link>
            ) : null}
          </article>
        ))}
      </section>
    </div>
  );
}

function getSectionSummary(items: DocsNavSection["items"]) {
  const firstWithDescription = items.find((item) => item.description.trim().length > 0);
  return firstWithDescription ? truncateText(firstWithDescription.description, 140) : "";
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}
