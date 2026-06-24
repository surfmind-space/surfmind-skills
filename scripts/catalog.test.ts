import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { generateReadmeMarkdown } from "./catalog.js";

const readme = `# SurfMind Skills

## Official SurfMind Skills

<!-- surfmind:official-skills:start -->
| Skill | Categories | Description |
| --- | --- | --- |
<!-- surfmind:official-skills:end -->
`;

test("generates the official skills table in README from skills folders", () => {
  const rootDir = mkdtempSync(join(tmpdir(), "surfmind-skills-"));
  const skillDir = join(rootDir, "skills", "research-helper");
  mkdirSync(skillDir, { recursive: true });
  writeFileSync(
    join(skillDir, "SKILL.md"),
    `---
name: research-helper
description: Helps research a topic.
metadata:
  tags:
    - research
    - learning
---

Research the selected topic.
`,
  );

  const generated = generateReadmeMarkdown(rootDir, readme);

  assert.match(
    generated,
    /\| \[Research Helper\]\(\.\/skills\/research-helper\/SKILL\.md\) \| Reading & Research, Learning & Tutoring \| Helps research a topic\. \|/,
  );
});

test("title-cases kebab-case frontmatter names in the official skills table", () => {
  const rootDir = mkdtempSync(join(tmpdir(), "surfmind-skills-"));
  const skillDir = join(rootDir, "skills", "research-helper");
  mkdirSync(skillDir, { recursive: true });
  writeFileSync(
    join(skillDir, "SKILL.md"),
    `---
name: research-helper
description: Helps research a topic.
metadata:
  tags:
    - research
---

Research the selected topic.
`,
  );

  const generated = generateReadmeMarkdown(rootDir, readme);

  assert.match(
    generated,
    /\| \[Research Helper\]\(\.\/skills\/research-helper\/SKILL\.md\) \| Reading & Research \| Helps research a topic\. \|/,
  );
});

test("rejects non-kebab-case frontmatter names", () => {
  const rootDir = mkdtempSync(join(tmpdir(), "surfmind-skills-"));
  const skillDir = join(rootDir, "skills", "research-helper");
  mkdirSync(skillDir, { recursive: true });
  writeFileSync(
    join(skillDir, "SKILL.md"),
    `---
name: Research Helper
description: Helps research a topic.
metadata:
  tags:
    - research
---

Research the selected topic.
`,
  );

  assert.throws(
    () => generateReadmeMarkdown(rootDir, readme),
    /name.*kebab-case/i,
  );
});

test("rejects README content without official skills table markers", () => {
  const rootDir = mkdtempSync(join(tmpdir(), "surfmind-skills-"));
  mkdirSync(join(rootDir, "skills"), { recursive: true });

  assert.throws(
    () => generateReadmeMarkdown(rootDir, "# SurfMind Skills\n"),
    /missing <!-- surfmind:official-skills:start -->/i,
  );
});
