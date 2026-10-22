import type { APIRoute } from 'astro';
import { formatDate, getPosts, postUrl } from '../lib/posts';
import { getThoughts } from '../lib/thoughts';
import { CURRENTLY_READING, NOT_DOING, PREVIOUSLY } from '../data/now';
import { SITE } from '../site.config';
import { url } from '../lib/url';

export const GET: APIRoute = async (context) => {
  const siteOrigin = (context.site ?? new URL('https://deepamtater.github.io')).origin;
  const fullUrl = (path: string) => new URL(url(path), siteOrigin).href;

  const [essays, notes, thoughts] = await Promise.all([
    getPosts('essays'),
    getPosts('notes'),
    getThoughts(),
  ]);

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    'Deepam Tater is a 22-year-old founder and fourth-year computer science undergraduate in Jaipur (grew up in Bikaner). He is building Puvio (https://puvio.app) and studying how language models work from the ground up.',
    '',
    '## Links',
    `- Website: ${fullUrl('/')}`,
    `- About: ${fullUrl('/about/')}`,
    `- Now: ${fullUrl('/now/')}`,
    `- Writing: ${fullUrl('/writing/')}`,
    `- 2AM: ${fullUrl('/2am/')}`,
    `- RSS: ${fullUrl('/rss.xml')}`,
    ...SITE.socials.map((s) => `- ${s.label}: ${s.href}`),
    `- Email: mailto:${SITE.email}`,
    '',
    '## Currently (/now/)',
    '- Building: Puvio (https://puvio.app), a single place to keep a record of your work and use it to land roles or move up.',
    '- Studying: Everything about LLMs, from A to Z (Week 1). Coding neural networks and backpropagation by hand from blank files, without AI autocomplete.',
    `- Reading: ${CURRENTLY_READING.map((b) => `${b.title} (${b.author})`).join(' and ')}.`,
    `- Not doing: ${NOT_DOING}`,
    '',
    '## Previously (/now/)',
    ...PREVIOUSLY.studied.map((item) => `- Studied: ${item}`),
    ...PREVIOUSLY.built.map((item) => `- Built: ${item}`),
    `- Read: ${PREVIOUSLY.read.map((b) => `${b.title} (${b.author})`).join('; ')}.`,
    '',
    '## Essays',
    ...essays.map(
      (p) =>
        `- [${p.data.title}](${new URL(postUrl(p), siteOrigin).href}) (${formatDate(p.data.date)}): ${p.data.summary}`,
    ),
    '',
    '## Notes',
    ...notes.map(
      (p) =>
        `- [${p.data.title}](${new URL(postUrl(p), siteOrigin).href}) (${formatDate(p.data.date)}): ${p.data.summary}`,
    ),
    '',
    '## 2AM Thoughts',
    ...thoughts.map(
      (t) =>
        `- [${t.shortDate} · ${t.time}](${fullUrl(`/2am/#${t.id}`)}): ${t.plainText}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
