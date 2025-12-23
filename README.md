# Project Title: agreGând - News Aggregator Web App

## Description

agreGând is a modern Romanian-language news aggregator designed to simplify how users discover and consume news across multiple domains. Instead of jumping between websites, readers can browse the latest articles, filter by categories, and perform fast, intuitive searches, all within a unified interface.

## Features

- Recent News: The homepage includes a “Cele mai actuale” (Most recent) section, showcasing the latest articles aggregated across all sources. A dynamic banner or slider helps highlight important updates or featured content.

- Search System: users can search through the available articles using keywords. The search engine matches: titles, sources, categories. The results are dynamically loaded, debounced for smoother typing, and reflected directly in the URL ( /search/:query), making searches shareable and bookmarkable.

- Intuitive Navigation: the navigation bar lets users move instantly between pages: Home, News (with sub-pages for each source), Search, Resources, About Us.

- Filter by Source: in the News section, users can browse articles grouped by original source. Each news provider has: its own dedicated page, a list of recently published articles, a clean & scrollable layout. This makes it easy to stay updated with a specific publication.

- "See more" Buttons: throughout the app, “Vezi mai multe" buttons offer shortcuts to full article lists or filtered sections, helping users explore beyond previews and summaries.

- Resources & Contact Pages: additional pages such as "Resurse" and "Despre noi establish credibility, provide educational material, and describe the mission behind the platform.

- Responsive Layout: agreGând is designed for seamless use on phones, tablets, and desktops. The navigation menu adapts to mobile screens, ensuring everything remains readable and easy to access.

## [Demo](https://super-cactus-f34db6.netlify.app/)

## Used Tehnologies & Dependencies

- React 18+
- Vite
- SCSS/SASS
- React Router DOM
- Lucide React
- React Slick
- React Loader Spinner

## Getting Started

Follow the steps below to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Balteanu-Sara/agreGand.git
```

### 2. Navigate into the project folder

```bash
cd agreGând
```

### 3. Install dependencies

Make sure you have Node.js installed (recommended version: 18+).

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The app will run at: **http://localhost:5173**
