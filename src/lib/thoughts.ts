import { getCollection, render, type CollectionEntry } from 'astro:content';
import { THOUGHTS, type InlineThought } from '../data/thoughts';

export interface RenderedThought {
  id: string;
  date: Date;
  time: string;
  shortDate: string;
  monthYear: string;
  showMonth: boolean;
  plainText: string;
  entry?: CollectionEntry<'thoughts'>;
  inline?: InlineThought;
}

const shortFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const monthFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const stripHtml = (s: string) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export async function getThoughts(): Promise<RenderedThought[]> {
  const mdEntries = await getCollection('thoughts', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );

  const combined: Omit<RenderedThought, 'showMonth'>[] = [
    ...mdEntries.map((entry) => ({
      id: entry.id.replace(/[^a-zA-Z0-9-]/g, '-'),
      date: entry.data.date,
      time: entry.data.time,
      shortDate: shortFmt.format(entry.data.date),
      monthYear: monthFmt.format(entry.data.date),
      plainText: (entry.body ?? '').replace(/[#>*_`[\]()-]/g, ' ').replace(/\s+/g, ' ').trim(),
      entry,
    })),
    ...THOUGHTS.map((inline) => {
      const d = new Date(`${inline.date}T00:00:00Z`);
      return {
        id: inline.id,
        date: d,
        time: inline.time,
        shortDate: shortFmt.format(d),
        monthYear: monthFmt.format(d),
        plainText: stripHtml(inline.html),
        inline,
      };
    }),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  let lastMonth = '';
  return combined.map((item) => {
    const showMonth = item.monthYear !== lastMonth;
    lastMonth = item.monthYear;
    return { ...item, showMonth };
  });
}

export { render };
