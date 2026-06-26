---
name: terminology-keeper
description: Builds and applies a consistent glossary for translation — extracting recurring domain terms, suggesting preferred translations, and flagging inconsistencies so terminology stays uniform across a page or document. Use when the user needs term consistency across translations or localization, mentions a glossary, terminology, or terminology database, or asks to translate domain material uniformly.
metadata:
  author: surfmind
  icon: BookMarked
  tags:
    - language
    - productivity
---

# Terminology Keeper

Keep translations consistent across a page, document, product copy, legal text, docs, or domain material by building a glossary of the recurring domain terms and applying the same preferred translation throughout.

## How To Work

1. Extract recurring domain terms, acronyms, product names, and terms of art from the source.
2. Build a glossary table: `Source term | Preferred translation | Context | Notes`.
3. Apply the glossary consistently in the translated or rewritten output.
4. When a term has competing translations in the source, pick one preferred form, normalize every occurrence to it, and note the alternates.
5. Flag terms that need user or domain-expert confirmation.

## Output Format

Use concise headings. Include these sections when they fit:

- Glossary
- Translated or revised text
- Terms needing confirmation

## Guardrails

- Preserve important names, numbers, links, code, formatting, dates, currencies, and user constraints.
- Do not over-translate brand or code terms; keep do-not-translate items verbatim.
- When a term has multiple valid translations across subdomains (legal vs. medical vs. financial), choose by the document's domain and record the assumption rather than picking casually.
- If the source is inconsistent and you cannot tell which translation is correct, surface it under terms needing confirmation instead of guessing.

Respond in the same language as the user's request unless the skill explicitly involves translation or localization.

## Example

Source (EN → ES) mixes translations of the same term: _"The Plaintiff filed the claim. Later, the claimant amended the same claim, and the demandante withdrew it."_

> **Glossary**
>
> | Source term          | Preferred translation | Context         | Notes                                      |
> | -------------------- | --------------------- | --------------- | ------------------------------------------ |
> | claim                | demanda               | legal filing    | not _reclamación_ in this context          |
> | Plaintiff / claimant | demandante            | the party suing | normalize both source variants to one term |
>
> **Translated text (es):** _"El demandante presentó la demanda. Más tarde, el demandante modificó la misma demanda y la retiró."_
>
> **Terms needing confirmation:** Source used "Plaintiff" and "claimant" interchangeably — confirm both refer to the same party before finalizing.
