import Link from "next/link";
import { ArrowRight, Folder, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildLocalizedHref,
  type RouteLocale,
} from "@/lib/site-i18n";

export default function MarketingHomePage({ locale }: { locale: RouteLocale }) {
  const docsHref = buildLocalizedHref("/docs", locale);

  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative px-6 pb-16 pt-24 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge variant="outline" className="mb-6 animate-fadeIn border-border text-foreground">
              App Router native
            </Badge>

            <h1 className="animate-fadeUp text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              File-based docs
              <br />
              <span className="text-muted-foreground">for Next.js</span>
            </h1>

            <p className="animate-fadeUp mx-auto mt-6 max-w-2xl text-lg text-muted-foreground [animation-delay:100ms]">
              Write MDX in your repo. EmcyDocs handles routing, search, navigation,
              i18n, and a complete docs shell. No config files, no build step.
            </p>

            <div className="animate-fadeUp mt-8 flex flex-wrap items-center justify-center gap-4 [animation-delay:200ms]">
              <Button asChild size="lg">
                <Link href={docsHref}>
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/ross-slaney/emcydocs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* VSCode-style file explorer visual */}
          <div className="animate-fadeUp mx-auto mt-16 max-w-3xl [animation-delay:300ms]">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-3 text-xs text-muted-foreground">
                    my-docs-site
                  </span>
                </div>
              </div>

              <div className="flex">
                {/* Sidebar - file tree */}
                <div className="w-56 border-r border-border bg-muted/30 p-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Explorer
                  </div>
                  <FileTree />
                </div>

                {/* Editor area */}
                <div className="flex-1 p-4">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-muted px-2 py-0.5">getting-started.mdx</span>
                  </div>
                  <pre className="text-sm leading-relaxed">
                    <code>
                      <Line num={1}><span className="text-muted-foreground">---</span></Line>
                      <Line num={2}><span className="text-blue-400">title</span><span className="text-muted-foreground">:</span> <span className="text-green-400">Getting Started</span></Line>
                      <Line num={3}><span className="text-blue-400">description</span><span className="text-muted-foreground">:</span> <span className="text-green-400">Install and configure EmcyDocs</span></Line>
                      <Line num={4}><span className="text-muted-foreground">---</span></Line>
                      <Line num={5}></Line>
                      <Line num={6}><span className="text-purple-400"># </span><span className="text-foreground">Getting Started</span></Line>
                      <Line num={7}></Line>
                      <Line num={8}><span className="text-foreground">Install the package:</span></Line>
                      <Line num={9}></Line>
                      <Line num={10}><span className="text-muted-foreground">```bash</span></Line>
                      <Line num={11}><span className="text-yellow-400">npm install @emcy/docs</span></Line>
                      <Line num={12}><span className="text-muted-foreground">```</span></Line>
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Your file structure <span className="font-medium text-foreground">is</span> your navigation.
              No config needed.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="File-based routing"
              description="Create docs/guides/setup.mdx and it becomes /docs/guides/setup. Folders become sections automatically."
            />
            <FeatureCard
              title="Built-in search"
              description="Full-text search across all your docs. No external service required, works with static export."
            />
            <FeatureCard
              title="i18n ready"
              description="Add locale folders and your docs support multiple languages. URL prefixes handled automatically."
            />
            <FeatureCard
              title="Mobile-first UX"
              description="Responsive docs shell with slide-out navigation, sticky headers, and touch-friendly interactions."
            />
            <FeatureCard
              title="Theme system"
              description="Light/dark mode, accent colors, layout widths, and density options. All configurable via props."
            />
            <FeatureCard
              title="MDX components"
              description="Callouts, code blocks with syntax highlighting, cards, tabs, and more. All styled and ready to use."
            />
          </div>
        </div>
      </section>

      {/* Install */}
      <section className="border-t border-border px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Start in minutes
          </h2>
          <p className="mt-3 text-muted-foreground">
            One package, zero config. Add your MDX files and go.
          </p>

          <Card className="mt-8">
            <CardContent className="p-6">
              <code className="text-sm">
                <span className="text-muted-foreground">$</span>{" "}
                <span className="text-foreground">npm install @emcy/docs</span>
              </code>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Button asChild size="lg">
              <Link href={docsHref}>
                Read the docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FileTree() {
  return (
    <div className="space-y-0.5 text-sm">
      <TreeFolder name="content" defaultOpen>
        <TreeFolder name="docs" defaultOpen>
          <TreeFile name="index.mdx" active />
          <TreeFile name="getting-started.mdx" />
          <TreeFolder name="guides">
            <TreeFile name="installation.mdx" />
            <TreeFile name="configuration.mdx" />
          </TreeFolder>
          <TreeFolder name="components">
            <TreeFile name="callout.mdx" />
            <TreeFile name="code-block.mdx" />
          </TreeFolder>
        </TreeFolder>
        <TreeFolder name="es">
          <TreeFile name="index.mdx" muted />
          <TreeFile name="getting-started.mdx" muted />
        </TreeFolder>
      </TreeFolder>
    </div>
  );
}

function TreeFolder({
  name,
  children,
  defaultOpen = false,
}: {
  name: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 py-0.5 text-muted-foreground hover:text-foreground">
        <ChevronRight className={`h-3 w-3 ${defaultOpen ? "rotate-90" : ""}`} />
        <Folder className="h-4 w-4 text-blue-400" />
        <span>{name}</span>
      </div>
      {defaultOpen && children && (
        <div className="ml-4 border-l border-border pl-2">{children}</div>
      )}
    </div>
  );
}

function TreeFile({
  name,
  active = false,
  muted = false,
}: {
  name: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 py-0.5 pl-4 ${
        active
          ? "rounded bg-accent text-foreground"
          : muted
          ? "text-muted-foreground/60"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <FileText className="h-4 w-4 text-orange-400" />
      <span>{name}</span>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-colors hover:bg-accent/50">
      <CardContent className="p-6">
        <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Line({ num, children }: { num: number; children?: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-8 select-none text-right text-muted-foreground/50">{num}</span>
      <span className="ml-4 text-foreground">{children}</span>
    </div>
  );
}
