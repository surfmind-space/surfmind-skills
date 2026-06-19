import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SKILL_TAG_CATEGORIES } from "./constants.js";
import { listSkillSlugs, readSkill } from "./skills.js";

const officialSkillsStart = "<!-- surfmind:official-skills:start -->";
const officialSkillsEnd = "<!-- surfmind:official-skills:end -->";

export function writeGeneratedReadme(rootDir: string): void {
  const readmePath = join(rootDir, "README.md");
  const content = readFileSync(readmePath, "utf8");
  writeFileSync(readmePath, generateReadmeMarkdown(rootDir, content));
}

export function validateReadmeMarkdown(
  rootDir: string,
  content: string,
  filePath = "README.md",
): void {
  const generated = generateReadmeMarkdown(rootDir, content);
  if (generated !== content) {
    throw new Error(
      `${filePath}: official skills table is out of date. Run: npm run generate:catalog`,
    );
  }
}

export function generateReadmeMarkdown(
  rootDir: string,
  content: string,
): string {
  const table = buildOfficialSkillsTable(rootDir);

  if (
    !content.includes(officialSkillsStart) ||
    !content.includes(officialSkillsEnd)
  ) {
    throw new Error(
      `README.md: missing ${officialSkillsStart} / ${officialSkillsEnd} markers`,
    );
  }

  const pattern = new RegExp(
    `${escapeRegExp(officialSkillsStart)}[\\s\\S]*?${escapeRegExp(
      officialSkillsEnd,
    )}`,
  );

  return content.replace(
    pattern,
    `${officialSkillsStart}\n${table}\n${officialSkillsEnd}`,
  );
}

function buildOfficialSkillsTable(rootDir: string): string {
  const rows = [
    "| Skill | Categories | Description |",
    "| --- | --- | --- |",
  ];

  for (const slug of listSkillSlugs(rootDir)) {
    const skill = readSkill(rootDir, slug);
    const categories = skill.tags
      .map((tag) => SKILL_TAG_CATEGORIES[tag as keyof typeof SKILL_TAG_CATEGORIES])
      .filter(Boolean)
      .join(", ");

    rows.push(
      `| [${escapeTableCell(skill.name)}](./skills/${slug}/SKILL.md) | ${escapeTableCell(
        categories,
      )} | ${escapeTableCell(skill.description)} |`,
    );
  }

  return rows.join("\n");
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
