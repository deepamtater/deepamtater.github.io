export const SITE = {
  name: 'Dee Tater',
  title: 'Dee Tater',
  description: 'Essays and notes by Dee Tater on startups, engineering, books and life.',
  author: 'Dee Tater',
  locale: 'en',
  ogImage: '/og.png',
  nav: [
    { href: '/writing/', label: 'Writing', sheet: '02' },
    { href: '/essays/', label: 'Essays', sheet: '03' },
    { href: '/notes/', label: 'Notes', sheet: '04' },
    { href: '/about/', label: 'About', sheet: '05' },
  ],
} as const;

/** Allowed post tags. Add a topic here before using it in frontmatter. */
export const TOPICS = ['startups', 'engineering', 'reading', 'life'] as const;
export type Topic = (typeof TOPICS)[number];
