/**
 * @fileoverview Reusable Section Header component.
 * Extracts the duplicated layout for section titles (pill, title, underline, subtitle).
 */

export default function SectionHeader({ tag, icon, titlePrefix, titleHighlight, subtitle }) {
  return (
    <div className="text-center mb-20 reveal">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-400 font-mono mb-3 whitespace-nowrap">
        {icon && (
          <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full">
            {icon}
          </span>
        )}
        <span>{tag}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
        {titlePrefix} <span className="text-brand-400">{titleHighlight}</span>
      </h2>
      <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-zinc-400 mt-5 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
