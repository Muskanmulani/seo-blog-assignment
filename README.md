# Muskan.dev — Multilingual SEO Blog

A statically generated, multilingual blog built with **Next.js**, featuring JSON-based content, build-time Hindi translation using **Google Gemini**, and a complete SEO setup.

**Live Website:** https://muskandev.pages.dev
**GitHub Repository:** https://github.com/Muskanmulani/seo-blog-assignment

---

## 🚀 Overview

Muskan.dev is a multilingual technical blog focused on **AI, web development, and SEO**.

The project was built as a Web Development & AI Powered SEO Intern assignment with the goal of creating a fast, SEO-friendly, statically generated website where new blog posts can be added through JSON without manually creating individual routes.

### Key Features

* ⚡ Static Site Generation using Next.js
* 🌍 English and Hindi versions of every article
* 🤖 Build-time Hindi translation using Google Gemini
* 📝 JSON-based blog content — no CMS or database
* 🔗 Automatic dynamic routing from post slugs
* 🔍 SEO metadata for every article
* 🌐 Canonical URLs and `hreflang`
* 📱 Open Graph metadata for social sharing
* 🗺️ Automatically generated `sitemap.xml`
* 🤖 Automatically generated `robots.txt`
* ☁️ Cloudflare Pages deployment
* 🔄 Automatic GitHub → Cloudflare deployment using GitHub Actions
* 📦 Static HTML export for production

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16
* React
* JavaScript
* Tailwind CSS

### Content

* JSON
* Google Gemini API

### Deployment

* Cloudflare Pages
* GitHub
* GitHub Actions
* Wrangler

---

## 📁 Project Structure

```text
seo-blog-assignment/
│
├── app/
│   ├── [slug]/
│   │   └── page.js
│   │
│   ├── hi/
│   │   └── [slug]/
│   │       └── page.js
│   │
│   ├── layout.js
│   ├── page.js
│   ├── sitemap.js
│   └── robots.js
│
├── data/
│   ├── posts.json
│   └── hi-posts.json
│
├── scripts/
│   └── translate.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
├── next.config.mjs
├── package.json
└── README.md
```

---

## 📝 Content Architecture

Blog content is stored in:

```text
data/posts.json
```

Each post contains fields such as:

```json
{
  "slug": "future-of-generative-ai",
  "title": "The Future of Generative AI",
  "description": "An introduction to the future of generative AI.",
  "content": "...",
  "author": "Muskan",
  "date": "2026-09-01"
}
```

The dynamic route:

```text
app/[slug]/page.js
```

uses the slug to find the corresponding post.

This means a new JSON entry automatically becomes a new blog page without manually creating a new route.

---

## ⚡ Static Site Generation

The project uses Next.js App Router with:

```js
generateStaticParams()
```

The function reads the available post slugs from the JSON data and tells Next.js which dynamic pages should be generated during the build.

For example:

```text
/future-of-generative-ai
/beginner-guide-to-technical-seo
/how-static-websites-work
```

are generated as static pages during:

```bash
npm run build
```

The project uses static export:

```js
output: "export"
```

The generated static files are placed in:

```text
out/
```

The production build confirms:

```text
● (SSG) prerendered as static HTML (uses generateStaticParams)
```

This ensures the deployed website can be served as static assets without requiring a server or database.

---

## 🌍 Multilingual Architecture

The website supports:

### English

```text
/your-slug
```

### Hindi

```text
/hi/your-slug
```

For example:

```text
/future-of-generative-ai
/hi/future-of-generative-ai
```

Hindi translations are stored separately in:

```text
data/hi-posts.json
```

---

## 🤖 Build-Time AI Translation

Hindi translations are generated using the **Google Gemini API**.

The translation script is:

```text
scripts/translate.js
```

It runs automatically before the production build through the `prebuild` script:

```json
"prebuild": "node scripts/translate.js"
```

The process works as follows:

```text
English JSON
     ↓
Translation Script
     ↓
Google Gemini
     ↓
Hindi JSON
     ↓
Next.js SSG
     ↓
Static Hindi Pages
```

### Translation Optimization

Existing Hindi translations are reused when available.

This prevents the build from unnecessarily sending the same content to the Gemini API repeatedly.

When a new English post is added, the translation script can generate the corresponding Hindi version during the next build.

---

## 🔍 SEO Implementation

### Metadata

Each page dynamically generates metadata based on its content.

This includes:

* Page title
* Description
* Canonical URL
* Open Graph metadata
* Language alternatives

### Canonical URLs

Canonical URLs identify the preferred version of a page and help search engines avoid duplicate-content issues.

### Open Graph

Open Graph metadata improves how pages appear when shared on platforms such as social media and messaging applications.

### Hreflang

English and Hindi pages reference each other using language alternatives.

This helps search engines understand that:

```text
/page
```

and:

