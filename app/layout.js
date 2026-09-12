import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: {
    default: "Muskan.dev — AI, Web Development & SEO",
    template: "%s | Muskan.dev",
  },
  description:
    "A technology blog covering artificial intelligence, web development, and technical SEO.",
  openGraph: {
    title: "Muskan.dev — AI, Web Development & SEO",
    description:
      "Articles about artificial intelligence, web development, and technical SEO.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="nav-container">
            <Link href="/" className="logo">
              Muskan<span>.dev</span>
            </Link>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/#articles">Articles</Link>
              <Link href="/hi/future-of-generative-ai">हिन्दी</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <p>© 2026 Muskan.dev</p>
          <p>AI · Web Development · SEO</p>
        </footer>
      </body>
    </html>
  );
}