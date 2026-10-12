# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node 24 (`.nvmrc`; `.npmrc` sets `engine-strict=true`, so other versions fail `npm install`).

```sh
npm run dev       # dev server
npm run check     # svelte-kit sync + svelte-check (type checking; the only automated check)
npm run build     # prerendered static site in build/
npm run preview   # serve the build
```

There is no test suite and no linter/formatter config.

The site is served from the custom domain vfzempilas.gr (`static/CNAME`), so builds use no base path.

## Architecture

Personal website built with SvelteKit 3 + Svelte 5, fully prerendered with `@sveltejs/adapter-static` and deployed to GitHub Pages.

- **No `svelte.config.js`.** All SvelteKit config (adapter, `paths.base`, compiler options) is passed to the `sveltekit()` plugin in `vite.config.ts`. Runes mode is forced for all project files, so use `$props`, `$state`, `$derived`, `{@render}` — not legacy `export let` / `$:` / slots.
- **Static only.** `src/routes/+layout.ts` sets `prerender = true` for every route; there are no server routes or load functions that need a runtime. `adapter-static` emits `404.html` as the fallback, rendered by `src/routes/+error.svelte`.
- **Base path.** `paths.base` comes from the `BASE_PATH` env var (empty locally and in CI, since the site is on the custom domain). Internal links must go through `resolve()` from `$app/paths` (see `Header.svelte`), never hardcoded `/about`-style hrefs, or they break on GitHub Pages.
- **Content is data.** Nearly all site copy (person info, socials, traits, story, skills, education, the sites worked on) lives in `src/lib/content.ts`; routes and components render it. Edit text there rather than in components. Entries marked `PLACEHOLDER` are carried over from the old site and still need real details.
- **Imports.** Use the Node subpath alias `#lib/...` defined in `package.json` `imports` (e.g. `import Header from '#lib/components/Header.svelte'`, `import { person } from '#lib/content.ts'` — note the explicit `.ts` extension), rather than `$lib`.
- **Styling.** Global design tokens (colors `--midnight`, `--sage`, `--paper`, `--slate`, `--rust*`; fonts `--display`/`--body`/`--mono`; type scale `--step-*`; `--gutter`, `--measure`) are defined in `src/app.css`. Components use scoped `<style>` blocks that reference these tokens. Fonts are loaded from Google Fonts in `src/app.html`. Site is dark-only (`color-scheme: dark`).
- **Comments.** Every code comment is one short line in UPPERCASE (`// PRELOAD ACTIVE SITE AND NEIGHBOURS`, `/* LIVE PAGE CLIPPED TO A CIRCLE */`). Code identifiers inside comments keep their case.
- **Design motif.** The UI mimics a terminal/shell: the header shows a `user@city:cwd$` prompt derived from the current route, nav labels are `~/path`, page headings use `PageHead` with a shell-command `path` line. Keep new pages consistent with this. Adding a route also means adding it to the `links` array in `Header.svelte`.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` with an empty `BASE_PATH` and publishes `build/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`. `static/.nojekyll` must stay so GitHub Pages serves `_app/` assets, and `static/CNAME` keeps the custom domain set on every deploy.

## Branch context

The `svelte` branch is a rewrite of the previous React + Vite + Redux + GSAP site (still on `main` history); none of that code or those dependencies remain.
