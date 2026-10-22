export interface InlineThought {
  id: string;
  date: string;
  time: string;
  html: string;
}

/**
 * Append a quick 2AM thought here (or add a Markdown file in src/content/thoughts/).
 */
export const THOUGHTS: InlineThought[] = [];
