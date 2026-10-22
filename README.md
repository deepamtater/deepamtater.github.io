# Dee Tater — personal site

Essays and notes on startups, engineering, reading, and life. A static [Astro](https://astro.build) site: Markdown in the repo, push to publish, near-zero JavaScript.

The design is a commonplace book: bottle-green cloth bands frame cool page stock, a gilt ribbon marks the page you're on, and the home page indexes every head with John Locke's 1706 letter-and-vowel method. The design rules are in the [Design](#design) section below.

## Run it locally

Requires Node 22.23.4+ (Node 24 recommended; see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4812
npm run build      # static output in dist/
npm run preview    # serve dist/ locally
npm run check      # type-check .astro/.ts files and content frontmatter
```

## Write a new post

There are two formats, each a folder under `src/content/`:

| Format | Folder | Use it for |
| --- | --- | --- |
| Essay | `src/content/essays/` | Long, polished, evergreen pieces |
| Note | `src/content/notes/` | Short learnings, book notes |

1. Create a Markdown file. The filename becomes the URL: `src/content/notes/my-idea.md` → `/notes/my-idea/`. Use `.mdx` if you need components.
2. Add the frontmatter:

   ```md
   ---
   title: What I learned shipping v1
   date: 2026-10-22
   summary: One or two sentences. Shown in lists, RSS, and link previews.
   tags: [startups, engineering]   # any of: startups, engineering, reading, life
   draft: true                     # visible in `npm run dev`, hidden from the built site
   ---

   Your writing here.
   ```

3. Preview with `npm run dev`. When it's ready, set `draft: false`, commit, and push to `main`; the site rebuilds and deploys automatically.

Notes:

- Tags are validated. To add a topic, add it to `TOPICS` in `src/site.config.ts`; it gets a `/tags/<topic>/` page automatically.
- Markdown supports GFM: tables, footnotes (`[^1]`), and syntax-highlighted code blocks.
- An essay's `summary` is also shown as the italic subtitle under its title.
- The site launches with no posts, and the Writing, Essays, Notes and topic pages show a "coming soon" state until the first one lands. Until then, `npm run dev` and `npm run build` print a harmless `collection ... is empty` warning.
- Drafts: any post with `draft: true` shows in `npm run dev` (marked "draft") and is left out of the built site, RSS, and sitemap.
- The bio and contact email on `src/pages/about.astro` are marked placeholders. Replace them with your own.

## Project layout

```
src/
  content/essays/, content/notes/   posts (Markdown / MDX)
  content.config.ts                 frontmatter schema
  site.config.ts                    name, description, nav, allowed topics
  layouts/                          Base (SEO, theme, header/footer), Post
  components/                       Header, Footer, LockeIndex, Unwritten (empty state), PageTitle, PostList, TagList
  lib/locke.ts                      files each head under its first letter + first vowel
  pages/                            home, writing, essays, notes, tags, about, 404, rss.xml
  styles/global.css                 design tokens, type scale, prose styles
public/                             favicon.svg, og.png (default social preview image)
astro.config.mjs                    site URL + base path, fonts, integrations
```

Built in: RSS (`/rss.xml`), sitemap (`/sitemap-index.xml`), canonical/Open Graph/Twitter meta, light and dark mode (follows the system, with a toggle), self-hosted fonts (Libre Caslon Display and Text via Astro's Fonts API), and cross-document view transitions (the ribbon slides to the new page's head). All motion switches off under `prefers-reduced-motion`.

## Design

- **Colour:** cloth `#1b3a30` only as full-width bands (masthead, index, colophon); gilt `#d1ae55` only on cloth and for the ribbon; page `#f2f4f3`, ink `#16191a`. Dark mode swaps to a deep green page `#0e1a16`.
- **Type:** Libre Caslon Display for titles, Libre Caslon Text for everything else. No mono labels, eyebrows, or section numbers.
- **Layout:** every page hangs off one margin rule. Short notes (counts, years) sit to its left, and entries sit to its right.
- **Index:** add a topic to `TOPICS` and it is filed in the Locke index automatically.

## Deploy: GitHub Pages (primary)

The workflow in `.github/workflows/deploy.yml` builds with [`withastro/action`](https://github.com/withastro/action) and deploys on every push to `main`.

One-time setup after the repo is on GitHub:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main` (or run the workflow manually from the Actions tab).

The site URL and base path are set in exactly one place, the top of `astro.config.mjs`, and the workflow fills them in automatically from the repository's Pages settings:

| Repo | Owner | Site URL | Base path |
| --- | --- | --- | --- |
| `deepamtater.github.io` | org `deepamtater` | `https://deepamtater.github.io` | `/` |
| `deepamtater.github.io` | user `dimension-drifter` | `https://dimension-drifter.github.io/deepamtater.github.io` | `/deepamtater.github.io` |

Only a repo named exactly `<owner>.github.io` is served at the domain root. All internal links go through `url()` in `src/lib/url.ts`, so both cases work without code changes. To override the detected values (for example after adding a custom domain), set the `SITE_URL` and `BASE_PATH` repository variables under **Settings → Secrets and variables → Actions → Variables**. For a local build that matches production:

```bash
SITE_URL=https://deepamtater.github.io BASE_PATH=/ npm run build
```

## Other hosts

`dist/` is plain static files, so any static host works. Cloudflare Pages (`*.pages.dev`), Netlify (`*.netlify.app`), and Vercel (`*.vercel.app`) all have free subdomains: connect the repo, use build command `npm run build` and output directory `dist`, and set the `SITE_URL` environment variable to the assigned URL.
