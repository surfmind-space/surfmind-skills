import { join } from "node:path";
import { writeGeneratedReadme } from "./catalog.js";
import { writeGeneratedAwesomeSkills } from "./community-skills.js";

const rootDir = process.cwd();

writeGeneratedReadme(rootDir);
writeGeneratedAwesomeSkills(join(rootDir, "awesome-skills.md"));
console.log("Generated README.md and awesome-skills.md tables.");
