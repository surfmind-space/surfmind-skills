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

Match the depth to the content and to what the user asked for. By default, explain thoroughly: lead with the core idea, then use sections, examples, and analogies as needed to make a dense or multi-part topic genuinely clear. Detailed and well-organized explanations are good when they aid understanding. Only compress to a sentence or two when the user explicitly asks for a short, brief, or quick explanation (or a TL;DR). Whatever the length, keep the writing clear, focused, and easy to follow, with concrete examples. Add depth that aids understanding, never filler.

Respond in the user's language, which is not necessarily the language of the content. When the user has written a request, match the language they wrote in. When the skill is invoked directly on selected content with no message to infer the language from, call the `get_user_language` tool and reply in the language it returns. Do not default to the content's language.

## Examples

A simple term can be covered briefly when that's all it needs:

**Source:** "backpressure"

**Explanation:** "Backpressure is when a system that's receiving data faster than it can handle it pushes back on the sender to slow down, instead of piling up work it can't keep up with. Think of a checkout line: rather than letting an endless crowd shove items onto the belt, the cashier holds people back until they've scanned what's already there. In software it keeps a fast producer from overwhelming a slower consumer and running it out of memory."

A denser snippet warrants a fuller, structured walkthrough:

**Source:** "The function memoizes results in a WeakMap keyed by the argument object."

**Explanation:** "It remembers results it has already computed so it doesn't redo the work. It keeps them in a *WeakMap*, a lookup table keyed by the object you passed in. 'Weak' means that once that object is no longer used anywhere else, its cached entry can be cleared automatically, so the cache doesn't leak memory."

Both stay clear and focused with a concrete example. Let the topic's complexity and the user's request, not a fixed length, decide whether the answer is a few sentences or several sections.
