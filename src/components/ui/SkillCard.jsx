/**
 * @fileoverview Reusable Skill Card component.
 */

export default function SkillCard({ skill, index }) {
  // Helper to determine background glow color
  const getSkillColor = (skillObj) => {
    if (skillObj.color) return skillObj.color;
    const normalizedName = (skillObj.name || skillObj.Name || '').toLowerCase();
    if (normalizedName.includes('html')) return 'from-orange-500/20 to-red-500/20';
    if (normalizedName.includes('css') && !normalizedName.includes('tailwind')) return 'from-blue-500/20 to-cyan-500/20';
    if (normalizedName.includes('javascript') || normalizedName === 'js') return 'from-yellow-500/20 to-amber-500/20';
    if (normalizedName.includes('react') && !normalizedName.includes('router')) return 'from-cyan-400/20 to-blue-500/20';
    if (normalizedName.includes('tailwind')) return 'from-teal-400/20 to-cyan-500/20';
    if (normalizedName.includes('router')) return 'from-red-500/20 to-purple-600/20';
    if (normalizedName.includes('firebase')) return 'from-amber-400/20 to-orange-500/20';
    if (normalizedName.includes('git') && !normalizedName.includes('hub')) return 'from-orange-600/20 to-red-600/20';
    if (normalizedName.includes('github')) return 'from-zinc-600/20 to-zinc-800/20';
    return 'from-brand-400/20 to-brand-600/20';
  };

  // Helper to render icon, checking if it's already an element or an image URL
  const renderIcon = (skillObj) => {
    if (skillObj.icon && typeof skillObj.icon !== 'string') {
      return skillObj.icon;
    }
    const iconUrl = skillObj.icon || skillObj.Icon || skillObj.image || skillObj.Image;
    if (iconUrl && typeof iconUrl === 'string') {
      return (
        <img 
          src={iconUrl} 
          alt={skillObj.name || 'Skill icon'} 
          className="w-8 h-8 object-contain rounded"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      );
    }
    return (
      <svg className="w-8 h-8 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  };

  return (
    <div
      className="p-1.5 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-[2rem] hover:border-brand-500/30 hover:scale-[1.02] hover:-translate-y-0.5 transition-premium group shadow-xl overflow-hidden relative reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-brand-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
      
      <div className="rounded-[calc(2rem-0.375rem)] bg-zinc-950/45 backdrop-blur-lg border border-white/10 p-6 flex items-center gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] h-full">
        <div className="p-3 bg-[#141416]/90 rounded-xl border border-[#27272a]/80 group-hover:scale-110 group-hover:border-[#3f3f46] transition-premium shrink-0 flex items-center justify-center backdrop-blur-sm">
          {renderIcon(skill)}
        </div>
        <div className="text-left">
          <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">
            {skill.name || skill.Name}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-snug">
            {skill.desc || skill.Desc || skill.description || skill.Description}
          </p>
        </div>
      </div>
    </div>
  );
}
