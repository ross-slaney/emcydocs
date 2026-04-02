import type { ReactNode } from "react";
import CopyCodeButton from "./CopyCodeButton";

interface CodeBlockProps {
  children: ReactNode;
  title?: string;
  language?: string;
  allowCopy?: boolean;
}

export default function CodeBlock({
  children,
  title,
  language,
  allowCopy = true,
}: CodeBlockProps) {
  const codeText = collectText(children).trimEnd();
  const detectedLanguage = language || inferLanguage(children);
  const shouldShowChrome = Boolean(title || detectedLanguage || allowCopy);

  return (
    <div className="emcydocs-codeblock">
      {shouldShowChrome ? (
        <div className="emcydocs-codeblock-header">
          <div className="emcydocs-codeblock-meta">
            <span className="emcydocs-codeblock-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {title ? <span className="emcydocs-codeblock-title">{title}</span> : null}
            {!title && detectedLanguage ? (
              <span className="emcydocs-codeblock-title">
                {detectedLanguage.toUpperCase()}
              </span>
            ) : null}
          </div>
          {allowCopy && codeText ? <CopyCodeButton value={codeText} /> : null}
        </div>
      ) : null}
      <div className="emcydocs-codeblock-body">{children}</div>
    </div>
  );
}

export function Pre({ children }: { children: ReactNode }) {
  return <CodeBlock>{children}</CodeBlock>;
}

function inferLanguage(children: ReactNode) {
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    typeof (children as { props?: { className?: string } }).props?.className ===
      "string"
  ) {
    const className = (children as { props: { className?: string } }).props.className ?? "";
    const match = className.match(/language-([a-z0-9-]+)/i);
    return match?.[1];
  }

  return undefined;
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
    return collectText((node as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}
