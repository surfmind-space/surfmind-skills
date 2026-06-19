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
| Skill | Submitted By | Tags | Description | Links |
| --- | --- | --- | --- | --- |
<!-- surfmind:awesome-table:end -->

## Entries

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
`;

test("parses collapsed community skill entries", () => {
  const skills = parseCommunitySkills(exampleMarkdown, "awesome-skills.md");

  assert.deepEqual(skills, [
    {
      title: "Acme Research Assistant",
      url: "https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant",
      shortDescription:
        "Research assistant for technical blogs, docs, and papers.",
      submittedBy: "acme",
      tags: ["research", "learning"],
      promotion: {
        text: "Built by Acme for technical research workflows.",
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
    /\| \[Acme Research Assistant\]\(https:\/\/github\.com\/acme\/surfmind-skills\/tree\/main\/skills\/research-assistant\) \| acme \| Reading & Research, Learning & Tutoring \| Research assistant for technical blogs, docs, and papers\. \| \[Website\]\(https:\/\/acme\.example\) · \[Demo\]\(https:\/\/acme\.example\/demo\) \|/,
  );
});

test("allows community skills to explicitly have no tags", () => {
  const untagged = exampleMarkdown.replace(
    "tags:\n  - research\n  - learning",
    "tags: []",
  );

  const skills = parseCommunitySkills(untagged, "awesome-skills.md");

  assert.deepEqual(skills[0]?.tags, []);
});

test("allows community skills without a promotion object", () => {
  const withoutPromotion = exampleMarkdown.replace(
    `promotion:
  text: Built by Acme for technical research workflows.
  website: https://acme.example
  links:
    - label: Demo
      url: https://acme.example/demo
`,
    "",
  );

  const skills = parseCommunitySkills(withoutPromotion, "awesome-skills.md");

  assert.equal(skills[0]?.promotion, undefined);
});

test("rejects unknown community skill tags", () => {
  const unknownTag = exampleMarkdown.replace("  - learning", "  - nope");

  assert.throws(
    () => parseCommunitySkills(unknownTag, "awesome-skills.md"),
    /Unknown tag "nope"/i,
  );
});

test("rejects duplicate community skill URLs", () => {
  const duplicated = `${exampleMarkdown}
<details>
<summary><strong>Another Entry</strong></summary>

<!-- surfmind:community-skill
url: https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant
shortDescription: Duplicate URL.
submittedBy: "someone"
tags: []
-->

</details>
`;

  assert.throws(
    () => parseCommunitySkills(duplicated, "awesome-skills.md"),
    /duplicate url/i,
  );
});

test("rejects repo root URLs because url must point to a skill folder", () => {
  const repoRoot = exampleMarkdown.replace(
    "https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant",
    "https://github.com/acme/surfmind-skills",
  );

  assert.throws(
    () => parseCommunitySkills(repoRoot, "awesome-skills.md"),
    /url must be a GitHub skill folder URL/i,
  );
});

test("rejects SKILL.md file URLs because url must point to a skill folder", () => {
  const skillFile = exampleMarkdown.replace(
    "https://github.com/acme/surfmind-skills/tree/main/skills/research-assistant",
    "https://github.com/acme/surfmind-skills/blob/main/skills/research-assistant/SKILL.md",
  );

  assert.throws(
    () => parseCommunitySkills(skillFile, "awesome-skills.md"),
    /url must be a GitHub skill folder URL/i,
  );
});
