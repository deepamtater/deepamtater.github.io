export interface Book {
  title: string;
  author: string;
}

export interface NowSection {
  id: string;
  label: string;
  title: string;
  note?: string;
  text: string;
  href?: string;
}

export interface PreviouslyArchive {
  /**
   * Completed LLM roadmap weeks or study milestones.
   * Example when moving to Week 2:
   * studied: ['Week 1 · Neural networks and backpropagation by hand from blank files.'],
   */
  studied: string[];
  /** Completed product or engineering milestones. */
  built: string[];
  /** Finished books. */
  read: Book[];
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

export const PREVIOUSLY: PreviouslyArchive = {
  studied: [],
  built: [],
  read: PREVIOUSLY_READ,
};

export const NOW_SECTIONS: NowSection[] = [
  {
    id: 'building',
    label: 'Building',
    title: 'Puvio',
    href: 'https://puvio.app',
    text: 'Puvio, a single place to keep a record of your work and use it to land roles or move up.',
  },
  {
    id: 'llms',
    label: 'Studying',
    title: 'Everything about LLMs, from A to Z',
    note: 'Week 1',
    text: 'Coding neural networks and backpropagation by hand from blank files, without AI autocomplete.',
  },
  {
    id: 'reading',
    label: 'Reading',
    title: 'Reading',
    text: CURRENTLY_READING.map((b) => `${b.title} (${b.author})`).join(' and '),
  },
];
