---
title: Verified Proofs Without Human Understanding
date: 2026-10-19
summary: Passing a test suite is cheap to automate. Understanding what the system actually did is still the bottleneck.
tags: [engineering, reading]
draft: false
---

Read this guest essay on Terence Tao's blog yesterday by Francesco Maggi and it ruined my sleep a bit.

Models are writing proofs in Lean now. Lean is just software that checks logic line by line against axioms. For the hard problems, the code ends up being hundreds of thousands of lines long. The machine checks every line and says yup, totally valid.

Then researchers ask the model to translate that massive Lean proof into plain English so a human mathematician can actually read it. And the translation is a complete mess.

So you end up with a verified proof where the computer knows it is true, but zero humans can actually understand what the proof is doing or why it works.

I keep running into this with evals and agent workflows. It is getting very cheap to make a model pass a unit test or return valid JSON that clears a schema check. But when the prompt chain took 40 weird steps to get there, a green checkmark does not mean anything is understood.

You just handed yourself a black box that passes CI. The second edge cases hit in production, nobody has any idea how to fix it because nobody understood the logic in the first place.

Passing a test is easy to automate. Understanding what you actually built is still the bottleneck.
