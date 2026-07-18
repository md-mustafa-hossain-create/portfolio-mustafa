# 📘 Developer & Architecture Documentation | MD Mustafa Hossain Portfolio

Welcome to the comprehensive technical documentation for **MD Mustafa Hossain's Developer Portfolio**. This document provides an in-depth breakdown of the application's design principles, architectural choices, features, codebase structure, and local/live deployment workflows.

---

## 📖 1. Project Overview & Design Philosophy

This project is a high-performance, single-page developer portfolio designed to showcase projects, skills, academics, and experience while serving as a practical demonstration of modern frontend techniques.

### Design Aesthetics & UI System
- **Dark-Mode-First System:** Built using rich dark charcoal (`bg-zinc-950`) and deep zinc tones to align with developer preferences and reduce eye strain.
- **Glassmorphism & Depth:** Leverages transparent, frosted-glass borders and layouts using native CSS variables (`glass` utilities) combined with backdrop-filters (`backdrop-blur-md` and `backdrop-blur-3xl`) to establish layout depth and hierarchies.
- **Subtle Micro-Animations:** Uses custom easing curves and spring physics via Framer Motion to animate tabs, button hover transitions, and card expansions without distracting from readability.
- **Mouse Spotlight Overlay:** Integrates a reactive cursor spotlight mask (`MouseSpotlight.jsx`) that follows user movement and highlights interactive card elements.

---

## ⚡ 2. Core Technology Stack

The application is built on top of a decoupled, modern frontend stack focused on performance, modularity, and scalability:

| Technology / Library | Version | Role in Application |
| :--- | :--- | :--- |
| **React** | `19.2.6` | Core UI engine, leveraging modern state hooks (`useContext`, `useMemo`, `useCallback`) and `lazy`/`Suspense` routing. |
| **Vite** | `8.0.12` | Build tool and bundler providing HMR (Hot Module Replacement) and optimized production compilation. |
| **Tailwind CSS** | `v4.3.0` | Utility-first CSS styling, managing theme colors, animations, responsive grids, and media queries. |
| **Framer Motion** | `12.40.0` | Custom animation physics, micro-interactions, and modal exit/entry transitions. |
| **Lenis Scroll** | `1.3.23` | High-fidelity smooth scrolling wrapper (`SmoothScroll.jsx`) to normalize scrolling across browsers. |
| **Google Generative AI** | `0.24.1` | Native SDK to directly call the **Gemini 2.5 Flash** model for context-aware developer chatbot assistant. |
| **Firebase SDK** | `12.13.0` | Database interface to fetch blogs/projects and record contact messages on Firestore. |
| **Vitest** | `4.1.7` | Test runner for automated unit and integration tests. |

---

## 📂 3. Repository Directory Structure

