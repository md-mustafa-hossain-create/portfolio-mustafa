import { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Terminal } from 'lucide-react';

const ROLES = [
  'Frontend Developer',
  'React Enthusiast',
  'BCA Graduate',
  'Problem Solver',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [activeTab, setActiveTab] = useState('Mustafa.jsx');

  const [bootStep, setBootStep] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const steps = [
      { delay: 100, step: 1 },
      { delay: 400, step: 2 },
      { delay: 700, step: 3 },
      { delay: 1000, step: 4 },
      { delay: 1300, step: 5 },
      { delay: 1600, step: 6 },
      { delay: 1900, step: 7 }
    ];

    const timeouts = steps.map(({ delay, step }) =>
      setTimeout(() => setBootStep(step), delay)
    );

    timeouts.push(
      setTimeout(() => {
        setIsBooted(true);
      }, 2300)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const renderMustafaJsx = () => (
    <>
      <div className="text-zinc-600 select-none">// 1. Importing the developer</div>
      <div>
        <span className="text-purple-400">const</span>{' '}
        <span className="text-brand-400">developer</span>{' '}
        <span className="text-zinc-500">=</span>{' '}
        <span className="text-zinc-400">{' {'}</span>
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">name:</span>{' '}
        <span className="text-green-400">'MD Mustafa Hossain'</span>,
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">role:</span>{' '}
        <span className="text-green-400">'Frontend Developer'</span>,
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">education:</span>{' '}
        <span className="text-green-400">'BCA Graduate'</span>,
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">location:</span>{' '}
        <span className="text-green-400">'West Bengal, India'</span>
      </div>
      <div><span className="text-zinc-400">{'}'}</span>;</div>

      <div className="h-3"></div>
      <div className="text-zinc-600 select-none">// 2. Rendering capabilities</div>
      <div>
        <span className="text-purple-400">function</span>{' '}
        <span className="text-brand-400">getTechStack</span>
        <span className="text-zinc-400">() {'{'}</span>
      </div>
      <div className="pl-4">
        <span className="text-purple-400">return</span>{' '}
        <span className="text-zinc-400">[</span>
      </div>
      <div className="pl-8 text-brand-300/90">
        'React', 'Vite', 'Tailwind', 'Firebase'
      </div>
      <div className="pl-4">
        <span className="text-zinc-400">]</span>;
      </div>
      <div><span className="text-zinc-400">{'}'}</span></div>
    </>
  );

  const renderSkillsJson = () => (
    <>
      <div className="text-zinc-600 select-none">// 3. Current tech inventory</div>
      <div><span className="text-zinc-400">{'{'}</span></div>
      <div className="pl-4">
        <span className="text-purple-400">"frontend"</span><span className="text-zinc-500">:</span> <span className="text-zinc-400">[</span>
      </div>
      <div className="pl-8 text-green-400">
        "HTML5", "CSS3", "JavaScript", "React JS"
      </div>
      <div className="pl-4"><span className="text-zinc-400">]</span>,</div>
      <div className="pl-4">
        <span className="text-purple-400">"styling"</span><span className="text-zinc-500">:</span> <span className="text-green-400">"Tailwind CSS v4"</span>,
      </div>
      <div className="pl-4">
        <span className="text-purple-400">"backend"</span><span className="text-zinc-500">:</span> <span className="text-green-400">"Firebase Firestore"</span>,
      </div>
      <div className="pl-4">
        <span className="text-purple-400">"tools"</span><span className="text-zinc-500">:</span> <span className="text-zinc-400">[</span><span className="text-green-400">"Git", "GitHub"</span><span className="text-zinc-400">]</span>,
      </div>
      <div className="pl-4">
        <span className="text-purple-400">"learning_next"</span><span className="text-zinc-500">:</span> <span className="text-green-400">"Next.js"</span>
      </div>
      <div><span className="text-zinc-400">{'}'}</span></div>
    </>
  );

  const renderContactSh = () => (
    <>
      <div className="text-zinc-600 select-none"># 4. Quick contact bash utility</div>
      <div>
        <span className="text-blue-400">#!/bin/bash</span>
      </div>
      <div className="h-2"></div>
      <div>
        <span className="text-brand-400">EMAIL</span><span className="text-zinc-500">=</span><span className="text-green-400">"hussainmustafa2001@gmail.com"</span>
      </div>
      <div>
        <span className="text-brand-400">SOCIAL</span><span className="text-zinc-500">=</span><span className="text-green-400">"github.com/md-mustafa-hossain-create"</span>
      </div>
      <div className="h-2"></div>
      <div>
        <span className="text-purple-400">echo</span> <span className="text-green-400">"Initiating connection..."</span>
      </div>
      <div>
        <span className="text-purple-400">curl</span> <span className="text-zinc-400">-X POST -d</span> <span className="text-green-400">"msg=Hello"</span> <span className="text-zinc-400">\</span>
      </div>
      <div className="pl-4 text-zinc-400">
        https://api.dev/contact?email=<span className="text-brand-300">$EMAIL</span>
      </div>
      <div className="h-2"></div>
      <div>
        <span className="text-zinc-500"># Response:</span>
      </div>
      <div className="text-emerald-400 font-bold">
        &gt; "Connection established! Let's build!"
      </div>
    </>
  );

  // Typewriter effect logic
  // NOTE: structured conditional branches avoid overlapping setTimeouts
  useEffect(() => {
    if (!isBooted) return;
    let timer;
    const currentRole = ROLES[roleIndex];

    if (isDeleting) {
      if (displayText === '') {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % ROLES.length);
          setTypingSpeed(100);
        }, 150);
      } else {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.substring(0, prev.length - 1));
          setTypingSpeed(50);
        }, typingSpeed);
      }
    } else {
      if (displayText === currentRole) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentRole.substring(0, displayText.length + 1));
          setTypingSpeed(100);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isBooted, roleIndex, typingSpeed]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-32 pb-24 overflow-hidden bg-terminal-mesh-hero border-b border-zinc-900">
      {/* Bootloader screen overlay */}
      <div 
        className={`fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center transition-opacity duration-700 ${
          isBooted ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="font-mono text-xs sm:text-sm text-brand-400 space-y-2 max-w-md w-full px-6 text-left">
          {bootStep >= 1 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span>MUSTAFA_OS v4.0.0 initializing...</span>
            </div>
          )}
          {bootStep >= 2 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span>Loading kernel modules... <span className="text-emerald-400 font-bold">OK</span></span>
            </div>
          )}
          {bootStep >= 3 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span>Connecting database... <span className="text-emerald-400 font-bold">SUCCESS</span></span>
            </div>
          )}
          {bootStep >= 4 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span>Setting visual profiles (Mint/Obsidian)... <span className="text-emerald-400 font-bold">DONE</span></span>
            </div>
          )}
          {bootStep >= 5 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span>Fetching interface resources... <span className="text-emerald-400 font-bold">100%</span></span>
            </div>
          )}
          {bootStep >= 6 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span>Starting terminal shell session... <span className="text-emerald-400 font-bold">READY</span></span>
            </div>
          )}
          {bootStep >= 7 && (
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">&gt;</span>
              <span className="animate-pulse">Booting dashboard...</span>
            </div>
          )}
        </div>
      </div>

      {/* Ambient Radial Mesh Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-500/5 blur-[100px] md:blur-[140px] animate-pulse-slow z-0 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-brand-600/3 blur-[100px] md:blur-[140px] animate-pulse-slow z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline pill */}
            <div 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-[10px] uppercase tracking-wider text-brand-400 font-mono mb-6 backdrop-blur-md ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '100ms' }}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Available for internships & roles</span>
            </div>

            {/* Main Greeting */}
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6 ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '250ms' }}
            >
              Hi, I'm <br />
              <span className="text-brand-400">
                MD Mustafa Hossain
              </span>
            </h1>

            {/* Typewriter Role Headline */}
            <div 
              className={`h-10 sm:h-12 flex items-center mb-6 ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <p className="text-lg sm:text-2xl font-mono text-zinc-300">
                I'm a{' '}
                <span className="text-brand-400 font-bold border-r-2 border-brand-400 pr-1.5 animate-pulse">
                  {displayText}
                </span>
              </p>
            </div>

            {/* Subtitle */}
            <p 
              className={`text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed font-sans ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '550ms' }}
            >
              I am a BCA graduate specializing in Frontend Development. I enjoy crafting modern, beautiful, and highly responsive web apps using React JS and Tailwind CSS.
            </p>

            {/* Actions CTA: Button-in-Button architecture */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '700ms' }}
            >
              <a
                id="hero-btn-projects"
                href="#projects"
                className="inline-flex items-center justify-between pl-6 pr-2.5 py-2.5 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-full transition-premium shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 hover:scale-[1.02] active:scale-98 group w-full sm:w-auto gap-4"
              >
                <span className="text-sm">View Projects</span>
                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-premium shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </a>
              
              <a
                id="hero-btn-resume"
                href="/resume.pdf"
                download="MD_Mustafa_Hossain_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-full transition-premium hover:bg-zinc-800/40 active:scale-98 text-sm font-semibold"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Download Resume</span>
              </a>

              <a
                id="hero-btn-contact"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-zinc-400 hover:text-brand-400 rounded-full transition-premium active:scale-98 font-mono text-xs tracking-wider"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Contact Me</span>
              </a>
            </div>

            <span 
              className={`text-[10px] text-zinc-600 mt-4 font-mono block ${
                isBooted ? 'hero-revealed' : 'opacity-0'
              }`}
              style={{ animationDelay: '850ms' }}
            >
              * Note: Replace public/resume.pdf with your actual CV
            </span>
          </div>

          {/* Hero Right: Concentric Double-Bezel nested terminal mockup */}
          <div 
            className={`lg:col-span-5 flex justify-center items-center z-10 w-full ${
              isBooted ? 'hero-revealed' : 'opacity-0'
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="w-full max-w-md aspect-square p-2 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-md group hover:border-white/10 transition-premium">
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-zinc-950/90 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 flex flex-col justify-between h-full relative overflow-hidden">
                
                {/* Internal ambient glowing circles */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/15 transition-all duration-500 pointer-events-none"></div>
                
                {/* Code window Header Bar */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors cursor-pointer"></div>
                  </div>
                  
                  {/* Tabs */}
                  <div className="flex gap-1.5 overflow-x-auto max-w-[70%] no-scrollbar">
                    {['Mustafa.jsx', 'Skills.json', 'Contact.sh'].map((tab) => {
                      const isActive = activeTab === tab;
                      return (
                        <button
                          key={tab}
                          id={`hero-tab-${tab.replace('.', '-').toLowerCase()}`}
                          onClick={() => setActiveTab(tab)}
                          className={`text-[9px] font-mono flex items-center gap-1 px-3 py-1.5 rounded-t-lg transition-premium border-b-2 cursor-pointer ${
                            isActive
                              ? 'text-brand-400 bg-zinc-900 border-brand-400 font-semibold'
                              : 'text-zinc-500 bg-transparent border-transparent hover:text-zinc-300 hover:bg-zinc-900/30'
                          }`}
                        >
                          <Terminal className="w-2.5 h-2.5 shrink-0" />
                          <span>{tab}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Code window body lines with custom highlighting */}
                <div className="font-mono text-[11px] sm:text-xs text-left text-zinc-300 space-y-1.5 flex-grow overflow-y-auto pr-1 h-[240px] scrollbar-thin">
                  {activeTab === 'Mustafa.jsx' && renderMustafaJsx()}
                  {activeTab === 'Skills.json' && renderSkillsJson()}
                  {activeTab === 'Contact.sh' && renderContactSh()}
                </div>

                {/* Graphical terminal status indicator */}
                <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-500 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-emerald-400 font-bold tracking-wider">READY</span>
                  </div>
                  <div className="uppercase">{activeTab.split('.').pop()}</div>
                  <div className="text-brand-400 font-semibold group-hover:translate-x-1 transition-premium text-[10px]">
                    &lt;coder_mockup /&gt;
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
