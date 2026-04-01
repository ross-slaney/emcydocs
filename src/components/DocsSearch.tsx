"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import type { DocsSearchAction, DocsSearchResponse } from "../types";

const EMPTY_RESPONSE: DocsSearchResponse = {
  query: "",
  total: 0,
  results: [],
};

export default function DocsSearch({
  searchAction,
  locale,
  placeholder = "Search the docs...",
  variant = "desktop",
}: {
  searchAction?: DocsSearchAction;
  locale?: string;
  placeholder?: string;
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [response, setResponse] = useState<DocsSearchResponse>(EMPTY_RESPONSE);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const trimmedQuery = query.trim();
  const visibleResults = useMemo(
    () => (trimmedQuery.length >= 2 ? response.results : []),
    [response.results, trimmedQuery.length]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setQuery("");
      setIsOpen(false);
      setResponse(EMPTY_RESPONSE);
      setError(null);
      setActiveIndex(-1);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    if (!searchAction || trimmedQuery.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      startTransition(async () => {
        try {
          const next = await searchAction(trimmedQuery, locale);
          setResponse(next);
          setError(null);
          setActiveIndex(next.results.length > 0 ? 0 : -1);
        } catch {
          setError("Search is unavailable right now.");
        }
      });
    }, 140);

    return () => window.clearTimeout(timeoutId);
  }, [locale, searchAction, trimmedQuery]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (variant !== "desktop") {
      return;
    }

    const handleShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") {
        return;
      }

      event.preventDefault();
      setIsOpen(true);
      const input = document.getElementById(inputId);
      if (input instanceof HTMLInputElement) {
        input.focus();
        input.select();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [inputId, variant]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visibleResults.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => {
        const next = current < visibleResults.length - 1 ? current + 1 : 0;
        resultRefs.current[next]?.focus();
        return next;
      });
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => {
        const next = current > 0 ? current - 1 : visibleResults.length - 1;
        resultRefs.current[next]?.focus();
        return next;
      });
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="emcydocs-search">
      <div className="emcydocs-search-input-wrap">
        <input
          id={inputId}
          type="search"
          value={query}
          placeholder={placeholder}
          className="emcydocs-search-input"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setError(null);
          }}
          onKeyDown={handleKeyDown}
          disabled={!searchAction}
        />
        {variant === "desktop" ? <span className="emcydocs-search-kbd">⌘K</span> : null}
      </div>

      {isOpen && trimmedQuery.length > 0 ? (
        <div className="emcydocs-search-panel">
          {error ? <p className="emcydocs-search-empty">{error}</p> : null}
          {!error && isPending ? <p className="emcydocs-search-empty">Searching…</p> : null}
          {!error && !isPending && visibleResults.length === 0 ? (
            <p className="emcydocs-search-empty">No matching documents.</p>
          ) : null}

          {visibleResults.length > 0 ? (
            <ul className="emcydocs-search-results" role="listbox">
              {visibleResults.map((result, index) => (
                <li key={`${result.href}-${index}`}>
                  <Link
                    href={result.href}
                    ref={(element) => {
                      resultRefs.current[index] = element;
                    }}
                    className={[
                      "emcydocs-search-result",
                      activeIndex === index ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setIsOpen(false)}
                    onFocus={() => setActiveIndex(index)}
                  >
                    <div className="emcydocs-search-result-top">
                      <span className="emcydocs-search-result-title">{result.title}</span>
                      {result.sectionTitle ? (
                        <span className="emcydocs-search-result-section">
                          {result.sectionTitle}
                        </span>
                      ) : null}
                    </div>
                    <p className="emcydocs-search-result-snippet">{result.snippet}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
