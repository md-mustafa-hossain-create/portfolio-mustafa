import { Calendar, MapPin, Award } from 'lucide-react';

/**
 * @fileoverview Reusable Education Card component.
 */
export default function EducationCard({ entry, index }) {
  return (
    <div
      className="relative reveal"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="double-bezel-outer hover:border-brand-500/20 hover:scale-[1.01] group overflow-hidden">
        <div className="double-bezel-inner p-5 sm:p-6 text-left">
          
          {/* Year & Location row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-brand-400 font-bold bg-zinc-900 border border-zinc-800/80 px-3 py-1 rounded-full">
              <Calendar className="w-3 h-3 text-brand-400/80" />
              {entry.year}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
              <MapPin className="w-3 h-3 text-zinc-600" />
              {entry.location}
            </span>
          </div>

          {/* Degree */}
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 mb-1 group-hover:text-brand-400 transition-colors">
            {entry.degree}
          </h3>

          {/* Institution */}
          <h4 className="text-sm text-zinc-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-brand-400/60 shrink-0" />
            {entry.institution}
          </h4>

        </div>
      </div>
    </div>
  );
}
