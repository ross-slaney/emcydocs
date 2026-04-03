import type { DocsThemeConfig } from "@emcy/docs";

/**
 * Default theme configuration for EmcyDocs documentation.
 * This object is passed to DocsLayout and can be customized via the Theme Editor.
 */
export const docsClassicTheme: DocsThemeConfig = {
  preset: "neutral",
  mode: "light",
  density: "comfortable",
  accentHue: 270,
  radius: "lg",
  layoutWidth: "1440px",
  contentWidth: "48rem",
  sidebarWidth: "260px",
  tocWidth: "220px",
};
