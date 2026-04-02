import type { DocsThemeConfig } from "@emcy/docs";

export const docsClassicTheme: DocsThemeConfig = {
  preset: "neutral",
  mode: "light",
  layoutWidth: "1500px",
  contentWidth: "48rem",
  sidebarWidth: "276px",
  tocWidth: "240px",
  radius: "xl",
};

export const docsNotebookTheme: DocsThemeConfig = {
  preset: "dusk",
  mode: "dark",
  layoutWidth: "1460px",
  contentWidth: "46rem",
  sidebarWidth: "228px",
  tocWidth: "220px",
  radius: "lg",
};

export const docsMinimalTheme: DocsThemeConfig = {
  preset: "neutral",
  mode: "light",
  layoutWidth: "1360px",
  contentWidth: "42rem",
  sidebarWidth: "208px",
  tocWidth: "220px",
  radius: "lg",
};

export const docsEmbeddedTheme: DocsThemeConfig = {
  preset: "ocean",
  mode: "dark",
  layoutWidth: "1500px",
  contentWidth: "46rem",
  sidebarWidth: "248px",
  tocWidth: "220px",
  radius: "lg",
};
