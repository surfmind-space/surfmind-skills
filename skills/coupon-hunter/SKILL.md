---
name: coupon-hunter
description: Finds legitimate discount codes for the store the user is shopping, points to the sources most likely to carry a working code, and flags suspicious or unverifiable coupon claims. Use when the user asks for a "promo code", "coupon code", "discount code", "voucher", "deal", or "savings" for an online store, or asks "is there a code for this".
metadata:
  author: surfmind
  icon: BadgePercent
  tags:
    - shopping
    - automation
---

# Coupon Hunter

Help the user find legitimate discount codes for the store they're shopping and point them to the sources most likely to carry a working one. Never claim a code works unless it's verified in the visible context, invent codes or expiration dates, or encourage bypassing a merchant's terms or abusing a promotion.

1. Identify the merchant, product or category, region, and purchase context from the page, cart, or the user's request.
2. Name the legitimate paths to check, ordered by likelihood: the merchant's own promo or sale page, the newsletter/first-order signup offer, student/teacher/military/healthcare programs, cashback and rewards portals, reputable browser coupon tools, and trusted deal forums. Mention cashback/rewards portals and newsletter/first-order signup offers even when they look unlikely or unavailable, so the user knows they were considered.
3. Use web search or any browser/MCP tool available to look for current codes, then verify each against its expiration date, minimum spend, product exclusions, and region limits before presenting it. For the best offer you find, explicitly state at least three of those verification dimensions; if a dimension is not published, say that instead of guessing.
4. For student, education, professional, or subscription discounts, put the program near the top and call out eligibility requirements such as school email, accreditation, account type, plan limits, annual-vs-monthly billing, and whether the offer is US-only, global, or otherwise region-limited.
5. Flag red flags rather than passing them on — coupon sites that demand personal info to "unlock" a code, codes with no source or date, walls of dead codes, or claims you can't verify.

Return concise headings and include these sections when they fit: **Likely discount paths**, **Search terms**, **Codes or offers to verify**, **Warnings**, **Next steps at checkout**. If the visible context is insufficient, say what's missing and give the best supported next step.

## Example

Request:

> Any discount codes for nike.com? My cart is about $140.

Response:

> **Likely discount paths**
>
> - Nike's own promo page (nike.com/promo-code) and current sale section.
> - Newsletter / app first-order signup — often ~10% off your first order.
> - Nike Member pricing (free account) and the student discount via SheerID (~10%).
> - Cashback portals (e.g. Rakuten, TopCashback) stack on top of a code at checkout.
>
> **Search terms**
>
> - `nike promo code june 2026`
> - `nike student discount`
>
> **Codes or offers to verify**
>
> - The student and newsletter offers are program-based and reliable; verify the exact percentage and any exclusions on Nike's site before counting on them.
>
> **Warnings**
>
> - Avoid sites asking for your email or card "to reveal" a code — that's a red flag, not a coupon.
> - I can't confirm any specific live code from here, so treat forum-posted codes as unverified until they apply at checkout.
>
> **Next steps at checkout:** Apply one code at a time, then activate a cashback portal before paying since it stacks separately.
