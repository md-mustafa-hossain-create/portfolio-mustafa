import { useState, useEffect } from 'react';
import { Code2, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const DEFAULT_PROJECTS = [
  {
    title: 'TaskFlow - Project Manager',
    description: 'A collaborative board app featuring project creation, drag-and-drop task boards, and detailed priority tracking labels.',
    tags: ['React JS', 'Tailwind CSS', 'Firebase'],
    github: 'https://github.com/md-mustafa-hossain-create',
    demo: 'https://github.com/md-mustafa-hossain-create',
  },
  {
    title: 'WeatherSphere - Live Forecast',
    description: 'An interactive weather forecasting dashboard that pulls real-time information using geolocation and third-party APIs.',
    tags: ['React JS', 'Tailwind CSS', 'React Router'],
    github: 'https://github.com/md-mustafa-hossain-create',
    demo: 'https://github.com/md-mustafa-hossain-create',
  },
  {
    title: 'DevChat - Realtime Chat',
    description: 'A clean developer chat application powered by Firebase, facilitating private messages, group channels, and code snippet sharing.',
    tags: ['React JS', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com/md-mustafa-hossain-create',
    demo: 'https://github.com/md-mustafa-hossain-create',
  },
];

export default function Projects() {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      // Check if Firebase is configured
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const isFirebaseConfigured = apiKey && !apiKey.includes('your_api_key_here') && apiKey !== '';

      if (!isFirebaseConfigured) {
        console.warn("Firebase not configured. Loading default local portfolio projects.");
        setProjectList(DEFAULT_PROJECTS);
        setLoading(false);
        return;
      }

      try {
        // Query projects ordered by order field
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });

        // Fallback query if 'order' field isn't indexed or configured yet
        if (fetched.length === 0) {
          const backupSnapshot = await getDocs(collection(db, 'projects'));
          backupSnapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...doc.data() });
          });
        }

        if (fetched.length === 0) {
          console.warn("Firestore 'projects' collection is empty. Loading local mockup projects.");
          setProjectList(DEFAULT_PROJECTS);
        } else {
          setProjectList(fetched);
        }
      } catch (err) {
        console.error("Error fetching projects from Firestore: ", err);
        console.warn("Loading local mockup projects as fallback.");
        setProjectList(DEFAULT_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" key="projects-loading-content">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider font-mono text-brand-400 mb-3 animate-pulse">
              <Code2 className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
              <span>03 . Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
              My <span className="text-brand-400">Showcase</span>
            </h2>
            <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="double-bezel-outer p-2 flex flex-col justify-between min-h-[340px] animate-pulse">
                <div className="double-bezel-inner p-6 flex flex-col h-full bg-zinc-950/90">
                  
                  {/* Skeleton Header */}
                  <div className="flex items-center justify-between border-b border-zinc-900/60 pb-3 mb-5 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                    </div>
                    <div className="h-3 w-16 bg-zinc-900 rounded"></div>
                  </div>

                  {/* Skeleton Prompt & Content */}
                  <div className="flex-grow flex flex-col">
                    <div className="h-3 w-24 bg-zinc-900 rounded mb-4"></div>
                    <div className="h-5 w-40 bg-zinc-900 rounded mb-3"></div>
                    <div className="h-4 w-full bg-zinc-900 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-zinc-900 rounded mb-5"></div>
                    
                    {/* Skeleton Tags */}
                    <div className="flex gap-2 mb-6">
                      <div className="h-5 w-14 bg-zinc-900 rounded"></div>
                      <div className="h-5 w-16 bg-zinc-900 rounded"></div>
                      <div className="h-5 w-12 bg-zinc-900 rounded"></div>
                    </div>

                    {/* Skeleton Buttons */}
                    <div className="flex gap-4 border-t border-zinc-900/60 pt-4 mt-auto">
                      <div className="h-8 flex-1 bg-zinc-900 rounded-lg"></div>
                      <div className="h-8 flex-1 bg-zinc-900 rounded-lg"></div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" key="projects-loaded-content">
        
        {/* Section Heading */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider font-mono text-brand-400 mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>03 . Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
            My <span className="text-brand-400">Showcase</span>
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-5 max-w-md mx-auto leading-relaxed font-mono">
            [<span className="text-brand-300">QUERY</span>] Listing projects... <span className="text-brand-400">OK</span>
            <br />
            Select a card below to inspect repositories and live demonstrations.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, idx) => {
            const fileName = `${(project.title || project.Title || '').split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.json`;
            return (
              <article
                key={project.id || idx}
                className="double-bezel-outer hover:border-brand-500/20 hover:-translate-y-0.5 group overflow-hidden relative flex flex-col reveal"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="double-bezel-inner overflow-hidden flex flex-col h-full p-6 bg-zinc-950">
                  
                  {/* Terminal Header Row */}
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors duration-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors duration-300"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors duration-300"></div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wider">
                      project_0{idx + 1}.json
                    </span>
                  </div>

                  <div className="flex-grow flex flex-col">
                    
                    {/* Command Prompt */}
                    <div className="flex items-center gap-2 mb-3.5 font-mono text-[10px] text-zinc-500">
                      <span className="text-brand-400">&gt;</span>
                      <span>cat</span>
                      <span className="text-zinc-300">{fileName}</span>
                    </div>

                    <div className="mb-5">
                      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brand-400 transition-colors leading-snug">
                        {project.title || project.Title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-3 font-sans">
                        {project.description || project.Description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.tags || project.Tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-brand-500/20 group-hover:text-brand-300 transition-all duration-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-4 border-t border-zinc-900 pt-4 mt-auto">
                      <a
                        id={`project-repo-${(project.title || project.Title || '').toLowerCase().replace(/\s+/g, '-')}`}
                        href={project.github || project.Github || project.GitHub || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-lg text-xs font-mono transition-all duration-200"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>REPO</span>
                      </a>
                      <a
                        id={`project-demo-${(project.title || project.Title || '').toLowerCase().replace(/\s+/g, '-')}`}
                        href={project.demo || project.Demo || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex justify-center items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 hover:border-brand-500/30 text-brand-400 hover:text-white rounded-lg text-xs font-mono transition-all duration-200 active:scale-[0.98]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>DEMO</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
