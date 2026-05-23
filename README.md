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

The folder name is the skill slug and must use kebab-case.

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

- `license`
- `author` or `metadata.author`
- `icon` or `metadata.icon`
- `actionMenu`, `action-menu`, or `metadata.actionMenu`

Icons must be one of the values in [`scripts/constants.ts`](scripts/constants.ts). The extension falls back to `Sparkles` when none is supplied.

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

Put `{value}` in the prompt body — it is
replaced with the selected item's `value` when the skill runs:

## Local Checks

```bash
npm install
npm run lint        # validate every SKILL.md
npm run typecheck   # typecheck the scripts
```
