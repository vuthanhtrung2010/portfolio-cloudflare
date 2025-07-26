import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
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

export async function getAllPosts(env: Env): Promise<Post[]> {
  const slugs = await getSlugList(env);
  return Promise.all(
    slugs.map(async (slug) => {
      const object = await env.portfolio_blog.get(`${slug}.mdx`);
      if (!object) throw new Error(`Missing ${slug}.mdx`);
      const raw = await object.text();
      const matterResult = matter(raw);
      const parse = metadataSchema.safeParse(matterResult.data);
      if (!parse.success) {
        throw new Error(`Invalid metadata for ${slug}: ${JSON.stringify(parse.error.format())}`);
      }
      const metadata = parse.data;
      const source = await markdownToHTML(matterResult.content);
      return { slug, metadata, source };
    })
  );
}
