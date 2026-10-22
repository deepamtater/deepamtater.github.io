# Deepam Tater · Personal Website

Static [Astro](https://astro.build) site deployed at [deepamtater.github.io](https://deepamtater.github.io). Everything is plain Markdown and TypeScript files in this repo; pushing to `main` builds and deploys automatically via GitHub Actions.

---

## 1. Quick Start

Requires Node 22.23.4+ (Node 24 recommended; see `.nvmrc`).

```bash
npm install
npm run dev      # Start local dev server at http://localhost:4812
npm run check    # Type-check Astro, TypeScript, and Markdown frontmatter
npm run build    # Build production static files into dist/
```

---

## 2. How to Add an Essay (`src/content/essays/<slug>.md`)

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
- **`summary`**: Shown as the italic subtitle under the essay title, on `/essays/`, in search, and in RSS.
- **`draft: true`**: Visible in `npm run dev`, hidden from production builds until set to `false`.

---

## 3. How to Add a Note (`src/content/notes/<slug>.md`)

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

Write your note here.
```

---

## 4. How to Add a 2AM Thought (`/2am/`)

You can add a 2AM thought in two ways:

### Option A: Quick inline entry in `src/data/thoughts.ts` (fastest)
Prepend a new object to `THOUGHTS` in `src/data/thoughts.ts`:

```ts
export const THOUGHTS: InlineThought[] = [
  {
    id: '2026-10-23-0210',
    date: '2026-10-23T02:10:00',
    time: '02:10 AM',
    html: '<p>Your late-night thought here.</p>',
  },
  // ...existing thoughts
];
```

### Option B: Markdown file in `src/content/thoughts/<slug>.md`
For multi-paragraph thoughts or code blocks, create `src/content/thoughts/2026-10-23-idea.md`:

```markdown
---
date: 2026-10-23T02:10:00
time: 02:10 AM
draft: false
---

Your Markdown thought here.
```

---

## 5. How to Update `Now` & `Previously` (`src/data/now.ts`)

All data for the `/now/` page (and the `/topics/reading/` bookshelf) lives in **`src/data/now.ts`**:

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
  1. Update the active week in `src/pages/now.astro` (and the homepage `Now` aside in `src/pages/index.astro`) from `(Week 1)` to `(Week 2)`.
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
  The `Studied` row appears automatically at the top of `PREVIOUSLY` on `/now/` and is indexed in site search.
- **Edit `Not doing`**: Update the `NOT_DOING` string in `src/data/now.ts`.

---

## 6. How to Edit `About` & Site Links

- **Bio prose & inline contact links**: Edit `src/pages/about.astro`.
- **Site name, email, navigation tabs, social links, and allowed topics**: Edit `src/site.config.ts`.
- **Footer links**: Edit `src/components/Footer.astro`.
