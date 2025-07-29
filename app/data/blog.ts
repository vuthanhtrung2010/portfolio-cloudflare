import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import { z } from "zod";

export type Post = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
  source: string;
  rawContent: string; // Add raw markdown content for client-side processing
};

const metadataSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  summary: z.string(),
  image: z.string().optional(),
});

async function markdownToHTML(markdown: string): Promise<string> {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return p.toString();
}

async function getSlugList(env: Env): Promise<string[]> {
  const slugs: string[] = [];
  let cursor: string | undefined;
  do {
    const res = await env.portfolio_blog.list({ cursor });
    for (const item of res.objects) {
      if (item.key?.endsWith(".mdx")) {
        slugs.push(item.key.slice(0, -4));
      }
    }
    cursor = res.truncated ? res.cursor : undefined;
  } while (cursor);
  return slugs;
}

/**
 * Fetches and parses a single post by slug from R2
 */
export async function getPost(env: Env, slug: string): Promise<Post> {
  const key = `${slug}.mdx`;
  const object = await env.portfolio_blog.get(key);
  if (!object) {
    throw new Error(`Post not found: ${slug}`);
  }
  const raw = await object.text();
  const matterResult = matter(raw);
  const parse = metadataSchema.safeParse(matterResult.data);
  if (!parse.success) {
    throw new Error(`Invalid metadata for ${slug}: ${JSON.stringify(parse.error.format())}`);
  }
  const metadata = parse.data;
  const source = await markdownToHTML(matterResult.content);
  return { slug, metadata, source, rawContent: matterResult.content };
}

/**
 * Lists all posts (with full metadata and HTML) from R2
 */
export async function getAllPosts(env: Env): Promise<Post[]> {
  const slugs = await getSlugList(env);
  return Promise.all(
    slugs.map(async (slug) => {
      return getPost(env, slug);
    })
  );
}
