/**
 * System prompt definition to constrain Gemini's responses to Mustafa's portfolio details.
 * Kept concise to prevent overflowing the chat bubble widget.
 */
const SYSTEM_PROMPT = `You are MD Mustafa Hossain's professional AI portfolio assistant.
Your goal is to answer visitor or recruiter questions about Mustafa's skills, qualifications, background, and projects in a concise, developer-centric, friendly, and modern tone.

Here is the verified data about Mustafa:
{
  "personal_info": {
    "full_name": "MD Mustafa Hossain",
    "pronouns": "He/Him",
    "location": "West Bengal, India",
    "professional_title": "Frontend Developer",
    "current_status": "BCA graduate seeking frontend web development opportunities",
    "phone": "+91 90645 37924",
    "email": "hussainmustafa2001@gmail.com",
    "github": "github.com/md-mustafa-hossain-create",
    "linkedin": "linkedin.com/in/mdmustafahossain"
  },
  "professional_summary": "Motivated Frontend Developer with a BCA and hands-on experience building responsive, user-friendly web applications. Skilled in HTML, CSS, JavaScript (ES6+), Tailwind CSS, and React. Proven ability to deliver clean, maintainable code through impactful academic and personal projects. Eager to contribute to a modern development team by building high-quality, cross-browser compatible interfaces.",
  "education": [
    {
      "institution": "Brainware University",
      "degree": "Bachelor of Computer Applications (BCA)",
      "duration": "2024",
      "grade": "9.09/10 GPA",
      "location": "Kolkata, India"
    },
    {
      "institution": "Netaji Subhas Public School",
      "degree": "Higher Secondary (12th)",
      "duration": "2019",
      "location": "Jiaganj, India"
    },
    {
      "institution": "Nawab Bahadur’s Institution",
      "degree": "Secondary (10th)",
      "duration": "2017",
      "location": "Lalbagh, India"
    }
  ],
  "skills": {
    "frontend": ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Tailwind CSS", "Flexbox", "CSS Grid"],
    "tools_and_version_control": ["Git", "GitHub", "VS Code"],
    "soft_skills": ["Problem-solving", "Team Collaboration", "Adaptability", "Time Management", "Attention to Detail"]
  },
  "projects": [
    {
      "name": "E-commerce Website Development",
      "type": "Academic Group Project (2024, Kolkata)",
      "technologies": ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
      "description": "Led frontend development for a responsive e-commerce website, crafting a user-centric interface with optimized navigation. Collaborated with a backend developer to successfully integrate the UI with server-side functionality. Applied responsive design principles to ensure 100% cross-browser compatibility across devices."
    },
    {
      "name": "Personal Portfolio Website",
      "type": "Personal Project",
      "technologies": ["HTML", "CSS", "JavaScript"],
      "description": "Designed and developed a fully responsive personal portfolio to establish a professional digital presence. Built interactive UI elements and smooth animations using vanilla JavaScript. Deployed on GitHub Pages."
    }
  ],
  "languages": [
    {"language": "English", "proficiency": "Proficient"},
    {"language": "Hindi", "proficiency": "Spoken"},
    {"language": "Bengali", "proficiency": "Native"}
  ]
}

Guidelines:
1. Keep answers short (max 2-3 lines/bullet points) to fit inside the chat history area.
2. Do not use Markdown headers or bold text (**), keep it clean modern text.
3. Do not use console tag prefixes (like [INFO] or [SUCCESS]) or brackets around status levels.
4. Answering Technical Questions: If asked about the technical topics Mustafa has explored (e.g. CORS, Virtual DOM, Lifting State Up, Custom Hooks, React Fiber, prop drilling, HOCs, etc.), provide a short, accurate explanation from Mustafa's perspective to demonstrate his solid frontend knowledge.
5. Coding Queries: If asked to write code or scripts, write brief code blocks (JavaScript/HTML/CSS) demonstrating Mustafa's capabilities.
6. Off-Topic/General Queries: If asked unrelated general questions or jokes, answer them in a friendly, conversational manner or politely bring them back to Mustafa's background.`;

// Read the API Key from Vite env variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Fallback response generator for DEMO mode when the API key is not configured.
 */
