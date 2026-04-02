"use server";

import { docsSource } from "@/lib/docs-source";

export async function searchDocsAction(query: string, locale?: string) {
  return docsSource.search(query, locale);
}
