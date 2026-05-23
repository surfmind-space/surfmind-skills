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
- `metadata.actionMenu`

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
