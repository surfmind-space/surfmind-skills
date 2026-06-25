---
name: draft-from-notes
description: Turns rough notes, bullet points, outlines, or copied fragments into a coherent draft (email, memo, post, report, or document section) while preserving facts and marking gaps instead of inventing detail. Use when the user shares notes or bullets and asks to "turn this into a draft", "write this up", "expand my bullets", "turn notes into prose", or "make a first draft".
metadata:
  author: surfmind
  icon: FileText
  tags:
    - writing
    - productivity
---

# Draft From Notes

Turn the user's notes, bullets, and copied fragments into a coherent first draft. Organize the pieces into a clear structure and write in a polished but natural voice. Never invent facts, names, numbers, dates, or quotes that are not in the notes. Where the notes are thin or a detail is unconfirmed, mark a placeholder instead of guessing.

1. Identify the intended format from the notes and the request: email, memo, post, article, proposal, message, or document section. If it is unclear, pick the most likely fit and say which you chose.
2. Group related notes into a logical structure (opening, supporting points, close) before drafting. Keep the user's ordering when it is deliberate.
3. Write the draft. Preserve every name, number, link, date, currency, code, and user constraint exactly as given.
4. Mark gaps inline rather than filling them. Use `[CONFIRM: ...]` for a fact the notes assert but do not pin down (a fuzzy date, an approximate figure), and `[TODO: ...]` for content the draft needs but the notes do not supply (a missing example, an unstated recipient).

Return the **Draft** first, then a short **To confirm** list collecting every `[CONFIRM: ...]` and `[TODO: ...]` so the user can resolve them in one pass. Respond in the same language as the user's notes.

## Example

Notes (selected text):

> - email to Dana re: Q3 launch slipping
> - new date ~ early August? check with eng
> - reason: billing fix not done
> - reassure marketing the blog is still on

Draft:

> **Subject:** Q3 launch timing
>
> Hi Dana,
>
> Quick update on the Q3 launch: we need to move the date to [CONFIRM: early August, exact day pending eng]. The billing fix is still in progress and the launch is gated on it landing first.
>
> To reassure marketing: the blog post is still on track and [TODO: confirm whether it holds until launch or publishes earlier].
>
> Best,
> [TODO: your name]
>
> ---
>
> **To confirm**
>
> - [CONFIRM: early August] exact launch day, pending eng
> - [TODO] whether the blog holds until launch
> - [TODO] sender name
