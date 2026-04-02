import type { DocsThemeConfig } from "@emcy/docs";

export const docsThemeProfiles = {
  balanced: {
    layoutWidth: "1480px",
    contentWidth: "48rem",
    sidebarWidth: "276px",
    tocWidth: "240px",
  },
  reading: {
    layoutWidth: "1420px",
    contentWidth: "44rem",
    sidebarWidth: "244px",
    tocWidth: "220px",
  },
  compact: {
    layoutWidth: "1320px",
    contentWidth: "41rem",
    sidebarWidth: "208px",
    tocWidth: "208px",
  },
  showcase: {
    layoutWidth: "1560px",
    contentWidth: "50rem",
    sidebarWidth: "292px",
    tocWidth: "248px",
  },
} satisfies Record<
  string,
  Pick<
    DocsThemeConfig,
    "layoutWidth" | "contentWidth" | "sidebarWidth" | "tocWidth"
  >
>;

export const docsClassicTheme: DocsThemeConfig = {
  ...docsThemeProfiles.balanced,
  preset: "neutral",
  mode: "light",
  density: "comfortable",
  accentHue: 270,
  radius: "xl",
};
