import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { GLOBAL } from '../../constants/strings';

/**
 * @fileoverview Handles the code mockup window on the right side of the Hero section.
 * Extracted to isolate state (activeTab) from the main layout.
 */

export default function TerminalWindow({ isBooted }) {
  const [activeTab, setActiveTab] = useState('Mustafa.jsx');

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
        <span className="text-green-400">'{GLOBAL.DEV_NAME}'</span>,
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">role:</span>{' '}
        <span className="text-green-400">'{GLOBAL.DEV_TITLE}'</span>,
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">education:</span>{' '}
        <span className="text-green-400">'{GLOBAL.DEV_EDUCATION}'</span>,
      </div>
      <div className="pl-4">
        <span className="text-zinc-500">location:</span>{' '}
        <span className="text-green-400">'{GLOBAL.DEV_LOCATION}'</span>
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
        <span className="text-brand-400">EMAIL</span><span className="text-zinc-500">=</span><span className="text-green-400">"{GLOBAL.DEV_EMAIL}"</span>
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

  return (
    <div 
      className={`lg:col-span-5 flex justify-center items-center z-10 w-full ${
        isBooted ? 'hero-revealed' : 'opacity-0'
      }`}
      style={{ animationDelay: '300ms' }}
    >
      <div className="w-full max-w-md aspect-square p-2 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] shadow-2xl backdrop-blur-md group hover:border-white/10 transition-premium">
        <div className="rounded-[calc(2.5rem-0.5rem)] bg-zinc-950/90 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 flex flex-col justify-between h-full relative overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/15 transition-all duration-500 pointer-events-none"></div>
          
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-red-500/80 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-yellow-500/80 transition-colors cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-green-500/80 transition-colors cursor-pointer"></div>
            </div>
            
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

          <div className="font-mono text-[11px] sm:text-xs text-left text-zinc-300 space-y-1.5 flex-grow overflow-y-auto pr-1 h-[240px] scrollbar-thin">
            {activeTab === 'Mustafa.jsx' && renderMustafaJsx()}
            {activeTab === 'Skills.json' && renderSkillsJson()}
            {activeTab === 'Contact.sh' && renderContactSh()}
          </div>

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
  );
}
