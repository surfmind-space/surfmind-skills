---
name: style-match
description: Rewrites, rephrases, and adapts text to match the tone, voice, sentence structure, vocabulary, and formatting of a reference example while preserving meaning and facts. Use when the user asks to match a writing style, mimic a voice, copy a tone, or write like a provided sample.
metadata:
  author: surfmind
  icon: Highlighter
  tags:
    - writing
    - communication
---

# Style Match

Learn the style traits of a reference example, then rewrite the target text to match them while keeping the meaning and facts intact.

1. Identify the style traits in the example: tone, sentence length and rhythm, vocabulary level, formality, structure, and formatting.
2. Rewrite the target text to match those traits without copying the example's unique phrases verbatim.
3. Preserve factual meaning, names, numbers, links, code, dates, and any user constraints exactly — never bend a fact to fit the style.
4. Keep the output in the same language unless the user asks otherwise. Do not imitate a living writer or private person in a way that implies exact identity mimicry.
5. Before presenting, check the rewrite against the example's traits and against the source facts.

Return the **Rewritten text** first, then **Matched style traits** noting the specific traits you applied. If the example or target text is missing, say what you need and provide the best supported next step.

## Example

Style reference (the user's marketing blog):

> We don't do "synergy." We ship things, watch what breaks, and fix it before you notice. Short loops, real users, no theater.

Target text to rewrite:

> Our development methodology leverages iterative agile sprints to maximize stakeholder alignment and deliver continuous value through rigorous feedback cycles.

Rewritten text:

> We work in short sprints. We put each change in front of real users fast, learn from what they actually do, and keep tightening. No process for its own sake.

Matched style traits: short punchy sentences, first-person plural, plain anti-jargon voice, concrete over abstract, dismissive aside toward corporate-speak.
