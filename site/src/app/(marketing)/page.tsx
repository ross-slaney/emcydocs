import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[radial-gradient(circle_at_top,#ecfeff,transparent_34%),linear-gradient(180deg,#f8fafc_0%,#fafaf9_100%)]">
      <section className="px-6 pb-18 pt-18 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
                One npm package
              </span>
              <h1 className="mt-6 text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-stone-950">
                Docs that can be a site or live inside your app.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
                EmcyDocs packages file-based MDX, App Router SEO, section-aware
                search, mobile docs UX, TOC, heading links, and locale-aware
                routes into a single docs library for Next.js.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/docs"
                  className="rounded-xl bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                >
                  Classic docs
                </Link>
                <Link
                  href="/embedded/docs"
                  className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-300"
                >
                  Embedded mode
                </Link>
                <a
                  href="https://github.com/ross-slaney/emcydocs"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-transparent px-5 py-3 text-sm font-semibold text-stone-500 transition hover:text-stone-950"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="grid gap-4">
                {[
                  {
                    title: "Classic docs",
                    copy: "Sidebar, docs page, TOC, search, and a full docs shell.",
                    href: "/docs",
                  },
                  {
                    title: "Notebook",
                    copy: "A denser app-like docs experience for product surfaces.",
                    href: "/notebook",
                  },
                  {
                    title: "Minimal",
                    copy: "Reading-first markdown with less chrome and fewer distractions.",
                    href: "/minimal",
                  },
                  {
                    title: "Embedded",
                    copy: "Run the same package inside a larger app or marketing shell.",
                    href: "/embedded/docs",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 transition hover:border-stone-300 hover:bg-white"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-lg font-semibold text-stone-950">{item.title}</h2>
                      <span className="text-sm text-stone-400">Open →</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{item.copy}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200/80 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "App Router-native",
              body: "Generate metadata and static params from the same content source used to render docs pages.",
            },
            {
              title: "File-based locale model",
              body: "Keep one folder per document with `en.mdx` and `es.mdx`, then map that directly into route-aware locale prefixes.",
            },
            {
              title: "Mobile docs UX",
              body: "Built-in mobile nav, search, sticky docs chrome, and scroll locking instead of rebuilding that every time.",
            },
            {
              title: "Embedded or standalone",
              body: "Own the whole docs site or slot the same library into an existing product or marketing shell.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.4rem] border border-stone-200 bg-white p-5 shadow-[0_10px_30px_rgba(28,25,23,0.04)]"
            >
              <h2 className="text-lg font-semibold text-stone-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200/80 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Progressive disclosure",
                body: "Use `createDocsSource` for the common path, then override layouts, MDX components, search UI, or host chrome when you need more control.",
              },
              {
                title: "Dogfooded against a real app",
                body: "The package is built first for SqlOS and the example site, so the API has to handle embedded docs, route quirks, and real content trees.",
              },
              {
                title: "Search with section deep links",
                body: "Search results do not just land on a page. They can jump directly to a matching section anchor with useful snippets.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.4rem] bg-stone-950 p-6 text-white">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
