import type { APIRoute } from 'astro';
import { getPosts, kindLabel, postUrl } from '../lib/posts';
import { getThoughts } from '../lib/thoughts';
import { CURRENTLY_READING, NOW_SECTIONS, PREVIOUSLY } from '../data/now';
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

    ...NOW_SECTIONS.map((sec) => ({
      title: sec.note ? `${sec.title} (${sec.note})` : sec.title,
      snippet: sec.text,
      kind: 'Now' as const,
      href: url(`/now/#${sec.id}`),
      keywords: `now ${sec.label} ${sec.title} ${sec.note ?? ''} ${sec.text} ${sec.keywords ?? ''}`,
    })),

    ...PREVIOUSLY.studied.map((item) => ({
      title: 'Previously studied',
      snippet: item,
      kind: 'Now' as const,
      href: url('/now/#previously-heading'),
      keywords: `previously studied llms ${item}`,
    })),

    ...PREVIOUSLY.built.map((item) => ({
      title: 'Previously built',
      snippet: item,
      kind: 'Now' as const,
      href: url('/now/#previously-heading'),
      keywords: `previously built puvio v1 beta ${item}`,
    })),

    ...CURRENTLY_READING.map((book) => ({
      title: book.title,
      snippet: `${book.author} · Currently reading`,
      kind: 'Reading' as const,
      href: url('/now/#reading'),
      keywords: `reading book currently ${book.title} ${book.author}`,
    })),

    ...PREVIOUSLY.read.map((book) => ({
      title: book.title,
      snippet: book.author,
      kind: 'Reading' as const,
      href: url('/now/#previously-heading'),
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
      snippet: 'What I’m working on, studying, and reading right now!',
      kind: 'Page',
      href: url('/now/'),
      keywords:
        'now puvio everything about llms from a to z week 1 reading books not doing instagram insta snapchat tiktok reels shorts brainrot',
    },
    {
      title: '2AM',
      snippet: 'Raw, untitled late-night thoughts, timestamped as they happen.',
      kind: 'Page',
      href: url('/2am/'),
      keywords: '2am thoughts stream ledger night untitled',
    },
    {
      title: 'About Deepam Tater',
      snippet: `Founder and fourth-year computer science undergraduate in Jaipur · Puvio · ${SITE.email}`,
      kind: 'Page',
      href: url('/about/'),
      keywords: `about deepam tater jaipur bikaner btech computer science undergraduate puvio puvio.app x twitter linkedin github instagram insta snapchat tiktok reels shorts brainrot attention span ${SITE.socials.map((s) => s.handle).join(' ')} ${SITE.email}`,
    },
    {
      title: 'Writing',
      snippet: 'Essays and short field notes, newest first.',
      kind: 'Page',
      href: url('/writing/'),
      keywords: 'writing archive essays notes all',
    },
    {
      title: 'Essays',
      snippet: 'Long, finished arguments rewritten until they hold up.',
      kind: 'Page',
      href: url('/essays/'),
      keywords: 'essays long-form writing startups software books life',
    },
    {
      title: 'Notes',
      snippet: 'Short field notes, benchmarks, and takeaways from building and reading.',
      kind: 'Page',
      href: url('/notes/'),
      keywords: 'notes short field notes benchmarks takeaways reading building',
    },
  ];

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
