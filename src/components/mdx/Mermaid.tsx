"use client";

import { useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
  caption?: string;
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const id = useId().replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          fontFamily: "inherit",
          securityLevel: "loose",
        });
        const { svg: rendered } = await mermaid.render(
          `mermaid-${id}`,
          chart.trim()
        );
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="emcydocs-mermaid emcydocs-mermaid-error">
        <p>Diagram error: {error}</p>
      </div>
    );
  }

  return (
    <figure className="emcydocs-mermaid">
      <div
        ref={containerRef}
        className="emcydocs-mermaid-svg"
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
      {caption ? (
        <figcaption className="emcydocs-mermaid-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
