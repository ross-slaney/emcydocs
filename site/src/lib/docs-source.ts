import path from "node:path";
import { createDocsSource } from "@emcy/docs";

const contentDir = path.join(process.cwd(), "site/content/docs");

const sharedConfig = {
  contentDir,
  defaultLocale: "en",
  locales: ["en", "es"],
  hideDefaultLocaleInUrl: true,
  siteTitle: "EmcyDocs",
  titleSuffix: "EmcyDocs",
  sectionLabels: {
    "": "Getting Started",
    guides: "Guides",
    layouts: "Layouts",
    internationalization: "Internationalization",
    reference: "Reference",
  },
  sectionOrder: ["", "guides", "layouts", "internationalization", "reference"],
};

export const docsSource = createDocsSource({
  ...sharedConfig,
  basePath: "/docs",
});

export const notebookSource = createDocsSource({
  ...sharedConfig,
  basePath: "/notebook",
});

export const minimalSource = createDocsSource({
  ...sharedConfig,
  basePath: "/minimal",
});

export const embeddedSource = createDocsSource({
  ...sharedConfig,
  basePath: "/embedded/docs",
});
