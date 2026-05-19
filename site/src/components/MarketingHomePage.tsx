"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FileText,
  Folder,
  Layers,
  Palette,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildLocalizedHref,
  getPageDictionary,
  type RouteLocale,
} from "@/lib/site-i18n";

const featureIcons = [Zap, BookOpen, Layers, Search, Palette, Sparkles];
const layoutIcons = [BookOpen, Palette, Layers, Sparkles];

export default function MarketingHomePage({ locale }: { locale: RouteLocale }) {
  const copy = getPageDictionary(locale, "marketingHome");
  const docsHref = buildLocalizedHref("/docs", locale);
  const githubUrl = "https://github.com/ross-slaney/emcydocs";
  const npmUrl = "https://www.npmjs.com/package/@emcy/docs";

  return (
    <div className="marketing-page">
      <div className="marketing-mesh" aria-hidden="true" />

      <section className="relative px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-6 animate-fadeIn border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              >
                {copy.heroBadge}
              </Badge>

              <h1 className="animate-fadeUp text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {copy.heroTitlePrimary}
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  {copy.heroTitleAccent}
                </span>
              </h1>

              <p className="animate-fadeUp mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0 [animation-delay:100ms]">
                {copy.heroDescription}
              </p>

              <div className="animate-fadeUp mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start [animation-delay:200ms]">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href={docsHref}>
                    {copy.primaryCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={githubUrl} target="_blank" rel="noreferrer">
                    {copy.secondaryCta}
                  </a>
                </Button>
              </div>

              <InstallCommand command={copy.installCommand} label={copy.terminalLabel} />
            </div>

            <div className="animate-fadeUp [animation-delay:300ms]">
              <div className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-3 text-xs text-muted-foreground">emcydocs-site</span>
                  </div>
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                    localhost:3000/docs
                  </span>
                </div>
                <div className="flex min-h-[280px]">
                  <div className="hidden w-44 border-r border-border bg-muted/20 p-3 sm:block">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Sidebar
                    </p>
                    <FileTree />
                  </div>
                  <div className="flex-1 p-4 sm:p-5">
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Getting started
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">Install @emcy/docs</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      App Router-native MDX docs with search, TOC, and i18n.
                    </p>
                    <pre className="mt-4 overflow-x-auto rounded-lg bg-muted/60 p-3 text-xs">
                      <code>{copy.installCommand}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{copy.layoutsHeading}</h2>
            <p className="mt-3 text-muted-foreground">{copy.layoutsDescription}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.layoutCards.map((card, index) => {
              const Icon = layoutIcons[index] ?? Layers;
              return (
                <Card
                  key={card.title}
                  className="relative overflow-hidden transition-all hover:border-emerald-500/40 hover:shadow-md"
                >
                  {card.badge ? (
                    <Badge className="absolute right-3 top-3 bg-emerald-600 text-white">
                      {card.badge}
                    </Badge>
                  ) : null}
                  <CardContent className="p-5">
                    <Icon className="mb-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{copy.featuresHeading}</h2>
            <p className="mt-3 text-muted-foreground">{copy.featuresDescription}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.features.map((feature, index) => {
              const Icon = featureIcons[index] ?? Sparkles;
              return (
                <Card key={feature.title} className="transition-colors hover:bg-card">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{copy.ctaHeading}</h2>
          <p className="mt-3 text-muted-foreground">{copy.ctaDescription}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href={docsHref}>{copy.ctaPrimary}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                {copy.ctaSecondary}
              </a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a href={npmUrl} target="_blank" rel="noreferrer">
                {copy.exploreLabel} npm
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function InstallCommand({ command, label }: { command: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="animate-fadeUp mx-auto mt-8 max-w-md lg:mx-0 [animation-delay:250ms]">
      <p className="mb-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card/80 px-4 py-3 text-left text-sm backdrop-blur-sm transition-colors hover:border-emerald-500/40"
      >
        <code>
          <span className="text-muted-foreground">$</span> {command}
        </code>
        {copied ? (
          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
        ) : (
          <span className="shrink-0 text-xs text-muted-foreground">Copy</span>
        )}
      </button>
    </div>
  );
}

function FileTree() {
  return (
    <div className="space-y-0.5 text-xs">
      <TreeFolder name="content/docs" defaultOpen>
        <TreeFile name="getting-started" active />
        <TreeFile name="guides" />
        <TreeFile name="reference" />
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
      <div className="flex items-center gap-1 py-0.5 text-muted-foreground">
        <ChevronRight className={`h-3 w-3 ${defaultOpen ? "rotate-90" : ""}`} />
        <Folder className="h-3.5 w-3.5 text-emerald-500" />
        <span>{name}</span>
      </div>
      {defaultOpen && children ? <div className="ml-4 border-l border-border pl-2">{children}</div> : null}
    </div>
  );
}

function TreeFile({ name, active = false }: { name: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 py-0.5 pl-2 ${
        active ? "rounded bg-emerald-500/15 font-medium text-foreground" : "text-muted-foreground"
      }`}
    >
      <FileText className="h-3.5 w-3.5 text-orange-400" />
      <span>{name}</span>
    </div>
  );
}
