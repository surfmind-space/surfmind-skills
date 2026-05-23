import { listSkillSlugs, readSkill } from "./skills.js";

const rootDir = process.cwd();
const slugs = listSkillSlugs(rootDir);

if (slugs.length === 0) {
  throw new Error("No skills found under skills/");
}

for (const slug of slugs) {
  readSkill(rootDir, slug);
  console.log(`Validated skills/${slug}/SKILL.md`);
}

console.log(`Validated ${slugs.length} skills.`);
