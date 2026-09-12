import posts from "@/data/posts.json";
import hindiPosts from "@/data/hi-posts.json";
export const dynamic = "force-static";
export default function sitemap() {
  const baseUrl = "https://muskandev.pages.dev";

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