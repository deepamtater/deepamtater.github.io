import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, kindLabel, postUrl } from '../lib/posts';
import { getPublishedThoughts } from '../lib/thoughts';
import { SITE } from '../site.config';
import { url } from '../lib/url';

const escapeCdata = (text: string) => text.replace(/]]>/g, ']]]]><![CDATA[>');

export async function GET(context: APIContext) {
  const [posts, thoughts] = await Promise.all([getPosts(), getPublishedThoughts()]);

  const items = [
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      content: `<![CDATA[${escapeCdata((post.body ?? '').trim())}]]>`,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [kindLabel(post), ...post.data.tags],
    })),
    ...thoughts.map((t) => {
      const rawBody = t.inline?.html ?? (t.entry?.body ?? t.plainText).trim();
      return {
        title: `2AM · ${t.shortDate} · ${t.time}`,
        description: t.plainText.slice(0, 220),
        content: `<![CDATA[${escapeCdata(rawBody)}]]>`,
        pubDate: t.date,
        link: url(`/2am/#${t.id}`),
        categories: ['2AM'],
      };
    }),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site),
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    items,
    customData: `<language>${SITE.locale}</language>`,
  });
}
