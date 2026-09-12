import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "@/data/hi-posts.json";

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
      canonical: `/hi/${post.slug}`,
      languages: {
        en: `/${post.slug}`,
        hi: `/hi/${post.slug}`,
      },
    },

    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/hi/${post.slug}`,
    },
  };
}

export default async function HindiBlogPost({ params }) {
  const { slug } = await params;

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return <h1>पोस्ट नहीं मिली</h1>;
  }

  return (
    <main className="article-page">
      <div className="article-container">

        <Link href="/" className="back-link">
          ← लेखों पर वापस जाएं
        </Link>

        <header className="article-header">
          <p className="article-category">एआई · वेब · एसईओ</p>

          <h1>{post.title}</h1>

          <p className="article-description">
            {post.description}
          </p>

          <div className="article-meta">
            <span>लेखक: {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </header>

        <div className="article-divider" />

        <article className="article-content">
          <p>{post.content}</p>
        </article>

        <div className="article-footer">
          <Link href={`/${post.slug}`} className="language-button">
            Read in English →
          </Link>

          <Link href="/" className="back-link">
            ← और लेख पढ़ें
          </Link>
        </div>

      </div>
    </main>
  );
}