# EmcyDocs

`@emcy/docs` is an App Router-native MDX documentation library for Next.js.

It is designed for teams that want docs in the repo, SEO-friendly prerendered routes, folder-based locale variants, built-in mobile docs UX, and a single docs layout that can be restyled and extended through theme configuration and custom chrome slots.

## What ships in v0

- `createDocsSource(config)` for content loading, locale-aware routing, nav generation, TOC extraction, metadata helpers, and search
- `DocsLayout`
- `DocsPage` and `DocsHomePage`
- `DocsSearch`, `DocsSidebar`, `DocsToc`, `HeadingLinks`, `MobileDocsChrome`
- `@emcy/docs/styles.css`

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
