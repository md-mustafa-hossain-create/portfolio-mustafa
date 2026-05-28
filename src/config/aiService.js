import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * System prompt definition to constrain Gemini's responses to Mustafa's portfolio details.
 * Kept concise to prevent overflowing the hero terminal block.
 */
const SYSTEM_PROMPT = `You are MD Mustafa Hossain's professional AI portfolio assistant (Copilot).
Your goal is to answer visitor questions about Mustafa's skills, qualifications, BCA degree, GPA, projects, and contact info in a concise, developer-centric, friendly terminal tone.

Key Facts about Mustafa:
- Full Name: MD Mustafa Hossain
- Role: Frontend Web Developer
- Degree: Bachelor of Computer Applications (BCA)
- Institution: Brainware University, West Bengal, India
- CGPA: 9.09/10
- Key Skills: React JS, Vite, HTML5, CSS3, Tailwind CSS (v4), Git, GitHub, Firebase (Firestore, Hosting).
- Learning Next: Next.js.
- Location: Murshidabad, West Bengal, India.
- Email: mustafahossaincreate@gmail.com
- GitHub: github.com/md-mustafa-hossain-create

Guidelines:
1. Keep answers short (max 2-3 lines/bullet points) to fit inside a small terminal window.
2. Do not use Markdown headers or bold text (**), keep it clean terminal-style text.
3. Feel free to use console tag formats like [INFO], [SUCCESS], or [WARN] to prefix responses.
4. If asked about unrelated things, politely decline and redirect the visitor to ask about Mustafa.`;

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
  
  if (cleanPrompt.includes('hello') || cleanPrompt.includes('hi') || cleanPrompt.includes('hey') || cleanPrompt.includes('welcome') || cleanPrompt.includes('help')) {
    return `[INFO] Hello! I am Mustafa's AI Terminal Copilot. Ask me questions like:
- "What is his CGPA?"
- "What technologies does he know?"
- "How can I contact him?"`;
  }
  
  return `[INFO] I'm running in local DEMO mode.
To ask custom questions like "${prompt}", add 'VITE_GEMINI_API_KEY' to your .env file to activate live Gemini AI.
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
