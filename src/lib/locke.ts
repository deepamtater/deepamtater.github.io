/**
 * John Locke's commonplace-book index (1706): every head is filed under its
 * first letter and the first vowel that follows it. Twenty letters, because
 * I/J, U/V are one letter and K, X, Y, Z are folded into their neighbours.
 */
export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W'] as const;
export const VOWELS = ['a', 'e', 'i', 'o', 'u'] as const;

export type Letter = (typeof LETTERS)[number];
export type Vowel = (typeof VOWELS)[number];

const FOLD: Record<string, Letter> = { J: 'I', K: 'C', V: 'U', X: 'S', Y: 'I', Z: 'S' };

export function lockeKey(head: string): { letter: Letter; vowel: Vowel } {
  const word = head.toLowerCase().replace(/[^a-z]/g, '');
  const first = word.charAt(0).toUpperCase();
  const letter = (FOLD[first] ?? first) as Letter;
  const vowel = ([...word.slice(1)].find((c) => VOWELS.includes(c as Vowel)) ?? 'a') as Vowel;
  return { letter, vowel };
}

export interface Head {
  label: string;
  href: string;
  /** Number of published entries; omit for heads that are pages, not collections. */
  count?: number;
}

export interface IndexedHead extends Head {
  letter: Letter;
  vowel: Vowel;
  col: number;
  row: number;
}

export const indexHeads = (heads: Head[]): IndexedHead[] =>
  heads.map((head) => {
    const { letter, vowel } = lockeKey(head.label);
    return { ...head, letter, vowel, col: LETTERS.indexOf(letter), row: VOWELS.indexOf(vowel) };
  });
