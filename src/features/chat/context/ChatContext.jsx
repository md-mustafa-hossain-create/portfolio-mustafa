import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getAICopilotResponse, isAILive } from '@/config/aiService';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(isAILive);
  const [history, setHistory] = useState([
    { type: 'system', text: "Dev.Bot v2.0" },
    { type: 'system', text: "Ask me anything about Mustafa's skills, qualifications, or GPA." },
    { type: 'system', text: "Click a quick command below to run it instantly:" },
    {
      type: 'suggestions',
      commands: [
        { label: 'Technical Stack', desc: 'Tech stack & tools', query: 'What are your technical skills?' },
        { label: 'Academic Record', desc: 'BCA grades & CGPA', query: 'What is your BCA CGPA?' },
        { label: 'Get in Touch', desc: 'Contact details', query: 'How can I contact you?' }
      ]
    }
  ]);

  const clearHistory = useCallback(() => {
    setHistory([
      { type: 'system', text: "Dev.Bot v2.0" },
      { type: 'system', text: "Ask me anything about Mustafa's skills, qualifications, or GPA." },
      { type: 'system', text: "Click a quick command below to run it instantly:" },
      {
        type: 'suggestions',
        commands: [
          { label: 'Technical Stack', desc: 'Tech stack & tools', query: 'What are your technical skills?' },
          { label: 'Academic Record', desc: 'BCA grades & CGPA', query: 'What is your BCA CGPA?' },
          { label: 'Get in Touch', desc: 'Contact details', query: 'How can I contact you?' }
        ]
      }
    ]);
  }, []);

  const executeQuery = useCallback(async (query) => {
    if (!query.trim() || isLoading) return;

    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery === '/clear' || cleanQuery === 'clear') {
      clearHistory();
      return;
    }

    setHistory((prev) => {
      const isFirstMessage = !prev.some((item) => item.type === 'input');
      return isFirstMessage 
        ? [{ type: 'input', text: query }]
        : [...prev, { type: 'input', text: query }];
    });
    
    setIsLoading(true);

    try {
      const response = await getAICopilotResponse(query);
      setHistory((prev) => [...prev, { type: 'output', text: response }]);
      
      if (response.startsWith("Failed to fetch live AI response")) {
        setIsOnline(false);
      } else {
        setIsOnline(isAILive);
      }
    } catch {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: "Connection failed. Please try again." }
      ]);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, clearHistory]);

  const handleCommandSubmit = useCallback((e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const query = input.trim();
    setInput('');
    executeQuery(query);
  }, [input, isLoading, executeQuery]);

  const handleSuggestionClick = useCallback((query) => {
    executeQuery(query);
  }, [executeQuery]);

  const value = {
    input,
    setInput,
    history,
    isLoading,
    isOnline,
    clearHistory,
    executeQuery,
    handleCommandSubmit,
    handleSuggestionClick
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
