"use client";

import { useEffect, useState } from "react";
import { getDocsThemeStyle } from "@emcy/docs/theme";
import type { DocsThemeConfig, DocsThemePreset, DocsThemeMode, DocsThemeDensity, DocsThemeRadius } from "@emcy/docs/types";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "emcydocs-theme-editor";

const presets: Array<{ id: DocsThemePreset; label: string; hue: number }> = [
  { id: "neutral", label: "Neutral", hue: 270 },
  { id: "dusk", label: "Dusk", hue: 266 },
  { id: "ocean", label: "Ocean", hue: 196 },
  { id: "sqlos", label: "SqlOS", hue: 267 },
];

const accents = [
  { label: "Violet", hue: 270 },
  { label: "Blue", hue: 220 },
  { label: "Teal", hue: 175 },
  { label: "Rose", hue: 350 },
  { label: "Amber", hue: 35 },
  { label: "Green", hue: 145 },
];

const modes: DocsThemeMode[] = ["light", "dark"];
const densities: DocsThemeDensity[] = ["comfortable", "compact"];
const radii: DocsThemeRadius[] = ["md", "lg", "xl"];

const layouts = [
  { label: "Compact", layoutWidth: "1280px", sidebarWidth: "220px", contentWidth: "42rem", tocWidth: "200px" },
  { label: "Balanced", layoutWidth: "1440px", sidebarWidth: "260px", contentWidth: "48rem", tocWidth: "220px" },
  { label: "Spacious", layoutWidth: "1600px", sidebarWidth: "300px", contentWidth: "52rem", tocWidth: "240px" },
];

interface Props {
  defaults: DocsThemeConfig;
}

export default function DocsThemeEditor({ defaults }: Props) {
  const [config, setConfig] = useState<DocsThemeConfig>(defaults);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load saved config on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as DocsThemeConfig;
        setConfig({ ...defaults, ...parsed });
      } catch {
        // ignore
      }
    }
  }, [defaults]);

  // Apply theme changes to all shells
  useEffect(() => {
    applyTheme(config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates: Partial<DocsThemeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaults);
    localStorage.removeItem(STORAGE_KEY);
  };

  const copyConfig = async () => {
    const json = JSON.stringify(config, null, 2);
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const configJson = JSON.stringify(config, null, 2);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all hover:bg-accent"
        style={{
          borderColor: "hsl(var(--border))",
          background: "hsl(var(--background))",
        }}
      >
        <span
          className="h-4 w-4 rounded-full"
          style={{
            background: `linear-gradient(135deg, hsl(${config.accentHue ?? 270} 80% 60%), hsl(${config.accentHue ?? 270} 70% 45%))`,
          }}
        />
        <span>Theme Editor</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full z-50 mt-2 w-[420px] max-w-[calc(100vw-2rem)] rounded-xl border bg-popover p-4 shadow-xl"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">DocsThemeConfig</h3>
                <p className="text-xs text-muted-foreground">
                  Customize and export your theme
                </p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={resetConfig} title="Reset to defaults">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={copyConfig} title="Copy config">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Preset */}
              <div>
                <Label>preset</Label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {presets.map((p) => (
                    <OptionButton
                      key={p.id}
                      active={config.preset === p.id}
                      onClick={() => updateConfig({ preset: p.id, accentHue: p.hue })}
                    >
                      {p.label}
                    </OptionButton>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div>
                <Label>mode</Label>
                <div className="mt-1.5 flex gap-1.5">
                  {modes.map((m) => (
                    <OptionButton
                      key={m}
                      active={config.mode === m}
                      onClick={() => updateConfig({ mode: m })}
                    >
                      {m}
                    </OptionButton>
                  ))}
                </div>
              </div>

              {/* Accent */}
              <div>
                <Label>accentHue: {config.accentHue}</Label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {accents.map((a) => (
                    <button
                      key={a.hue}
                      type="button"
                      onClick={() => updateConfig({ accentHue: a.hue })}
                      className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        config.accentHue === a.hue ? "border-foreground" : "border-transparent"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, hsl(${a.hue} 80% 60%), hsl(${a.hue} 70% 45%))`,
                      }}
                      title={a.label}
                    />
                  ))}
                </div>
              </div>

              {/* Density */}
              <div>
                <Label>density</Label>
                <div className="mt-1.5 flex gap-1.5">
                  {densities.map((d) => (
                    <OptionButton
                      key={d}
                      active={config.density === d}
                      onClick={() => updateConfig({ density: d })}
                    >
                      {d}
                    </OptionButton>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div>
                <Label>radius</Label>
                <div className="mt-1.5 flex gap-1.5">
                  {radii.map((r) => (
                    <OptionButton
                      key={r}
                      active={config.radius === r}
                      onClick={() => updateConfig({ radius: r })}
                    >
                      {r}
                    </OptionButton>
                  ))}
                </div>
              </div>

              {/* Layout */}
              <div>
                <Label>layout</Label>
                <div className="mt-1.5 flex gap-1.5">
                  {layouts.map((l) => (
                    <OptionButton
                      key={l.label}
                      active={config.layoutWidth === l.layoutWidth}
                      onClick={() => updateConfig({
                        layoutWidth: l.layoutWidth,
                        sidebarWidth: l.sidebarWidth,
                        contentWidth: l.contentWidth,
                        tocWidth: l.tocWidth,
                      })}
                    >
                      {l.label}
                    </OptionButton>
                  ))}
                </div>
              </div>

              {/* JSON Preview */}
              <div>
                <Label>Config JSON</Label>
                <pre className="mt-1.5 max-h-32 overflow-auto rounded-lg border bg-muted p-3 text-xs">
                  <code>{configJson}</code>
                </pre>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function OptionButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}

function applyTheme(config: DocsThemeConfig) {
  const style = getDocsThemeStyle(config);
  const preset = config.preset ?? "neutral";
  const mode = config.mode ?? "light";
  const density = config.density ?? "comfortable";

  document.querySelectorAll<HTMLElement>(".emcydocs-shell").forEach((shell) => {
    // Set data attributes
    shell.dataset.emcydocsPreset = preset;
    shell.dataset.emcydocsMode = mode;
    shell.dataset.emcydocsDensity = density;

    // Clear existing custom properties
    shell.style.removeProperty("--emcydocs-hue");
    shell.style.removeProperty("--emcydocs-layout-width");
    shell.style.removeProperty("--emcydocs-content-width");
    shell.style.removeProperty("--emcydocs-sidebar-width");
    shell.style.removeProperty("--emcydocs-toc-width");
    shell.style.removeProperty("--emcydocs-radius");

    // Apply new style properties
    if (style) {
      Object.entries(style).forEach(([key, value]) => {
        if (typeof value === "string") {
          shell.style.setProperty(key, value);
        }
      });
    }
  });
}