```text
/hi/page
```

are language variants of the same content.

### Sitemap

The project generates:

```text
/sitemap.xml
```

It contains the homepage along with English and Hindi article URLs.

### Robots

The project generates:

```text
/robots.txt
```

It allows search engine crawlers to access the site and points them to the sitemap.

---

## ☁️ Deployment

The website is deployed on **Cloudflare Pages**.

Live URL:

**https://muskandev.pages.dev**

The project uses a static export, with the production build generating files in:

```text
out/
```

---

## 🔄 Automatic Deployment

GitHub Actions is configured to automatically deploy the website whenever changes are pushed to the `main` branch.

Workflow:

```text
GitHub Push
     ↓
GitHub Actions
     ↓
Install Dependencies
     ↓
Run Translation Script
     ↓
Next.js Production Build
     ↓
Generate out/
     ↓
Wrangler
     ↓
Cloudflare Pages
```

The workflow is located at:

```text
.github/workflows/deploy.yml
```

This means adding a new post to the JSON data and pushing the change to GitHub automatically triggers a new production build and deployment.

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Muskanmulani/seo-blog-assignment.git
```

### 2. Enter the project

```bash
cd seo-blog-assignment
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the Gemini API

Create:

```text
.env.local
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env.local` to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

To create the production static build:

```bash
npm run build
```

The generated static website will be available in:

```text
out/
```

The build performs:

1. Hindi translation generation/reuse
2. Next.js production compilation
3. Static page generation
4. Sitemap generation
5. Robots file generation
6. Static export

---

## ➕ Adding a New Blog Post

To add a new article:

1. Open:

```text
data/posts.json
```

2. Add a new post with a unique `slug`.

Example:

```json
{
  "slug": "introduction-to-ai-agents",
  "title": "Introduction to AI Agents",
  "description": "A beginner-friendly introduction to AI agents.",
  "content": "Your article content here...",
  "author": "Muskan",
  "date": "2026-09-12"
}
```

3. Run:

```bash
npm run build
```

The system will:

* detect the new post
* generate its Hindi translation using Gemini
* generate the English static page
* generate the Hindi static page
* include the URLs in the sitemap

No manual route creation is required.

---

## 🔐 Environment Variables

The project uses:

```text
GEMINI_API_KEY
```

The API key is stored locally in `.env.local` and is excluded from Git using `.gitignore`.

Cloudflare deployment credentials are stored securely as GitHub repository secrets:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

These values are never committed to the repository.

---

## 🧠 Key Design Decisions

### JSON instead of a CMS/database

The assignment specifically required JSON-based content. Keeping content in JSON also makes the architecture simple and compatible with static generation.

### Build-time translation

Translation is performed before the Next.js build so that Hindi pages are also generated as static HTML.

### Dynamic routing

Using `[slug]` with `generateStaticParams()` allows the system to automatically generate pages for new JSON entries without manually creating route files.

### Static export

Static export reduces infrastructure requirements and allows the application to be deployed as static assets through Cloudflare Pages.

### GitHub Actions

GitHub Actions bridges the gap between the source repository and Cloudflare Pages, ensuring that pushes to `main` automatically trigger a new build and deployment.

---

## 🚧 Possible Future Improvements

* Add more languages using the same translation pipeline
* Add richer Open Graph images for individual posts
* Add article categories and tags
* Add RSS feed support
* Add search functionality
* Add reading-time estimates
* Add analytics and Search Console integration
* Move content to a headless CMS if editorial workflows become necessary
* Add automated SEO and broken-link tests to CI

---

## 🤖 AI Tools Used

Google Gemini was used through its API for build-time Hindi translation.

AI assistance was also used during development for:

* debugging implementation issues
* understanding Next.js static generation
* improving project structure
* troubleshooting deployment configuration
* reviewing SEO implementation

AI-generated code was reviewed, tested locally, and verified through production builds before deployment.

---

## 📄 Assignment Deliverables

| Requirement              | Status      |
| ------------------------ | ----------- |
| Next.js blog             | ✅           |
| Static Site Generation   | ✅           |
| JSON content             | ✅           |
| Dynamic routing          | ✅           |
| English pages            | ✅           |
| Hindi pages              | ✅           |
| Build-time translation   | ✅           |
| SEO metadata             | ✅           |
| Canonical URLs           | ✅           |
| Open Graph               | ✅           |
| Hreflang                 | ✅           |
| Sitemap                  | ✅           |
| Robots.txt               | ✅           |
| Cloudflare Pages         | ✅           |
| Automatic deployment     | ✅           |
| Public GitHub repository | ✅           |
| PDF writeup              | In progress |

---

## 👩‍💻 Author

**Muskan Mulani**

Computer Science & Engineering
KJEI'S Trinity Academy Of Engineering, Pune

GitHub: https://github.com/Muskanmulani
