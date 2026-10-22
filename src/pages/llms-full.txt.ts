import type { APIRoute } from 'astro';
import { formatDate, getPosts, postUrl } from '../lib/posts';
import { getPublishedThoughts } from '../lib/thoughts';
import { CURRENTLY_READING, NOT_DOING, PREVIOUSLY } from '../data/now';
import { SITE } from '../site.config';
import { url } from '../lib/url';

export const GET: APIRoute = async (context) => {
  const siteOrigin = (context.site ?? new URL('https://deepamtater.github.io')).origin;
  const fullUrl = (path: string) => new URL(url(path), siteOrigin).href;

  const [essays, notes, thoughts] = await Promise.all([
    getPosts('essays'),
    getPosts('notes'),
    getPublishedThoughts(),
  ]);

  const sections: string[] = [
    `# ${SITE.name} · Full Corpus`,
    '',
    `> ${SITE.description}`,
    '',
    '## About Deepam Tater',
    `Canonical URL: ${fullUrl('/about/')}`,
    '',
    'I’m Deepam Tater, a 22-year-old founder and fourth-year computer science undergraduate in Jaipur (I grew up in Bikaner). Most of my time goes into building Puvio (https://puvio.app) and learning how language models work from the ground up.',
    '',
    'This site is where I keep my notes in public. Essays are longer pieces on startups, software, books, and life. Notes are shorter takeaways from the week, and 2AM holds late-night thoughts I’m still working through.',
    '',
    `Contact: ${SITE.email} | X: https://x.com/justdeepam | LinkedIn: https://www.linkedin.com/in/deepamtater/ | GitHub: https://github.com/dimension-drifter`,
    '',
    '---',
    '',
    '## Now (/now/)',
    `Canonical URL: ${fullUrl('/now/')}`,
    '',
    '### Currently',
    '- Building: Puvio (https://puvio.app), a single place to keep a record of your work and use it to land roles or move up.',
    '- Studying: Everything about LLMs, from A to Z (Week 1). Coding neural networks and backpropagation by hand from blank files, without AI autocomplete.',
    `- Reading: ${CURRENTLY_READING.map((b) => `${b.title} (${b.author})`).join(' and ')}.`,
    `- Not doing: ${NOT_DOING}`,
    '',
    '### Previously',
    ...PREVIOUSLY.studied.map((item) => `- Studied: ${item}`),
    ...PREVIOUSLY.built.map((item) => `- Built: ${item}`),
    `- Read: ${PREVIOUSLY.read.map((b) => `${b.title} (${b.author})`).join('; ')}.`,
    '',
    '---',
    '',
    '## Essays',
    '',
    ...essays.flatMap((post) => [
      `### ${post.data.title}`,
      `- URL: ${new URL(postUrl(post), siteOrigin).href}`,
      `- Published: ${formatDate(post.data.date)}`,
      `- Topics: ${post.data.tags.join(', ')}`,
      `- Summary: ${post.data.summary}`,
      '',
      (post.body ?? '').trim(),
      '',
      '---',
      '',
    ]),
    '## Notes',
    '',
    ...notes.flatMap((post) => [
      `### ${post.data.title}`,
      `- URL: ${new URL(postUrl(post), siteOrigin).href}`,
      `- Published: ${formatDate(post.data.date)}`,
      `- Topics: ${post.data.tags.join(', ')}`,
      `- Summary: ${post.data.summary}`,
      '',
      (post.body ?? '').trim(),
      '',
      '---',
      '',
    ]),
    '## 2AM Thoughts',
    '',
    ...thoughts.flatMap((t) => [
      `### ${t.shortDate} · ${t.time}`,
      `- URL: ${fullUrl(`/2am/#${t.id}`)}`,
      '',
      (t.entry?.body ?? t.plainText).trim(),
      '',
    ]),
  ];

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
