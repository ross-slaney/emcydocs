import "@testing-library/jest-dom/vitest";
import { createElement, lazy, Suspense, type ComponentType } from "react";
import { vi } from "vitest";

vi.mock("next/dynamic", () => ({
  default: (importFn: () => Promise<{ default: ComponentType<Record<string, unknown>> }>) => {
    const LazyComponent = lazy(importFn);

    return function DynamicMock(props: Record<string, unknown>) {
      return createElement(
        Suspense,
        { fallback: null },
        createElement(LazyComponent, props)
      );
    };
  },
}));

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
