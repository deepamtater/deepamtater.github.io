---
# SAMPLE POST — placeholder content. Replace or delete.
title: Code Is a Liability, Judgment Is the Asset
date: 2025-11-03
summary: Every line we ship is something we'll have to read, test, and defend later. What changes when you start treating code as a cost instead of an output.
tags: [engineering, startups]
draft: false
---

_Sample essay — placeholder content to demonstrate the layout. Replace or delete this file._

Early in my career I measured a good week by how much I'd written. It took me an embarrassingly long time to notice that my best weeks, measured by what actually improved for users, often involved deleting more than I added.

## The ledger nobody keeps

Code shows up on the asset side of our mental ledger. We point at it, demo it, count it. But a line of code is closer to a loan than a deposit. It accrues interest in the form of reading time, test time, migration time, and the slow tax of everyone having to keep it in their head.

That doesn't mean we should write less code for its own sake. It means the decision to write code deserves the same scrutiny as any other spending decision. The question isn't _can we build this_; it's _is this worth carrying for years_.

## What judgment looks like in practice

A few habits that have served me well:

1. **Ask what happens if we don't.** Surprisingly often, the honest answer is "nothing much."
2. **Prefer boring dependencies.** A library with a decade of bug reports is a library whose bugs are known.
3. **Delete on a schedule.** Feature flags, dead endpoints, and "temporary" scripts all have a half-life. Treat cleanup as real work.

Here is the smallest version of the idea, the one I write on whiteboards:

```ts
// The cheapest code to maintain is the code you didn't write.
function shouldBuild(feature: Idea): boolean {
  return feature.userPain > feature.carryingCost;
}
```

## The point

Software engineering is mostly a discipline of saying no well. The output is a working system; the code is just the cost of getting there. Teams that internalize this tend to move faster, not slower, because they spend less time paying interest on decisions they never needed to make.
