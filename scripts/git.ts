import { execFileSync } from "node:child_process";

export type DiffStatus = {
  status: string;
  paths: string[];
};

export function git(args: string[]): string {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

export function getDiffRange(options: {
  base?: string;
  head?: string;
  publish?: boolean;
}): string {
  if (options.base && options.head) {
    return options.publish
      ? `${options.base}..${options.head}`
      : `${options.base}...${options.head}`;
  }

  const before = process.env.GITHUB_EVENT_BEFORE;
  const sha = process.env.GITHUB_SHA;
  if (before && sha && !isAllZeroSha(before)) {
    return `${before}..${sha}`;
  }

  if (process.env.GITHUB_BASE_REF && sha) {
    return `origin/${process.env.GITHUB_BASE_REF}...${sha}`;
  }

  try {
    git(["rev-parse", "--verify", "HEAD^"]);
    return "HEAD^..HEAD";
  } catch {
    return "HEAD";
  }
}

export function getChangedSkillDiff(options: {
  base?: string;
  head?: string;
  publish?: boolean;
}): DiffStatus[] {
  const before = process.env.GITHUB_EVENT_BEFORE;
  const sha = process.env.GITHUB_SHA;

  if (!options.base && !options.head && before && sha && isAllZeroSha(before)) {
    return git(["ls-tree", "-r", "--name-only", sha, "--", "skills/"])
      .split("\n")
      .filter(Boolean)
      .map((filePath) => ({ status: "A", paths: [filePath] }));
  }

  const range = getDiffRange(options);
  const output = git([
    "diff",
    "--name-status",
    "--diff-filter=ACMRD",
    range,
    "--",
    "skills/",
  ]);

  return parseNameStatusOutput(output);
}

function parseNameStatusOutput(output: string): DiffStatus[] {
  if (!output) return [];

  return output.split("\n").map((line) => {
    const [status, ...paths] = line.split("\t");
    return { status, paths };
  });
}

export function getSkillTreeSha(slug: string): string {
  const output = git(["ls-tree", "HEAD", `skills/${slug}`]);
  const [, type, sha] = output.split(/\s+/);

  if (type !== "tree" || !sha) {
    throw new Error(`Could not resolve git tree SHA for skills/${slug}`);
  }

  return sha;
}

export function getSkillCommitDate(slug: string): string {
  const output = git([
    "log",
    "-1",
    "--format=%cI",
    "HEAD",
    "--",
    `skills/${slug}`,
  ]);

  if (!output) {
    throw new Error(`Could not resolve commit date for skills/${slug}`);
  }

  const date = new Date(output);
  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Could not parse commit date "${output}" for skills/${slug}`,
    );
  }

  return date.toISOString();
}

export function getSourceRepoUrl(): string {
  if (process.env.GITHUB_REPOSITORY) {
    return `https://github.com/${process.env.GITHUB_REPOSITORY}`;
  }

  const remote = git(["remote", "get-url", "origin"]);
  if (remote.startsWith("git@github.com:")) {
    return `https://github.com/${remote.slice("git@github.com:".length).replace(/\.git$/, "")}`;
  }

  return remote.replace(/\.git$/, "");
}

export function getSourceBranch(): string {
  return process.env.GITHUB_REF_NAME || git(["branch", "--show-current"]) || "main";
}

function isAllZeroSha(value: string): boolean {
  return /^0+$/.test(value);
}
