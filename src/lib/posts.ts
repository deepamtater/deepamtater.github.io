import { getCollection, type CollectionEntry } from 'astro:content';
import { url } from './url';

export type Kind = 'essays' | 'notes';
export type Post = CollectionEntry<'essays'> | CollectionEntry<'notes'>;

const WORDS_PER_MINUTE = 230;

const isPublished = ({ data }: Post) => (import.meta.env.PROD ? !data.draft : true);

const byDateDesc = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

export async function getPosts(kind?: Kind): Promise<Post[]> {
  const kinds: Kind[] = kind ? [kind] : ['essays', 'notes'];
  const lists = await Promise.all(kinds.map((k) => getCollection(k, isPublished)));
  return lists.flat().sort(byDateDesc);
}

export const postUrl = (post: Post) => url(`/${post.collection}/${post.id}/`);

export const kindLabel = (post: Post) => (post.collection === 'essays' ? 'Essay' : 'Note');

export function readingTime(body = ''): string {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>|[#>*_`[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/** View transition names must be valid custom idents and unique per page. */
export const transitionName = (post: Post) =>
  `t-${post.collection}-${post.id}`.replace(/[^a-zA-Z0-9-]/g, '-');

export function groupByYear(posts: Post[]): [number, Post[]][] {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()].sort(([a], [b]) => b - a);
}

export function relatedPosts(post: Post, all: Post[], limit = 2): Post[] {
  const tags = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id || p.collection !== post.collection)
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p))
    .slice(0, limit)
    .map(({ p }) => p);
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const shortFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (d: Date) => dateFormat.format(d);
export const formatShortDate = (d: Date) => shortFormat.format(d);

export const entryCount = (n: number) => (n === 0 ? 'No entries yet' : n === 1 ? '1 entry' : `${n} entries`);
