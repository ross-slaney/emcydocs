import Link from "next/link";
import type { DocsEntry, DocsNavSection } from "../types";
import { DocsMdx } from "../mdx";

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
        <span className="emcydocs-badge">EmcyDocs</span>
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
              <h2>{section.label}</h2>
              <span>{section.items.length} pages</span>
            </div>
            <ul>
              {section.items.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
