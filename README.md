# SurfMind Skills

Native skills for SurfMind. Each folder under `skills/` is one skill, with `SKILL.md` as the source of truth for catalog metadata and the prompt body.

## Folder Layout

```text
skills/
  explain/
    SKILL.md
    references/
      optional-context.md
```

## SKILL.md Format

`SKILL.md` uses YAML frontmatter followed by the prompt body:

```md
---
name: Explain
description: Explain selected content clearly and simply.
license: MIT
metadata:
  author: SurfMind
  icon: BookMarked
---

Explain the selected content in clear, simple language.
```

Required fields:

- `name`
- `description`

Optional fields:

- `metadata.author`
- `metadata.icon`
- `metadata.tags`
- `metadata.actionMenu`

Icons must be one of the values in [`scripts/constants.ts`](scripts/constants.ts). The extension falls back to `Box` when none is supplied.

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

| Tag             | Category                      | Description                                                         |
| --------------- | ----------------------------- | ------------------------------------------------------------------- |
| `research`      | Reading & Research            | Find, read, and summarize information from pages or the web         |
| `writing`       | Writing                       | Draft, edit, rewrite, and improve written text                      |
| `communication` | Communication                 | Compose clear messages for chat, email, and everyday correspondence |
| `shopping`      | Shopping & Commerce           | Compare products, prices, and purchase options                      |
| `code`          | Coding & Development          | Write, explain, debug, or refactor code                             |
| `learning`      | Learning & Tutoring           | Explain concepts, teach, and support study or practice              |
| `producivity`   | Productivity                  | Organize tasks, notes, schedules, and daily workflow                |
| `language`      | Languages & Translation       | Translate text and adapt tone for other languages                   |
| `content`       | Social & Content              | Create posts, captions, and social media copy                       |
| `marketing`     | Marketing & Sales             | Draft outreach, ads, and sales messaging                            |
| `data`          | Data & Analytics              | Analyze, summarize, and work with data and metrics                  |
| `automation`    | Browser & Workflow Automation | Automate browser actions and multi-step workflows                   |

## Action Menus

Preset (validated against [`KNOWN_ACTION_MENU_PRESETS`](scripts/constants.ts)):

```yaml
metadata:
  actionMenu: languages
```

Inline list of `{label, value}` items:

```yaml
metadata:
  actionMenu:
    - label: Formal
      value: formal
    - label: Casual
      value: casual
```

`{value}` is a placeholder in the prompt body. When the skill runs, it is replaced with the value from the selected action menu item.

## Local Checks

```bash
npm install
npm run lint        # validate every SKILL.md
npm run typecheck   # typecheck the scripts
```

## Contributing

Everyone is welcome to contribute skills through pull requests. You can:

- update an existing skill's prompt, metadata, or reference files
- add a new skill folder under `skills/`

For new skills, create a kebab-case folder name and add a `SKILL.md` file using
the format above. Keep prompts focused, practical, and reusable. If a skill
needs supporting material, place it in that skill's folder and reference it from
the prompt.

Before opening a PR, run:

```bash
npm run lint
npm run typecheck
```

Pull requests run the same validation in CI. After a PR is merged to `main`, the
publish workflow updates the SurfMind skills catalog automatically.

## License

This repository is licensed under the MIT License.
