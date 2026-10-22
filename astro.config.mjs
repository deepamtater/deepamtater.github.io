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
      themes: {
        light: {
          name: 'deepam-light',
          type: 'light',
          colors: {
            'editor.background': '#EFEEE9',
            'editor.foreground': '#252722',
          },
          settings: [
            {
              settings: {
                background: '#EFEEE9',
                foreground: '#252722',
              },
            },
            {
              scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
              settings: {
                foreground: '#6F7069',
                fontStyle: 'italic',
              },
            },
            {
              scope: [
                'keyword',
                'storage',
                'storage.type',
                'storage.modifier',
                'keyword.operator',
                'constant.language',
              ],
              settings: {
                foreground: '#496786',
              },
            },
            {
              scope: [
                'entity.name.function',
                'support.function',
                'entity.name.type',
                'entity.name.tag',
                'meta.function-call',
              ],
              settings: {
                foreground: '#334E68',
              },
            },
            {
              scope: ['string', 'constant.numeric', 'constant.character', 'constant.other'],
              settings: {
                foreground: '#3B5A47',
              },
            },
            {
              scope: ['variable', 'punctuation', 'meta.brace'],
              settings: {
                foreground: '#252722',
              },
            },
          ],
        },
        dark: {
          name: 'deepam-dark',
          type: 'dark',
          colors: {
            'editor.background': '#292B27',
            'editor.foreground': '#F0EFE9',
          },
          settings: [
            {
              settings: {
                background: '#292B27',
                foreground: '#F0EFE9',
              },
            },
            {
              scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
              settings: {
                foreground: '#A3A49C',
                fontStyle: 'italic',
              },
            },
            {
              scope: [
                'keyword',
                'storage',
                'storage.type',
                'storage.modifier',
                'keyword.operator',
                'constant.language',
              ],
              settings: {
                foreground: '#91ABC7',
              },
            },
            {
              scope: [
                'entity.name.function',
                'support.function',
                'entity.name.type',
                'entity.name.tag',
                'meta.function-call',
              ],
              settings: {
                foreground: '#B2C7DF',
              },
            },
            {
              scope: ['string', 'constant.numeric', 'constant.character', 'constant.other'],
              settings: {
                foreground: '#9EBCA9',
              },
            },
            {
              scope: ['variable', 'punctuation', 'meta.brace'],
              settings: {
                foreground: '#F0EFE9',
              },
            },
          ],
        },
      },
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
