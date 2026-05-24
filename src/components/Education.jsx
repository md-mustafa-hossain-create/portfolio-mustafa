import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

export default function Education() {

  // NOTE: Each entry shows only institution, qualification, year, and location
  const educationData = [
    {
      institution: 'Brainware University',
      degree: 'Bachelor of Computer Applications (BCA)',
      year: '2024',
      location: 'Kolkata, India',
      active: false,
    },
    {
      institution: 'Netaji Subhas Public School',
      degree: 'Higher Secondary (12th)',
      year: '2019',
      location: 'Jiaganj, India',
      active: false,
    },
    {
      institution: "Nawab Bahadur's Institution",
      degree: 'Secondary (10th)',
      year: '2017',
      location: 'Lalbagh, India',
      active: false,
    },
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider font-mono text-brand-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>04 . Academics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
            My <span className="text-brand-400">Education</span>
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">

            {educationData.map((entry, idx) => (
              <div
                key={idx}
                className="relative reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >

                {/* Card */}
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
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
