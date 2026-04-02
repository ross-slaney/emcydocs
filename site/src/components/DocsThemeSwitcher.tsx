"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getDocsThemeStyle,
  resolveDocsThemeDensity,
  resolveDocsThemeMode,
  resolveDocsThemePreset,
} from "@emcy/docs/theme";
import type {
  DocsThemeConfig,
  DocsThemeDensity,
  DocsThemeMode,
  DocsThemePreset,
  DocsThemeRadius,
} from "@emcy/docs/types";
import { docsThemeProfiles } from "@/lib/docs-themes";

type ThemeProfileId = keyof typeof docsThemeProfiles;

interface ThemeState {
  preset: DocsThemePreset;
  mode: DocsThemeMode;
  density: DocsThemeDensity;
  radius: DocsThemeRadius;
  accentHue: number;
  profile: ThemeProfileId;
}

const STORAGE_KEY = "emcydocs-example-docs-theme";
const STYLE_KEYS = [
  "--emcydocs-hue",
  "--emcydocs-layout-width",
  "--emcydocs-content-width",
  "--emcydocs-sidebar-width",
  "--emcydocs-toc-width",
  "--emcydocs-radius",
] as const;

const presetOptions: Array<{
  id: DocsThemePreset;
  label: string;
  description: string;
}> = [
  {
    id: "neutral",
    label: "Neutral",
    description: "Warm editorial surfaces for broad product docs.",
  },
  {
    id: "dusk",
    label: "Dusk",
    description: "High-contrast, cinematic docs for product-heavy brands.",
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Cool technical surfaces for infra and platform docs.",
  },
  {
    id: "sqlos",
    label: "SqlOS",
    description: "Polished purple product docs with SaaS energy.",
  },
];

const accentOptions = [
  { id: "violet", label: "Violet", hue: 270 },
  { id: "blue", label: "Blue", hue: 220 },
  { id: "teal", label: "Teal", hue: 175 },
  { id: "rose", label: "Rose", hue: 350 },
  { id: "amber", label: "Amber", hue: 25 },
  { id: "green", label: "Green", hue: 145 },
] as const;

const profileOptions: Array<{
  id: ThemeProfileId;
  label: string;
  description: string;
}> = [
  {
    id: "balanced",
    label: "Balanced",
    description: "A classic split between navigation, reading width, and TOC.",
  },
  {
    id: "reading",
    label: "Reading",
    description: "Tighter measure with less chrome for tutorial-heavy docs.",
  },
  {
    id: "compact",
    label: "Compact",
    description: "Lean navigation and narrower content for denser references.",
  },
  {
    id: "showcase",
    label: "Showcase",
    description: "Wider canvas for product pages, visual guides, and embeds.",
  },
];

const densityOptions: Array<{
  id: DocsThemeDensity;
  label: string;
  description: string;
}> = [
  {
    id: "comfortable",
    label: "Comfortable",
    description: "Airy spacing with stronger visual hierarchy.",
  },
  {
    id: "compact",
    label: "Compact",
    description: "Tighter spacing for denser technical surfaces.",
  },
];

const radiusOptions: Array<{
  id: DocsThemeRadius;
  label: string;
}> = [
  { id: "md", label: "Tight" },
  { id: "lg", label: "Smooth" },
  { id: "xl", label: "Soft" },
];

const modeOptions: Array<{
  id: DocsThemeMode;
  label: string;
}> = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

const presetHues: Record<DocsThemePreset, number> = {
  neutral: 270,
  dusk: 266,
  ocean: 196,
  sqlos: 267,
};

