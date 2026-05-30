import { DEFAULT_SKILLS } from '../../constants/data';

/**
 * @fileoverview Reusable Skill Card component.
 */

export default function SkillCard({ skill, index }) {

  // Helper to render icon, checking if it's already an element or an image URL
  const renderIcon = (skillObj) => {
    // 1. If it's already a React element (e.g. from local fallback)
    if (skillObj.icon && typeof skillObj.icon !== 'string') {
      return skillObj.icon;
    }
    
    // 2. If it's a dynamic image URL from Firebase
    const iconUrl = skillObj.icon || skillObj.Icon || skillObj.image || skillObj.Image;
    if (iconUrl && typeof iconUrl === 'string' && (iconUrl.startsWith('http') || iconUrl.startsWith('/') || iconUrl.startsWith('data:'))) {
      return (
        <img 
          src={iconUrl} 
          alt={skillObj.name || 'Skill icon'} 
          className="w-8 h-8 object-contain rounded"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      );
    }

    // 3. Fallback to local high-fidelity SVG icon if it matches by name
    const localMatch = DEFAULT_SKILLS.find(
      (ds) => ds.name.toLowerCase() === (skillObj.name || "").toLowerCase()
    );
    if (localMatch && localMatch.icon) {
      return localMatch.icon;
    }

    // 4. Default retro code icon fallback
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
