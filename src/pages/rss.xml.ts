import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, kindLabel, postUrl } from '../lib/posts';
import { SITE } from '../site.config';
import { url } from '../lib/url';

const escapeCdata = (text: string) => text.replace(/]]>/g, ']]]]><![CDATA[>');

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site),
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      content: `<![CDATA[${escapeCdata((post.body ?? '').trim())}]]>`,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [kindLabel(post), ...post.data.tags],
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
