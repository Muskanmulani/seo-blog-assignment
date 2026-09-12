import Link from "next/link";
import posts from "@/data/posts.json";

export default function Home() {
  const featuredPost = posts[0];
  const latestPosts = posts.slice(1);

  return (
    <main className="home-page">
      <section className="hero">
        <p className="eyebrow">AI · WEB · SEO</p>

        <h1>
          Building the web
          <br />
          <span>with intelligence.</span>
        </h1>

        <p className="hero-description">
          Practical ideas on artificial intelligence, modern web development,
          and technical SEO for developers building the future.
        </p>

        <Link href="#articles" className="hero-button">
          Explore articles →
        </Link>
      </section>

      <section className="featured-section">
        <div className="section-label">FEATURED ARTICLE</div>

        <Link
          href={`/${featuredPost.slug}`}
          className="featured-card"
        >
          <div>
            <p className="post-category">AI / TECHNOLOGY</p>

            <h2>{featuredPost.title}</h2>

            <p>{featuredPost.description}</p>

            <span className="read-link">Read article →</span>
          </div>

          <div className="featured-number">01</div>
        </Link>
      </section>

      <section id="articles" className="articles-section">
        <div className="section-heading">
          <div>
            <div className="section-label">LATEST</div>
            <h2>Articles</h2>
          </div>

          <p>
            Exploring ideas across AI,
            <br />
            engineering and the web.
          </p>
        </div>

        <div className="articles-grid">
          {latestPosts.map((post, index) => (
            <Link
              href={`/${post.slug}`}
              key={post.slug}
              className="article-card"
            >
              <div className="article-card-top">
                <span>0{index + 2}</span>
                <span>{post.date}</span>
              </div>

              <h3>{post.title}</h3>

              <p>{post.description}</p>

              <span className="read-link">Read more →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}