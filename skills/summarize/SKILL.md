---
name: summarize
description: Creates a summary that adapts to the source, such as an article, email thread, chat, PDF, document, image, or transcript, while surfacing the key points, decisions, and takeaways. Use when the user says "summarize", "TLDR", "key points", "recap", "overview", or "condense this".
metadata:
  author: surfmind
  icon: ScrollText
  tags:
    - research
---

# Summarize

Produce a summary that fits the source. There is no single template: first pick the source, then detect what kind of content it is and shape the summary to match.

## 1. Choose the source

Priority order: **selected text, then an attached file, PDF, or image, then the visible page content.** Summarize only what is actually present. Never invent details, quotes, numbers, names, dates, or outcomes that are not in the source. If the context is incomplete or truncated, summarize what is available and note the gap.

## 2. Adapt to the content type

| Content type                        | Capture                                                                 | Shape the output as                                                |
| ----------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Article / blog / web page           | Thesis, main arguments, supporting evidence, conclusion                 | One-line TL;DR + three to six bullets                              |
| Documentation / reference           | What it's for, key steps or APIs, caveats                               | Short bullets grouped by topic                                     |
| Email thread                        | Participants, the ask, decisions, open questions, action items + owners | "Bottom line" line, then Decisions / Open questions / Action items |
| Chat / messaging conversation       | Who's talking, the topic, what was agreed, next steps                   | Topic-grouped bullets; keep the resolution explicit                |
| PDF / long document / report        | Purpose, section findings, recommendations                              | Headed sections or nested bullets                                  |
| Spreadsheet / data / table          | What it measures, notable totals, outliers, trends                      | Bullets, keeping key figures exact                                 |
| Image / screenshot / chart          | What it depicts, labels, the takeaway it conveys                        | One to three sentences; describe only what is visible              |
| Transcript (video / call / podcast) | Topic, key points per speaker or segment, conclusions, action items     | Bullets, optionally timestamped                                    |
| Code / PR / diff                    | What it does, notable changes, risks                                    | Bullets by change                                                  |

If the source doesn't match a listed pattern, infer the closest shape. Lead with the takeaway, then the supporting points.

## 3. Length and format

Scale to the source: a few sentences for something short, a tight bulleted brief for something long. Lead with the single most important takeaway. Prefer bullets for scannability; reserve flowing prose for very short sources. Preserve exact figures, dates, names, and decisions verbatim. It's a summary, not a rewrite. Stay concise.

## Example

Source: a long launch-planning email thread (selected text).

> **Bottom line:** Team agreed to ship the v2 dashboard on **July 9**, gated on the billing fix landing first.
>
> **Decisions**
>
> 1. Launch moved from July 2 to July 9 (Maria)
> 2. Marketing holds the blog post until QA signs off
>
> **Open questions**
>
> 1. Who owns the migration runbook? (raised by Sam, unanswered)
>
> **Action items**
>
> 1. Land billing fix by July 7: Alex
> 2. Full regression pass: Priya
