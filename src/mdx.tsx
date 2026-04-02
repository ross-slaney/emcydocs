import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { DocsEntry } from "./types";
import { slugifyHeading } from "./utils";
import {
  Accordion,
  AccordionItem,
  Banner,
  Callout,
  Card,
  CardGrid,
  CodeBlock,
  File,
  Files,
  Folder,
  InlineToc,
  Pre,
  Step,
  Steps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/mdx";

type MdxComponentMap = Record<string, React.ComponentType<any>>;

interface DocsMdxProps {
  entry: DocsEntry;
  components?: MdxComponentMap;
}

const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark-default",
  },
  keepBackground: false,
  defaultLang: {
    block: "plaintext",
  },
} as const;

export async function DocsMdx({ entry, components }: DocsMdxProps) {
  return (
    <div className="emcydocs-prose">
      <MDXRemote
        source={entry.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        components={{
          ...getDefaultMdxComponents(),
          ...components,
        }}
      />
    </div>
  );
}

export function getDefaultMdxComponents(): MdxComponentMap {
  return {
    h1: createHeadingComponent("h1"),
    h2: createHeadingComponent("h2"),
    h3: createHeadingComponent("h3"),
    h4: createHeadingComponent("h4"),
    Accordion,
    AccordionItem,
    Banner,
    Callout,
    Card,
    CardGrid,
    CodeBlock,
    File,
    Files,
    Folder,
    InlineToc,
    pre: Pre,
    Step,
    Steps,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  };
}

function createHeadingComponent(tag: "h1" | "h2" | "h3" | "h4") {
  return function DocsHeading({
    children,
    id,
    className,
    ...props
  }: {
    children: ReactNode;
    id?: string;
    className?: string;
  }) {
    const text = collectText(children);
    const headingId = id || slugifyHeading(text);
    const Tag = tag;

    return (
      <Tag
        id={headingId}
        className={[
          "emcydocs-heading",
          `emcydocs-heading-${tag}`,
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <span>{children}</span>
        <a
          href={`#${headingId}`}
          className="emcydocs-heading-anchor"
          data-docs-anchor
          aria-label={`Copy link to ${text}`}
        >
          #
        </a>
      </Tag>
    );
  };
}

function collectText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return `${node}`;
  }

  if (Array.isArray(node)) {
    return node.map(collectText).join("");
  }

  if (typeof node === "object" && "props" in node) {
    return collectText((node as any).props.children);
  }

  return "";
}
