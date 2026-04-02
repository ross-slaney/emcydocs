import type { CSSProperties } from "react";
import type {
  DocsThemeConfig,
  DocsThemeDensity,
  DocsThemeMode,
  DocsThemePreset,
} from "./types";

const radiusScale = {
  md: "0.875rem",
  lg: "1.125rem",
  xl: "1.5rem",
} as const;

export function resolveDocsThemePreset(
  theme?: DocsThemeConfig
): DocsThemePreset {
  return theme?.preset ?? "neutral";
}

export function resolveDocsThemeMode(theme?: DocsThemeConfig): DocsThemeMode {
  if (theme?.mode) {
    return theme.mode;
  }

  const preset = resolveDocsThemePreset(theme);
  return preset === "dusk" || preset === "ocean" ? "dark" : "light";
}

export function resolveDocsThemeDensity(
  theme?: DocsThemeConfig
): DocsThemeDensity {
  return theme?.density ?? "comfortable";
}

export function getDocsThemeStyle(
  theme?: DocsThemeConfig
): CSSProperties | undefined {
  if (!theme) {
    return undefined;
  }

  const style: CSSProperties & Record<string, string> = {};

  if (typeof theme.accentHue === "number") {
    style["--emcydocs-hue"] = `${theme.accentHue}`;
  }

  if (theme.layoutWidth) {
    style["--emcydocs-layout-width"] = theme.layoutWidth;
  }

  if (theme.contentWidth) {
    style["--emcydocs-content-width"] = theme.contentWidth;
  }

  if (theme.sidebarWidth) {
    style["--emcydocs-sidebar-width"] = theme.sidebarWidth;
  }

  if (theme.tocWidth) {
    style["--emcydocs-toc-width"] = theme.tocWidth;
  }

  if (theme.radius) {
    style["--emcydocs-radius"] = radiusScale[theme.radius];
  }

  return Object.keys(style).length > 0 ? style : undefined;
}
