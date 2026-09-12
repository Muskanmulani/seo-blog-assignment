require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const postsPath = path.join(__dirname, "..", "data", "posts.json");
const hindiPostsPath = path.join(__dirname, "..", "data", "hi-posts.json");

const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

async function translatePost(post) {
  const prompt = `
Translate the following blog post from English to natural, readable Hindi.

Keep the slug exactly unchanged.
Translate the title, description, and content.
Do not add explanations.
Return ONLY valid JSON in this format:

{
  "slug": "${post.slug}",
  "title": "...",
  "description": "...",
  "content": "...",
  "author": "${post.author}",
  "date": "${post.date}"
}

English post:
Title: ${post.title}
Description: ${post.description}
Content: ${post.content}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text.trim();

  return JSON.parse(text.replace(/^```json\s*/, "").replace(/\s*```$/, ""));
}

async function main() {
  const translatedPosts = [];

  for (const post of posts) {
    console.log(`Translating: ${post.slug}`);

    const translatedPost = await translatePost(post);

    translatedPosts.push(translatedPost);
  }

  fs.writeFileSync(
    hindiPostsPath,
    JSON.stringify(translatedPosts, null, 2),
    "utf-8"
  );

  console.log("Hindi translations generated successfully.");
}

main().catch((error) => {
  console.error("Translation failed:", error);
  process.exit(1);
});