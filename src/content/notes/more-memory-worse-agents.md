---
title: More Memory, Worse Agents
date: 2026-10-22
summary: Why agents that save their own advice repeat their own mistakes, and why raw examples beat vague rules.
tags: [engineering]
draft: false
---

I've used one LLM to make a strategy and then cross checked it with another LLM.

I'd want that second model to work from the original problem. If it starts with the first model's reasoning, it can end up repeating the same assumptions.

In *More Memory, Worse Agents*, a Llama-4-Scout agent did better when it discarded its own advice after use. 54.7% success vs 26.7% when it stored the advice for later. 134 ALFWorld test tasks, averages over 3 seeds. Both versions used advice for the current task.

Like a bad rule affects what the agent does next, and later those actions become the input for new advice. The researchers suggest the same mistake can come back that way without the agent reading the original rule again.

For an AI checking drafts, I'd keep the sentence the reader disliked with the correction. If the saved advice says "make it sound human", what exactly was wrong with the line? Then try the correction on another draft and see if a reader agrees.

Their alternative keeps action records but throws away the advice after use. Those records can still carry errors. Months of use weren't tested.