The repository is organized following clean separation of concerns, DRY (Don't Repeat Yourself), and Single Responsibility principles:

```text
portfolio-mustafa/
├── .github/workflows/
│   └── deploy.yml            # CI/CD deployment pipeline for GitHub Actions
├── public/
│   ├── assets/blog/          # Local static blog cover images
│   ├── favicon.svg           # Scalable brand vector favicon
│   ├── resume.pdf            # Professional downloadable resume (Mustafa Hossain)
│   ├── robots.txt            # Crawler welcome file mapping search permissions
│   └── sitemap.xml           # XML sitemap declaring crawlable paths for SEO
├── src/
│   ├── assets/               # Local static images (profile picture, etc.)
│   ├── components/           # Core layout sections
│   │   ├── About.jsx         # Biography, goals, and personal details card
│   │   ├── Education.jsx     # Timeline of secondary and tertiary degrees
│   │   ├── Footer.jsx        # Footer layout with copyrights and social links
│   │   ├── MouseSpotlight.jsx# Overlay tracking cursor spotlight highlight
│   │   ├── Navbar.jsx        # Responsive navigation with scrollspy hook
│   │   └── Skills.jsx        # Skill grid utilizing SVG representations
│   ├── config/
│   │   ├── aiService.js      # Gemini API prompt, model connection, and offline fallbacks
│   │   └── firebase.js       # Firebase client SDK initialization & db references
│   ├── constants/
│   │   ├── data.jsx          # Default static fallbacks for projects, skills, education, blogs
│   │   └── strings.js        # Global constant copies and section header descriptions
│   ├── features/
│   │   ├── blog/             # Blog components, cards, and data normalizers
│   │   ├── chat/             # Chat Assistant context, UI, and FAB components
│   │   ├── contact/          # Submission forms and submission hooks
│   │   ├── hero/             # Intro banner, bootloader typewriter simulation, and terminal
│   │   └── projects/         # Case studies display grids and metrics blocks
│   ├── hooks/
│   │   └── useFirebaseData.js# Hook fetching collections with order fallbacks
│   ├── pages/
│   │   ├── BlogsFeed.jsx     # Searchable category feed for articles
│   │   ├── BlogPost.jsx      # Custom Markdown-rendered blog detailed view
│   │   ├── Home.jsx          # Segmented single-page homepage assembly
│   │   └── ProjectCaseStudy.jsx# Layout rendering metrics, challenges, solutions
│   ├── shared/components/ui/ # Reusable UI components (GlassCard, ScrollReveal, SectionHeader)
│   ├── theme.js              # Theme manager for light/dark modes
│   ├── index.css             # Main stylesheet configuring fonts, themes, and glass utilities
│   ├── App.jsx               # App routing wrapper, providers, and layout assembly
│   └── main.jsx              # React application mounting entry point
├── firebase.json             # Firebase deployment rewrites & security rules
├── firestore.rules           # Security rules configuring collection accesses
└── vite.config.js            # Vite build configuration rules
```

---

## 🛠️ 4. Feature & Architectural Analysis

### 🤖 4.1 Dev.Bot: The Global AI Assistant
The portfolio features **Dev.Bot**, a chatbot designed to answer recruiter and visitor queries about Mustafa's skills, qualifications, GPA, and projects.

- **SDK & Model:** Utilizes `@google/generative-ai` with the `gemini-2.5-flash` model.
- **System Prompt Constraints:** Locked down via `SYSTEM_PROMPT` in `aiService.js` containing verified facts about Mustafa (BCA graduate from Brainware University, 9.09/10 GPA, Murshidabad location, HTML/CSS/JS/React/Tailwind stack) to prevent hallucinations. It also explanations technical topics (Virtual DOM, CORS, custom hooks) from Mustafa's perspective.
- **State Management (`ChatContext.jsx`):** Preserves conversation history, loading flags, input states, and server connection status globally using React Context, allowing users to switch between pages without losing their chat.
- **Presentation Logic:**
  - **Desktop:** Statically embedded in the Hero section inside a simulated retro terminal console (`TerminalWindow.jsx`).
  - **Mobile / Scroll:** Disappears from the Hero and manifests as a floating action button (FAB) at the screen's bottom-right corner. It opens a frosted-glass modal with highly opaque styling (`bg-zinc-950/95 backdrop-blur-3xl`) to maintain text legibility.
- **Dynamic Status Monitoring:** Automatically switches state from "Assistant Online" to "Offline" if communication failures occur (e.g. invalid API key or network failure), falling back immediately to an offline dictionary response.

### 💾 4.2 Database Fallback & normalizer Architecture
To guarantee 100% uptime even during database outage, the site uses a fallback-first pattern:
1. `useFirebaseData('blogs', DEFAULT_BLOGS)` tries to connect to Firestore and fetch the collection ordered by `order`.
2. If connection credentials are not found, or if permissions fail (due to rules requiring Admin consoles), the hook catches the error and falls back to the static files inside [`data.jsx`](file:///d:/portfolio-mustafa/src/constants/data.jsx).
3. Data normalizers in `blogAdapters.js` automatically format field deviations (e.g., raw Firestore casing fields like `Title` vs `title`) into client objects.

### 📬 4.3 Contact Form Handler
Submissions to the contact section are managed via [`useContactSubmit.js`](file:///d:/portfolio-mustafa/src/hooks/useContactSubmit.js).
- If Firebase variables are active, it records message submissions directly inside Firestore's `messages` collection.
- Security rules in [`firestore.rules`](file:///d:/portfolio-mustafa/firestore.rules) allow anyone to create records but block all reading, updating, or deleting operations from frontend clients, protecting candidate-recruiter message histories.

### 📄 4.4 Custom Markdown Rendering Engine
To avoid heavy parser packages, [`BlogPost.jsx`](file:///d:/portfolio-mustafa/src/pages/BlogPost.jsx) incorporates a lightweight, custom Markdown engine (`renderMarkdown`):
- Recognizes headers (`#`, `##`, `###`), list points (`-`), code snippets (\`\`\`js ... \`\`\`), and inline code/bold elements.
- Dynamically translates them into native React JSX components using custom Tailwind styling blocks.

### 🔍 4.5 Search Engine Optimization (SEO)
- **Site Metadata:** Refactored inside `index.html` to prioritize search keywords ("MD Mustafa Hossain", "React Developer", "India").
- **Site Verification:** Configured `google-site-verification` metadata tags directly in the `<head>` of the root HTML block.
- **Robots mapping (`robots.txt`):** Permits universal scraping (`Allow: /`) and directs bots to the sitemap location.
- **Expanded Sitemap (`sitemap.xml`):** Declares all crawlable sub-routes (home, blog feed, blog post, project case studies) ensuring proper SEO discoverability.

---

## 💻 5. Local Setup & Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions
1. **Clone & Install:**
   ```bash
   git clone https://github.com/md-mustafa-hossain-create/portfolio-mustafa.git
   cd portfolio-mustafa
   npm install
   ```
2. **Environment Variables:**
   Create a `.env` file in the root workspace directory with your credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
3. **Execute Commands:**
   - **Local Development Server:** `npm run dev`
   - **Production Compilation:** `npm run build`
   - **Local Preview:** `npm run preview`
   - **Automated Tests:** `npm run test`

---

## 🚀 6. CI/CD Deployment Workflow

Deployments are automated through a **GitHub Actions** runner configured in [`.github/workflows/deploy.yml`](file:///d:/portfolio-mustafa/.github/workflows/deploy.yml).

Upon pushing any change to the `main` branch:
1. **Checkout & Cache:** Checks out the source tree and configures Node.js caching `npm` modules.
2. **Install:** Installs clean project dependencies using `npm ci`.
3. **Production Build:** Builds static files using `npm run build` with secrets injected from GitHub Action variables.
4. **Firebase Deploy:** Uses `npx firebase-tools deploy --only hosting` with `secrets.FIREBASE_TOKEN` to deploy the `dist` directory to **Firebase Hosting**.
