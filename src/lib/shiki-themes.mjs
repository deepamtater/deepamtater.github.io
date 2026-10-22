// Code colours drawn from the site palette: ink text, persimmon keywords,
// muted comments and punctuation, a softer ink for strings.
const theme = (name, type, c) => ({
  name,
  type,
  colors: { 'editor.background': c.bg, 'editor.foreground': c.ink },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: c.muted, fontStyle: 'italic' } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control', 'constant.language', 'constant.numeric'],
      settings: { foreground: c.accent },
    },
    { scope: ['string', 'string.quoted', 'string.template', 'markup.inline.raw'], settings: { foreground: c.ink2 } },
    { scope: ['punctuation', 'keyword.operator', 'meta.brace'], settings: { foreground: c.muted } },
    { scope: ['entity.name.function', 'support.function', 'variable', 'entity.name.type', 'support.type'], settings: { foreground: c.ink } },
  ],
});

export const paperLight = theme('paper-light', 'light', {
  bg: '#ece5d7',
  ink: '#211a15',
  ink2: '#5d4a3c',
  muted: '#6c6156',
  accent: '#b53d0d',
});

export const paperDark = theme('paper-dark', 'dark', {
  bg: '#221b16',
  ink: '#efe6d7',
  ink2: '#d2b9a0',
  muted: '#a3978a',
  accent: '#f2845a',
});
