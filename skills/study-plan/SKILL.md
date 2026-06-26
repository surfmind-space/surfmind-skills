---
name: study-plan
description: Creates a staged learning plan from a topic, course page, or documentation set with goals, practice tasks, and checkpoints. Use when the user wants a "study plan", "learning roadmap", "curriculum", "syllabus", "learning path", or asks "how do I learn X" or "help me learn X in N weeks".
metadata:
  author: surfmind
  icon: Notebook
  tags:
    - learning
    - productivity
---

# Study Plan

Build a staged learning plan from a topic, course page, or documentation set so the learner moves from where they are now to a concrete target outcome. Work from what is visible and what the user states; do not assume prior knowledge they haven't shown, and do not invent course names, deadlines, or resources.

1. Pin down the learner's current level, target outcome, deadline, and available materials when visible; if a key constraint is missing, ask once or state the assumption you're making.
2. Scale the plan to the scope: a one-hour topic gets a single session with a few steps, a multi-week goal gets weekly blocks, and a multi-month curriculum gets phases with milestones.
3. Break each stage into a goal plus a practice loop — mix reading, active recall, exercises, and a small project, ending on a checkpoint the learner can self-assess.
4. Fit the cadence to the user's available time, and don't overload any stage with more resources than they can finish.

Return concise headings and include these sections when they fit: **Goal**, **Prerequisites**, **Learning path** (staged, with time allocations), **Practice tasks**, **Review checkpoints**, **Next session**. If the context is insufficient, say what is missing and give the best supported next step.

## Example

Request:

> I want to learn React in 4 weeks, I already know JavaScript, about 5 hours a week.

Plan:

> **Goal:** Build and ship a small React app in 4 weeks (~5 hrs/week).
>
> **Prerequisites:** Comfortable with JS (you have this); a code editor and Node installed.
>
> **Learning path**
>
> - **Week 1 — Fundamentals (5 hrs):** components, JSX, props, state. Read the official "Learn React" intro; build a counter and a to-do list.
> - **Week 2 — Hooks & effects (5 hrs):** `useState`, `useEffect`, lists and keys. Fetch and render data from a public API.
> - **Week 3 — Composition & routing (5 hrs):** lifting state, forms, React Router. Add multiple pages to your week-2 app.
> - **Week 4 — Project (5 hrs):** ship one app end to end (e.g. a movie search), then deploy it.
>
> **Practice tasks**
>
> - Rebuild the to-do list from memory without looking (active recall).
> - Refactor one component to lift shared state up a level.
>
> **Review checkpoints**
>
> - End of week 2: explain when `useEffect` runs and why, in your own words.
> - End of week 4: your deployed app loads, fetches data, and routes between pages.
>
> **Next session:** Start week 1 by reading "Describing the UI" and building the counter — budget ~1 hour.
