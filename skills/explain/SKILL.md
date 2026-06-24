---
name: explain
description: Explains selected or visible content in plain language, including the core idea, jargon, and background, while researching further when the page falls short and staying evidence-backed. Use when the user says "explain this", "what does this mean", "simplify", "break this down", "ELI5", or "help me understand" about highlighted text, code, or on-screen content.
metadata:
  author: surfmind
  icon: BookMarked
  tags:
    - research
    - learning
---

# Explain

Explain the selected or visible content so the reader can understand it without prior expertise, accurately and evidence-backed. Never invent details or fill gaps with made-up facts.

1. Base the explanation on the selected or visible page content. State the core idea in one or two plain sentences, define any jargon, and add the background that makes it make sense.
2. If the page lacks the context needed to explain it well, gather more: use web search or any suitable MCP/tool available to research the topic, then explain from what you find.
3. If web search is disabled and no suitable tool is available, explain what the content supports and clearly note what couldn't be verified.

Calibrate depth to how much the content actually holds, not to a fixed length. Look at how many distinct ideas the source contains and match the explanation to that:

- **A single self-contained term or one simple idea** → keep it tight: the plain-language definition, the bit of background that makes it click, and one example or analogy. A few short paragraphs (or one flowing passage) is usually enough. Don't expand it into a multi-section reference — no heading-per-aspect, no exhaustive tables, no etymology or tangents the reader didn't ask for. One good example makes the point; don't enumerate every variant or related case (e.g. for a term illustrated by one HTTP method, don't catalogue all of them).
- **A dense, layered, or multi-part source** (a code snippet with several moving parts, a formula and its implications, a passage stacking multiple concepts) → go fuller: lead with the core idea, then use sections, examples, and analogies to make each part genuinely clear.

Detailed, multi-section explanations are good when the material is genuinely that involved, and miscalibrated when it isn't — a long answer to a one-term question is a defect, not thoroughness. Compress to a sentence or two only when the user explicitly asks for a short, brief, or quick explanation (or a TL;DR). Whatever the length, keep the writing clear and easy to follow, and make every part earn its place: depth that aids understanding, never filler, padding, or restating the same point.

## Examples

A simple term can be covered briefly when that's all it needs:

**Source:** "backpressure"

**Explanation:** "Backpressure is when a system that's receiving data faster than it can handle it pushes back on the sender to slow down, instead of piling up work it can't keep up with. Think of a checkout line: rather than letting an endless crowd shove items onto the belt, the cashier holds people back until they've scanned what's already there. In software it keeps a fast producer from overwhelming a slower consumer and running it out of memory."

A denser snippet warrants a fuller, structured walkthrough:

**Source:** "The function memoizes results in a WeakMap keyed by the argument object."

**Explanation:** "It remembers results it has already computed so it doesn't redo the work. It keeps them in a _WeakMap_, a lookup table keyed by the object you passed in. 'Weak' means that once that object is no longer used anywhere else, its cached entry can be cleared automatically, so the cache doesn't leak memory."

Both stay clear and focused with a concrete example. Let the topic's complexity and the user's request, not a fixed length, decide whether the answer is a few sentences or several sections.
