import { Calendar, MapPin, Award, GraduationCap } from 'lucide-react';
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
      <div className="relative pl-12 sm:pl-16">
        <span className="absolute left-[0.55rem] top-7 z-20 flex h-5 w-5 items-center justify-center rounded-full border-4 border-zinc-950 bg-brand-400 shadow-[0_0_0_1px_rgba(44,255,5,0.35),0_0_18px_rgba(44,255,5,0.3)]" />
        <GlassCard className="group">
          <div className="relative p-5 sm:p-6 text-left">
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-950/70 text-zinc-300 transition-transform duration-300 group-hover:scale-105">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-brand-400 bg-zinc-900 border border-zinc-800/80 px-3 py-1 rounded-full">
                    <Calendar className="w-3 h-3 text-brand-400/80" />
                    {entry.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-zinc-400">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    {entry.location}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold leading-snug text-zinc-100 mb-2 transition-colors">
                  {entry.degree}
                </h3>

                <h4 className="text-sm text-zinc-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-400/60 shrink-0" />
                  {entry.institution}
                </h4>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </ScrollReveal>
  );
}
