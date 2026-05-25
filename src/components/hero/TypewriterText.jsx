import { useState, useEffect } from 'react';
import { ROLES } from '../../constants/data';

/**
 * @fileoverview Handles the typewriter effect logic, isolated to prevent
 * unnecessary re-renders in the parent Hero component.
 */

export default function TypewriterText({ isBooted }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    if (!isBooted) return;
    let timer;
    const currentRole = ROLES[roleIndex];

    if (isDeleting) {
      if (displayText === '') {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % ROLES.length);
          setTypingSpeed(100);
        }, 150);
      } else {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.substring(0, prev.length - 1));
          setTypingSpeed(50);
        }, typingSpeed);
      }
    } else {
      if (displayText === currentRole) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isBooted, roleIndex, typingSpeed]);

  return (
    <span className="text-brand-400 font-bold border-r-2 border-brand-400 pr-1.5 animate-pulse">
      {displayText}
    </span>
  );
}
