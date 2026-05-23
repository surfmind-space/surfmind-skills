import { existsSync } from "node:fs";
import path from "node:path";
import {
  getChangedSkillDiff,
  getSkillCommitDate,
  getSkillTreeSha,
  getSourceBranch,
  getSourceRepoUrl,
} from "./git.js";
import { readSkill, type NormalizedSkill } from "./skills.js";

const rootDir = process.cwd();
const cloudUrl = requiredEnv("SURFMIND_CLOUD_URL").replace(/\/$/, "");
const adminApiKey = requiredEnv("SKILLS_ADMIN_API_KEY");
const changedSkills = getChangedSkills(rootDir);

if (changedSkills.active.length === 0 && changedSkills.deleted.length === 0) {
  console.log("No changed skills found.");
  process.exit(0);
}

for (const slug of changedSkills.deleted) {
  await postJson(`${cloudUrl}/api/skills/admin/deprecate`, { slug });
  console.log(`Deprecated ${slug}`);
}

for (const slug of changedSkills.active) {
  const skill = readSkill(rootDir, slug);
  const payload = buildPublishPayload(skill);

  await postJson(`${cloudUrl}/api/skills/admin/upsert`, payload);
  console.log(`Published ${slug} (${payload.source_tree_sha})`);
}

type PublishSkillPayload = NormalizedSkill & {
  source_type: "native";
  source_repo_url: string;
  source_path: string;
  source_branch: string;
  source_tree_sha: string;
  source_updated_at: string;
};

function buildPublishPayload(skill: NormalizedSkill): PublishSkillPayload {
  return {
    ...skill,
    source_type: "native",
    source_repo_url: getSourceRepoUrl(),
    source_path: `skills/${skill.slug}`,
    source_branch: getSourceBranch(),
    source_tree_sha: getSkillTreeSha(skill.slug),
    source_updated_at: getSkillCommitDate(skill.slug),
  };
}

function getChangedSkills(rootDir: string): { active: string[]; deleted: string[] } {
  const active = new Set<string>();
  const deleted = new Set<string>();

  for (const diff of getChangedSkillDiff({ publish: true })) {
    const oldSlug = getSlugFromPath(diff.paths[0]);
    const newSlug = getSlugFromPath(diff.paths.at(-1));

    if (diff.status.startsWith("R") && oldSlug && oldSlug !== newSlug) {
      deleted.add(oldSlug);
    }

    const slug = diff.status === "D" ? oldSlug : newSlug;
    if (!slug) continue;

    if (existsSync(path.join(rootDir, "skills", slug))) {
      active.add(slug);
      deleted.delete(slug);
    } else {
      deleted.add(slug);
      active.delete(slug);
    }
  }

  return {
    active: Array.from(active).sort(),
    deleted: Array.from(deleted).sort(),
  };
}

function getSlugFromPath(filePath: string | undefined): string | null {
  const [, slug] = filePath?.split("/") ?? [];
  return slug || null;
}

async function postJson(url: string, payload: { slug: string } | PublishSkillPayload): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${adminApiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`POST ${url} failed with ${response.status}: ${body}`);
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}
