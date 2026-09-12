import posts from "@/data/posts.json";
import hindiPosts from "@/data/hi-posts.json";

export default function sitemap() {
  const baseUrl = "https://your-domain.pages.dev";

  const englishUrls = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
  }));

  const hindiUrls = hindiPosts.map((post) => ({
    url: `${baseUrl}/hi/${post.slug}`,
  }));

  return [
    {
      url: baseUrl,
    },
    ...englishUrls,
    ...hindiUrls,
  ];
}