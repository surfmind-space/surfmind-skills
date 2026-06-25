import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { validateReadmeMarkdown } from "./catalog.js";
import {
  parseCommunitySkills,
  validateAwesomeSkillsMarkdown,
} from "./community-skills.js";
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
}
console.log(`Validated ${slugs.length} surfmind skills.`);

if (existsSync(readmePath)) {
  validateReadmeMarkdown(rootDir, readFileSync(readmePath, "utf8"));
  console.log("Validated README.md official skills table.");
}

if (existsSync(awesomeSkillsPath)) {
  const content = readFileSync(awesomeSkillsPath, "utf8");

  const communitySkills = parseCommunitySkills(content, "awesome-skills.md");
  console.log(`Validated ${communitySkills.length} community skills.`);

  validateAwesomeSkillsMarkdown(content, "awesome-skills.md");
  console.log("Validated awesome-skills.md community skills table.");
}
