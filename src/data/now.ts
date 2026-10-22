export type StepState = 'done' | 'active' | 'next';

export interface GoalStep {
  label: string;
  state: StepState;
}

export interface Goal {
  id: string;
  title: string;
  horizon?: string;
  state: 'active' | 'queued' | 'done';
  steps: GoalStep[];
}

/**
 * Edit this list to update the homepage progress rail and /now/.
 * Mark completed steps 'done', the current frontier step 'active', and future steps 'next'.
 */
export const GOALS: Goal[] = [
  {
    id: 'writing',
    title: 'Writing in public',
    horizon: 'Q4 2026',
    state: 'active',
    steps: [
      { label: 'Ship minimal Astro site on GitHub Pages', state: 'done' },
      { label: 'Settle typography, palette, and 2AM ledger', state: 'done' },
      { label: 'Draft first essay on quiet, durable software', state: 'active' },
      { label: 'Publish ten weekly engineering and book notes', state: 'next' },
    ],
  },
  {
    id: 'engineering',
    title: 'Small, dependable systems',
    horizon: 'Ongoing',
    state: 'active',
    steps: [
      { label: 'Move background queues and locks onto Postgres', state: 'done' },
      { label: 'Profile tail latency and strip unnecessary dependencies', state: 'active' },
      { label: 'Write up production post-mortems as field notes', state: 'next' },
    ],
  },
  {
    id: 'reading',
    title: 'Reading & margin notes',
    horizon: '2026',
    state: 'active',
    steps: [
      { label: 'The Art of Doing Science and Engineering — Hamming', state: 'done' },
      { label: 'Designing Data-Intensive Applications — Kleppmann', state: 'done' },
      { label: 'A Philosophy of Software Design — Ousterhout', state: 'active' },
      { label: 'Working in Public — Nadia Eghbal', state: 'next' },
    ],
  },
];
