export const SITE = {
  name: 'Deepam Tater',
  title: 'Deepam Tater',
  description: 'Essays and notes by Deepam Tater on startups, engineering, books, and life.',
  author: 'Deepam Tater',
  locale: 'en',
  ogImage: '/og.png',
  nav: [
    { href: '/writing/', label: 'Writing' },
    { href: '/essays/', label: 'Essays' },
    { href: '/notes/', label: 'Notes' },
    { href: '/about/', label: 'About' },
  ],
  email: 'connectwithdeepam@gmail.com',
  socials: [
    { label: 'X', handle: '@justdeepam', href: 'https://x.com/justdeepam' },
    { label: 'LinkedIn', handle: '/in/deepamtater', href: 'https://www.linkedin.com/in/deepamtater/' },
    { label: 'GitHub', handle: '@dimension-drifter', href: 'https://github.com/dimension-drifter' },
  ],
} as const;

/** Allowed post tags. Add a topic here before using it in frontmatter. */
export const TOPICS = ['startups', 'engineering', 'reading', 'life'] as const;
export type Topic = (typeof TOPICS)[number];
