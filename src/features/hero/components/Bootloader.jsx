import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sparkles } from 'lucide-react';
import { GLOBAL } from '@/constants/strings';

/**
 * @fileoverview Handles the modern portfolio loader screen overlay.
 */

/**
 * @typedef {Object} BootloaderProps
 * @property {function(boolean): void} onComplete - Callback executed when loading reaches 100%.
 */

/**
 * Bootloader component.
 * @param {BootloaderProps} props
 * @returns {React.ReactElement}
 */
export default function Bootloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing portfolio...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Simulate loading progress
    const duration = 2000;
    const intervalTime = 40;
    const step = 100 / (duration / intervalTime);
    
    const interval = setInterval(() => {
      if (!isMounted) return;
      
      setProgress((prev) => {
        const next = Math.min(prev + step, 100);
        
        // Update helper texts based on progress
        if (next < 30) {
          setLoadingText('Loading visual configurations...');
        } else if (next < 60) {
          setLoadingText('Establishing secure connection...');
        } else if (next < 85) {
          setLoadingText('Optimizing interactive elements...');
        } else {
          setLoadingText('Welcome to my space.');
        }
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (isMounted) {
              setIsDone(true);
              onComplete(true);
            }
          }, 400);
        }
        return next;
      });
    }, intervalTime);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center transition-opacity duration-700 font-sans ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-xs px-6 flex flex-col items-center gap-6">
        
        {/* Branding Logo */}
        <div className="flex items-center gap-2.5 animate-pulse">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <span className="text-sm font-bold text-white tracking-widest uppercase">
            {GLOBAL.BRAND_NAME}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-primary to-brand-300 rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between w-full text-xs text-zinc-400 font-medium">
            <span>{loadingText}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

Bootloader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