const getFallbackResponse = (prompt) => {
  const cleanPrompt = prompt.toLowerCase();
  
  if (cleanPrompt.includes('gpa') || cleanPrompt.includes('cgpa') || cleanPrompt.includes('grade') || cleanPrompt.includes('marks')) {
    return `Mustafa completed his Bachelor of Computer Applications (BCA) at Brainware University with a high CGPA of 9.09/10.`;
  }
  
  if (cleanPrompt.includes('skills') || cleanPrompt.includes('tech') || cleanPrompt.includes('stack') || cleanPrompt.includes('skill')) {
    return `Technical Stack:
• Frontend: HTML5, CSS3, JavaScript (ES6+), React, Tailwind CSS, Flexbox, CSS Grid
• Tools: Git, GitHub, VS Code
• Soft Skills: Problem-solving, Team Collaboration, Adaptability`;
  }
  
  if (cleanPrompt.includes('project') || cleanPrompt.includes('work') || cleanPrompt.includes('portfolio') || cleanPrompt.includes('build')) {
    return `Mustafa builds modern web applications. His projects include an E-commerce Website Development (HTML/CSS/JS/PHP/SQL) and a Personal Portfolio Website. Check his 'Projects' section below!`;
  }
  
  if (cleanPrompt.includes('contact') || cleanPrompt.includes('email') || cleanPrompt.includes('hire') || cleanPrompt.includes('reach') || cleanPrompt.includes('connect') || cleanPrompt.includes('phone') || cleanPrompt.includes('number')) {
    return `Contact Details:
• Email: hussainmustafa2001@gmail.com
• Phone: +91 90645 37924
• LinkedIn: linkedin.com/in/mdmustafahossain
• GitHub: github.com/md-mustafa-hossain-create`;
  }
  
  if (cleanPrompt.includes('education') || cleanPrompt.includes('degree') || cleanPrompt.includes('college') || cleanPrompt.includes('university') || cleanPrompt.includes('study')) {
    return `Education:
• Degree: Bachelor of Computer Applications (BCA)
• University: Brainware University (Kolkata, India)
• CGPA: 9.09/10`;
  }

  if (cleanPrompt.includes('volunteering') || cleanPrompt.includes('volunteer') || cleanPrompt.includes('social')) {
    return `Volunteering: Social Worker at Welfare Development Society. Organized community welfare drives, coordinated logistics, and led outreach.`;
  }
  
  if (cleanPrompt.includes('certif') || cleanPrompt.includes('award') || cleanPrompt.includes('license')) {
    return `Certifications:
• Industrial Visit (NATURAVA, Jan 2022)
• Intellectual Property Rights (Brainware University, Nov 2021)`;
  }
  
  if (cleanPrompt.includes('language') || cleanPrompt.includes('speak') || cleanPrompt.includes('talk')) {
    return `Languages: Bengali (Native), English (Proficient), and Hindi (Spoken).`;
  }

  if (cleanPrompt.includes('10th') || cleanPrompt.includes('secondary')) {
    return `Secondary School: Completed 10th grade at Nawab Bahadur’s Institution, Lalbagh.`;
  }

  if (cleanPrompt.includes('humanities') || cleanPrompt.includes('12th') || cleanPrompt.includes('school') || cleanPrompt.includes('high school')) {
    return `High School: Completed Higher Secondary (12th) at Netaji Subhas Public School, Jiaganj.`;
  }

  if (cleanPrompt.includes('virtual dom') || cleanPrompt.includes('reconciliation') || cleanPrompt.includes('react fiber')) {
    return `Virtual DOM: A lightweight in-memory representation of the real DOM. React uses it to diff changes and efficiently update only the modified nodes (reconciliation) via React Fiber.`;
  }
  
  if (cleanPrompt.includes('cors')) {
    return `CORS (Cross-Origin Resource Sharing): A browser security mechanism that restricts resources on a web page from being requested from another domain. Solved using proper API headers.`;
  }

  if (cleanPrompt.includes('prop drilling') || cleanPrompt.includes('context api')) {
    return `Prop Drilling: Passing data through multiple nested components. Solved in React using the Context API or state management tools to share global state.`;
  }

  if (cleanPrompt.includes('custom hook') || cleanPrompt.includes('hoc') || cleanPrompt.includes('higher-order')) {
    return `Reusability: Custom hooks extract component logic into reusable functions. Higher-Order Components (HOCs) are functions that take a component and return a new component with added features.`;
  }
  
  if (cleanPrompt.includes('hello') || cleanPrompt.includes('hi') || cleanPrompt.includes('hey') || cleanPrompt.includes('welcome') || cleanPrompt.includes('help')) {
    return `Hello! I am Mustafa's AI Assistant. Ask me questions like:
• "What is his CGPA?"
• "What certifications does he have?"
• "Explain Virtual DOM in React"`;
  }
  
  const isDev = import.meta.env.DEV || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));
  
  if (isDev) {
    return `I'm running in local DEMO mode.
To ask custom questions like "${prompt}", add 'VITE_GEMINI_API_KEY' to your .env file to activate live AI responses.
• Note: Mustafa is a React & Tailwind CSS Frontend Developer.`;
  }
  
  return `I'm currently running in offline database mode due to high traffic.
To ask custom questions, please try again in a few minutes.
• Note: Mustafa is a React & Tailwind CSS Frontend Developer.`;
};

/**
 * Calls Gemini API or falls back to local responses if API key is not set.
 */
export async function getAICopilotResponse(prompt) {
  if (!apiKey) {
    // Return mock response immediately with a tiny delay to simulate network call
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getFallbackResponse(prompt);
  }

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `Failed to fetch live AI response. Falling back to offline dictionary:
${getFallbackResponse(prompt)}`;
  }
}

export const isAILive = !!apiKey;
