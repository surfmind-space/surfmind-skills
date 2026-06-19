import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseCommunitySkills,
  validateAwesomeSkillsMarkdown,
} from "./community-skills.js";
import { validateReadmeMarkdown } from "./catalog.js";
import { listSkillSlugs, readSkill } from "./skills.js";

const rootDir = process.cwd();
const slugs = listSkillSlugs(rootDir);
const awesomeSkillsPath = join(rootDir, "awesome-skills.md");
const readmePath = join(rootDir, "README.md");

if (slugs.length === 0) {
  throw new Error("No skills found under skills/");
}

for (const slug of slugs) {
  readSkill(rootDir, slug);
  console.log(`Validated skills/${slug}/SKILL.md`);
}

console.log(`Validated ${slugs.length} skills.`);

if (existsSync(readmePath)) {
  validateReadmeMarkdown(rootDir, readFileSync(readmePath, "utf8"));
  console.log("Validated README.md official skills table.");
}

if (existsSync(awesomeSkillsPath)) {
  const content = readFileSync(awesomeSkillsPath, "utf8");
  validateAwesomeSkillsMarkdown(content, "awesome-skills.md");
  const communitySkills = parseCommunitySkills(content, "awesome-skills.md");
  console.log(`Validated ${communitySkills.length} community skills.`);
}
