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
  { title: 'Build a Large Language Model (From Scratch)', author: 'Sebastian Raschka' },
  { title: 'AI Engineering', author: 'Chip Huyen' },
  { title: 'LLM Engineer’s Handbook', author: 'Paul Iusztin & Maxime Labonne' },
];

export const PREVIOUSLY_READ: Book[] = [
  { title: 'The Almanack of Naval Ravikant', author: 'Eric Jorgenson' },
  { title: 'Poor Charlie’s Almanack', author: 'Charles T. Munger' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' },
  { title: 'Thinking in Bets', author: 'Annie Duke' },
  { title: 'Clear Thinking', author: 'Shane Parrish' },
  { title: 'The Mom Test', author: 'Rob Fitzpatrick' },
  { title: 'Obviously Awesome', author: 'April Dunford' },
  { title: 'The Lean Startup', author: 'Eric Ries' },
  { title: 'Hacking Growth', author: 'Sean Ellis & Morgan Brown' },
  { title: '$100M Offers', author: 'Alex Hormozi' },
  { title: 'Hooked', author: 'Nir Eyal' },
  { title: 'Atomic Habits', author: 'James Clear' },
  { title: 'Influence', author: 'Robert B. Cialdini' },
  { title: 'Venture Deals', author: 'Brad Feld & Jason Mendelson' },
  { title: '48 Laws of Power', author: 'Robert Greene' },
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
    summary: 'Building a single work record for career search and progression',
    steps: [
      { label: 'Private beta and messaging critic', state: 'done' },
      {
        label: 'Building a single work record for career search and progression',
        state: 'active',
      },
      { label: 'User conversations and distribution', state: 'next' },
    ],
  },
  {
    id: 'llms',
    title: 'LLMs from scratch',
    horizon: 'Week 1',
    state: 'active',
    summary: 'Week 1 · Neural networks and backpropagation from blank files',
    steps: [
      {
        label: 'Week 1 · Neural networks and backpropagation from blank files',
        state: 'active',
      },
      { label: 'Transformers, tokenization, and attention in PyTorch', state: 'next' },
      { label: 'Pretraining and evaluation from scratch', state: 'next' },
    ],
  },
  {
    id: 'reading',
    title: 'Reading',
    horizon: `${CURRENTLY_READING.length} active`,
    state: 'active',
    summary: CURRENTLY_READING.map((b) => b.title).join(', '),
    steps: [
      { label: `${PREVIOUSLY_READ.length} books read`, state: 'done' },
      { label: CURRENTLY_READING.map((b) => b.title).join(', '), state: 'active' },
    ],
  },
];
