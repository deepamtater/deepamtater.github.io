import type { APIRoute } from 'astro';
import { getPosts, kindLabel, postUrl } from '../lib/posts';
import { getThoughts } from '../lib/thoughts';
import { GOALS } from '../data/now';
import { SITE, TOPICS } from '../site.config';
import { url } from '../lib/url';

export interface SearchItem {
  title: string;
  snippet: string;
  kind: 'Essay' | 'Note' | '2AM' | 'Now' | 'Topic' | 'Page';
  href: string;
  keywords?: string;
}

export const GET: APIRoute = async () => {
  const [posts, thoughts] = await Promise.all([getPosts(), getThoughts()]);

  const items: SearchItem[] = [
    ...posts.map((post) => ({
      title: post.data.title,
      snippet: post.data.summary,
      kind: kindLabel(post) as 'Essay' | 'Note',
      href: postUrl(post),
      keywords: [
        ...post.data.tags,
        (post.body ?? '')
          .replace(/```[\s\S]*?```/g, ' ')
          .replace(/[#>*_`[\]()-]/g, ' ')
          .replace(/\s+/g, ' ')
          .slice(0, 400),
      ].join(' '),
    })),

    ...thoughts.map((t) => ({
      title: `${t.shortDate} · ${t.time}`,
      snippet: t.plainText.slice(0, 180),
      kind: '2AM' as const,
      href: url(`/2am/#${t.id}`),
      keywords: `${t.monthYear} 2am thought ${t.plainText}`,
    })),

    ...GOALS.map((goal) => {
      const active = goal.steps.find((s) => s.state === 'active') ?? goal.steps[0];
      return {
        title: goal.title,
        snippet: active ? `Active: ${active.label}` : '',
        kind: 'Now' as const,
        href: url(`/now/#${goal.id}`),
        keywords: `now goal progress ${goal.horizon ?? ''} ${goal.steps.map((s) => s.label).join(' ')}`,
      };
    }),

    ...TOPICS.map((topic) => ({
      title: `#${topic}`,
      snippet: `Essays and notes on ${topic}`,
      kind: 'Topic' as const,
      href: url(`/topics/${topic}/`),
      keywords: `topic tag ${topic}`,
    })),

    {
      title: 'Now',
      snippet: 'Active goals, milestones, and current focus',
      kind: 'Page',
      href: url('/now/'),
      keywords: 'now goals progress timeline current',
    },
    {
      title: '2AM',
      snippet: 'Late-night thoughts, fragments, and observations',
      kind: 'Page',
      href: url('/2am/'),
      keywords: '2am thoughts stream ledger night',
    },
    {
      title: 'About Deepam Tater',
      snippet: `Software, essays, notes · ${SITE.socials.map((s) => s.handle).join(' · ')} · ${SITE.email}`,
      kind: 'Page',
      href: url('/about/'),
      keywords: `about bio contact email x twitter linkedin github ${SITE.email}`,
    },
    {
      title: 'Writing',
      snippet: 'Archive of essays and notes',
      kind: 'Page',
      href: url('/writing/'),
      keywords: 'writing archive essays notes all',
    },
  ];

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
