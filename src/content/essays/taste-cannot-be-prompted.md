---
title: Taste Cannot Be Prompted
date: 2026-10-01
summary: Generation produces false positives. Killing a weak draft is judgment, and judgment is the layer generation never gives you.
tags: [startups, engineering]
draft: false
---

Vamsi said taste cannot be prompted. Taste is noticing, curating, creating, refining, knowing what to remove.

I built a matcher-generator pipeline. Retrieval first: match a work record against a role, research the company and contacts. Generation pass: draft a note on that record. Scale it. Retrieval works. Generation works. But something breaks. The draft reads fluent and on-topic, with their name in it, and users still said the message "looks AI-generated and kind of AI-slop."

That's the pivot. Generation produces false positives. Lots of them. The retrieval will match a profile, the model will draft a coherent message, the system will fire it, and it lands in a folder of similar noise because the semantic distance between the record context and the generated text is still wide enough to signal generic. Fluent output is the average output by default. A human feels it in two seconds. A system learns it the hard way, through bounces and churn.

So I rebuilt it. Research the company and person and background first. Draft. Then a critic scores the draft against that research and regenerates it if the score is under threshold. Killing a message is judgment, and judgment is the layer generation doesn't give you.

The critic only knows what I wrote into it. So its taste is mine, frozen at the last time I edited it. The user still presses send. Nothing goes out on its own.

The real layer is judgment. Not better generation. Not a bigger model. Not retrieval scale. The layer that looks at a draft and says "this one dies." That's the filter that compounds.

Everyone's chasing generation fidelity. Almost nobody's shipping the deletion logic that makes it land. That's where the work lives.
