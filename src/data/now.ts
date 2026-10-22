export type StepState = 'done' | 'active' | 'next';

export interface GoalStep {
  label: string;
  state: StepState;
}

export interface Book {
  title: string;
  author: string;
}

export interface Goal {
  id: string;
  title: string;
  horizon?: string;
  href?: string;
  state: 'active' | 'queued' | 'done';
  summary: string;
  steps: GoalStep[];
}

export const CURRENTLY_READING: Book[] = [
  { title: 'Zero to One', author: 'Peter Thiel' },
  { title: 'LLM Engineer’s Handbook', author: 'Paul Iusztin & Maxime Labonne' },
];

export const PREVIOUSLY_READ: Book[] = [
  { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson' },
  { title: 'The Psychology of Money', author: 'Morgan Housel' },
  { title: 'Hooked', author: 'Nir Eyal' },
  { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie' },
  { title: 'Think and Grow Rich', author: 'Napoleon Hill' },
];

export const GOALS: Goal[] = [
  {
    id: 'puvio',
    title: 'Puvio',
    horizon: 'puvio.app',
    href: 'https://puvio.app',
    state: 'active',
    summary: 'Building a single work record for career search and progression.',
    steps: [
      { label: 'Private beta and messaging critic', state: 'done' },
      {
        label: 'Building a single work record for career search and progression.',
        state: 'active',
      },
      { label: 'User conversations and distribution', state: 'next' },
    ],
  },
  {
    id: 'llms',
    title: 'Everything about LLMs, from A to Z',
    horizon: 'Week 1',
    state: 'active',
    summary:
      'Week 1 · Rebuilding the stack from blank files, starting with raw neural nets and backpropagation.',
    steps: [
      {
        label:
          'Week 1 · Rebuilding the stack from blank files, starting with raw neural nets and backpropagation.',
        state: 'active',
      },
    ],
  },
  {
    id: 'reading',
    title: 'Reading',
    horizon: '2 open',
    state: 'active',
    summary: CURRENTLY_READING.map((b) => b.title).join(' · '),
    steps: [
      { label: `${PREVIOUSLY_READ.length} read`, state: 'done' },
      { label: CURRENTLY_READING.map((b) => b.title).join(' · '), state: 'active' },
    ],
  },
];
