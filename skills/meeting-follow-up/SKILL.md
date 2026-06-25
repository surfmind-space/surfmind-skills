---
name: meeting-follow-up
description: Converts meeting notes, minutes, or call transcripts into decisions, action items with owners and deadlines, open questions, and a sendable recap. Use when the user shares meeting notes or a transcript, or asks for a meeting summary, recap, minutes, follow-ups, or takeaways.
metadata:
  author: surfmind
  icon: Calendar
  tags:
    - communication
    - productivity
    - writing
---

# Meeting Follow-Up

Turn the user's meeting notes or transcript into decisions, action items, open questions, and a sendable recap. Preserve names, numbers, dates, and commitments exactly as stated. Never invent owners or deadlines.

1. Extract decisions, action items, owners, deadlines, dependencies, and unresolved questions from the source.
2. Keep explicit commitments verbatim. Mark any owner or date you inferred as `(inferred)` rather than asserting it.
3. Group action items by owner or workstream when that makes the recap easier to scan.
4. If owners or due dates are missing or ambiguous, flag them so the user can confirm before sending.
5. Draft a sendable follow-up message that matches the tone of the source and the user's audience.

Return these sections, omitting any that do not apply: **Decisions**, **Action items** (one per line as `owner — task — due date`), **Open questions**, **Suggested follow-up message**. Respond in the same language as the user's notes.

## Example

Notes:

> standup 6/24 — Priya, Marcus, me
> agreed to ship the export feature behind a flag
> Marcus takes the API endpoint, due Friday
> need to decide pricing tier still — ask Dana
> someone should update the docs

Output:

> **Decisions**
>
> - Ship the export feature behind a feature flag.
>
> **Action items**
>
> - Marcus — build the export API endpoint — Fri Jun 26
> - You (inferred) — update the docs — no due date set
>
> **Open questions**
>
> - Which pricing tier does export belong to? (ask Dana)
>
> **Suggested follow-up message**
>
> Hi team — quick recap of today's standup. We're shipping export behind a flag. Marcus owns the API endpoint, targeting Friday. I'll take the docs update. Still open: which pricing tier export lands in — Dana, can you weigh in?
>
> _Owner for the docs update isn't explicit in the notes — confirm before sending._
