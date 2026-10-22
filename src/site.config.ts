export const SITE = {
  name: 'Deepam Tater',
  title: 'Deepam Tater',
  description: 'Essays and notes on startups, engineering, reading, and life.',
  author: 'Deepam Tater',
  locale: 'en',
  ogImage: '/og.png',
  email: 'connectwithdeepam@gmail.com',
  socials: [
    { label: 'Puvio', handle: 'puvio.app', href: 'https://puvio.app' },
    { label: 'X', handle: '@justdeepam', href: 'https://x.com/justdeepam' },
    {
      label: 'LinkedIn',
      handle: '/in/deepamtater',
      href: 'https://www.linkedin.com/in/deepamtater/',
    },
    {
      label: 'GitHub',
      handle: '@dimension-drifter',
      href: 'https://github.com/dimension-drifter',
    },
  ],
  nav: [
    { href: '/writing/', label: 'Writing' },
    { href: '/2am/', label: '2AM' },
    { href: '/now/', label: 'Now' },
    { href: '/about/', label: 'About' },
  ],
} as const;

/** Allowed post tags. Add a topic here before using it in frontmatter. */
export const TOPICS = ['startups', 'engineering', 'reading', 'life'] as const;
export type Topic = (typeof TOPICS)[number];
