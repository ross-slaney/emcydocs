# EmcyDocs

`@emcy/docs` is an App Router-native MDX documentation library for Next.js.

It is designed for teams that want docs in the repo, SEO-friendly prerendered routes, folder-based locale variants, built-in mobile docs UX, and a single docs layout that can be restyled and extended through a headless theme engine plus custom chrome slots.

## What ships in v0

- `createDocsSource(config)` for content loading, locale-aware routing, nav generation, TOC extraction, metadata helpers, and search
- `DocsLayout`
- `DocsPage` and `DocsHomePage`
- `DocsSearch`, `DocsSidebar`, `DocsToc`, `HeadingLinks`, `MobileDocsChrome`
- `DocsThemeProvider`, `useDocsTheme()`, and `resolveDocsTheme(theme)`
- `@emcy/docs/styles.css`

## Theme system

`DocsLayout` accepts a nested `theme` object for static theming, and it can also read live theme state from `DocsThemeProvider` when you want a runtime switcher, persisted preferences, or a showcase studio.

```tsx
import {
  DocsLayout,
  DocsThemeProvider,
  type DocsThemeConfig,
} from "@emcy/docs";
import "@emcy/docs/styles.css";

const docsTheme: DocsThemeConfig = {
  color: {
    preset: "ocean",
    mode: "dark",
    accentHue: 188,
    accentStrength: "bold",
    surfaceStyle: "elevated",
  },
  layout: {
    density: "compact",
    layoutWidth: "1480px",
    contentWidth: "50rem",
    sidebarWidth: "272px",
    tocWidth: "232px",
  },
  shape: {
    radius: "xl",
  },
};

export default function Layout({ children }) {
  return (
    <DocsThemeProvider initialTheme={docsTheme}>
      <DocsLayout navigation={docsSource.getNavigation()}>
        {children}
      </DocsLayout>
    </DocsThemeProvider>
  );
}
```

If you do not need live editing, pass the same object directly to `DocsLayout` with `theme={docsTheme}` and skip the provider entirely. The example site's popup studio is implemented in [`/site`](./site); the library itself stays headless.

## Local development

```bash
npm install
npm run dev
```

That runs the library build in watch mode and the example site under [`/site`](./site).

## Build and test

```bash
npm run lint
npm test
npm run build:lib
npm run build:site
```

## Dogfooding in SqlOS

From `sqlos/web`, use a local file dependency:

```json
{
  "dependencies": {
    "@emcy/docs": "file:../../emcydocs"
  }
}
```

The SqlOS repo also includes helper scripts to switch between a local file dependency and a published npm version.

## Release flow

- Merge to `main` with passing CI
- Tag a release like `v0.1.0`
- Push the tag
- GitHub Actions will rebuild, retest, and publish `@emcy/docs` to npm
