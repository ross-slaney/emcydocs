import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogDirectoryPage from "../src/components/BlogDirectoryPage";
import BlogPostPage from "../src/components/BlogPostPage";
import type { BlogDirectoryResponse, BlogEntry, BlogEntryMeta } from "../src/types";

vi.mock("../src/mdx", () => ({
  DocsMdx: ({
    content,
    entry,
  }: {
    content?: string;
    entry?: { content: string };
  }) => <div data-testid="mdx-content">{content ?? entry?.content}</div>,
}));

const directoryItems: BlogEntryMeta[] = [
  {
    slug: "blog-foundation",
    href: "/blog/blog-foundation",
    title: "Blog foundation",
    description: "Build the blog feature next to docs.",
    publishedAt: "2026-03-20",
    updatedAt: "2026-03-22",
    author: "Fixture Team",
    authorRole: "Maintainers",
    authorImage: "/authors/fixture.png",
    image: "/images/blog-foundation.png",
    imageAlt: "Blog foundation",
    category: "Product",
    tags: ["blog", "nextjs"],
    readingTimeMinutes: 3,
    locale: "en",
    contentLocale: "en",
    availableLocales: ["en", "es"],
  },
  {
    slug: "discovery-systems",
    href: "/blog/discovery-systems",
    title: "Discovery systems",
    description: "Search, categories, and suggestions.",
    publishedAt: "2026-03-21",
    updatedAt: "2026-03-21",
    author: "Fixture Team",
    category: "Search",
    tags: ["search"],
    readingTimeMinutes: 2,
    locale: "en",
    contentLocale: "en",
    availableLocales: ["en"],
  },
];

const directory: BlogDirectoryResponse = {
  query: "blog",
  selectedCategory: "all",
  categories: ["Product", "Search"],
  page: 1,
  pageSize: 1,
  totalItems: 2,
  totalPages: 2,
  items: directoryItems,
};

const entry: BlogEntry = {
  ...directoryItems[0],
  content: "# Blog foundation\n\nShared content pipeline.",
  headings: [{ id: "shared-content-pipeline", text: "Shared content pipeline", level: 2 }],
  filePath: "/fixtures/blog-foundation/en.mdx",
  relatedSlugs: ["discovery-systems"],
};

describe("blog components", () => {
  it("renders the directory page with filters, cards, and pagination", () => {
    render(
      <BlogDirectoryPage
        directory={directory}
        baseHref="/blog"
        copy={{
          title: "Blog",
          description: "Notes from the team.",
          categoriesLabel: "Categories",
          searchLabel: "Search",
          searchPlaceholder: "Search posts...",
          allCategoriesLabel: "All",
          noResultsTitle: "No posts",
          noResultsDescription: "Try another filter.",
        }}
        cardCopy={{
          readMoreLabel: "Read more",
          readingTimeSuffix: "min read",
        }}
        paginationCopy={{
          previousLabel: "Previous",
          nextLabel: "Next",
          pageLabel: "Page",
        }}
        locale="en"
      />
    );

    expect(screen.getByRole("heading", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search posts...")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All" })).toHaveAttribute("href", "/blog?q=blog");
    expect(screen.getByRole("heading", { name: "Blog foundation" })).toBeInTheDocument();
    expect(screen.getByText("Page 1 / 2")).toBeInTheDocument();
  });

  it("renders the post page metadata, mdx body, and suggested posts", async () => {
    render(
      await BlogPostPage({
        entry,
        suggestedEntries: [directoryItems[1]],
        copy: {
          backLabel: "Back to Blog",
          writtenByLabel: "Written by",
          publishedOnLabel: "Published",
          updatedOnLabel: "Updated",
          tagsLabel: "Tags",
          suggestedLabel: "Suggested Posts",
          suggestedDescription: "More to read next.",
          readMoreLabel: "Read more",
          readingTimeSuffix: "min read",
        },
        locale: "en",
        backHref: "/blog",
      })
    );

    expect(screen.getByRole("link", { name: "Back to Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByText("Written by")).toBeInTheDocument();
    expect(screen.getByText("Fixture Team")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Suggested Posts" })).toBeInTheDocument();
    expect(screen.getByTestId("mdx-content")).toHaveTextContent("Shared content pipeline.");
    expect(screen.getByRole("link", { name: /Discovery systems/i })).toBeInTheDocument();
  });
});
