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
    id: '2026-10-20-0206',
    date: '2026-10-20T02:06:00',
    time: '02:06 AM',
    html: '<p>Anthropic’s junior technical hires dropped from 27% to 9%, while meeting time jumped 20%. Everyone acted like writing syntax was the bottleneck in software. When spitting out code costs zero dollars, repositories get flooded with unverified pull requests. Software velocity is bounded by review bandwidth.</p>',
  },
  {
    id: '2026-10-19-0214',
    date: '2026-10-19T02:14:00',
    time: '02:14 AM',
    html: '<p>I use AI heavily to write code, and I still feel guilty about it sometimes. A few months back I tried coding everything by hand again so I could understand what the model was breaking, then dropped it because of shipping deadlines. Felt fast, and felt disappointed in myself at the same time. That is why the daily four-hour LLM study block has one strict rule now: blank file, zero AI autocomplete.</p>',
  },
  {
    id: '2026-10-13-0152',
    date: '2026-10-13T01:52:00',
    time: '01:52 AM',
    html: '<p>If the memory is what an agent both reads and writes, the agent ends up checking its own homework. The record of what you asked for has to sit outside the thing being checked. A checkbook does not let the spender edit the budget.</p>',
  },
  {
    id: '2026-09-30-0231',
    date: '2026-09-30T02:31:00',
    time: '02:31 AM',
    html: '<p>Got rejected by five startup programs in 44 days. South Park Commons, Y Combinator, Speedrun, 500 Global, and Emergent Ventures (they filed me as #92618, like a parcel). The last two came 24 hours apart. Emergent wrote “we are sorry to inform you,” which is polite and also the worst way to hear it because you cannot even get properly angry at that. Closed the tab, stared at the ceiling for a while, and went back to work.</p>',
  },
  {
    id: '2026-09-24-0139',
    date: '2026-09-24T01:39:00',
    time: '01:39 AM',
    html: '<p>Pulled my last seven posts. Six sat at three to five likes. Same account that did 121,000 views in August on a post where I admitted I had no benchmark and was not sure the theory held up. Nobody argues with a polished summary; they scroll past it like an ad.</p>',
  },
  {
    id: '2026-08-25-0148',
    date: '2026-08-25T01:48:00',
    time: '01:48 AM',
    html: '<p>Wrote a rule banning myself from opening the code editor before noon because “building in silence” was just my excuse to avoid distribution. Turns out refactoring the backend is socially acceptable procrastination.</p>',
  },
  {
    id: '2026-08-21-0218',
    date: '2026-08-21T02:18:00',
    time: '02:18 AM',
    html: '<p>We were the first batch of our college in Jaipur. Unfinished buildings, no hostels, no seniors to ask. I spent almost the entire first year complaining about it before it finally landed that complaining would not change a single brick on that campus, and only working on myself would.</p>',
  },
];
