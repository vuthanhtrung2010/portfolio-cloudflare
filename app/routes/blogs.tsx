import { getAllPosts } from "~/data/blog";
import { BlurFade } from "~/components/magicui/blur-fade";
import { Link } from "react-router";
import type { Route } from "./+types/blogs";

export type BlogPost = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
};

export async function loader({ context }: Route.LoaderArgs) {
    const posts = await getAllPosts(context.cloudflare.env);
    return Response.json(posts);
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const posts: BlogPost[] = loaderData;

  const sorted = [...posts].sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() -
    new Date(a.metadata.publishedAt).getTime()
  );

  const BLUR_FADE_DELAY = 0.04;

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Trung's Blog Post</h1>
      </BlurFade>
      {sorted.map((post, idx) => (
        <BlurFade delay={BLUR_FADE_DELAY * 2 + idx * 0.05} key={post.slug}>
          <Link
            className="flex flex-col space-y-1 mb-4"
            to={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="tracking-tight">{post.metadata.title}</p>
              <p className="h-6 text-xs text-muted-foreground">
                {post.metadata.publishedAt}
              </p>
            </div>
          </Link>
        </BlurFade>
      ))}
    </section>
  );
}
