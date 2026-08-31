import { useId } from 'react';
import PropTypes from 'prop-types';

/**
 * @fileoverview Reusable design-system-compliant Input component.
 * Supports standard text inputs and textareas (multiline), label rendering,
 * error state handling (with WCAG compliant red contrast), and focus rings.
 */

export default function Input({
  label,
  id,
  type = 'text',
  multiline = false,
  error = '',
  required = false,
  className = '',
  rows = 4,
  ...props
}) {
  const generatedId = useId();
  // Input styling classes
  const inputBaseClasses = 'w-full bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700 text-text-main placeholder-zinc-500 rounded-2xl px-4 py-3 text-sm font-sans transition-all duration-300 outline-none';
  const focusClasses = 'focus:bg-zinc-900/60 focus:border-primary focus:ring-1 focus:ring-primary/20';
  const errorInputClasses = error ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : '';

  const inputId = id || generatedId;

  return (
    <div className={`flex flex-col items-start w-full gap-2 ${className}`}>
      {label && (
        <div className="flex items-center gap-1">
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-text-muted tracking-wider uppercase cursor-pointer"
          >
            {label}
          </label>
          {required && <span className="text-primary font-bold text-xs select-none">*</span>}
        </div>
      )}

      {multiline ? (
        <textarea
          id={inputId}
          rows={rows}
          required={required}
          className={`${inputBaseClasses} ${focusClasses} ${errorInputClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          required={required}
          className={`${inputBaseClasses} ${focusClasses} ${errorInputClasses}`}
          {...props}
        />
      )}

      {error && (
        <span className="text-xs font-medium text-rose-400 select-none leading-none mt-1">
          {error}
        </span>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
};
