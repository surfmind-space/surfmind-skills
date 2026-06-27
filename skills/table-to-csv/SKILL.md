---
name: table-to-csv
description: Converts visible web tables — HTML tables, pricing grids, comparison charts, reports — into clean Markdown tables that users can copy or download as CSV from the extension. Use when the user wants to extract, scrape, convert, copy, or export a table from a webpage.
metadata:
  author: surfmind
  icon: List
  tags:
    - data
    - automation
    - productivity
---

# Table to CSV

Turn a visible page table such as a pricing grid, comparison, report, or search result into one accurate Markdown table, preserving columns, row order, numbers, dates, currency symbols, percentages, and missing values exactly as shown. Work only from what's visible; don't invent hidden rows or columns, don't normalize values in a way that changes meaning, and don't claim to create or attach a CSV file.

1. Identify headers, row groups, footnotes, hidden units, sort order, and merged cells from the visible table.
2. Count the source tables first. One visible source table becomes exactly one continuous Markdown table, however long — never split it by section, category, or page area.
3. Verify the output has the same number of columns and rows as the source before responding; carry empty cells through as blanks, not guesses.
4. Flag any columns or rows that are ambiguous, truncated, or visually unavailable in a short note after the table.

Return the Markdown table as the first substantial output, with extraction notes before or after it, never between chunks of the same table. Output raw CSV text only when the user explicitly asks for it; otherwise mention that the extension lets them copy the Markdown table or download it as CSV. Respond in the same language as the user's request.

## Example

Source table (a pricing grid with a merged header and one empty cell):

> | Plan     | Price/mo | Seats | Support |
> |----------|----------|-------|---------|
> | Free     | $0       | 1     |         |
> | Pro      | $12      | 5     | Email   |
> | Business | $24      | 25    | Priority|

Markdown table:

> | Plan | Price/mo | Seats | Support |
> | --- | --- | --- | --- |
> | Free | $0 | 1 |  |
> | Pro | $12 | 5 | Email |
> | Business | $24 | 25 | Priority |
>
> _Free has no listed support tier — left blank rather than guessed. Copy this table or download it as CSV from the extension._
