import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import ChatUI from './ChatUI';

export default function GlobalChatFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Global Floating View: Visible on all screen sizes */}
      <div className="fixed z-50 pointer-events-none inset-0">
        
        {/* Floating Action Button (FAB) */}
        <button
          onClick={() => setIsOpen(true)}
          className={`absolute bottom-6 right-6 p-4 rounded-full bg-brand-500 text-black shadow-lg shadow-brand-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center pointer-events-auto ${
            isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          }`}
          aria-label="Open AI Assistant"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-20 duration-[3000ms]"></span>
          <MessageSquare className="w-6 h-6 relative z-10" />
        </button>

        {/* Full-screen / Floating Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9, originX: 1, originY: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="absolute inset-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[550px] flex items-end justify-end pointer-events-auto"
            >
              <ChatUI isFloating={true} onClose={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
