import { existsSync } from "node:fs";
import path from "node:path";
import { readAwesomeSkills } from "./community-skills.js";
import {
  getDiffRange,
  getChangedSkillDiff,
  getSkillCommitDate,
  getSkillCommitSha,
  getSkillTreeSha,
  getSourceBranch,
  getSourceRepoUrl,
  git,
} from "./git.js";
import { readSkill, type NormalizedSkill } from "./skills.js";

const SLUG_NAMESPACE = "surfmind";

const rootDir = process.cwd();
const apiUrl = requiredEnv("SURFMIND_API_URL").replace(/\/$/, "");
const adminApiKey = requiredEnv("SKILLS_ADMIN_API_KEY");
const repoUrl = getSourceRepoUrl();
const sourceBranch = getSourceBranch();
const githubStars = await fetchGitHubStars(repoUrl);
const changedSkills = getChangedSkills(rootDir);
const awesomeSkillsChanged = hasChangedFile("awesome-skills.md");

if (
  changedSkills.active.length === 0 &&
  changedSkills.deleted.length === 0 &&
  !awesomeSkillsChanged
) {
  console.log("No changed skills found.");
  process.exit(0);
}

for (const name of changedSkills.deleted) {
  const slug = namespacedSlug(name);
  await postJson(`${apiUrl}/skills/admin/deprecate`, { slug });
  console.log(`Deprecated ${slug}`);
}

for (const name of changedSkills.active) {
  const skill = readSkill(rootDir, name);
  const payload = buildPublishPayload(name, skill);

  await postJson(`${apiUrl}/skills/admin/upsert`, payload);
  console.log(`Published ${payload.slug} (${payload.sourceTreeSha})`);
}

if (awesomeSkillsChanged) {
  const communitySkills = readAwesomeSkills(
    path.join(rootDir, "awesome-skills.md"),
  );
  if (communitySkills.length === 0) {
    console.log("No community skills found in awesome-skills.md.");
  } else {
    const result = await postJson(`${apiUrl}/skills/admin/import`, {
      skills: communitySkills.map((skill) => ({
        url: skill.url,
        tags: skill.tags,
        communityProfile: {
          submittedBy: skill.submittedBy,
          promotion: skill.promotion,
        },
      })),
    });
    console.log(
      `Imported community skills from awesome-skills.md: ${JSON.stringify(
        result,
      )}`,
    );
  }
}

type PublishSkillPayload = NormalizedSkill & {
  sourceType: "native";
  sourceRepoUrl: string;
  sourcePath: string;
  sourceBranch: string;
  sourceTreeSha: string;
  sourceCommitSha: string;
  sourceUpdatedAt: string;
  githubStars: number | null;
};

function buildPublishPayload(
  name: string,
  skill: NormalizedSkill,
): PublishSkillPayload {
  return {
    ...skill,
    slug: namespacedSlug(name),
    sourceType: "native",
    sourceRepoUrl: repoUrl,
    sourcePath: `skills/${name}`,
    sourceBranch,
    sourceTreeSha: getSkillTreeSha(name),
    sourceCommitSha: getSkillCommitSha(name),
    sourceUpdatedAt: getSkillCommitDate(name),
    githubStars,
  };
}

function namespacedSlug(name: string): string {
  return `${SLUG_NAMESPACE}/${name}`;
}

function getChangedSkills(rootDir: string): {
  active: string[];
  deleted: string[];
} {
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
  const [, name] = filePath?.split("/") ?? [];
  return name || null;
}

async function fetchGitHubStars(url: string): Promise<number | null> {
  const match = /github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?(?:\/|$)/.exec(url);
  if (!match) return null;
  const [, owner, repo] = match;
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": "surfmind-skills-publish",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers },
    );
    if (!response.ok) {
      console.warn(
        `Could not fetch stars for ${owner}/${repo}: ${response.status}`,
      );
      return null;
    }
    const body = (await response.json()) as { stargazers_count?: number };
    return typeof body.stargazers_count === "number"
      ? body.stargazers_count
      : null;
  } catch (error) {
    console.warn(
      `Could not fetch stars for ${owner}/${repo}: ${(error as Error).message}`,
    );
    return null;
  }
}

async function postJson(
  url: string,
  payload:
    | { slug: string }
    | PublishSkillPayload
    | {
        skills: Array<{
          url: string;
          tags?: string[];
          communityProfile: {
            submittedBy: string;
            promotion?: {
              text?: string;
              website?: string;
              links: Array<{ label: string; url: string }>;
            };
          };
        }>;
      },
): Promise<unknown> {
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

  return response.json();
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function hasChangedFile(filePath: string): boolean {
  const output = git([
    "diff",
    "--name-only",
    getDiffRange({ publish: true }),
    "--",
    filePath,
  ]);

  return output.split("\n").includes(filePath);
}
