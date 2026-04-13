# webstackblog — WordPress + WPGraphQL + Next.js

A headless blog powered by **WordPress** (CMS) + **WPGraphQL** (API) + **Next.js 16** (frontend).  
Data is fetched via GraphQL — no REST API is used.

## ✨ Features

- **Homepage** — hero banner + responsive 3-column post grid matching the design spec
- **Single post page** — full WP HTML content, featured image, author, date, OG metadata
- **TypeScript** — fully typed interfaces for all WP data
- **Loading states** — animated skeleton cards while posts load
- **Error states** — friendly error banner with setup instructions
- **Testing** — Jest & React Testing Library integration with basic component tests
- **CI/CD** — GitHub Actions pipeline (linting, testing, and branch builds)
- **ISR** — pages revalidate every 60 seconds automatically
- **Responsive** — mobile-first, collapses to 1-column on small screens

---

## 📋 Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 9 |
| WordPress | ≥ 6.0 with WPGraphQL plugin |

---

## 🔌 WordPress Setup (WPGraphQL)

1. Log into your WordPress admin dashboard.
2. Go to **Plugins → Add New**.
3. Search for **"WPGraphQL"** and click **Install Now**, then **Activate**.
4. Once active, the GraphQL endpoint is available at:
   ```
   https://your-wordpress-site.com/graphql
   ```
5. You can explore your schema at **GraphQL → GraphiQL IDE** in the WP admin.

> **Tip:** Post featured images require the post to have a featured image set in WordPress. Author avatars are pulled from Gravatar via WPGraphQL.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Your WPGraphQL endpoint (required)
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

Replace `https://your-wordpress-site.com` with the URL of your **own** WordPress installation.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Set your WPGraphQL endpoint in .env (see above)

# 3. Start the dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 🧪 Testing

The project uses **Jest** and **React Testing Library** for component testing.

```bash
# Run unit tests
npm run test

# Run the linter
npm run lint
```

---

## 🏗️ Building for Production

```bash
npm run build
npm run start
```

---

## 🚀 CI/CD Pipeline

The project includes an automated CI/CD pipeline using **GitHub Actions**. It triggers on any push or pull request to the `main` branch. 

The pipeline ensures code quality by automatically validating:
1. Node dependency installations
2. Code linting rules (`npm run lint`)
3. Test suite execution (`npm run test`)
4. Production bundle builds (`npm run build`)

---

## 📁 Project Structure

```
webstackblog/
├── app/
│   ├── layout.tsx            # Root layout (Inter font, metadata)
│   ├── page.tsx              # Homepage (Navbar + Hero + PostGrid + Footer)
│   ├── globals.css           # Full design system CSS
│   └── posts/
│       └── [slug]/
│           ├── page.tsx      # Single post page (SSG)
│           ├── loading.tsx   # Skeleton loading state
│           └── error.tsx     # Error boundary
├── components/
│   ├── Navbar.tsx            # Sticky responsive navbar
│   ├── HeroSection.tsx       # Blue hero banner
│   ├── PostCard.tsx          # Individual blog post card
│   ├── PostCardSkeleton.tsx  # Loading skeleton card
│   ├── PostGrid.tsx          # Grid + error/empty states (Server Component)
│   └── Footer.tsx            # Site footer
├── lib/
│   ├── graphql.ts            # Typed fetchGraphQL helper
│   └── queries.ts            # GET_POSTS, GET_POST_BY_SLUG, GET_ALL_SLUGS
├── types/
│   └── wordpress.ts          # TypeScript interfaces for WPGraphQL data
└── public/
    └── hero-laptop.png       # Hero section illustration
```

---

## 🔗 Connecting WordPress to Next.js

The Next.js frontend fetches data from WordPress using the **WPGraphQL** plugin:

```
WordPress (CMS) ──WPGraphQL──► https://your-site.com/graphql
                                          │
                              Next.js fetchGraphQL()
                                          │
                              Server Components render pages
```

**No REST API is used.** All data fetching goes through the single `/graphql` endpoint using typed `POST` requests.

---

## 📸 Screenshots

Homepage with hero and post grid:
> Run `npm run dev` and visit `http://localhost:3000`

Single post page:
> Click any **Read More** link in the post grid

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| CMS | WordPress + Elementor |
| API | WPGraphQL |
| Frontend | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS (custom design system) |
| Testing | Jest, React Testing Library |
| CI/CD | GitHub Actions |
| Fonts | Inter (Google Fonts) |
| Images | Next.js Image Optimization |
| Rendering | SSG + ISR (60s revalidate) |
