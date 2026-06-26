---
name: localize-text
description: Translates and localizes text for a target language, region, and audience — adapts idioms, units, currency, dates, examples, formality, and tone while preserving the original message. Use when the user asks to translate, localize, internationalize (i18n), or adapt content for a specific country, language, or cultural audience.
metadata:
  author: surfmind
  icon: Earth
  tags:
    - language
    - writing
    - marketing
  actionMenu: languages
---

# Localize Text

Adapt selected or provided text for {value}. Localize for the target language, region, and audience rather than translating word-for-word by adjusting idioms, units, currency, dates, examples, formality, and tone while preserving the original message, facts, and intent.

## How To Work

1. Identify target locale, audience, channel, and tone.
2. Adapt idioms, units, dates, currency, examples, formality, calls to action, and cultural assumptions.
3. Preserve factual meaning, brand terms, legal constraints, code, links, and markdown.
4. For ambiguous dates (`9/30`), decimal/thousands separators, untranslatable idioms, or rate-dependent prices, pick the local convention and state the assumption rather than translating literally.
5. Verify that numbers, names, links, code, and legally required wording survive the rewrite unchanged in meaning before returning the result.
6. Flag content that may need native-speaker, legal, compliance, or brand review.

## Output Format

Use concise headings. Include these sections when they fit:

- Localized text
- Localization choices
- Items to review

## Guardrails

- Be useful and specific, but do not overclaim.
- Separate supported facts, tool-derived context, assumptions, and recommendations.
- Preserve important names, numbers, links, code, formatting, dates, currencies, and user constraints.
- If the visible context is insufficient, say what is missing and provide the best supported next step.
- Do not invent local claims or compliance statements.
- Do not erase legally required wording.

## Example

Localize for Japanese (target value: Japanese):

Source (English):

> Our fall sale ends 9/30. Save $50 when you spend over $200 — that's a no-brainer!

> **Localized text**
>
> 秋のセールは9月30日（火）までです。20,000円以上のお買い上げで5,000円OFF。この機会をお見逃しなく。
>
> **Localization choices**
>
> - Rewrote the date `9/30` as `9月30日` to avoid the US month/day ambiguity.
> - Converted prices to yen at a stated assumed rate (review before publishing).
> - Replaced the idiom "no-brainer" with お見逃しなく ("don't miss it"), which carries the same nudge without literal translation, and shifted to polite (です/ます) register.
>
> **Items to review**
>
> - Confirm the JPY conversion and any tax-display rules for the target market.

A shorter case — localize for German (target value: German):

Source (English):

> Reply by 4/5 and we'll knock $1,200.50 off your first invoice.

> **Localized text**
>
> Antworten Sie bis zum 4. Mai, und wir ziehen Ihnen 1.099,00 € von der ersten Rechnung ab.

> **Localization choices**
>
> - Read `4/5` as April 5 and wrote `4. Mai` to remove month/day ambiguity, switched `1,200.50` to the `1.099,00` separator convention, and converted to EUR at a stated assumed rate.
> - Used the formal _Sie_ address for a business invoice.
