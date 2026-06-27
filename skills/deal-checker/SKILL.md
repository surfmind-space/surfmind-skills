---
name: deal-checker
description: Judges whether a product's price is worth it by checking typical prices, alternatives, total cost, and timing, then giving a clear buy / wait / skip call. Use when the user asks "is this a good deal", "should I buy this", "is this worth the price", "too expensive", or wants a price check or comparison before purchasing.
metadata:
  author: surfmind
  icon: Tags
  tags:
    - shopping
    - research
---

# Deal Checker

Judge whether the price in front of the user is actually worth paying, and give a clear buy / wait / skip call.

Three kinds of claim are **off-limits as statements of fact** — a web search does not earn them, because a search snapshot is not price history and a sale badge is the seller's marketing, not proof: (a) that a price is "the lowest" / "an all-time low" / "the best price"; (b) that a price "will drop" or "will come back" (a future move is always a maybe, never a fact); (c) that it's "X% off list/MSRP" — the struck-through list price is itself a claim to check. Surface all three as things for the user to verify ("the listing claims 42% off — confirm on a price-history tool like CamelCamelCamel"), never as your own assertion. Likewise, don't put a specific number forward as "the going rate" or "what you should pay" unless it's an actual current quote you can point to; otherwise give a rough range and call it an estimate to confirm.

Stay neutral: don't push the user toward or away from a purchase. Drop promotional or pressuring language ("buy now", "the discount is real", "risk-free", "don't miss it") — your job is to inform the decision, not sell it.

1. Extract the item, price, included features, seller, and delivery/return/warranty terms from the page, cart, or the user's request.
2. Compare against typical prices, competitor offers, and recent reviews — use web search or any browser/market tool available; when you can't, name the specific checks the user should run.
3. Weigh total cost (shipping, fees, warranty) and timing — known sale events, model refreshes, or price-history patterns that suggest waiting.
4. Explicitly separate what you verified from what you're assuming — label it, with a short "Verified vs. assumed" note or inline `verified:` / `assuming:` markers. A number you didn't confirm from a real source this session is an assumption, so label it `assuming:` — don't dress a guess as `verified:`, and note that the label never licenses an off-limits claim from above. Flag red flags like inflated "list" prices, thin return policies, or unfamiliar sellers.

When the request is ambiguous, ask before you research. If the product name maps to several variants at different prices (e.g. "BlackShark V2" could be the V2, V2 X, or V2 Pro), or the price, seller, or condition is unknown, or anything material is unclear, pause and ask the user one or two specific clarifying questions — which exact variant, and the price or link they're looking at — before committing to deep research or quoting any numbers. Don't resolve the ambiguity yourself by pricing every variant; a short clarifying question beats a confident guess across products you can't tell apart, and a price you make up to fill the gap is the failure mode to avoid. Asking first does not mean abandoning the format: still use the standard section headings below. Fill **Value assessment**, **Better alternatives to check**, and **Red flags** with the variant-agnostic guidance you can honestly give (ranges labeled as estimates to verify, what to watch for), and use the **Recommendation** section to withhold the call and ask for the missing price/variant. Don't replace the structure with a freeform "what I need from you" note — the clarifying questions live inside the normal sections, they don't displace them.

Return concise headings and include these sections when they fit: **Deal summary**, **Value assessment**, **Better alternatives to check**, **Red flags**, **Recommendation**. The Recommendation must land on **exactly one** call — buy, wait, or skip — as a single headline verdict. Never stack multiple verdicts ("buy now, or wait, or skip…") or hedge with "it depends"; put any conditions as caveats *under* that one call. If the visible context is genuinely insufficient to decide, that's its own answer: say what's missing, ask for it, give the best supported next step, and either withhold the call explicitly or give the call the available evidence supports — don't silently emit several.

## Example

Request:

> Sony WH-1000XM5 headphones, $328 on a marketplace seller. Good deal?

Response:

> **Deal summary**
>
> - Sony WH-1000XM5, $328 from a third-party marketplace seller (not Sony or a major retailer).
>
> **Value assessment**
>
> - _Assuming_ (no live search from here): these typically list around $350–$400 and dip to roughly $280–$300 during sale events, so $328 is mid-pack — fine, not a standout. _Verify_ the current price at an authorized seller before treating $328 as the bar.
>
> **Better alternatives to check**
>
> - Authorized retailers (Best Buy, Amazon "Ships from/Sold by Amazon") for the same or better price with a clean warranty.
> - The older XM4, often ~$100 less if you don't need the latest tweaks.
>
> **Red flags**
>
> - A marketplace seller well under retail can mean grey-market or no Sony warranty — confirm seller rating and warranty before buying.
>
> **Recommendation:** Wait. I can't confirm a live lower price from here, but $328 isn't a strong deal — check an authorized seller's current price and watch for the next sale event before committing.
