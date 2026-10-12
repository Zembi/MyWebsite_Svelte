# Personal website

The personal site of Vasileios-Filippos Zembilas, built with SvelteKit and prerendered to static pages for GitHub Pages.

## Develop

Requires Node 24 (`nvm use` picks it up from `.nvmrc`).

```sh
npm install
npm run dev      # local dev server
npm run check    # type check
npm run build    # static site in build/
```

Most of the site's copy lives in `src/lib/content.ts`.
