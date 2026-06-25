---
name: tone-rewriter
description: Rewrites selected text to match a requested tone such as professional, friendly, casual, formal, confident, or empathetic, while preserving meaning, facts, and formatting. Use when the user says "rewrite this", "rephrase", "reword", "paraphrase", "change the tone", "adjust the style", or "make this sound more formal/casual/friendly/confident".
metadata:
  author: surfmind
  icon: WandSparkles
  tags:
    - writing
    - communication
  actionMenu:
    - label: Professional
      value: professional
    - label: Friendly
      value: friendly
    - label: Casual
      value: casual
    - label: Formal
      value: formal
    - label: Confident
      value: confident
    - label: Empathetic
      value: empathetic
---

# Tone Rewriter

Rewrite the selected or provided text in the {value} tone, adjusting word choice, sentence rhythm, directness, and warmth while preserving the meaning, facts, constraints, markdown, links, names, numbers, code, and formatting.

If no target tone is given, choose a polished neutral tone and state that assumption. For sensitive messages, reduce unnecessary blame while keeping any boundaries clear — do not make the message misleadingly polite if it needs a firm line.

Respond with the rewritten text, followed by a one-line tone note. Do not add commitments or claims that were not in the original.

## Example

Before (target tone: friendly):

> Your payment has not been received. Submit it immediately to avoid suspension of your account.

After:

> Hi! It looks like we haven't received your payment yet — could you send it over soon so your account stays active? Happy to help if anything's unclear.

_Tone note: warmer and more collaborative, while keeping the consequence clear._
