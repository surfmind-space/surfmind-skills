---
name: fact-check
description: Extracts factual claims from selected text or a page and checks each against the visible context and available sources, flagging what is supported, weakened, contradicted, or still unverified. Use when the user says "fact check this", "verify", "is this true", "check the sources", or asks about a page's accuracy, credibility, or possible misinformation.
metadata:
  author: surfmind
  icon: CheckCheck
  tags:
    - research
---

# Fact Check

Pull the factual claims out of the page and check each against the visible context and available sources. Never invent facts, quotes, numbers, or sources, present a guess as established, or overclaim what the evidence actually supports.

1. Extract concrete, checkable claims from the selected or visible content. Skip pure opinions unless they imply facts, and watch for cited sources, links, dates, and numbers that a claim should trace to.
2. Check each claim against the visible context, its cited sources, and any web search or MCP/tool results available. Prefer primary and official sources when a claim affects money, health, legal, safety, or reputation decisions.
3. Classify each claim: **supported, weakly supported, unsupported, contradicted, or needs more evidence.** If a claim is ambiguous (a date that conflates two events, a word like "all" or "always" that may overstate), split it or mark it weakly supported rather than forcing a clean verdict.
4. When support is incomplete, say what is missing and what evidence would change the verdict.

Report each claim with its **Status, Evidence used, Reasoning,** and what to **verify next.** Preserve exact names, numbers, links, dates, and currencies, and don't let a single low-quality source settle a claim on its own.

## Example

Page text: "The EU AI Act took effect in 2024 and bans all facial recognition."

> **Claim:** The EU AI Act took effect in 2024.
> **Status:** Weakly supported
> **Evidence used:** The page shows a 2024 date but blurs the entry into force date with the later phased application dates.
> **Reasoning:** The Act entered into force in 2024, yet most obligations apply later, so "took effect" is only partly accurate.
> **Verify next:** The official EU legislation timeline for when each obligation starts to apply.
>
> **Claim:** The EU AI Act bans all facial recognition.
> **Status:** Contradicted
> **Evidence used:** No source on the page supports a blanket ban; the linked summary lists narrow exceptions.
> **Reasoning:** The Act restricts specific real-time biometric uses rather than banning all facial recognition, so "all" overstates it.
> **Verify next:** The exact prohibited and high-risk categories in the primary text.
