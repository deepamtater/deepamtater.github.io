---
title: You Are Not Paying AI Labs to Write Code
date: 2026-09-19
summary: 88.5% of tokens billed in an average coding session go to re-reading past conversation history. Only 1.2% goes to generating the answer.
tags: [engineering, startups]
draft: false
---

You are not paying AI labs to write code. You are paying them to re-read your own typos.

88.5% of the tokens billed across an average coding session go to re-reading past conversation history. Only 1.2% goes to generating the actual answer.

Whenever an API bill spikes, developers blame model pricing. The real problem is basic transformer architecture. Because attention over a conversation is non-stateful, every time you hit send, the model re-ingests your entire conversation from turn one.

The accumulation math is quadratic.

If an average question and answer takes 500 tokens, a ten-turn chat burns 27,500 tokens. By turn thirty, that cumulative total explodes to 232,500 tokens. By the end of an hour, you are re-reading 15,000 tokens of past history just to ask a 20-word follow-up.

Then there is the PDF penalty.

Anthropic's official documentation notes that Claude's document chat rasterizes each PDF page into visual tiles, consuming approximately 2,333 tokens per page. The exact same text in plain markdown takes under 200 tokens. Dropping a five-page PDF into an agent thread burns 11,000 tokens before you type a single instruction.

The most expensive habit is the conversational correction loop.

When a model outputs bad code and you reply with "No, that broke the import," that failed patch, your complaint, and its polite apology live in context forever. The model re-reads that mistake on every subsequent turn.

Clicking edit on your previous prompt truncates the tree and deletes the dead weight. Almost nobody does it because arguing in the chat box feels natural.

Two-million-token context windows are sold as an engineering milestone. In practice, they are a great way to bill you 100,000 tokens to re-read things you wrote forty minutes ago.

Honestly just kill the thread and start fresh. Paying $4 to watch a model re-read your own bad prompts from 40 mins ago is just painful lol.
