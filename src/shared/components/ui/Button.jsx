import React from 'react';
import PropTypes from 'prop-types';

/**
 * @fileoverview Reusable design-system-compliant Button component.
 * Ensures WCAG 2.1 AA/AAA contrast ratios, keyboard focus states, 
 * and spring animation styling are standard across all buttons.
 */

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  // Base classes for design system buttons
  const baseClasses = 'inline-flex items-center justify-center font-sans font-semibold rounded-full select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 transition-spring will-change-transform';

  // Variant design tokens (WCAG compliant contrast values)
  const variants = {
    // Primary: High contrast black text on primary mint/emerald bg
    primary: 'bg-primary hover:bg-primary-hover text-zinc-950 shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]',
    // Secondary: High contrast white text on deep violet/indigo bg
    secondary: 'bg-secondary hover:bg-indigo-700 text-text-white shadow-md shadow-secondary/15 hover:scale-[1.02] active:scale-[0.98]',
    // Outline: Transparent bg, thin white border, highlight text
    outline: 'bg-transparent border border-zinc-800 hover:border-primary text-text-main hover:text-primary hover:scale-[1.01] active:scale-[0.99]',
    // Text: Clean borderless link-style button
    text: 'bg-transparent border-none text-text-muted hover:text-primary p-0 shadow-none hover:translate-x-0.5',
  };

  // Size scale tokens (margins / paddings / heights)
  const sizes = {
    sm: 'text-xs px-4 py-2.5 min-h-[38px]',
    md: 'text-sm px-5 py-3 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 min-h-[50px]',
  };

  // Safe keyboard focus indicator
  const focusClasses = 'focus:outline-none focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${focusClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
