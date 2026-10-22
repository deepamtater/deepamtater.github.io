import type { APIRoute } from 'astro';
import { getPosts, kindLabel, postUrl } from '../lib/posts';
import { getThoughts } from '../lib/thoughts';
import { CURRENTLY_READING, GOALS, PREVIOUSLY_READ } from '../data/now';
import { SITE, TOPICS } from '../site.config';
import { url } from '../lib/url';

export interface SearchItem {
  title: string;
  snippet: string;
  kind: 'Essay' | 'Note' | '2AM' | 'Now' | 'Reading' | 'Topic' | 'Page';
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

    ...GOALS.map((goal) => ({
      title: goal.title,
      snippet: goal.summary,
      kind: 'Now' as const,
      href: url(`/now/#${goal.id}`),
      keywords: `now goal progress ${goal.horizon ?? ''} ${goal.summary} ${goal.steps.map((s) => s.label).join(' ')}`,
    })),

    ...CURRENTLY_READING.map((book) => ({
      title: book.title,
      snippet: `${book.author} · Currently reading`,
      kind: 'Reading' as const,
      href: url('/now/#reading'),
      keywords: `reading book currently ${book.title} ${book.author}`,
    })),

    ...PREVIOUSLY_READ.map((book) => ({
      title: book.title,
      snippet: book.author,
      kind: 'Reading' as const,
      href: url('/now/#reading'),
      keywords: `reading book bookshelf previously read ${book.title} ${book.author}`,
    })),

    ...TOPICS.map((topic) => ({
      title: `#${topic}`,
      snippet: `Essays and notes on ${topic}`,
      kind: 'Topic' as const,
      href: url(`/topics/${topic}/`),
      keywords: `topic tag ${topic}`,
    })),

    {
      title: 'Now',
      snippet: 'Puvio, LLMs from scratch (Week 1), and reading list',
      kind: 'Page',
      href: url('/now/'),
      keywords: 'now puvio llms from scratch reading books',
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
      snippet: `Founder and engineer in Jaipur · Puvio · ${SITE.email}`,
      kind: 'Page',
      href: url('/about/'),
      keywords: `about deepam tater jaipur bikaner puvio puvio.app x twitter linkedin github ${SITE.socials.map((s) => s.handle).join(' ')} ${SITE.email}`,
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
