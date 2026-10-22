// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { paperDark, paperLight } from './src/lib/shiki-themes.mjs';

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

const fontDir = './node_modules/@fontsource-variable';

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
      themes: { light: paperLight, dark: paperDark },
      defaultColor: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Newsreader',
      cssVariable: '--font-serif',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          {
            src: [`${fontDir}/newsreader/files/newsreader-latin-wght-normal.woff2`],
            weight: '200 800',
            style: 'normal',
          },
          {
            src: [`${fontDir}/newsreader/files/newsreader-latin-wght-italic.woff2`],
            weight: '200 800',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: [`${fontDir}/geist-mono/files/geist-mono-latin-wght-normal.woff2`],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
