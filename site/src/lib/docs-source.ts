import path from "node:path";
import { createDocsSource } from "@emcy/docs";
import {
  defaultSiteLocale,
  docsLocales,
  hideDefaultSiteLocaleInUrl,
} from "@/lib/site-i18n";

const contentDir = path.join(process.cwd(), "site/content/docs");

const sharedConfig = {
  contentDir,
  defaultLocale: defaultSiteLocale,
  locales: [...docsLocales],
  hideDefaultLocaleInUrl: hideDefaultSiteLocaleInUrl,
  siteTitle: "EmcyDocs",
  titleSuffix: "EmcyDocs",
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
