import { readFileSync, writeFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

export type CommunitySkill = {
  title: string;
  skillUrl: string;
  submittedBy: string;
  promotion: {
    tagline: string;
    website?: string;
    links: Array<{ label: string; url: string }>;
  };
};

const awesomeTableStart = "<!-- surfmind:awesome-table:start -->";
const awesomeTableEnd = "<!-- surfmind:awesome-table:end -->";
const communitySkillPattern =
  /<!--\s*surfmind:community-skill\r?\n([\s\S]*?)-->/g;

const promotionLinkSchema = z.object({
  label: z.string().trim().min(1),
  url: z.string().trim().url(),
});

const communitySkillSchema = z.object({
  skillUrl: z.string().trim().url(),
  submittedBy: z.string().trim().min(1),
  promotion: z
    .object({
      tagline: z.string().trim().min(1),
      website: z.string().trim().url().optional(),
      links: z.array(promotionLinkSchema).optional().default([]),
    }),
});

export function readAwesomeSkills(filePath: string): CommunitySkill[] {
  return parseCommunitySkills(readFileSync(filePath, "utf8"), filePath);
}

export function writeGeneratedAwesomeSkills(filePath: string): void {
  const content = readFileSync(filePath, "utf8");
  writeFileSync(filePath, generateAwesomeSkillsMarkdown(content));
}

export function validateAwesomeSkillsMarkdown(
  content: string,
  filePath: string,
): void {
  const generated = generateAwesomeSkillsMarkdown(content);
  if (generated !== content) {
    throw new Error(
      `${filePath}: generated skills table is out of date. Run: npm run generate:catalog`,
    );
  }
}

export function generateAwesomeSkillsMarkdown(content: string): string {
  const skills = parseCommunitySkills(content, "awesome-skills.md");
  const table = buildSkillsTable(skills);

  if (!content.includes(awesomeTableStart) || !content.includes(awesomeTableEnd)) {
    throw new Error(
      `awesome-skills.md: missing ${awesomeTableStart} / ${awesomeTableEnd} markers`,
    );
  }

  const pattern = new RegExp(
    `${escapeRegExp(awesomeTableStart)}[\\s\\S]*?${escapeRegExp(awesomeTableEnd)}`,
  );

  return content.replace(
    pattern,
    `${awesomeTableStart}\n${table}\n${awesomeTableEnd}`,
  );
}

export function parseCommunitySkills(
  content: string,
  filePath: string,
): CommunitySkill[] {
  const skills: CommunitySkill[] = [];
  const seenUrls = new Set<string>();

  for (const match of content.matchAll(communitySkillPattern)) {
    const yaml = match[1];
    const index = match.index ?? 0;
    const parsed = communitySkillSchema.parse(parseYaml(yaml));
    const skillUrl = normalizeSkillFolderUrl(parsed.skillUrl.trim(), filePath);

    if (seenUrls.has(skillUrl)) {
      throw new Error(`${filePath}: duplicate skillUrl "${skillUrl}"`);
    }
    seenUrls.add(skillUrl);

    skills.push({
      title: readEntryTitle(content, index, filePath),
      skillUrl,
      submittedBy: parsed.submittedBy.trim(),
      promotion: {
        tagline: parsed.promotion.tagline.trim(),
        ...(parsed.promotion.website
          ? { website: parsed.promotion.website.trim() }
          : {}),
        links: parsed.promotion.links.map((link) => ({
          label: link.label.trim(),
          url: link.url.trim(),
        })),
      },
    });
  }

  return skills;
}

function buildSkillsTable(skills: CommunitySkill[]): string {
  const rows = [
    "| Skill | Submitted By | Tagline | Links |",
    "| --- | --- | --- | --- |",
  ];

  for (const skill of skills) {
    rows.push(
      `| [${escapeTableCell(skill.title)}](${skill.skillUrl}) | ${escapeTableCell(
        skill.submittedBy,
      )} | ${escapeTableCell(skill.promotion.tagline)} | ${formatLinks(skill)} |`,
    );
  }

  return rows.join("\n");
}

function formatLinks(skill: CommunitySkill): string {
  const links = [
    ...(skill.promotion.website
      ? [{ label: "Website", url: skill.promotion.website }]
      : []),
    ...skill.promotion.links,
  ];

  if (links.length === 0) return "";

  return links
    .map((link) => `[${escapeTableCell(link.label)}](${link.url})`)
    .join(" · ");
}

function readEntryTitle(content: string, index: number, filePath: string): string {
  const before = content.slice(0, index);
  const detailsStart = before.lastIndexOf("<details>");
  const detailsContent = detailsStart >= 0 ? before.slice(detailsStart) : before;
  const summaryMatch =
    /<summary>\s*(?:<strong>)?([^<]+)(?:<\/strong>)?\s*<\/summary>/i.exec(
      detailsContent,
    );
  const title = summaryMatch?.[1]?.trim();

  if (!title) {
    throw new Error(
      `${filePath}: community skill entries must have a <summary> title`,
    );
  }

  return title;
}

function normalizeSkillFolderUrl(url: string, filePath: string): string {
  const parsed = new URL(url);
  const parts = parsed.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const [, , view, branch, ...folderParts] = parts;
  const isSkillFolder =
    parsed.hostname === "github.com" &&
    parts.length >= 5 &&
    view === "tree" &&
    Boolean(branch) &&
    folderParts.length > 0 &&
    folderParts.at(-1) !== "SKILL.md";

  if (!isSkillFolder) {
    throw new Error(
      `${filePath}: skillUrl must be a GitHub skill folder URL, for example https://github.com/acme/repo/tree/main/skills/my-skill`,
    );
  }

  return url;
}

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
