// Neutral code colours to match the site: no hue, just ink, weight and grey.
const theme = (name, type, c) => ({
  name,
  type,
  colors: { 'editor.background': c.bg, 'editor.foreground': c.ink },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.muted, fontStyle: 'italic' } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'constant.language'],
      settings: { foreground: c.ink, fontStyle: 'bold' },
    },
    { scope: ['string', 'string.quoted', 'string.template', 'constant.numeric', 'markup.inline.raw'], settings: { foreground: c.soft } },
    { scope: ['punctuation', 'keyword.operator', 'meta.brace'], settings: { foreground: c.muted } },
    { scope: ['entity.name.function', 'support.function', 'variable', 'entity.name.type', 'support.type'], settings: { foreground: c.ink } },
  ],
});

export const paperLight = theme('neutral-light', 'light', {
  bg: '#f4f4f4',
  ink: '#000000',
  soft: '#4c4c4c',
  muted: '#686765',
});

export const paperDark = theme('neutral-dark', 'dark', {
  bg: '#28292b',
  ink: '#ffffff',
  soft: '#cccccc',
  muted: '#a5a5a6',
});
