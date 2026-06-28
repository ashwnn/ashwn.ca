import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getPostBySlug, getPostList } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPostList();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxModule = await import(`@/content/blog/${post.slug}.mdx`);
  const Post = mdxModule.default;
  const mdxMetadata =
    typeof mdxModule.metadata === "object" && mdxModule.metadata
      ? mdxModule.metadata
      : {};
  const footnotes: string[] = Array.isArray(mdxMetadata.footnotes)
    ? mdxMetadata.footnotes.map(String)
    : [];

  return (
    <article className="space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 py-2 text-[10px] uppercase tracking-[0.14em] text-zinc-400 transition-colors hover:text-zinc-200 font-mono"
      >
        <span aria-hidden="true">←</span>
        Writings
      </Link>

      <header className="space-y-3 border-b border-zinc-800 pb-5">
        <h1 className="text-2xl uppercase tracking-[0.08em] text-zinc-100 font-mono">
          {post.title}
        </h1>

        <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500 font-mono">
          {post.date} · {post.readTime}
        </p>

        {post.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="border border-zinc-800 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-mono"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="article-content">
        <Post />
      </div>

      {footnotes.length > 0 ? (
        <section className="border-t border-zinc-800 pt-6">
          <h2 className="mb-4 text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-mono">
            Footnotes
          </h2>
          <ol className="space-y-3">
            {footnotes.map((note, index) => (
              <li key={`note-${index}`} className="flex gap-3 text-xs text-zinc-500">
                <span className="shrink-0 text-zinc-600">[{index + 1}]</span>
                <span>{note}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </article>
  );
}
