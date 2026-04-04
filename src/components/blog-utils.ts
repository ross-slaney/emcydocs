export function buildBlogDirectoryHref(args: {
  baseHref: string;
  query?: string;
  category?: string;
  page?: number;
}) {
  const params = new URLSearchParams();
  const query = args.query?.trim();
  const category = args.category?.trim();

  if (query) {
    params.set("q", query);
  }

  if (category && category !== "all") {
    params.set("category", category);
  }

  if (typeof args.page === "number" && args.page > 1) {
    params.set("page", `${args.page}`);
  }

  const search = params.toString();
  return search ? `${args.baseHref}?${search}` : args.baseHref;
}

export function formatBlogDate(value: string, locale?: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale || undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
