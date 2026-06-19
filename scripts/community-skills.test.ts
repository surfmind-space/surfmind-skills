import assert from "node:assert/strict";
import test from "node:test";
import {
  generateAwesomeSkillsMarkdown,
  parseCommunitySkills,
} from "./community-skills.js";

const exampleMarkdown = `# Awesome SurfMind Skills

Community-maintained SurfMind-compatible skills.

## Skills

<!-- surfmind:awesome-table:start -->
| Skill | Submitted By | Tagline | Links |
| --- | --- | --- | --- |
<!-- surfmind:awesome-table:end -->

## Entries

<details>
<summary><strong>Acme Research Assistant</strong></summary>

<!-- surfmind:community-skill
skillUrl: https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant
submittedBy: "@acme"
promotion:
  tagline: Research assistant for technical blogs, docs, and papers.
  website: https://acme.example
  links:
    - label: Demo
      url: https://acme.example/demo
-->

</details>
`;

test("parses collapsed community skill entries", () => {
  const skills = parseCommunitySkills(exampleMarkdown, "awesome-skills.md");

  assert.deepEqual(skills, [
    {
      title: "Acme Research Assistant",
      skillUrl:
        "https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant",
      submittedBy: "@acme",
      promotion: {
        tagline: "Research assistant for technical blogs, docs, and papers.",
        website: "https://acme.example",
        links: [{ label: "Demo", url: "https://acme.example/demo" }],
      },
    },
  ]);
});

test("generates the awesome skills table from collapsed entries", () => {
  const generated = generateAwesomeSkillsMarkdown(exampleMarkdown);

  assert.match(
    generated,
    /\| \[Acme Research Assistant\]\(https:\/\/github\.com\/acme\/surfmind-skills\/tree\/main\/skills\/research-assistant\) \| @acme \| Research assistant for technical blogs, docs, and papers\. \| \[Website\]\(https:\/\/acme\.example\) · \[Demo\]\(https:\/\/acme\.example\/demo\) \|/,
  );
});

test("rejects duplicate community skill URLs", () => {
  const duplicated = `${exampleMarkdown}
<details>
<summary><strong>Another Entry</strong></summary>

<!-- surfmind:community-skill
skillUrl: https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant
submittedBy: "@someone"
promotion:
  tagline: Duplicate URL.
-->

</details>
`;

  assert.throws(
    () => parseCommunitySkills(duplicated, "awesome-skills.md"),
    /duplicate skillUrl/i,
  );
});

test("rejects repo root URLs because skillUrl must point to a skill folder", () => {
  const repoRoot = exampleMarkdown.replace(
    "https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant",
    "https://github.com/acme/surfmind-skills",
  );

  assert.throws(
    () => parseCommunitySkills(repoRoot, "awesome-skills.md"),
    /skillUrl must be a GitHub skill folder URL/i,
  );
});

test("rejects SKILL.md file URLs because skillUrl must point to a skill folder", () => {
  const skillFile = exampleMarkdown.replace(
    "https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant",
    "https://github.com/acme/surfmind-skills/blob/main/skills/research-assistant/SKILL.md",
  );

  assert.throws(
    () => parseCommunitySkills(skillFile, "awesome-skills.md"),
    /skillUrl must be a GitHub skill folder URL/i,
  );
});
