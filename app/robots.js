export const dynamic = "force-static";

export default function robots() {
  const baseUrl = "https://your-domain.pages.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}