export default function DocsThemeSwitcher({
  defaults,
}: {
  defaults: DocsThemeConfig;
}) {
  const defaultState = useMemo(() => createDefaultState(defaults), [defaults]);
  const [state, setState] = useState<ThemeState>(defaultState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setState((current) => {
      const saved = readStoredTheme();
      if (!saved) {
        return defaultState;
      }

      return {
        ...defaultState,
        ...saved,
      };
    });
  }, [defaultState]);

  const theme = useMemo(
    () => buildTheme(defaults, state),
    [defaults, state]
  );

  useEffect(() => {
    applyThemeToShells(theme);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, theme]);

  const currentPreset =
    presetOptions.find((option) => option.id === state.preset) ?? presetOptions[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
        style={{
          borderColor: "var(--emcydocs-border)",
          background:
            "color-mix(in srgb, var(--emcydocs-surface) 88%, transparent)",
          color: "var(--emcydocs-foreground)",
          boxShadow: "var(--emcydocs-shadow-sm)",
        }}
        aria-expanded={isOpen}
        aria-label="Customize documentation theme"
      >
        <span
          className="h-5 w-5 rounded-full border"
          style={{
            borderColor: "color-mix(in srgb, var(--emcydocs-border-strong) 75%, transparent)",
            background: `linear-gradient(135deg, hsl(${state.accentHue} 88% 66%), hsl(${state.accentHue} 76% 48%))`,
            boxShadow:
              state.mode === "dark"
                ? "inset 0 0 0 1px rgba(255,255,255,0.14)"
                : "inset 0 0 0 1px rgba(255,255,255,0.46)",
          }}
        />
        <span className="hidden xl:inline">Theme</span>
        <span className="hidden 2xl:inline text-xs" style={{ color: "var(--emcydocs-muted)" }}>
          {currentPreset.label} / {state.mode}
        </span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "var(--emcydocs-muted)" }}
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close theme customizer"
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full z-50 mt-3 w-[min(28rem,calc(100vw-2rem))] rounded-[1.5rem] border p-4 shadow-2xl"
            style={{
              borderColor: "var(--emcydocs-border-strong)",
              background:
                "color-mix(in srgb, var(--emcydocs-bg) 94%, transparent)",
              color: "var(--emcydocs-foreground)",
              backdropFilter: "blur(22px)",
              boxShadow: "var(--emcydocs-shadow-lg)",
            }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "var(--emcydocs-muted)" }}
                >
                  Theme Studio
                </p>
                <h3 className="mt-1 text-base font-semibold">
                  Showcase the same docs API in very different skins.
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setState(defaultState)}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-transform hover:-translate-y-0.5"
                style={{
                  borderColor: "var(--emcydocs-border)",
                  background:
                    "color-mix(in srgb, var(--emcydocs-surface) 84%, transparent)",
                  color: "var(--emcydocs-muted-foreground)",
                }}
              >
                Reset
              </button>
            </div>

            <SectionLabel>Surface preset</SectionLabel>
            <div className="grid gap-2 sm:grid-cols-2">
              {presetOptions.map((option) => {
                const isActive = state.preset === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setState((current) => ({
                        ...current,
                        preset: option.id,
                      }))
                    }
                    className="rounded-[1.1rem] border px-3 py-3 text-left transition-transform hover:-translate-y-0.5"
                    style={getSelectableStyle(isActive)}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: `hsl(${presetHues[option.id]} 86% 60%)`,
                        }}
                      />
                      <span className="text-sm font-semibold">{option.label}</span>
                    </div>
                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: "var(--emcydocs-muted-foreground)" }}
                    >
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
              <div>
                <SectionLabel>Mode</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {modeOptions.map((option) => {
                    const isActive = state.mode === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setState((current) => ({
                            ...current,
                            mode: option.id,
                          }))
                        }
                        className="rounded-full border px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
                        style={getSelectableStyle(isActive)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <SectionLabel>Density</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {densityOptions.map((option) => {
                    const isActive = state.density === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setState((current) => ({
                            ...current,
                            density: option.id,
                          }))
                        }
                        className="rounded-full border px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
                        style={getSelectableStyle(isActive)}
                        title={option.description}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <SectionLabel>Layout profile</SectionLabel>
              <div className="grid gap-2 sm:grid-cols-2">
                {profileOptions.map((option) => {
                  const isActive = state.profile === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        setState((current) => ({
                          ...current,
                          profile: option.id,
                        }))
                      }
                      className="rounded-[1.1rem] border px-3 py-3 text-left transition-transform hover:-translate-y-0.5"
                      style={getSelectableStyle(isActive)}
                    >
                      <div className="text-sm font-semibold">{option.label}</div>
                      <p
                        className="mt-1 text-xs leading-5"
                        style={{ color: "var(--emcydocs-muted-foreground)" }}
                      >
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
              <div>
                <SectionLabel>Accent</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {accentOptions.map((option) => {
                    const isActive = state.accentHue === option.hue;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setState((current) => ({
                            ...current,
                            accentHue: option.hue,
                          }))
                        }
                        className="rounded-full border p-1.5 transition-transform hover:-translate-y-0.5"
                        style={getSelectableStyle(isActive)}
                        aria-label={`Use ${option.label} accent`}
                        title={option.label}
                      >
                        <span
                          className="block h-5 w-5 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, hsl(${option.hue} 88% 68%), hsl(${option.hue} 78% 48%))`,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <SectionLabel>Corners</SectionLabel>
                <div className="grid grid-cols-3 gap-2">
                  {radiusOptions.map((option) => {
                    const isActive = state.radius === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setState((current) => ({
                            ...current,
                            radius: option.id,
                          }))
                        }
                        className="rounded-full border px-3 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
                        style={getSelectableStyle(isActive)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
      style={{ color: "var(--emcydocs-muted)" }}
    >
      {children}
    </p>
  );
}

function createDefaultState(defaults: DocsThemeConfig): ThemeState {
  const preset = resolveDocsThemePreset(defaults);
  return {
    preset,
    mode: resolveDocsThemeMode(defaults),
    density: resolveDocsThemeDensity(defaults),
    radius: defaults.radius ?? "lg",
    accentHue: defaults.accentHue ?? presetHues[preset],
    profile: resolveProfile(defaults),
  };
}

function resolveProfile(defaults: DocsThemeConfig): ThemeProfileId {
  const match = (Object.entries(docsThemeProfiles) as Array<
    [ThemeProfileId, (typeof docsThemeProfiles)[ThemeProfileId]]
  >).find(([, profile]) => {
    return (
      defaults.layoutWidth === profile.layoutWidth &&
      defaults.contentWidth === profile.contentWidth &&
      defaults.sidebarWidth === profile.sidebarWidth &&
      defaults.tocWidth === profile.tocWidth
    );
  });

  return match?.[0] ?? "balanced";
}

function buildTheme(defaults: DocsThemeConfig, state: ThemeState): DocsThemeConfig {
  return {
    ...defaults,
    ...docsThemeProfiles[state.profile],
    preset: state.preset,
    mode: state.mode,
    density: state.density,
    radius: state.radius,
    accentHue: state.accentHue,
  };
}

function readStoredTheme(): Partial<ThemeState> | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return parsed;
  } catch {
    return null;
  }
}

function applyThemeToShells(theme: DocsThemeConfig) {
  const style = getDocsThemeStyle(theme);
  const preset = resolveDocsThemePreset(theme);
  const mode = resolveDocsThemeMode(theme);
  const density = resolveDocsThemeDensity(theme);

  document.querySelectorAll<HTMLElement>(".emcydocs-shell").forEach((node) => {
    node.dataset.emcydocsPreset = preset;
    node.dataset.emcydocsMode = mode;
    node.dataset.emcydocsDensity = density;

    STYLE_KEYS.forEach((key) => {
      node.style.removeProperty(key);
    });

    if (!style) {
      return;
    }

    Object.entries(style).forEach(([key, value]) => {
      if (typeof value === "string") {
        node.style.setProperty(key, value);
      }
    });
  });
}

function getSelectableStyle(isActive: boolean) {
  return {
    borderColor: isActive
      ? "color-mix(in srgb, var(--emcydocs-accent) 32%, var(--emcydocs-border-strong))"
      : "var(--emcydocs-border)",
    background: isActive
      ? "linear-gradient(135deg, var(--emcydocs-accent-soft), color-mix(in srgb, var(--emcydocs-surface) 84%, transparent))"
      : "color-mix(in srgb, var(--emcydocs-surface) 84%, transparent)",
    color: "var(--emcydocs-foreground)",
    boxShadow: isActive ? "var(--emcydocs-shadow-sm)" : "none",
  } as const;
}
