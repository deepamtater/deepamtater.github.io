// Code colours drawn from the site palette: ink text, blue keywords,
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

export const paperLight = theme('klein-porcelain', 'light', {
  bg: '#eff2f8',
  ink: '#0b1220',
  ink2: '#3b4a66',
  muted: '#656d7f',
  accent: '#0040e6',
});

export const paperDark = theme('prussian-night', 'dark', {
  bg: '#141f35',
  ink: '#e6eef8',
  ink2: '#a9c1e6',
  muted: '#8b96a9',
  accent: '#7aa6ff',
});
