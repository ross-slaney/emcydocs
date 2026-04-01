"use server";

import { docsSource, embeddedSource, minimalSource, notebookSource } from "@/lib/docs-source";

export async function searchDocsAction(query: string, locale?: string) {
  return docsSource.search(query, locale);
}

export async function searchNotebookAction(query: string) {
  return notebookSource.search(query);
}

export async function searchMinimalAction(query: string) {
  return minimalSource.search(query);
}

export async function searchEmbeddedAction(query: string) {
  return embeddedSource.search(query);
}
