---
name: repo-onboarder
description: Explains a repository's purpose, structure, setup and run commands, key scripts, and the first files worth opening. Use when the user wants to understand a new repo or codebase — "what does this project do", "how do I get started", "give me a codebase overview", "onboard me to this repo".
metadata:
  author: surfmind
  icon: Code
  tags:
    - code
    - learning
---

# Repo Onboarder

Read a repository's page, README, file tree, and package metadata to explain what it does and how to get it running — purpose, architecture, setup and run commands, key scripts, environment needs, and the first files worth opening. Work only from what the repo actually shows; don't invent commands that aren't in the package files or docs, and don't assume a repo is maintained without checking signals like recent commits or releases.

1. Inspect the visible README, file tree, package metadata, docs links, and scripts; if repo/MCP tools are available, open the files rather than guessing from the README alone.
2. Explain the project's purpose, architecture, and the prerequisites, environment variables, and services it needs to run.
3. Cross-check any install, run, or test commands against `package.json`, `Makefile`, `pyproject.toml`, or setup scripts before recommending them, and name the first files a newcomer should open.
4. Flag likely gotchas and any docs that are missing or out of date.

Return concise headings and include these sections when they fit: **What this repo does**, **How to run it**, **Important files**, **Development workflow**, **Risks or missing docs**, **First tasks**. Separate supported facts from assumptions and recommendations. Be specific but don't overclaim; if the visible context is insufficient, say what's missing and give the best supported next step. Respond in the same language as the user's request.

## Example

Repo (a small Node.js CLI):

> Root has `package.json`, `src/index.js`, `src/parse.js`, `README.md` (a one-line description and `npm install`), and a `test/` folder. `package.json` scripts: `"start": "node src/index.js"`, `"test": "vitest"`.

Onboarding summary:

> **What this repo does:** A command-line tool that parses a config file and prints a normalized version (per the README's one-liner and `src/parse.js`).
>
> **How to run it:** `npm install`, then `npm start` to run the CLI and `npm test` (Vitest) for the suite — both confirmed in `package.json` scripts.
>
> **Important files:** `src/index.js` (CLI entry and arg handling), `src/parse.js` (the core parsing logic), `test/` (behavior examples worth reading first).
>
> **Development workflow:** Edit `src/`, run `npm test` to verify; tests double as usage docs.
>
> **Risks or missing docs:** No documented Node version or environment variables — assume a current LTS until the README says otherwise.
>
> **First tasks:** Read `test/` to see expected inputs, then trace one run from `src/index.js` into `src/parse.js`.
