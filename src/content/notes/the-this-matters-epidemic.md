---
title: Penalizing Em Dashes Created the "This Matters" Habit
date: 2026-10-02
summary: When frontier labs penalize a surface punctuation tell, the model routes around the penalty and reaches for importance markers instead.
tags: [engineering, reading]
draft: false
---

Claude Opus 5.5 uses the phrase "this matters" 116 times more often than human writers. "Why X matters" shows up 92 times more often.

The frontier labs solved the em dash problem. In Graphite's study of 10,000 articles, Opus 5.5 cut em dashes by 99% compared to Opus 5. Astra cut them by 88%. Gemini 3.1 Pro stopped using them entirely.

The punctuation disappeared, but the underlying habit stayed intact.

Every time a lab penalizes a surface tell, the policy network routes around the penalty.

I see this constantly while testing our critic pass on cold outreach notes. A builder writes forty negative prompt rules. You ban em dashes and you ban adjectives like groundbreaking. The model complies, but the optimization pressure never changes. The model still wants to simulate authority.

When you take away the formatting crutches, it reaches for importance markers. It writes a flat paragraph, panics that it sounds flat, and tells you why it matters.
