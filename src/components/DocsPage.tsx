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
  variant = "docs",
  components,
}: {
  entry: DocsEntry;
  previousEntry?: DocsEntryMeta | null;
  nextEntry?: DocsEntryMeta | null;
  backHref?: string;
  backLabel?: string;
  variant?: "docs" | "notebook" | "minimal";
  components?: Record<string, React.ComponentType<any>>;
}) {
  return (
    <div className={["emcydocs-page", `emcydocs-page-${variant}`].join(" ")}>
      <article className="emcydocs-article">
        <div className="emcydocs-page-toolbar">
          {backHref ? <Link href={backHref}>{backLabel}</Link> : <span />}
          <CopyPageButton />
        </div>

        <header className="emcydocs-page-header">
          <h1>{entry.title}</h1>
          {entry.description ? <p>{entry.description}</p> : null}
        </header>

        <HeadingLinks />
        <DocsMdx entry={entry} components={components} />

        <nav className="emcydocs-page-pagination" aria-label="Document pagination">
          {previousEntry ? <Link href={previousEntry.href}>← {previousEntry.title}</Link> : <span />}
          {nextEntry ? <Link href={nextEntry.href}>{nextEntry.title} →</Link> : <span />}
        </nav>
      </article>

      {variant !== "minimal" ? (
        <aside className="emcydocs-page-aside">
          <DocsToc headings={entry.headings} />
        </aside>
      ) : null}
    </div>
  );
}
