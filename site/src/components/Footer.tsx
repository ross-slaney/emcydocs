import Link from "next/link";
import {
  buildLocalizedHref,
  getSiteChromeDictionary,
  type RouteLocale,
} from "@/lib/site-i18n";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="url(#footer-logo-gradient)" />
      <path
        d="M8 10h16M8 16h12M8 22h14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="22" r="3" fill="white" fillOpacity="0.9" />
      <defs>
        <linearGradient
          id="footer-logo-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Footer({ locale }: { locale: RouteLocale }) {
  const currentYear = new Date().getFullYear();
  const copy = getSiteChromeDictionary(locale);
  const layoutLinks = [
    { href: buildLocalizedHref("/docs", locale), label: copy.footer.links.classicDocs },
    {
      href: buildLocalizedHref("/notebook", locale),
      label: copy.footer.links.notebook,
    },
    {
      href: buildLocalizedHref("/minimal", locale),
      label: copy.footer.links.minimal,
    },
    {
      href: buildLocalizedHref("/embedded/docs", locale),
      label: copy.footer.links.embedded,
    },
  ];
  const marketingHomeHref = buildLocalizedHref("/", locale);
  const docsHomeHref = buildLocalizedHref("/docs", locale);

  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0b]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={marketingHomeHref} className="inline-flex items-center gap-2 text-white">
              <Logo className="h-7 w-7" />
              <span className="font-bold">{copy.common.brand}</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {copy.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {copy.footer.sections.layouts}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {layoutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {copy.footer.sections.resources}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href={docsHomeHref}
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {copy.footer.links.documentation}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ross-slaney/emcydocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {copy.common.github}
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@emcy/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {copy.common.npm}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {copy.footer.sections.legal}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <span className="text-sm text-zinc-500">{copy.footer.links.license}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            &copy; {currentYear} {copy.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ross-slaney/emcydocs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
