import Link from "next/link";
import {
  buildLocalizedHref,
  getPageDictionary,
  type RouteLocale,
} from "@/lib/site-i18n";

function GradientOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 animate-pulse-glow ${className}`}
      style={{ background: "var(--accent)" }}
    />
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-white/[0.04]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-light)]">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

function LayoutCard({
  title,
  description,
  href,
  badge,
  exploreLabel,
}: {
  title: string;
  description: string;
  href: string;
  badge?: string;
  exploreLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-white/[0.04]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex-1">
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {badge ? (
            <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--accent-light)]">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
      <div className="relative mt-4 flex items-center text-sm font-medium text-[var(--accent-light)] transition-colors group-hover:text-[var(--accent)]">
        <span>{exploreLabel}</span>
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}

const layoutBases = ["/docs", "/notebook", "/minimal", "/embedded/docs"] as const;

const featureIcons = [
  <svg key="app-router" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="locales" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="mobile" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>,
  <svg key="links" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="control" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>,
  <svg key="tested" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

export default function MarketingHomePage({ locale }: { locale: RouteLocale }) {
  const copy = getPageDictionary(locale, "marketingHome");
  const docsHref = buildLocalizedHref("/docs", locale);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--emcydocs-hue) 80% 65% / 0.15), transparent)`,
          }}
        />
        <GradientOrb className="left-1/4 top-0 h-[500px] w-[500px]" />
        <GradientOrb className="right-1/4 top-1/4 h-[400px] w-[400px]" />
        <GradientOrb className="bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2" />
        <div className="grid-pattern absolute inset-0 opacity-50" />
      </div>

      <section className="relative px-6 pb-20 pt-24 sm:pb-32 sm:pt-32 lg:pt-40">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="animate-fadeUp inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent-soft)] px-4 py-1.5 text-sm font-medium text-[var(--accent-light)]">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ background: "var(--accent-light)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              </span>
              {copy.heroBadge}
            </div>

            <h1 className="animate-fadeUp mt-8 text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] [animation-delay:100ms]">
              <span className="text-white">{copy.heroTitlePrimary}</span>
              <br />
              <span className="gradient-text">{copy.heroTitleAccent}</span>
            </h1>

            <p className="animate-fadeUp mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 [animation-delay:200ms]">
              {copy.heroDescription}
            </p>

            <div className="animate-fadeUp mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:300ms]">
              <Link
                href={docsHref}
                className="btn-accent-glow group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] transition-transform duration-700 group-hover:translate-x-[200%]" />
                {copy.primaryCta}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://github.com/ross-slaney/emcydocs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                {copy.secondaryCta}
              </a>
            </div>

            <div className="animate-fadeUp mx-auto mt-16 max-w-2xl [animation-delay:400ms]">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  </div>
                  <span className="ml-2 text-xs text-zinc-500">{copy.terminalLabel}</span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <p className="text-zinc-400">
                    <span style={{ color: "var(--accent-light)" }}>$</span>{" "}
                    {copy.installCommand}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.06] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.layoutsHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              {copy.layoutsDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.layoutCards.map((card, index) => (
              <LayoutCard
                key={card.title}
                title={card.title}
                description={card.description}
                badge={card.badge}
                href={buildLocalizedHref(layoutBases[index], locale)}
                exploreLabel={copy.exploreLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.06] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.featuresHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              {copy.featuresDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={featureIcons[index]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/[0.06] px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-12"
            style={{
              background: `linear-gradient(135deg, hsl(var(--emcydocs-hue) 80% 65% / 0.1) 0%, transparent 50%, hsl(var(--emcydocs-hue) 80% 50% / 0.1) 100%)`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, hsl(var(--emcydocs-hue) 80% 65% / 0.15), transparent 70%)`,
              }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {copy.ctaHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                {copy.ctaDescription}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={docsHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-100"
                >
                  {copy.ctaPrimary}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="https://github.com/ross-slaney/emcydocs"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/5"
                >
                  {copy.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
