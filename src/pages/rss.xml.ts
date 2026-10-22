import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, kindLabel, postUrl } from '../lib/posts';
import { SITE } from '../site.config';
import { url } from '../lib/url';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [kindLabel(post), ...post.data.tags],
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
