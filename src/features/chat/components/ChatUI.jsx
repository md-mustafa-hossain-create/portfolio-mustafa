import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sparkles, Send, RefreshCw, X } from 'lucide-react';
import { useChat } from '../context/ChatContext';

/**
 * Reusable Chat Interface for both the static desktop terminal and floating mobile modal.
 */
export default function ChatUI({ isFloating, onClose }) {
  const { 
    history, 
    input, 
    setInput, 
    isLoading, 
    handleCommandSubmit, 
    clearHistory, 
    handleSuggestionClick 
  } = useChat();
  
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat area on new message
  useEffect(() => {
    if (chatEndRef.current) {
      const container = chatEndRef.current.parentNode;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [history, isLoading]);

  // Focus input when loading finishes, but only on desktop to avoid aggressive mobile keyboard popping
  useEffect(() => {
    if (!isLoading && !isFloating) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLoading, isFloating]);

  // Use a highly opaque backdrop for the floating modal on mobile, and standard glass for static desktop
  const containerClasses = isFloating 
    ? 'h-full md:h-[500px] w-full max-w-none md:max-w-[400px] bg-zinc-950/95 backdrop-blur-3xl border border-zinc-800'
    : 'aspect-square glass';

  return (
    <div className={`w-full max-w-md ${containerClasses} p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1),_0_0_40px_rgba(16,185,129,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15),_0_0_50px_rgba(16,185,129,0.12)] hover:border-brand-500/20 transition-all duration-500 group flex flex-col`}>
      <div className="rounded-[calc(2.5rem-0.5rem)] bg-transparent p-5 flex flex-col justify-between h-full relative overflow-hidden flex-grow">
        
        {/* Glow Effect */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/15 transition-all duration-500 pointer-events-none"></div>

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 shrink-0 select-none relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white tracking-wide">Mustafa AI</span>
              <span className="text-[10px] sm:text-xs text-zinc-400">Ask about skills, education, contact</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={clearHistory}
              type="button"
              className="p-1.5 text-zinc-400 hover:text-brand-400 hover:bg-zinc-900/80 border border-zinc-800 hover:border-brand-500/20 rounded-lg transition-all duration-200 cursor-pointer select-none"
              title="Reset Chat"
              aria-label="Reset Chat"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            {isFloating && (
              <button
                onClick={onClose}
                type="button"
                className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-900/80 border border-zinc-800 hover:border-rose-500/20 rounded-lg transition-all duration-200 cursor-pointer select-none"
                title="Close Chat"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Chat Bubble Interface */}
        <div className="flex flex-col flex-grow justify-between text-xs font-sans min-h-0 relative z-10">
          {/* Scrollback Message History Area */}
          <div 
            className="flex-grow overflow-y-auto space-y-3.5 scrollbar-thin pr-1 flex flex-col min-h-0"
            aria-live="polite"
            aria-atomic="false"
            role="log"
          >
            {history.map((item, idx) => {
              if (item.type === 'system') {
                return (
                  <div key={idx} className="text-center text-zinc-400 text-xs my-0.5 select-none self-center leading-normal">
                    • {item.text}
                  </div>
                );
              }
              
              if (item.type === 'suggestions') {
                return (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-1 select-none shrink-0 w-full">
                    {item.commands.map((cmd) => (
                      <button
                        key={cmd.label}
                        type="button"
                        onClick={() => handleSuggestionClick(cmd.query)}
                        className="flex flex-col items-start p-2.5 bg-zinc-900/40 border border-zinc-850 hover:border-brand-500/40 hover:bg-brand-500/5 hover:shadow-[0_0_12px_rgba(16,185,129,0.05)] rounded-xl text-left transition-all duration-300 group/btn cursor-pointer"
                      >
                        <span className="text-xs text-brand-400 font-bold group-hover/btn:text-brand-300 group-hover/btn:translate-x-0.5 transition-all duration-300">
                          {cmd.label}
                        </span>
                        <span className="text-[10px] sm:text-xs text-zinc-400 group-hover/btn:text-zinc-400 transition-all duration-300 mt-0.5">
                          {cmd.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              }
              
              if (item.type === 'input') {
                return (
                  <div key={idx} className="flex flex-col items-end w-full mt-2">
                    <div className="bg-brand-500/10 border border-brand-500/20 text-brand-300 rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] leading-relaxed">
                      {item.text}
                    </div>
                  </div>
                );
              }
              
              return (
                <div key={idx} className="flex flex-col items-start w-full mt-2">
                  <div className="bg-zinc-900/60 border border-zinc-800/85 text-zinc-200 rounded-2xl rounded-tl-none px-4 py-2.5 max-w-[85%] leading-relaxed whitespace-pre-wrap">
                    {item.text}
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs select-none pl-2 animate-pulse mt-3 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-500/60" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} className="h-1 shrink-0" />
          </div>
          
          {/* Message input form */}
          <form 
            onSubmit={handleCommandSubmit}
            className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-900 shrink-0"
          >
            <div className="flex-grow flex items-center relative rounded-full bg-zinc-900/60 border border-zinc-800/80 focus-within:border-brand-500/40 focus-within:bg-zinc-900 px-4 py-2 transition-all duration-200">
              <input
                ref={inputRef}
                id="copilot-input"
                name="copilot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                readOnly={isLoading}
                placeholder={isLoading ? "Please wait..." : "Ask me anything..."}
                className="w-full text-xs sm:text-sm text-zinc-100 bg-transparent focus:ring-0 focus:outline-none placeholder-zinc-500"
                maxLength={80}
                aria-label="Message input"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-1.5 rounded-full text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 disabled:text-zinc-500 disabled:hover:text-zinc-500 disabled:hover:bg-transparent transition-colors cursor-pointer ml-1"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer Status Bar */}
        <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] sm:text-xs font-sans text-zinc-400 shrink-0 select-none relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
            <span className="text-zinc-400 font-medium">Assistant Online</span>
          </div>
          <div className="text-[10px] sm:text-xs font-semibold text-brand-500/70 hover:text-brand-400 transition-colors flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Copilot</span>
          </div>
        </div>

      </div>
    </div>
  );
}

ChatUI.propTypes = {
  isFloating: PropTypes.bool,
  onClose: PropTypes.func
};
