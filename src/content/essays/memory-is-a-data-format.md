---
title: Memory Is a Data Format, Not a Middleware Pipeline
date: 2026-09-01
summary: Why adding a graph database makes agents slower and worse at reasoning, and why flat Markdown files with a local SQLite index win.
tags: [engineering]
draft: false
---

Every time an AI team adds a graph database to give their agent long-term memory, the agent gets slower and worse at reasoning.

The standard enterprise stack has become absurd: pgvector for embeddings, Neo4j for relationships, and an extra LLM just to decide what gets saved.

When you force an agent to walk a knowledge graph, finding a fact nested three hops away requires four sequential tool calls. Every model call takes 2 to 3 seconds. That single lookup burns 9 seconds of dead latency before the agent writes a single word.

Graph traversal also forces the agent to guess relevance from node titles alone. If a title misses the keyword, the agent either misses the page entirely or dumps irrelevant index nodes into its context window. That extra token noise degrades the final answer.

The architecture that actually works is vastly simpler: flat Markdown files in a folder, paired with a local SQLite vector cache.

Agents are trained on Markdown, Bash, and SQL natively. When you store memories as short prose files under 2,000 tokens with YAML frontmatter, the agent needs exactly two tool calls:

1. One semantic search query against the local SQLite index.
2. One parallel read of the matching Markdown files.

Full context stays intact, zero intermediate triage models are required, and retrieval runs in parallel.

Memory is a data format, not a five-layer middleware pipeline.
