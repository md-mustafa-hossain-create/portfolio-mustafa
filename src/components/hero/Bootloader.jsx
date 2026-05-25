import { useState, useEffect } from 'react';
import { HERO_STRINGS } from '../../constants/strings';

/**
 * @fileoverview Handles the terminal-style booting animation overlay.
 */

export default function Bootloader({ onComplete }) {
  const [bootStep, setBootStep] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const steps = [
      { delay: 100, step: 1 },
      { delay: 400, step: 2 },
      { delay: 700, step: 3 },
      { delay: 1000, step: 4 },
      { delay: 1300, step: 5 },
      { delay: 1600, step: 6 },
      { delay: 1900, step: 7 }
    ];

    const timeouts = steps.map(({ delay, step }) =>
      setTimeout(() => { if(isMounted) setBootStep(step); }, delay)
    );

    timeouts.push(
      setTimeout(() => {
        if(isMounted) {
          setIsBooted(true);
          onComplete(true);
        }
      }, 2300)
    );

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center transition-opacity duration-700 ${
        isBooted ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="font-mono text-xs sm:text-sm text-brand-400 space-y-2 max-w-md w-full px-6 text-left">
        {bootStep >= 1 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span>{HERO_STRINGS.BOOT_TITLE}</span>
          </div>
        )}
        {bootStep >= 2 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span>Loading kernel modules... <span className="text-emerald-400 font-bold">OK</span></span>
          </div>
        )}
        {bootStep >= 3 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span>Connecting database... <span className="text-emerald-400 font-bold">SUCCESS</span></span>
          </div>
        )}
        {bootStep >= 4 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span>Setting visual profiles (Mint/Obsidian)... <span className="text-emerald-400 font-bold">DONE</span></span>
          </div>
        )}
        {bootStep >= 5 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span>Fetching interface resources... <span className="text-emerald-400 font-bold">100%</span></span>
          </div>
        )}
        {bootStep >= 6 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span>Starting terminal shell session... <span className="text-emerald-400 font-bold">READY</span></span>
          </div>
        )}
        {bootStep >= 7 && (
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">&gt;</span>
            <span className="animate-pulse">Booting dashboard...</span>
          </div>
        )}
      </div>
    </div>
  );
}
