---
name: regex-decoder
description: Breaks a regular expression down into plain-language parts with examples of what it matches and what it rejects. Use when the user asks to explain, decode, or understand a regex, regexp, or pattern — "what does this regex match", "explain this pattern", a .match/.test call.
metadata:
  author: surfmind
  icon: Code
  tags:
    - code
    - learning
---

# Regex Decoder

Break a regular expression down into plain-language parts so the user understands exactly what it accepts and rejects. Work only from the pattern and flags given; don't assume a feature works in every engine, and don't rewrite the pattern without preserving its behavior.

1. Identify the regex flavor if visible (JavaScript, Python, PCRE, RE2, Rust, POSIX) and any flags, since they change meaning.
2. Break the pattern into ordered pieces — each anchor, character class, quantifier, group, and literal as its own piece — and explain each in plain language.
3. Give a couple of strings it matches and a couple it rejects, including a near-miss that shows where the boundary is.
4. Call out edge cases that bite people: anchoring, greediness, escaping, capture vs. non-capture groups, Unicode behavior, and catastrophic-backtracking risk when relevant.

Return concise headings and include these sections when they fit: **Plain-English summary**, **Piece by piece**, **Matches / Rejects**, **Edge cases**, **Safer rewrite** (only if it preserves behavior). If the pattern is ambiguous or the flavor is unknown, say so and explain the most common interpretation. Respond in the same language as the user's request.

## Example

Pattern (JavaScript): `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

> **Plain-English summary:** A loose email check — local part, then `@`, then a domain ending in a dot and at least two letters.
>
> **Piece by piece:**
> - `^` — anchors to the start of the string.
> - `[a-zA-Z0-9._%+-]+` — one or more letters, digits, or `. _ % + -` (the local part).
> - `@` — a literal at-sign.
> - `[a-zA-Z0-9.-]+` — one or more letters, digits, dots, or hyphens (the domain).
> - `\.` — a literal dot (escaped, so not "any character").
> - `[a-zA-Z]{2,}` — two or more letters (the TLD).
> - `$` — anchors to the end of the string.
>
> **Matches:** `a@b.io`, `jane.doe+test@mail.example.com`
>
> **Rejects:** `a@b.c` (TLD too short), `no-at-sign.com` (no `@`), ` a@b.io` (leading space — anchors forbid it).
>
> **Edge cases:** Anchors mean the *whole* string must match, so surrounding whitespace fails. It accepts plenty of invalid addresses (`a@-.io`, consecutive dots) — fine for a form hint, not for true validation.
