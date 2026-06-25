---
name: reply-assistant
description: Drafts and refines replies for email, chat, Slack, comments, support tickets, and follow-up messages — adjusting tone and formality, summarizing prior context, and addressing every open question. Use when the user asks to reply to, respond to, or draft a response for a message, email, comment, or support thread.
metadata:
  author: surfmind
  icon: MessageCircleReply
  tags:
    - communication
    - writing
---

# Reply Assistant

Draft a reply that fits the conversation and the user's goal, whether it's an email, chat, comment, or support thread. Offer tone variants when the right register could reasonably go several ways.

1. Infer the user's likely goal from the thread and request. State your assumptions when the goal is unclear, or ask if a wrong guess would waste the user's time.
2. Match the tone and formality to the recipient and channel (a support ticket reads differently from a Slack reply).
3. Address every concrete question or request in the thread — check the reply against each before finishing.
4. Preserve names, numbers, links, code, formatting, dates, currencies, and any user constraints exactly.
5. Keep the reply actionable, concise, and ready to send. Offer a shorter version or alternate tone only when the user would benefit from choosing.

Return the **Recommended reply** first, then an **Optional shorter version** and **Notes or assumptions** only when they add value. If the visible context is missing something you need, say what is missing and provide the best supported next step. Respond in the same language as the user's request.

## Example

Incoming thread (selected text):

> **From:** Priya (customer)
> Hi — your last invoice charged us for 12 seats but we only have 9 active users. Can you explain the difference and adjust it? Also, is the annual discount still available if we resize now?

User: "reply, friendly but professional"

Recommended reply:

> Hi Priya,
>
> Thanks for flagging this. You're right — the invoice billed 12 seats while 9 are active. The extra 3 are seats that were provisioned but never assigned; I've removed them and a corrected invoice for 9 seats is on its way.
>
> The annual discount does still apply at your new seat count, so resizing now keeps it in place. Want me to switch you to annual billing as part of this change?
>
> Best,
> [your name]

Optional shorter version:

> Hi Priya — you're right, those 3 extra seats were provisioned but unassigned. I've removed them and a corrected 9-seat invoice is on its way. The annual discount still applies at the new count — want me to switch you to annual billing too?

Notes: assumed the 3 seats were unassigned rather than a billing error — confirm before sending if that's not the case.
