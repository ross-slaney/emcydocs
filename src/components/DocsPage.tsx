import Link from "next/link";
import type { DocsEntry, DocsEntryMeta } from "../types";
import { DocsMdx } from "../mdx";
import CopyPageButton from "./CopyPageButton";
import DocsToc from "./DocsToc";
import HeadingLinks from "./HeadingLinks";

export default async function DocsPage({
  entry,
  previousEntry,
  nextEntry,
  backHref,
  backLabel = "All docs",
  components,
}: {
  entry: DocsEntry;
  previousEntry?: DocsEntryMeta | null;
  nextEntry?: DocsEntryMeta | null;
  backHref?: string;
  backLabel?: string;
  components?: Record<string, React.ComponentType<any>>;
}) {
  const headingCount = entry.headings.filter((heading) => heading.level === 2).length;
  const localeCount = entry.availableLocales.length;

  return (
    <div className="emcydocs-page">
      <article className="emcydocs-article">
        <div className="emcydocs-page-toolbar">
          {backHref ? <Link href={backHref}>{backLabel}</Link> : <span />}
          <CopyPageButton />
        </div>

        <header className="emcydocs-page-header">
          {entry.sectionLabel ? (
            <p className="emcydocs-page-kicker">{entry.sectionLabel}</p>
          ) : null}
          <h1>{entry.title}</h1>
          {entry.description ? <p>{entry.description}</p> : null}
          {headingCount > 0 || localeCount > 1 ? (
            <div className="emcydocs-page-meta">
              {headingCount > 0 ? (
                <span className="emcydocs-page-meta-chip">
                  {headingCount} section{headingCount === 1 ? "" : "s"}
                </span>
              ) : null}
              {localeCount > 1 ? (
                <span className="emcydocs-page-meta-chip">
                  {localeCount} locales
                </span>
              ) : null}
            </div>
          ) : null}
        </header>

        <HeadingLinks />
        <DocsMdx entry={entry} components={components} />

        <nav className="emcydocs-page-pagination" aria-label="Document pagination">
          {previousEntry ? <Link href={previousEntry.href}>← {previousEntry.title}</Link> : <span />}
          {nextEntry ? <Link href={nextEntry.href}>{nextEntry.title} →</Link> : <span />}
        </nav>
      </article>

      <aside className="emcydocs-page-aside">
        <DocsToc headings={entry.headings} />
      </aside>
    </div>
  );
}
