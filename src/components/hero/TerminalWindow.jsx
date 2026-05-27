import { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { getAICopilotResponse } from '../../config/aiService';

/**
 * @fileoverview Handles the AI Copilot terminal window in the Hero section.
 * Dedicated exclusively to the interactive AI chatbot experience.
 */
export default function TerminalWindow({ isBooted }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: "=== MUSTAFA_DEV AI COPILOT TERMINAL v1.0 ===" },
    { type: 'system', text: "Ask me anything about Mustafa's skills, qualifications, or GPA." },
    { type: 'system', text: "Click a quick command below to run it instantly:" },
    {
      type: 'suggestions',
      commands: [
        { label: '/skills', desc: 'Tech stack & tools', query: 'What are your technical skills?' },
        { label: '/cgpa', desc: 'University grades', query: 'What is your BCA CGPA?' },
        { label: '/contact', desc: 'Contact details', query: 'How can I contact you?' }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const terminalEndRef = useRef(null);

  // Auto-scroll scrollback buffer to bottom on history change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isLoading]);

  const executeQuery = async (query) => {
    if (!query.trim() || isLoading) return;

    // Append query to history
    setHistory((prev) => [...prev, { type: 'input', text: query }]);
    setIsLoading(true);

    try {
      const response = await getAICopilotResponse(query);
      setHistory((prev) => [...prev, { type: 'output', text: response }]);
    } catch (err) {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: "[ERROR] Connection failed. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const query = input.trim();
    setInput('');
    executeQuery(query);
  };

  const handleSuggestionClick = (query) => {
    executeQuery(query);
  };

  return (
    <div 
      className={`lg:col-span-5 flex justify-center items-center z-10 w-full ${
        isBooted ? 'hero-revealed' : 'opacity-0'
      }`}
      style={{ animationDelay: '300ms' }}
    >
      <div className="w-full max-w-md aspect-square p-2 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-md group hover:border-white/10 transition-premium">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-zinc-950/90 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 flex flex-col justify-between h-full relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/15 transition-all duration-500 pointer-events-none"></div>
          
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 shrink-0 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer"></div>
            </div>
            
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-brand-400" />
              <span>MUSTAFA_AI_COPILOT.sh</span>
            </div>
            
            <div className="w-12"></div>
          </div>

          {/* Interactive Shell Body */}
          <div className="flex flex-col h-[280px] justify-between font-mono text-[11px] sm:text-xs">
            {/* Scrollback History Area */}
            <div className="flex-grow overflow-y-auto space-y-1.5 scrollbar-thin pr-1 max-h-[235px] min-h-[235px]">
              {history.map((item, idx) => {
                if (item.type === 'system') {
                  return (
                    <div key={idx} className="text-zinc-500 select-none">
                      # {item.text}
                    </div>
                  );
                }
                
                if (item.type === 'suggestions') {
                  return (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-2.5 select-none shrink-0">
                      {item.commands.map((cmd) => (
                        <button
                          key={cmd.label}
                          type="button"
                          onClick={() => handleSuggestionClick(cmd.query)}
                          className="flex flex-col items-start p-2 bg-zinc-900/60 border border-zinc-800/80 hover:border-brand-500/40 rounded-lg text-left transition-all duration-200 group/btn cursor-pointer"
                        >
                          <span className="text-[10px] text-brand-400 font-bold group-hover/btn:text-brand-300 font-mono">
                            {cmd.label}
                          </span>
                          <span className="text-[8px] text-zinc-500 font-mono mt-0.5">
                            {cmd.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                }
                
                if (item.type === 'input') {
                  return (
                    <div key={idx} className="flex gap-2">
                      <span className="text-brand-400 select-none">visitor@mustafa:~$</span>
                      <span className="text-white">{item.text}</span>
                    </div>
                  );
                }
                
                return (
                  <div key={idx} className="text-brand-300 whitespace-pre-wrap pl-2 border-l border-brand-500/20 leading-relaxed">
                    {item.text}
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="text-brand-400/70 animate-pulse select-none">
                  &gt; Querying database...
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>
            
            {/* Form Input Prompt */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-2 pt-2 border-t border-zinc-900 shrink-0">
              <span className="text-brand-400 font-bold select-none whitespace-nowrap">visitor@mustafa:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask me a question..."
                className="flex-1 bg-transparent text-white outline-none border-none font-mono text-[11px] sm:text-xs p-0 m-0 w-full focus:ring-0 focus:outline-none"
                maxLength={80}
                autoFocus
              />
            </form>
          </div>

          {/* Window Footer Status Bar */}
          <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-400 font-bold tracking-wider">AI_ONLINE</span>
            </div>
            <div className="uppercase">AI_COPILOT</div>
            <div className="text-brand-400 font-semibold group-hover:translate-x-1 transition-premium text-[10px]">
              &lt;gemini_terminal /&gt;
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
