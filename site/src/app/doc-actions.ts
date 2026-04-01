"use server";

import { docsSource, embeddedSource, minimalSource, notebookSource } from "@/lib/docs-source";

export async function searchDocsAction(query: string, locale?: string) {
  return docsSource.search(query, locale);
}

export async function searchNotebookAction(query: string, locale?: string) {
  return notebookSource.search(query, locale);
}

export async function searchMinimalAction(query: string, locale?: string) {
  return minimalSource.search(query, locale);
}

export async function searchEmbeddedAction(query: string, locale?: string) {
  return embeddedSource.search(query, locale);
}
