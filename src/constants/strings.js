/**
 * @fileoverview Centralized string constants for the portfolio UI.
 * Extracted to ensure the Don't Repeat Yourself (DRY) principle and
 * make updating text incredibly easy for beginners.
 */

export const GLOBAL = {
  DEV_NAME: "MD Mustafa Hossain",
  DEV_TITLE: "Frontend Developer",
  DEV_EMAIL: "hussainmustafa2001@gmail.com",
  DEV_LOCATION: "Murshidabad, West Bengal, India",
  DEV_EDUCATION: "BCA Graduate",
  BRAND_NAME: "MUSTAFA",
  BRAND_DOMAIN: ".dev",
};

export const NAV_STRINGS = {
  THEME_TOGGLE_LIGHT: "Switch to dark theme",
  THEME_TOGGLE_DARK: "Switch to light theme",
};

export const FOOTER_STRINGS = {
  CREDIT: "Built with React & Tailwind CSS.",
  RIGHTS: "© 2024 MD Mustafa Hossain. All rights reserved.", // Or dynamically get year
};

export const HERO_STRINGS = {
  GREETING: "Hi, I'm",
  AVAILABLE_BADGE: "Available for internships & roles",
  SUBTITLE: "I am a BCA graduate specializing in Frontend Development. I enjoy crafting modern, beautiful, and highly responsive web apps using React JS and Tailwind CSS.",
  BTN_PROJECTS: "View Projects",
  BTN_RESUME: "Download Resume",
  BTN_CONTACT: "Contact Me",
  RESUME_NOTE: "* Note: Replace public/resume.pdf with your actual CV",
  TERMINAL_STATUS: "ACTIVE",
  BOOT_TITLE: "Welcome to my portfolio",
};

export const ABOUT_STRINGS = {
  SECTION_TAG: "01 . About Me",
  SECTION_TITLE_PREFIX: "Who is",
  SECTION_TITLE_HIGHLIGHT: "Mustafa",
  BIO_HEADING: "Building User Interfaces with Code and Passion",
  QUOTE: `"I believe that clean code and a good user experience are the two most important parts of any web application. I am always open to learning new technologies and improving my workflow."`
};

export const SKILLS_STRINGS = {
  SECTION_TAG: "02 . Core Stack",
  SECTION_TITLE_PREFIX: "My",
  SECTION_TITLE_HIGHLIGHT: "Skills",
  STATUS: "Capabilities Checklist",
  DESC: "Modern frontend tools and frameworks configured for web projects."
};

export const PROJECTS_STRINGS = {
  SECTION_TAG: "03 . Projects",
  SECTION_TITLE_PREFIX: "My",
  SECTION_TITLE_HIGHLIGHT: "Showcase",
  STATUS: "Active Repositories",
  DESC: "Explore repositories and live demonstrations below.",
  BTN_REPO: "Repository",
  BTN_DEMO: "Live Demo"
};

export const EDUCATION_STRINGS = {
  SECTION_TAG: "04 . Academics",
  SECTION_TITLE_PREFIX: "My",
  SECTION_TITLE_HIGHLIGHT: "Education",
};

export const BLOGS_STRINGS = {
  SECTION_TAG: "05 . Publications",
  SECTION_TITLE_PREFIX: "My",
  SECTION_TITLE_HIGHLIGHT: "Blogs",
  STATUS: "Latest Articles",
  DESC: "A collection of thoughts, tutorials, and insights on frontend development, UI/UX, and modern web technologies.",
  SEARCH_PLACEHOLDER: "Search articles by title or tag...",
  READ_MORE: "Read Article",
  EXTERNAL_LINK: "External link",
  CLOSE_MODAL: "close",
  NO_RESULTS: "No articles match your search query."
};

export const CONTACT_STRINGS = {
  SECTION_TAG: "06 . Get In Touch",
  SECTION_TITLE_PREFIX: "Contact",
  SECTION_TITLE_HIGHLIGHT: "Me",
  SUBTITLE: "Have an internship opportunity, a project idea, or just want to say hi? Drop me a message!",
  HEADING: "Let's discuss something great",
  FIND_ME: "Find me on",
  FORM_NAME_LABEL: "Your Name",
  FORM_EMAIL_LABEL: "Email Address",
  FORM_MSG_LABEL: "Your Message",
  FORM_SUBMIT: "Send Message",
  FORM_SUBMITTING: "Sending Message...",
  SUCCESS_MSG: "Thank you! Your message has been sent successfully.",
  ERROR_MSG: "Oops! Please fill in all fields or check your connection."
};
