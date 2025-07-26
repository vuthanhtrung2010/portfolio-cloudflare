import { getPost } from "~/data/blog";
import { DATA } from "~/data/resume";
import { formatDate } from "~/lib/utils";
import { Suspense } from "react";
import type { Route } from "./+types/blog.$slug";
import { Link } from "react-router";

export async function loader({ params, context }: Route.LoaderArgs) {
    let post = await getPost(context.cloudflare.env, params.slug);
    if (!post) {
        throw new Response("Post not found", { status: 404 });
    }

    return post;
}

export default async function Blog({ loaderData }: Route.ComponentProps) {
  let post = loaderData;

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </section>
  );
}

export function ErrorBoundary() {
  return (
    <section className="text-center py-20">
      <h1 className="text-3xl font-bold mb-4">404 - Post Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The blog post you're looking for doesn't exist.
      </p>
      <Link to="/blogs" className="underline text-blue-600 hover:text-blue-800">
        ← Back to Blogs
      </Link>
    </section>
  );
}

