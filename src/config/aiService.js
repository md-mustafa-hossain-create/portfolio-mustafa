import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * System prompt definition to constrain Gemini's responses to Mustafa's portfolio details.
 * Kept concise to prevent overflowing the hero terminal block.
 */
const SYSTEM_PROMPT = `You are MD Mustafa Hossain's professional AI portfolio assistant (Copilot).
Your goal is to answer visitor or recruiter questions about Mustafa's skills, qualifications, background, and projects in a concise, developer-centric, friendly terminal tone.

Here is the verified data about Mustafa:
{
  "personal_info": {
    "full_name": "MD Mustafa Hossain",
    "pronouns": "He/Him",
    "location": "West Bengal, India",
    "professional_title": "Aspiring Frontend Developer",
    "current_status": "BCA graduate seeking frontend/web development opportunities",
    "email": "mustafahossaincreate@gmail.com",
    "github": "github.com/md-mustafa-hossain-create"
  },
  "professional_summary": "BCA graduate from Brainware University with a strong interest in frontend web development and UI-focused product building. Works with HTML, CSS, JavaScript, Tailwind CSS, and React.js, and actively strengthens real-world frontend concepts (routing, state management, component architecture, performance optimization, API integration, browser behavior). Early-career developer focused on learning in public, building projects, and growing into a professional frontend role.",
  "education": [
    {
      "institution": "Brainware University",
      "degree": "Bachelor of Computer Applications (BCA)",
      "duration": "Sep 2021 - Jun 2024",
      "grade": "9.09 CGPA"
    },
    {
      "institution": "Netaji Subhas Public School",
      "degree": "Higher Secondary (12th)",
      "stream": "Humanities/Humanistic Studies",
      "location": "Murshidabad, India"
    }
  ],
  "skills": {
    "core": ["HTML", "CSS", "JavaScript", "Tailwind CSS", "React.js"],
    "supporting": ["UI/UX basics", "Figma basics", "Responsive design", "Frontend architecture, API integration, React Router, Context API, state management, performance optimization, problem solving with DSA"]
  },
  "projects": [
    {
      "name": "Animated Webpage",
      "description": "A web project showcasing smooth scrolling and animation effects.",
      "technologies": ["GSAP", "HTML"],
      "link": "https://github.com/Md-Mustafa-Hossain/animatedWebpage"
    },
    {
      "name": "Portfolio Website",
      "description": "Personal portfolio website project used to present professional profile and work.",
      "technologies": ["React.js", "Tailwind CSS", "Firebase"]
    }
  ],
  "certifications": [
    {"name": "INDUSTRIAL VISIT", "issuer": "NATURAVA", "date": "Jan 2022"},
    {"name": "Intellectual Property Rights", "issuer": "Brainware University", "date": "Nov 2021"}
  ],
  "volunteering": [
    {
      "role": "Social Worker",
      "organization": "Welfare Development Society",
      "highlights": ["Organized community welfare drives", "Led volunteer teams", "Outreach and coordination", "Logistics"]
    }
  ],
  "languages": [
    {"language": "Bengali", "proficiency": "Full professional proficiency"},
    {"language": "English", "proficiency": "Professional working proficiency"}
  ],
  "career_interests": ["Frontend/Web/UI developer roles (remote, hybrid, on-site)"],
  "recent_technical_topics_explored": [
    "React Router", "HOCs", "Controlled vs uncontrolled components", "Lifting state up", "Prop drilling", "Context API", "Custom hooks", "Lazy loading", "Suspense", "Single Responsibility Principle", "CORS", "API handling", "Networking basics", "Virtual DOM", "React Fiber & reconciliation", "DSA array problems"
  ]
}

Guidelines:
1. Keep answers short (max 2-3 lines/bullet points) to fit inside the terminal scroll height.
2. Do not use Markdown headers or bold text (**), keep it clean terminal-style text.
3. Use console tag formats like [INFO], [SUCCESS], [TECH_INFO], or [SYSTEM] to prefix responses.
4. Answering Technical Questions: If asked about the technical topics Mustafa has explored (e.g. CORS, Virtual DOM, Lifting State Up, Custom Hooks, React Fiber, prop drilling, HOCs, etc.), provide a short, accurate explanation from Mustafa's perspective to demonstrate his solid frontend knowledge.
5. Coding Queries: If asked to write code or scripts, write brief code blocks (JavaScript/HTML/CSS) demonstrating Mustafa's capabilities.
6. Off-Topic/General Queries: If asked unrelated general questions, jokes, or commands, answer them in a fun, geeky terminal-themed way or politely bring them back to Mustafa's background.`;

// Read the API Key from Vite env variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Google AI SDK only if API key is present
let genAI = null;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * Fallback response generator for DEMO mode when the API key is not configured.
 */
