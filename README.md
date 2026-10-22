# Deepam Tater · Personal Website

Static [Astro](https://astro.build) site deployed at [deepamtater.github.io](https://deepamtater.github.io). Everything is plain Markdown and TypeScript in this repo; pushing to `main` builds and deploys automatically via GitHub Actions.

---

## 1. Essays vs. Notes vs. 2AM — Which One to Write?

| Format | Purpose | Typical Length | Page & Layout Structure | Where It Lives |
| :--- | :--- | :--- | :--- | :--- |
| **Essays** (`/essays/`) | **Long, finished arguments** — ideas rewritten over days or weeks until the thesis holds up on its own. | 800–3,000 words | Full article page with title, italic summary dek, date, reading time (`4 min read`), and topic tags. | `src/content/essays/<slug>.md` |
| **Notes** (`/notes/`) | **Short field notes & concrete takeaways** — a specific paper, benchmark, book insight, or engineering lesson written down while building or reading. | 150–600 words | Crisp field-note page: starts directly with the prose right under the title + date (no summary dek above the body, no reading-time badge). | `src/content/notes/<slug>.md` |
| **2AM** (`/2am/`) | **Raw, untitled late-night thoughts** — half-formed ideas, honest admissions, and observations that do not need a title or an article page. | 1–5 sentences | Continuous nocturnal margin-ledger stream, timestamped to the minute (`02:14 AM · Oct 19, 2026`) with `#id` permalinks and `j`/`k` navigation. | `src/data/thoughts.ts` (or `src/content/thoughts/<slug>.md`) |

> **Automatic discovery:** Every Essay, Note, and 2AM thought you add is automatically indexed at build time into `/search-index.json` (instant `/` site search), `/rss.xml` (full-text RSS), `/sitemap-index.xml`, `/llms.txt`, `/llms-full.txt`, and JSON-LD `@graph` structured data. Zero manual steps required.

---

## 2. Quick Start

Requires Node 22.23.4+ (Node 24 recommended; see `.nvmrc`).

```bash
npm install
npm run dev      # Start local dev server at http://localhost:4812
npm run check    # Type-check Astro, TypeScript, and Markdown frontmatter
npm run build    # Build production static files into dist/
```

---

## 3. How to Add an Essay (`src/content/essays/<slug>.md`)

Create a `.md` (or `.mdx`) file in `src/content/essays/`. The filename becomes the URL:
`src/content/essays/taste-cannot-be-prompted.md` -> `/essays/taste-cannot-be-prompted/`

```markdown
---
title: Taste Cannot Be Prompted
date: 2026-10-01
summary: Generation produces false positives. Killing a weak draft is judgment, and judgment is the layer generation never gives you.
tags: [startups, engineering]
draft: false
---

Write your essay in Markdown here.
```

- **Allowed `tags`**: `startups`, `engineering`, `reading`, `life` (defined in `src/site.config.ts`).
- **`summary`**: Displayed as the italic subtitle under the essay title on the essay page, on `/essays/`, in search, and in RSS/JSON-LD.
- **`draft: true`**: Visible locally in `npm run dev`, hidden from production builds until set to `false`.

---

## 4. How to Add a Note (`src/content/notes/<slug>.md`)

Create a `.md` file in `src/content/notes/`. The filename becomes the URL:
`src/content/notes/more-memory-worse-agents.md` -> `/notes/more-memory-worse-agents/`

```markdown
---
title: More Memory, Worse Agents
date: 2026-10-22
summary: Why agents that save their own advice repeat their own mistakes, and why raw examples beat vague rules.
tags: [engineering]
draft: false
---

Start directly with the observation, benchmark, or takeaway.
```

- **`summary`**: Used for `/notes/` list previews, search snippets, and SEO/RSS metadata (not repeated above the note body on the note page itself so the note reads immediately).

---

## 5. How to Add Images to Essays and Notes (`public/images/`)

1. **Drop your image file into `public/images/`**:
   For example: `public/images/context-tax-chart.png` (PNG, JPG, WebP, or SVG).
2. **Embed a standard image in Markdown**:
   ```markdown
   ![Quadratic token accumulation across 30 turns](/images/context-tax-chart.png)
   ```
3. **Embed an image with a visible italic caption below it**:
   Use `<figure>` and `<figcaption>` directly in your Markdown file:
   ```html
   <figure>
     <img src="/images/context-tax-chart.png" alt="Quadratic token accumulation across 30 turns" loading="lazy" />
     <figcaption>Cumulative tokens billed across a 30-turn coding session when past turns are re-read on every prompt.</figcaption>
   </figure>
   ```
   Both plain Markdown images and `<figure>` blocks automatically get responsive sizing (`max-width: 100%`), a subtle `1px` border (`var(--rule)`), `2rem` vertical spacing, and muted italic caption typography in light and dark mode.

---

## 6. How to Add a 2AM Thought (`/2am/`)

### Option A: Quick inline entry in `src/data/thoughts.ts` (fastest)
Prepend a new object to `THOUGHTS` at the top of `src/data/thoughts.ts`:

```ts
export const THOUGHTS: InlineThought[] = [
  {
    id: '2026-10-23-0210',
    date: '2026-10-23T02:10:00',
    time: '02:10 AM',
    html: '<p>Your raw late-night thought here.</p>',
  },
  // ...existing thoughts
];
```

### Option B: Markdown file in `src/content/thoughts/<slug>.md`
For multi-paragraph riffs or code blocks, create `src/content/thoughts/2026-10-23-idea.md`:

```markdown
---
date: 2026-10-23T02:10:00
time: 02:10 AM
draft: false
---

Your Markdown thought here.
```

---

## 7. How to Update `Now` & `Previously` (`src/data/now.ts`)

All data for `/now/` (and the `/topics/reading/` bookshelf) lives in **`src/data/now.ts`**:

- **Update current books (`CURRENTLY_READING`)**:
  ```ts
  export const CURRENTLY_READING: Book[] = [
    { title: 'Zero to One', author: 'Peter Thiel' },
    { title: 'LLM Engineer’s Handbook', author: 'Paul Iusztin & Maxime Labonne' },
  ];
  ```
- **Move a finished book to `PREVIOUSLY_READ`**:
  Cut the book from `CURRENTLY_READING` and add it to the top of `PREVIOUSLY_READ`.
- **Move a finished LLM study week into `PREVIOUSLY.studied`**:
  1. Update `(Week 1)` to `(Week 2)` in `src/pages/now.astro` and `src/pages/index.astro`.
  2. Add the completed week to `PREVIOUSLY.studied` in `src/data/now.ts`:
     ```ts
     export const PREVIOUSLY: PreviouslyArchive = {
       studied: [
         'Week 1 · Neural networks and backpropagation by hand from blank files.',
       ],
       built: [
         'Puvio V1. Ran a 240-user beta, talked to 90 users, threw out the original draft engine, and rebuilt V2 around a single work record.',
       ],
       read: PREVIOUSLY_READ,
     };
     ```
  The `Studied` row renders automatically at the top of `PREVIOUSLY` on `/now/`.
- **Edit `Not doing`**: Update the `NOT_DOING` string in `src/data/now.ts`.

---

## 8. How to Edit `About` & Site Links

- **Bio prose, attention-span line, & inline contact links**: Edit `src/pages/about.astro`.
- **Site name, email, navigation tabs, social links, and allowed topics**: Edit `src/site.config.ts`.
- **Footer links**: Edit `src/components/Footer.astro`.
