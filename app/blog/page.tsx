import Link from "next/link";
import { getPostList } from "@/lib/blog";

export const metadata = {
  title: "Writings",
  description: "Notes on infrastructure, systems, and security.",
};

export default async function BlogPage() {
  const posts = await getPostList();

  return (
    <div>
      {posts.map((post) => {
        if (post.draft) {
          return (
            <div
              key={post.slug}
              aria-disabled="true"
              className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-zinc-900 opacity-45 transition-colors"
            >
              <span className="sm:w-24 sm:col-span-1 text-zinc-600 font-mono text-xs shrink-0">
                {post.date}
              </span>
              <span className="sm:flex-1 text-zinc-500 font-mono mt-0.5 sm:mt-0 sm:ml-4">
                {post.title}{" "}
                <em className="not-italic text-zinc-600">(draft)</em>
              </span>
              <span className="sm:w-16 sm:text-right text-zinc-600 font-mono text-xs shrink-0 mt-1 sm:mt-0">
                {post.readTime}
              </span>
            </div>
          );
        }

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-zinc-900 group hover:bg-zinc-900/40 transition-colors"
            data-umami-event="blog-list-click"
            data-umami-event-slug={post.slug}
          >
            <span className="sm:w-24 sm:col-span-1 text-zinc-500 font-mono text-xs shrink-0">
              {post.date}
            </span>
            <span className="sm:flex-1 text-zinc-300 font-mono mt-0.5 sm:mt-0 sm:ml-4">
              {post.title}
              <span className="ml-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 text-zinc-400 font-mono text-xs">
                [Read]
              </span>
            </span>
            <span className="sm:w-16 sm:text-right text-zinc-500 font-mono text-xs shrink-0 mt-1 sm:mt-0">
              {post.readTime}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
