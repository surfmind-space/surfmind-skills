---
name: social-post-generator
description: Turns a page, article, or product update into platform-ready social posts — Twitter/X threads, LinkedIn posts, and short captions with clear hooks, takeaways, and calls to action. Use when the user wants to repurpose content into social media, draft a tweet or thread, or write a LinkedIn or announcement post.
metadata:
  author: surfmind
  icon: Sparkles
  tags:
    - content
    - marketing
    - writing
---

# Social Post Generator

Turns a page, article, or product update into ready-to-post social content — platform-appropriate variants with a clear hook, core point, and call to action, all grounded in the source.

1. Identify platform, audience, goal, and constraints from the selection, request, and source.
2. Extract only supported claims, concrete takeaways, and useful context.
3. Create variants with different angles: educational, concise, opinionated, announcement, or story-driven.
4. Label every variant with both platform and angle, such as `Twitter/X — Concise` or `LinkedIn — Educational`, so options stay scannable.
5. Fit each variant to its platform's norms — Twitter/X posts under 280 characters unless explicitly formatted as a numbered thread, LinkedIn in short scannable paragraphs — without forcing hashtags or emojis.
6. Before finalizing, check every Twitter/X standalone post against the 280-character limit and shorten any variant that exceeds it.

Return the post variants labeled by platform and angle, then the best use case for each and any claims to verify against the source. Be specific without overclaiming, preserve important names, numbers, and links, and do not exaggerate for engagement or imply results the source does not support. Do not invent anecdotes, internal observations, usage frequency, time saved, focus impact, or quantified benefits unless the source states them; if a story-style angle would help, frame it with source-backed facts or clearly mark missing proof. If the visible context is insufficient, say what is missing and give the best supported next step.

## Example

Source excerpt: "Our new caching layer cut median API latency from 480ms to 110ms across the dashboard."

- **Twitter/X — Concise:** "We cut median dashboard API latency from 480ms to 110ms. The fix wasn't a faster server — it was a caching layer in front of the slow paths. Here's what changed."
- **LinkedIn — Practitioner:** "Latency is a feature.\n\nOur dashboard's median API response just dropped from 480ms to 110ms.\n\nThe change: a caching layer in front of the heaviest read paths, not new hardware.\n\nHappy to share how we picked what to cache."
- **Best use case:** Twitter/X for the punchy result and thread hook; LinkedIn for the practitioner audience that wants the reasoning.
- **Claims to verify:** The "480ms → 110ms" numbers and that they're medians, not averages — confirm against the source before posting.
