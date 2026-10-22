export const SITE = {
  name: 'Dee Tater',
  title: 'Dee Tater',
  description:
    'Essays and notes on startups, engineering, reading, and life — written to think more clearly.',
  author: 'Dee Tater',
  locale: 'en',
  ogImage: '/og.png',
  nav: [
    { href: '/writing/', label: 'Writing' },
    { href: '/essays/', label: 'Essays' },
    { href: '/notes/', label: 'Notes' },
    { href: '/about/', label: 'About' },
  ],
} as const;

/** Allowed post tags. Add a topic here before using it in frontmatter. */
export const TOPICS = ['startups', 'engineering', 'reading', 'life'] as const;
export type Topic = (typeof TOPICS)[number];
