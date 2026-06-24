# SurfMind - Contribution Guide

Thanks for helping grow the SurfMind skill catalog. You can contribute in two
ways:

- Add or improve an official SurfMind skill in `skills/`
- List an external/community skill in [`awesome-skills.md`](./awesome-skills.md)

## Official Skill File Structure

Each official skill lives in its own kebab-case folder:

```text
skills/
  my-skill/
    SKILL.md
    references/
      optional-context.md
```

`SKILL.md` is the source of truth for catalog metadata and the prompt body. If a
skill needs supporting files, place them in the same skill folder and reference
them from the prompt.

To add or update an official skill:

1. Add or edit the skill folder under `skills/`.
2. Choose suitable metadata fields, including tags when relevant.
3. Open a pull request.

## SKILL.md Format

`SKILL.md` uses YAML frontmatter followed by the prompt body:

```md
---
name: my-skill
description: A short description shown in SurfMind.
metadata:
  author: Your Name
  icon: Sparkles
  tags:
    - writing
  actionMenu: languages
---

Prompt body goes here.
```

Required fields:

- `name` - kebab-case, used as the canonical skill name and rendered as title case in generated catalog tables.
- `description`

Optional fields:

- `metadata.author`
- `metadata.icon`
- `metadata.tags`
- `metadata.actionMenu`

## Tags

Use `metadata.tags` to categorize skills. Tags are stored as canonical lowercase
keys and rendered as categories in SurfMind clients.

```yaml
metadata:
  tags:
    - research
    - learning
```

Allowed tags:

| Tag             | Category                      | Description                                                                |
| --------------- | ----------------------------- | -------------------------------------------------------------------------- |
| `research`      | Reading & Research            | Find, read, and summarize information from pages or the web                |
| `writing`       | Writing                       | Draft, edit, rewrite, and improve written text                             |
| `communication` | Communication                 | Compose clear messages for chat, email, and everyday correspondence        |
| `shopping`      | Shopping & Commerce           | Compare products, prices, and purchase options                             |
| `code`          | Coding & Development          | Write, explain, debug, or refactor code                                    |
| `learning`      | Learning & Tutoring           | Explain concepts, teach, and support study or practice                     |
| `productivity`  | Productivity                  | Organize tasks, notes, schedules, and daily workflow                       |
| `language`      | Languages & Translation       | Translate text and adapt tone for other languages                          |
| `content`       | Social & Content              | Create posts, captions, and social media copy                              |
| `marketing`     | Marketing & Sales             | Draft outreach, ads, and sales messaging                                   |
| `finance`       | Finance                       | Track budgets, analyze financial data, and research markets or investments |
| `data`          | Data & Analytics              | Analyze, summarize, and work with data and metrics                         |
| `automation`    | Browser & Workflow Automation | Automate browser actions and multi-step workflows                          |

## Icons

`metadata.icon` must be one of the supported icon names in
[`scripts/constants.ts`](./scripts/constants.ts). SurfMind falls back to `Box`
when no icon is supplied.

## Action Menus

Use `metadata.actionMenu` when a skill needs a user-selected option.

Preset:

```yaml
metadata:
  actionMenu: languages
```

Inline list:

```yaml
metadata:
  actionMenu:
    - label: Formal
      value: formal
    - label: Casual
      value: casual
```

`{value}` is a placeholder in the prompt body. When the skill runs, it is
replaced with the selected action menu value.

## Community Skills

Community skills are SurfMind-compatible skills hosted in external public GitHub
repos. They are listed in [`awesome-skills.md`](./awesome-skills.md), and the SurfMind publish pipeline
imports them into the public catalog after the PR is merged.

To list a community skill:

1. Publish a valid `SKILL.md` in a public GitHub repo.
2. Add one collapsed entry under `## Entries` in [`awesome-skills.md`](./awesome-skills.md).
3. Open a pull request.

Community entry format:

```md
<details>
<summary><strong>Acme Research Assistant</strong></summary>

<!-- surfmind:community-skill
url: https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant
shortDescription: Research assistant for technical blogs, docs, and papers.
submittedBy: "acme"
tags:
  - research
  - learning
promotion:
  text: Built by Acme for technical research workflows.
  website: https://acme.example
  links:
    - label: Demo
      url: https://acme.example/demo
-->

</details>
```

Required community fields:

- `url`: a public GitHub folder URL that points to the skill folder
- `shortDescription`: a 1-2 sentence summary used only in the generated `awesome-skills.md` table
- `submittedBy`: your GitHub handle, organization, or author name
- `tags`: canonical SurfMind tags for the skill, or `[]` when no tag is relevant

`url` must use this shape:

```text
https://github.com/<owner>/<repo>/tree/<branch>/<path-to-skill-folder>
```

Use the folder containing `SKILL.md`, not the repo root and not the `SKILL.md`
file URL. This lets the importer include any supporting files in the skill
folder.

Optional community fields:

- `promotion`
- `promotion.text`
- `promotion.website`
- `promotion.links`

Choose the most suitable tags from the allowed tags table above. Leave the list
empty only when no existing tag fits:

```yaml
tags: []
```

The skill's name, description, icon, action menu, prompt, and files come from
the external `SKILL.md`. The web catalog uses that `description` as the primary
skill summary. `shortDescription` is only for the generated GitHub table in
`awesome-skills.md`. The `awesome-skills.md` tags are validated in CI and sent
with the community import payload so the catalog can categorize the listing
after the PR is merged.

## Optional Local Checks

```bash
npm install
npm run generate:catalog
npm run lint
npm run test
npm run typecheck
```

CI runs `npm run generate:catalog` before validation on every pull request and
again whenever new commits are pushed to the PR branch. For PR branches in this
repository, CI commits generated `README.md` or `awesome-skills.md` updates back
to the PR automatically.

After a merge to `main`, automation refreshes the
generated tables and publishes the updated SurfMind skills catalog.
