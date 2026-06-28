import fs from "node:fs/promises";
import path from "node:path";

export type BlogPost = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  slug: string;
  draft: boolean;
  readTime: string;
  coverImage: string | null;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export function stripMetadataExport(source: string): string {
  const match = source.match(/export\s+const\s+metadata\s*=\s*\{/);
  if (!match || match.index === undefined) return source;
  const openIdx = match.index + match[0].length - 1;
  let depth = 0;
  let closeIdx = -1;
  for (let i = openIdx; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) { closeIdx = i; break; }
    }
  }
  if (closeIdx === -1) return source;
  const after = source.slice(closeIdx + 1).replace(/^\s*;?\s*\n?/, "");
  return source.slice(0, match.index) + after;
}

export function computeReadTime(rawContent: string): string {
  const content = stripMetadataExport(rawContent);
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function normalizePost(
  data: Record<string, unknown>,
  slug: string,
  readTime = "1 min read"
): BlogPost {
  return {
    title: String(data.title ?? titleFromSlug(slug)),
    date: String(data.date ?? "1970-01-01"),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    slug: String(data.slug ?? slug),
    draft: Boolean(data.draft ?? false),
    readTime,
    coverImage:
      typeof data.cover_image === "string" ? data.cover_image : null,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const mdxModule = await import(`@/content/blog/${slug}.mdx`);
    const metadata =
      typeof mdxModule.metadata === "object" && mdxModule.metadata
        ? mdxModule.metadata
        : {};

    let readTime = "1 min read";
    try {
      const filePath = path.join(postsDirectory, `${slug}.mdx`);
      const fileContents = await fs.readFile(filePath, "utf8");
      readTime = computeReadTime(fileContents);
    } catch {
      // Fall back to default read time
    }

    return normalizePost(metadata, slug, readTime);
  } catch {
    return null;
  }
}

export async function getPostList(): Promise<BlogPost[]> {
  let entries: string[] = [];

  try {
    entries = await fs.readdir(postsDirectory);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".mdx"))
      .map(async (entry) => {
        const slug = entry.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, entry);
        const mdxModule = await import(`@/content/blog/${slug}.mdx`);
        const metadata =
          typeof mdxModule.metadata === "object" && mdxModule.metadata
            ? mdxModule.metadata
            : {};

        let readTime = "1 min read";
        try {
          const fileContents = await fs.readFile(fullPath, "utf8");
          readTime = computeReadTime(fileContents);
        } catch {
          // Fall back to default read time
        }

        return normalizePost(metadata, slug, readTime);
      })
  );

  const visible = posts.filter((post) => {
    if (process.env.NODE_ENV === "production") {
      return !post.draft;
    }
    return true;
  });

  return visible.sort((a, b) => (a.date < b.date ? 1 : -1));
}
