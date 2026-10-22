// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// ─── Deployment target ──────────────────────────────────────────────────
// The ONLY place the public URL is configured. Canonical links, RSS, the
// sitemap, OG tags and every internal link derive from these two values.
//
//   Org/user site  (repo <name>.github.io under account <name>):
//     SITE_URL=https://<name>.github.io   BASE_PATH=/
//   Project site   (any other repo name, e.g. under a personal account):
//     SITE_URL=https://<account>.github.io   BASE_PATH=/<repo>
//
// The GitHub Pages workflow fills both in automatically from the repository's
// Pages settings, so the defaults below only matter for local builds.
const SITE_URL = process.env.SITE_URL || 'https://deepamtater.github.io';
const BASE_PATH = process.env.BASE_PATH || '/';

const fontDir = './node_modules/@fontsource';

export default defineConfig({
  site: SITE_URL.replace(/\/$/, '').toLowerCase(),
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  server: { port: 4812, host: true },
  devToolbar: { enabled: false },
  // The whole stylesheet is a few KB; inlining it removes the only render-blocking request.
  build: { inlineStylesheets: 'always' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
  },
  // Libre Caslon: the English book face of the commonplace-book era. Display for titles, Text for reading.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Libre Caslon Display',
      cssVariable: '--font-display',
      fallbacks: ['Big Caslon', 'Georgia', 'serif'],
      options: {
        variants: [
          {
            src: [`${fontDir}/libre-caslon-display/files/libre-caslon-display-latin-400-normal.woff2`],
            weight: '400',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Libre Caslon Text',
      cssVariable: '--font-text',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: [`${fontDir}/libre-caslon-text/files/libre-caslon-text-latin-400-normal.woff2`],
            weight: '400',
            style: 'normal',
          },
          {
            src: [`${fontDir}/libre-caslon-text/files/libre-caslon-text-latin-400-italic.woff2`],
            weight: '400',
            style: 'italic',
          },
          {
            src: [`${fontDir}/libre-caslon-text/files/libre-caslon-text-latin-700-normal.woff2`],
            weight: '700',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