const getFallbackResponse = (prompt) => {
  const cleanPrompt = prompt.toLowerCase();
  
  if (cleanPrompt.includes('gpa') || cleanPrompt.includes('cgpa') || cleanPrompt.includes('grade') || cleanPrompt.includes('marks')) {
    return `[INFO] Mustafa completed his Bachelor of Computer Applications (BCA) at Brainware University with a high CGPA of 9.09/10.`;
  }
  
  if (cleanPrompt.includes('skills') || cleanPrompt.includes('tech') || cleanPrompt.includes('stack') || cleanPrompt.includes('skill')) {
    return `[SUCCESS] Technical Stack:
- Core: HTML5, CSS3, JavaScript, React JS
- Styling: Tailwind CSS v4
- Backend: Firebase Firestore, Hosting
- Tools: Git, GitHub, Vite, npm`;
  }
  
  if (cleanPrompt.includes('project') || cleanPrompt.includes('work') || cleanPrompt.includes('portfolio') || cleanPrompt.includes('build')) {
    return `[INFO] Mustafa builds modern web applications. His projects feature responsive designs, lazy-loading optimizations, and modular React components. Check his 'Projects' section below!`;
  }
  
  if (cleanPrompt.includes('contact') || cleanPrompt.includes('email') || cleanPrompt.includes('hire') || cleanPrompt.includes('reach') || cleanPrompt.includes('connect')) {
    return `[SUCCESS] Contact Details:
- Email: mustafahossaincreate@gmail.com
- GitHub: github.com/md-mustafa-hossain-create
- Location: Murshidabad, West Bengal, India`;
  }
  
  if (cleanPrompt.includes('education') || cleanPrompt.includes('degree') || cleanPrompt.includes('college') || cleanPrompt.includes('university') || cleanPrompt.includes('study')) {
    return `[INFO] Education:
- Degree: Bachelor of Computer Applications (BCA)
- University: Brainware University (West Bengal, India)
- CGPA: 9.09/10`;
  }

  if (cleanPrompt.includes('volunteering') || cleanPrompt.includes('volunteer') || cleanPrompt.includes('social')) {
    return `[INFO] Volunteering: Social Worker at Welfare Development Society. Organized community welfare drives, coordinated logistics, and led outreach.`;
  }
  
  if (cleanPrompt.includes('certif') || cleanPrompt.includes('award') || cleanPrompt.includes('license')) {
    return `[SUCCESS] Certifications:
- Industrial Visit (NATURAVA, Jan 2022)
- Intellectual Property Rights (Brainware University, Nov 2021)`;
  }
  
  if (cleanPrompt.includes('language') || cleanPrompt.includes('speak') || cleanPrompt.includes('talk')) {
    return `[INFO] Languages: Bengali (Full professional) and English (Professional working).`;
  }

  if (cleanPrompt.includes('humanities') || cleanPrompt.includes('12th') || cleanPrompt.includes('school') || cleanPrompt.includes('high school')) {
    return `[INFO] High School: Completed Higher Secondary (12th) in Humanities at Netaji Subhas Public School, Murshidabad.`;
  }

  if (cleanPrompt.includes('virtual dom') || cleanPrompt.includes('reconciliation') || cleanPrompt.includes('react fiber')) {
    return `[TECH_INFO] Virtual DOM: A lightweight in-memory representation of the real DOM. React uses it to diff changes and efficiently update only the modified nodes (reconciliation) via React Fiber.`;
  }
  
  if (cleanPrompt.includes('cors')) {
    return `[TECH_INFO] CORS (Cross-Origin Resource Sharing): A browser security mechanism that restricts resources on a web page from being requested from another domain. Solved using proper API headers.`;
  }

  if (cleanPrompt.includes('prop drilling') || cleanPrompt.includes('context api')) {
    return `[TECH_INFO] Prop Drilling: Passing data through multiple nested components. Solved in React using the Context API or state management tools to share global state.`;
  }

  if (cleanPrompt.includes('custom hook') || cleanPrompt.includes('hoc') || cleanPrompt.includes('higher-order')) {
    return `[TECH_INFO] Reusability: Custom hooks extract component logic into reusable functions. Higher-Order Components (HOCs) are functions that take a component and return a new component with added features.`;
  }
  
  if (cleanPrompt.includes('hello') || cleanPrompt.includes('hi') || cleanPrompt.includes('hey') || cleanPrompt.includes('welcome') || cleanPrompt.includes('help')) {
    return `[INFO] Hello! I am Mustafa's AI Terminal Copilot. Ask me questions like:
- "What is his CGPA?"
- "What certifications does he have?"
- "Explain Virtual DOM in React"`;
  }
  
  return `[INFO] I'm running in local DEMO mode.
To ask custom questions like "${prompt}", add 'VITE_GEMINI_API_KEY' to your .env file to activate live AI responses.
- Note: Mustafa is a React & Tailwind CSS Frontend Developer.`;
};

/**
 * Calls Gemini API or falls back to local responses if API key is not set.
 */
export async function getAICopilotResponse(prompt) {
  if (!apiKey || !genAI) {
    // Return mock response immediately with a tiny delay to simulate network call
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getFallbackResponse(prompt);
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `[ERROR] Failed to fetch live AI response. Falling back to offline dictionary:
${getFallbackResponse(prompt)}`;
  }
}
