import { Calendar, MapPin, Award } from 'lucide-react';
import GlassCard from '@/shared/components/ui/GlassCard';
import ScrollReveal from '@/shared/components/ui/ScrollReveal';

/**
 * @fileoverview Reusable Education Card component.
 */
export default function EducationCard({ entry, index }) {
  return (
    <ScrollReveal
      animation="left"
      delay={index * 0.15}
      className="relative"
    >
      <GlassCard className="group">
        <div className="p-5 sm:p-6 text-left relative z-10">
          
          {/* Year & Location row */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-brand-400 bg-zinc-900 border border-zinc-800/80 px-3 py-1 rounded-full">
              <Calendar className="w-3 h-3 text-brand-400/80" />
              {entry.year}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-zinc-400">
              <MapPin className="w-3 h-3 text-zinc-400" />
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
      </GlassCard>
    </ScrollReveal>
  );
}
