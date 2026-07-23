import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
  'Frontend Developer',
  'React Developer',
  'JavaScript Developer',
  'UI Engineer',
];

/**
 * @fileoverview Sub-component to cycle through job titles smoothly with Framer Motion.
 */
export default function AnimatedJobTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative inline-block overflow-hidden h-[1.3em] align-top min-w-[200px] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
            mass: 0.8
          }}
          className="absolute left-0 text-brand-400 font-sans font-bold text-lg sm:text-2xl"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
