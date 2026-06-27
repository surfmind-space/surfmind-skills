---
name: calendar-prep
description: Turns an event page, calendar invite, email, or notes into key details, an agenda, a preparation checklist, and follow-up reminders. Use when the user wants to prepare for a meeting, event, or appointment, or asks for meeting prep, an agenda, or a prep checklist before an upcoming event.
metadata:
  author: surfmind
  icon: Calendar
  tags:
    - productivity
---

# Calendar Prep

Turn the user's event page, calendar invite, email, or notes into everything they need to show up prepared. Work only from what is present; never invent attendees, times, locations, commitments, questions, or follow-up actions.

1. Extract title, date/time, timezone, location or link, attendees, RSVP/status labels, purpose, agenda items, documents, and deadlines.
2. Identify what the user should read, prepare, bring, decide, or ask before the event, but include only items directly supported by the source.
3. Draft a short agenda from stated agenda items, purpose, or required decisions.
4. Add follow-up reminders only for explicit deadlines, named required actions, or missing/ambiguous logistics or attendance statuses that the source itself exposes.
5. If key details like date, time, or location are missing or ambiguous, flag them so the user can confirm before relying on the prep.

Return these sections, omitting any that do not apply: **Event summary**, **Prep checklist**, **Agenda**, **Questions to ask**, **Follow-up reminders**. Preserve names, numbers, links, dates, and attendee RSVP/status labels exactly as given. Do not infer availability or RSVP status: if someone is listed as maybe, declined, no response, optional, accepted, or similar, keep that label or omit attendance status rather than rewriting it as confirmed attendance. Treat **Questions to ask** as optional: include it only when the source states an uncertainty, missing detail, blocker, deadline, required decision, or explicit topic the user must ask about; do not convert ordinary agenda items into generic questions. Treat **Follow-up reminders** as optional and factual: do not add recap emails, stakeholder sign-offs, capacity checks, separate follow-ups, or decision prompts unless the source explicitly requires them. When unsure, omit the optional item rather than inventing useful-sounding prep. Respond in the same language as the user's request.

## Example

Invite (selected text):

> Subject: Q3 roadmap review
> Thu, time TBD — Zoom (link to follow)
> With Priya (PM), Marcus (eng lead)
> Bring updated estimates; decide whether billing fix ships this quarter

Output:

> **Event summary**
>
> - Q3 roadmap review with Priya (PM) and Marcus (eng lead), Thursday on Zoom.
> - Goal: align on the roadmap and decide whether the billing fix ships this quarter.
>
> **Prep checklist**
>
> - Update and bring your estimates.
> - Review the current billing fix status before the call.
>
> **Agenda**
>
> 1. Walk through updated estimates.
> 2. Decide: does the billing fix ship this quarter?
>
> **Questions to ask**
>
> - What's blocking the billing fix today?
>
> **Follow-up reminders**
>
> - Confirm the start time (listed as TBD) and watch for the Zoom link.
>
> _Date is set but the start time and meeting link aren't in the invite — confirm both before the meeting._
