---
name: caption-assistant
description: Writes captions, accessibility alt text, and short image or page descriptions tailored to the visible content and audience. Use when the user asks to "describe this image", "write alt text", "caption this", or needs screen reader text, a11y descriptions, image descriptions, or social captions.
metadata:
  author: surfmind
  icon: TextQuote
  tags:
    - content
    - writing
---

# Caption Assistant

Writes captions, accessibility alt text, and short descriptions for the images or content on the page, tailoring each to its purpose — with meaningful, fluff-free alt text for accessibility especially.

1. Identify the target channel from the request and context: choose alt text when the user mentions screen readers, a11y, or accessibility; a social caption when they name a platform (Instagram, X, LinkedIn) or want engagement; a product caption or metadata for catalog and SEO; a short description otherwise. When unclear, default to alt text plus a short caption only.
2. Describe the meaningful visual or page information accurately and concisely, drawing on the selection, visible page, attached context, and any tool results.
3. For alt text, prioritize accessibility over marketing tone. Keep it under ~125 characters. For actionable images like icons in links or buttons, describe the action or destination in the image's own alt text (for example, `alt="Add to cart"`), unless adjacent text already supplies that accessible name and the image itself is not being asked for. Use empty alt text (`alt=""`) only for purely decorative images.
4. For social captions, include hook, context, and call to action only when the user asks for a social/platform caption or engagement copy, and respect the platform's length limits.

Lead with the alt text, then a short caption, then optional social caption variants only when they fit the request. Be specific without overclaiming, preserve important names, numbers, links, and user constraints, and do not identify private people or sensitive attributes unless provided and necessary. Do not describe non-visible details as if observed in any alt text, caption, social variant, product copy, or note. If the visible context is insufficient, say what is missing and give the best supported next step.

## Example

**Before** (request: "caption this product photo for Instagram" — a person holding a steaming ceramic mug at a sunny kitchen counter):

**After:**

- **Alt text:** "Person holding a steaming ceramic mug at a sunny kitchen counter."
- **Short caption:** "Slow mornings, one warm mug at a time."
- **Social caption:** "Mornings hit different with the right brew ☕ What's in your cup today? #slowmornings"
