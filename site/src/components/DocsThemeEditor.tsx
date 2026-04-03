"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getDocsThemeStyle } from "@emcy/docs/theme";
import type {
  DocsThemeConfig,
  DocsThemePreset,
  DocsThemeMode,
  DocsThemeDensity,
  DocsThemeRadius,
} from "@emcy/docs/types";

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
  {
    label: "Compact",
    layoutWidth: "1280px",
    sidebarWidth: "220px",
    contentWidth: "42rem",
    tocWidth: "200px",
  },
  {
    label: "Balanced",
    layoutWidth: "1440px",
    sidebarWidth: "260px",
    contentWidth: "48rem",
    tocWidth: "220px",
  },
  {
    label: "Spacious",
    layoutWidth: "1600px",
    sidebarWidth: "300px",
    contentWidth: "52rem",
    tocWidth: "240px",
  },
];

interface Props {
  defaults: DocsThemeConfig;
}

export default function DocsThemeEditor({ defaults }: Props) {
  const [config, setConfig] = useState<DocsThemeConfig>(defaults);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="emcydocs-te-trigger"
      >
        <span
          className="emcydocs-te-dot"
          style={{
            background: `linear-gradient(135deg, hsl(${config.accentHue ?? 270} 80% 60%), hsl(${config.accentHue ?? 270} 70% 45%))`,
          }}
        />
        <span>Theme Editor</span>
        <svg
          viewBox="0 0 20 20"
          className="emcydocs-te-chevron"
          data-open={isOpen}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Panel (portalled to body to escape stacking contexts) */}
      {isOpen ? createPortal(
        <>
          <div
            className="emcydocs-te-backdrop"
            onClick={() => setIsOpen(false)}
          />
          <div className="emcydocs-te-panel">
            {/* Header */}
            <div className="emcydocs-te-header">
              <div>
                <div className="emcydocs-te-title">DocsThemeConfig</div>
                <div className="emcydocs-te-subtitle">
                  Customize and export your theme
                </div>
              </div>
              <div className="emcydocs-te-actions">
                <button
                  type="button"
                  onClick={resetConfig}
                  className="emcydocs-te-action"
                  title="Reset"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={copyConfig}
                  className="emcydocs-te-action"
                  title="Copy config"
                >
                  {copied ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Controls grid */}
            <div className="emcydocs-te-grid">
              <Field label="preset">
                <div className="emcydocs-te-chips">
                  {presets.map((p) => (
                    <Chip
                      key={p.id}
                      active={config.preset === p.id}
                      onClick={() =>
                        updateConfig({ preset: p.id, accentHue: p.hue })
                      }
                    >
                      {p.label}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="mode">
                <div className="emcydocs-te-chips">
                  {modes.map((m) => (
                    <Chip
                      key={m}
                      active={config.mode === m}
                      onClick={() => updateConfig({ mode: m })}
                    >
                      {m}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label={`accentHue: ${config.accentHue}`}>
                <div className="emcydocs-te-hues">
                  {accents.map((a) => (
                    <button
                      key={a.hue}
                      type="button"
                      onClick={() => updateConfig({ accentHue: a.hue })}
                      className={`emcydocs-te-hue ${config.accentHue === a.hue ? "is-active" : ""}`}
                      style={{
                        background: `linear-gradient(135deg, hsl(${a.hue} 80% 60%), hsl(${a.hue} 70% 45%))`,
                      }}
                      title={a.label}
                    />
                  ))}
                </div>
              </Field>

              <Field label="density">
                <div className="emcydocs-te-chips">
                  {densities.map((d) => (
                    <Chip
                      key={d}
                      active={config.density === d}
                      onClick={() => updateConfig({ density: d })}
                    >
                      {d}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="radius">
                <div className="emcydocs-te-chips">
                  {radii.map((r) => (
                    <Chip
                      key={r}
                      active={config.radius === r}
                      onClick={() => updateConfig({ radius: r })}
                    >
                      {r}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="layout">
                <div className="emcydocs-te-chips">
                  {layouts.map((l) => (
                    <Chip
                      key={l.label}
                      active={config.layoutWidth === l.layoutWidth}
                      onClick={() =>
                        updateConfig({
                          layoutWidth: l.layoutWidth,
                          sidebarWidth: l.sidebarWidth,
                          contentWidth: l.contentWidth,
                          tocWidth: l.tocWidth,
                        })
                      }
                    >
                      {l.label}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>

            {/* JSON */}
            <div className="emcydocs-te-json">
              <pre>
                <code>{JSON.stringify(config, null, 2)}</code>
              </pre>
            </div>
          </div>
        </>,
        document.body
      ) : null}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="emcydocs-te-field">
      <span className="emcydocs-te-label">{label}</span>
      {children}
    </div>
  );
}

function Chip({
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
      className={`emcydocs-te-chip ${active ? "is-active" : ""}`}
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
    shell.dataset.emcydocsPreset = preset;
    shell.dataset.emcydocsMode = mode;
    shell.dataset.emcydocsDensity = density;

    shell.style.removeProperty("--emcydocs-hue");
    shell.style.removeProperty("--emcydocs-layout-width");
    shell.style.removeProperty("--emcydocs-content-width");
    shell.style.removeProperty("--emcydocs-sidebar-width");
    shell.style.removeProperty("--emcydocs-toc-width");
    shell.style.removeProperty("--emcydocs-radius");

    if (style) {
      Object.entries(style).forEach(([key, value]) => {
        if (typeof value === "string") {
          shell.style.setProperty(key, value);
        }
      });
    }
  });
}
