# Portfolio

A dynamic personal portfolio website built with **Astro**, powered by **Notion** as a CMS, and deployed to **Vercel**. Features a black/green dark theme with full light mode support.

## ✨ Features

- **Notion CMS** — Manage all content (profile, skills, projects, career, education) directly from Notion databases
- **Dynamic sections** — Hero, Skills, Projects, Career & Education, Contact
- **Dark/Light theme toggle** — Dark mode by default, persisted via `localStorage`
- **Contact form** — Powered by [Formspree](https://formspree.io)
- **Static site generation (SSG)** — Fast, pre-rendered pages via Astro
- **Vercel deployment** — Auto-deploy with optional Notion webhook integration
- **Responsive** — Mobile-first design using Tailwind CSS v4

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| [Astro 5](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [Notion API v2](https://developers.notion.com) | Content management |
| [Vercel](https://vercel.com) | Hosting & deployment |
| [Formspree](https://formspree.io) | Contact form backend |
| [tw-animate-css](https://github.com/jamiebuilds/tailwindcss-animate) | Animations |

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── HeroSection.astro
│   │   └── sections/
│   │       ├── SkillsSection.astro
│   │       ├── ProjectsSection.astro
│   │       ├── CareerEducationSection.astro
│   │       └── ContactSection.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── notion.ts          # Notion API fetch functions
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts           # TypeScript interfaces
├── .env.example
├── NOTION_SETUP.md            # Notion database setup guide
├── astro.config.mjs
└── package.json
```

## ⚙️ Setup

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```sh
cp .env.example .env
```

```env
NOTION_API_KEY=your_notion_integration_token
NOTION_PROFILE_DB_ID=your_profile_database_id
NOTION_SKILLS_DB_ID=your_skills_database_id
NOTION_PROJECTS_DB_ID=your_projects_database_id
NOTION_EXPERIENCE_DB_ID=your_experience_database_id
NOTION_EDUCATION_DB_ID=your_education_database_id
FORMSPREE_ID=your_formspree_form_id
```

See **[NOTION_SETUP.md](./NOTION_SETUP.md)** for a full guide on creating and structuring the Notion databases.

### 3. Run development server

```sh
npm run dev
# → http://localhost:4321
```

## 🧞 Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview production build locally            |

## 🚢 Deployment

This project is configured for **Vercel** deployment with the `@astrojs/vercel` adapter.

1. Push the repository to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add all environment variables from `.env` in the Vercel dashboard
4. Deploy — Vercel will automatically build on every push

### Auto-rebuild on Notion update (optional)

Create a Vercel Deploy Hook and trigger it via a Notion automation or webhook to rebuild the site whenever content changes in Notion.
