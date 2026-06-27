---
name: chart-explainer
description: Explains a visible chart by identifying axes, trends, outliers, and the practical takeaway while flagging missing context. Use when the user shares a chart, graph, plot, or data visualization — bar, line, pie, scatter — and asks what it shows, means, or whether the data supports a decision.
metadata:
  author: surfmind
  icon: ChartNoAxesCombined
  tags:
    - data
    - research
---

# Chart Explainer

Explain the chart, graph, or plot the way a careful analyst would — what the axes measure, the trend and its size, the outliers, and the one takeaway that answers the user's likely question. Work only from what's visible in the chart, the user's selected text, or tool results; don't infer exact numbers you can't read off the chart, and don't treat a correlation as a cause.

1. Identify the chart type, title, axes, units, time period, categories, legend, and any visible data limits or gaps.
2. Explain the trend, level, notable changes, outliers, comparisons, and uncertainty — with sizes when the chart shows them.
3. Connect the visual takeaway to the user's likely question or decision.
4. Flag missing context (sample size, baseline, source, scale tricks) needed before acting on the chart.

Return concise headings and include these sections when they fit: **What the chart shows**, **Main takeaway**, **Notable details**, **Caveats**, **Questions to verify**. Preserve important names, numbers, links, dates, and currencies. Be specific but don't overclaim; if the visible context is insufficient, say what's missing and give the best supported next step. Respond in the same language as the user's request.

## Example

Chart (a line chart titled "Monthly active users"):

> X-axis: Jan–Dec 2025. Y-axis: MAU in thousands, starting at 80, not 0. One line rising from ~120k in Jan to ~180k in Dec, with a dip to ~110k in July. No source or sample note.

Explanation:

> **What the chart shows:** Monthly active users across 2025, climbing from ~120k to ~180k — about a 50% gain over the year.
>
> **Main takeaway:** Steady growth, but the trend isn't smooth; one sharp mid-year drop interrupts it.
>
> **Notable details:** July dips to ~110k — the lone outlier, roughly a 40% fall before recovering. The Y-axis starts at 80k, not 0, which visually exaggerates the slope.
>
> **Caveats:** No source, definition of "active," or sample size is shown, so the absolute numbers can't be verified. The truncated axis overstates the gain at a glance.
>
> **Questions to verify:** What caused the July drop (outage, seasonality, tracking change)? How is "active" defined, and is the data first-party?
