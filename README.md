# 💻 MD Mustafa Hossain | Portfolio Website

[![React Version](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat&logo=react)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.0-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase Powered](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat&logo=firebase)](https://firebase.google.com)
[![Vite Build](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=flat&logo=vite)](https://vite.dev)
[![CI/CD Deployment](https://github.com/md-mustafa-hossain-create/portfolio-mustafa/actions/workflows/deploy.yml/badge.svg)](https://github.com/md-mustafa-hossain-create/portfolio-mustafa/actions)

Welcome to the repository of my personal portfolio website. This is a highly interactive, fast, and modern portfolio application designed to showcase my capabilities, academics, and projects. It is built as a single-page React application using Vite and styled with Tailwind CSS.

---

## 🌟 Key Features

*   ✨ **Modern Responsive Hero**: Clean, focused introduction highlighting core developer signals and quick actions.
*   🖱️ **Mouse Spotlight Effect**: A premium, smooth mouse spotlight mask overlaying the dark theme layout to elevate user interaction.
*   ⚡ **Custom Lazy Section Loading**: Deferment of below-the-fold component mounting and associated Firebase database requests using a custom `IntersectionObserver` wrapper (`LazySection.jsx`).
*   🔥 **Serverless Contact Form**: Real-time message submissions stored securely in Google Cloud Firestore using the dedicated contact submission hook (`src/features/contact/hooks/useContactSubmit.js`).
*   🛡️ **React Error Boundary**: A custom, dark-themed fallback screen preventing the white screen of death in case of runtime JavaScript errors.
*   📦 **Clean Separation of Concerns**: Modularized configuration, components (adhering to Single Responsibility Principle), and centralized constants (`strings.js`, `data.jsx`).
*   🤖 **CI/CD Pipeline**: Automated project building and deployment to Firebase Hosting upon pushing changes to the `main` branch.

---

## 🛠️ Tech Stack & Dependencies

*   **Core**: [React 19](https://react.dev/), [Vite](https://vite.dev/), [React Router v7](https://reactrouter.com/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Database**: [Google Firebase (Firestore SDK)](https://firebase.google.com/docs/firestore)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/)

---

## 📁 Repository Structure

```text
portfolio-mustafa/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow for Firebase Hosting
├── src/
│   ├── assets/                  # Static local media assets
│   ├── components/              # Primary single-page sections and local UI cards
│   ├── config/
│   │   └── firebase.js          # Firebase client setup & exports
│   ├── constants/
│   │   ├── data.jsx             # Data models for projects, skills, education, blogs
│   │   └── strings.js           # Centralized copy strings for easy updates
│   ├── features/                # Domain modules: blog, contact, hero, projects
│   ├── hooks/
│   │   ├── useFirebaseData.js   # Firestore read hook with fallback support
│   │   └── useGsapScrollTrigger.js
│   ├── pages/                   # Route-level pages (home, blog feed/post, case study)
│   ├── shared/components/ui/    # Shared UI primitives and global/section error boundaries
│   ├── App.jsx                  # Router and route-level lazy loading
│   ├── index.css                # Global custom stylesheet
│   └── main.jsx                 # React app entry point with global error boundary
├── firebase.json           # Firebase Hosting configuration rules
├── firestore.rules         # Security guidelines for Firestore
└── vite.config.js          # Vite compilation settings
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have **Node.js (v18 or higher)** and **npm** installed on your local machine.

### 🔧 Local Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/md-mustafa-hossain-create/portfolio-mustafa.git
    cd portfolio-mustafa
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory and copy the contents from `.env.example`. Replace the placeholder values with your Firebase Web App credentials.
    ```bash
    cp .env.example .env
    ```
    Configure the variables:
    ```env
    VITE_FIREBASE_API_KEY=your_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
    VITE_FIREBASE_PROJECT_ID=your_project_id_here
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
    VITE_FIREBASE_APP_ID=your_app_id_here
    ```

4.  **Launch Dev Server**:
    ```bash
    npm run dev
    ```
    Your application will be live at `http://localhost:5173`.

---

## ⚙️ Available Scripts

In the project directory, you can run the following tasks:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with HMR. |
| `npm run build` | Compiles the production bundle to `dist/` using Vite. |
| `npm run lint` | Analyzes code for syntax and style guidelines using ESLint. |
| `npm run preview` | Serves the locally compiled production bundle for review. |
| `npm run test` | Runs the automated test suite with Vitest. |

---

## 🤖 CI/CD Deployment

Deployments to **Firebase Hosting** are automated using GitHub Actions. On every commit pushed to the `main` branch, the workflow [`deploy.yml`](./.github/workflows/deploy.yml) will trigger:

1.  Checks out the code.
2.  Sets up Node.js v20.
3.  Installs clean dependencies using `npm ci`.
4.  Builds the static distribution using `npm run build`.
5.  Deploys the `dist` directory to Firebase Hosting using `secrets.FIREBASE_TOKEN`.

---

## 📄 License

This repository is maintained by **MD Mustafa Hossain**. Feel free to use the project structure or codebase as a template for your own developer portfolio.
