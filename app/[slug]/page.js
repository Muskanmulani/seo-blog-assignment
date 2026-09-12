
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
  notFound();
}

  return {
    title: post.title,
    description: post.description,

    alternates: {
      canonical: `/${post.slug}`,
      languages: {
        en: `/${post.slug}`,
        hi: `/hi/${post.slug}`,
      },
    },

    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/${post.slug}`,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <main className="article-page">
      <div className="article-container">

        <Link href="/" className="back-link">
          ← Back to articles
        </Link>

        <header className="article-header">
          <p className="article-category">AI · WEB · SEO</p>

          <h1>{post.title}</h1>

          <p className="article-description">
            {post.description}
          </p>

          <div className="article-meta">
            <span>By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </header>

        <div className="article-divider" />

        <article className="article-content">
          <p>{post.content}</p>
        </article>

        <div className="article-footer">
          <Link href={`/hi/${post.slug}`} className="language-button">
            पढ़ें हिंदी में →
          </Link>

          <Link href="/" className="back-link">
            ← More articles
          </Link>
        </div>

      </div>
    </main>
  );
}