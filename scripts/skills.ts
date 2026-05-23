import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import { KNOWN_ACTION_MENU_PRESETS, KNOWN_PROMPT_ICONS } from "./constants.js";

export type ActionMenu =
  | { type: "preset"; name: string }
  | { type: "inline"; items: ActionMenuItem[] };

export type ActionMenuItem = {
  label: string;
  value: string;
};

export type NormalizedSkill = {
  slug: string;
  name: string;
  description: string;
  author: string | null;
  icon: string | null;
  action_menu: ActionMenu | null;
  prompt: string;
  files: string[];
};

const actionMenuItemSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

const frontmatterSchema = z
  .object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
    metadata: z
      .object({
        author: z.string().trim().min(1).optional().nullable(),
        icon: z.string().trim().min(1).optional().nullable(),
        actionMenu: z.unknown().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export function listSkillSlugs(rootDir: string): string[] {
  const skillsDir = join(rootDir, "skills");

  try {
    return readdirSync(skillsDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export function readSkill(rootDir: string, slug: string): NormalizedSkill {
  validateSlug(slug);

  const skillDir = join(rootDir, "skills", slug);
  const skillPath = join(skillDir, "SKILL.md");
  const content = readFileSync(skillPath, "utf8");
  const { frontmatter, body } = parseFrontmatter(content, skillPath);
  const metadata = normalizeFrontmatter(frontmatter, slug);

  return {
    slug,
    ...metadata,
    prompt: body.trim(),
    files: enumerateSkillFiles(skillDir),
  };
}

export function parseFrontmatter(
  content: string,
  filePath: string,
): { frontmatter: Record<string, unknown>; body: string } {
  if (!content.startsWith("---")) {
    throw new Error(`${filePath}: missing YAML frontmatter block`);
  }

  const match = /^---\r?\n([\s\S]*?)\r?\n(?:---|\.\.\.)\r?\n?([\s\S]*)$/.exec(
    content,
  );
  if (!match) {
    throw new Error(`${filePath}: frontmatter block must be closed with ---`);
  }

  const parsed = parseYaml(match[1]);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${filePath}: frontmatter must be a YAML object`);
  }

  return {
    frontmatter: parsed as Record<string, unknown>,
    body: match[2],
  };
}

function normalizeFrontmatter(
  rawFrontmatter: Record<string, unknown>,
  slug: string,
): Omit<NormalizedSkill, "slug" | "prompt" | "files"> {
  const frontmatter = frontmatterSchema.parse(rawFrontmatter);
  const raw = rawFrontmatter as Record<string, unknown>;
  const metadata = (raw.metadata ?? {}) as Record<string, unknown>;

  const author = nullableString(metadata.author);
  const icon = nullableString(metadata.icon);
  const actionMenu = normalizeActionMenu(metadata.actionMenu, slug);

  if (icon && !KNOWN_PROMPT_ICONS.includes(icon as never)) {
    throw new Error(
      `skills/${slug}/SKILL.md: unknown icon "${icon}". Expected one of: ${KNOWN_PROMPT_ICONS.join(", ")}`,
    );
  }

  return {
    name: frontmatter.name.trim(),
    description: frontmatter.description.trim(),
    author,
    icon,
    action_menu: actionMenu,
  };
}

function normalizeActionMenu(value: unknown, slug: string): ActionMenu | null {
  if (value === undefined || value === null || value === "") return null;

  if (typeof value === "string") {
    const name = value.trim();
    validatePreset(name, slug);
    return { type: "preset", name };
  }

  if (Array.isArray(value)) {
    const items = z.array(actionMenuItemSchema).min(1).parse(value);
    return { type: "inline", items };
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (record.type === "preset" && typeof record.name === "string") {
      const name = record.name.trim();
      validatePreset(name, slug);
      return { type: "preset", name };
    }

    if (record.type === "inline" && Array.isArray(record.items)) {
      const items = z.array(actionMenuItemSchema).min(1).parse(record.items);
      return { type: "inline", items };
    }
  }

  throw new Error(
    `skills/${slug}/SKILL.md: actionMenu must be a known preset string or an inline list of {label, value, prompt?}`,
  );
}

function validatePreset(name: string, slug: string): void {
  if (!KNOWN_ACTION_MENU_PRESETS.includes(name as never)) {
    throw new Error(
      `skills/${slug}/SKILL.md: unknown actionMenu preset "${name}". Expected one of: ${KNOWN_ACTION_MENU_PRESETS.join(", ")}`,
    );
  }
}

function enumerateSkillFiles(skillDir: string): string[] {
  const files: string[] = [];

  function visit(dir: string): void {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const absolutePath = join(dir, entry.name);
      const relativePath = toPosixPath(relative(skillDir, absolutePath));

      if (entry.isDirectory()) {
        visit(absolutePath);
        continue;
      }

      if (!entry.isFile() || relativePath === "SKILL.md") continue;

      validateSkillFilePath(relativePath);
      files.push(relativePath);
    }
  }

  visit(skillDir);
  return files.sort();
}

function validateSkillFilePath(path: string): string {
  if (
    path.length === 0 ||
    path.startsWith("/") ||
    path.startsWith("\\") ||
    path.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(path)
  ) {
    throw new Error(`Invalid skill file path: ${path}`);
  }

  const parts = path.split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) {
    throw new Error(`Invalid skill file path: ${path}`);
  }

  return path;
}

function validateSlug(slug: string): void {
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/.test(slug)) {
    throw new Error(`Invalid skill folder slug "${slug}"`);
  }
}

function nullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toPosixPath(path: string): string {
  return sep === "/" ? path : path.split(sep).join("/");
}
