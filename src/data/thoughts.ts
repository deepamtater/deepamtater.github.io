export interface InlineThought {
  id: string;
  date: string;
  time: string;
  html: string;
}

/**
 * Append a quick 2AM thought here (or add a Markdown file in src/content/thoughts/).
 */
export const THOUGHTS: InlineThought[] = [
  {
    id: '2026-10-19-0214',
    date: '2026-10-19T02:14:00',
    time: '02:14 AM',
    html: '<p>I use AI heavily to write code, and I still feel guilty about it sometimes. A few months back I tried coding everything by hand again so I could understand what the model was breaking, then dropped it because of shipping deadlines. Felt fast, and felt disappointed in myself at the same time. That is why the daily four-hour LLM study block has one strict rule now: blank file, zero AI autocomplete.</p>',
  },
  {
    id: '2026-08-25-0148',
    date: '2026-08-25T01:48:00',
    time: '01:48 AM',
    html: '<p>Wrote a rule banning myself from opening the code editor before noon because “building in silence” was just my excuse to avoid distribution. Turns out refactoring the backend is socially acceptable procrastination.</p>',
  },
];
