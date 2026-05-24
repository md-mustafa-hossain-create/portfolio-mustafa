import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Skills() {
  const [skillList, setSkillList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Official high-quality pixel-perfect SVG logos with exact brand colors
  const defaultSkills = [
    {
      name: 'HTML5',
      desc: 'Structure of the Web',
      color: 'from-orange-500 to-red-500',
      icon: (
        <svg className="w-8 h-8 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      )
    },
    {
      name: 'CSS3',
      desc: 'Styling & Animations',
      color: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-8 h-8 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      desc: 'Logic & Interactivity',
      color: 'from-yellow-500 to-amber-500',
      icon: (
        <svg className="w-8 h-8 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )
    },
    {
      name: 'React JS',
      desc: 'Component Architecture',
      color: 'from-cyan-400 to-blue-500',
      icon: (
        <svg className="w-8 h-8 text-[#61DAFB] animate-spin" style={{ animationDuration: '15s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
        </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      desc: 'Rapid UI Development',
      color: 'from-teal-400 to-cyan-500',
      icon: (
        <svg className="w-8 h-8 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.377 1.394 2.738 2.776 5.712 2.776 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.9-2.288-1.625C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    },
    {
      name: 'React Router',
      desc: 'Single Page Navigation',
      color: 'from-red-500 to-purple-600',
      icon: (
        <svg className="w-8 h-8 text-[#CA4245]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.118 5.466a2.306 2.306 0 00-.623.08c-.278.067-.702.332-.953.583-.41.423-.49.609-.662 1.469-.08.423.41 1.43.847 1.734.45.317 1.085.502 2.065.608 1.429.16 1.84.636 1.84 2.197 0 1.377-.385 1.747-1.96 1.906-1.707.172-2.58.834-2.765 2.117-.106.781.41 1.76 1.125 2.091 1.627.768 3.15-.198 3.467-2.196.211-1.284.622-1.642 1.998-1.747 1.588-.133 2.409-.675 2.713-1.787.278-1.02-.304-2.157-1.297-2.554-.264-.106-.873-.238-1.35-.291-1.495-.16-1.879-.424-2.038-1.39-.225-1.337-.317-1.562-.794-2.09a2.174 2.174 0 00-1.613-.73zm-4.785 4.36a2.145 2.145 0 00-.497.048c-1.469.318-2.17 2.051-1.35 3.295 1.178 1.774 3.944.953 3.97-1.177.012-1.193-.98-2.143-2.123-2.166zM2.089 14.19a2.22 2.22 0 00-.427.052c-2.158.476-2.237 3.626-.106 4.182.53.145.582.145 1.111.013 1.191-.318 1.866-1.456 1.549-2.607-.278-1.02-1.144-1.664-2.127-1.64zm19.824.008c-.233.002-.477.058-.784.162-1.39.477-1.866 2.092-.98 3.336.557.794 1.96 1.058 2.82.516 1.416-.874 1.363-3.057-.093-3.746-.38-.186-.663-.271-.963-.268z"/>
        </svg>
      )
    },
    {
      name: 'Firebase',
      desc: 'Backend & Database',
      color: 'from-amber-400 to-orange-500',
      icon: (
        <svg className="w-8 h-8 text-[#FFCA28]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"/>
        </svg>
      )
    },
    {
      name: 'Git',
      desc: 'Version Control',
      color: 'from-orange-600 to-red-600',
      icon: (
        <svg className="w-8 h-8 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      desc: 'Collaboration & Hosting',
      color: 'from-zinc-600 to-zinc-800',
      icon: (
        <svg className="w-8 h-8 text-[#FFFFFF]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    async function fetchSkills() {
      const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
      const isFirebaseConfigured = apiKey && !apiKey.includes('your_api_key_here') && apiKey !== '';

      if (!isFirebaseConfigured) {
        console.warn("Firebase not configured. Loading default local portfolio skills.");
        setSkillList(defaultSkills);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetched = [];
        
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() });
        });

        if (fetched.length === 0) {
          const backupSnapshot = await getDocs(collection(db, 'skills'));
          backupSnapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...doc.data() });
          });
        }

        if (fetched.length === 0) {
          console.warn("Firestore 'skills' collection is empty. Loading local mockup skills.");
          setSkillList(defaultSkills);
        } else {
          setSkillList(fetched);
        }
      } catch (err) {
        console.error("Error fetching skills from Firestore: ", err);
        console.warn("Loading local mockup skills as fallback.");
        setSkillList(defaultSkills);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  const getSkillColor = (skill) => {
    if (skill.color) return skill.color;
    
    const normalizedName = (skill.name || skill.Name || '').toLowerCase();
    if (normalizedName.includes('html')) return 'from-orange-500/20 to-red-500/20';
    if (normalizedName.includes('css') && !normalizedName.includes('tailwind')) return 'from-blue-500/20 to-cyan-500/20';
    if (normalizedName.includes('javascript') || normalizedName === 'js') return 'from-yellow-500/20 to-amber-500/20';
    if (normalizedName.includes('react') && !normalizedName.includes('router')) return 'from-cyan-400/20 to-blue-500/20';
    if (normalizedName.includes('tailwind')) return 'from-teal-400/20 to-cyan-500/20';
    if (normalizedName.includes('router')) return 'from-red-500/20 to-purple-600/20';
    if (normalizedName.includes('firebase')) return 'from-amber-400/20 to-orange-500/20';
    if (normalizedName.includes('git') && !normalizedName.includes('hub')) return 'from-orange-600/20 to-red-600/20';
    if (normalizedName.includes('github')) return 'from-zinc-600/20 to-zinc-800/20';
    if (normalizedName.includes('node') || normalizedName.includes('express')) return 'from-emerald-400/20 to-green-600/20';
    if (normalizedName.includes('database') || normalizedName.includes('sql') || normalizedName.includes('mongo')) return 'from-indigo-500/20 to-purple-600/20';

    return 'from-brand-400/20 to-brand-600/20';
  };

  const getSkillIcon = (skill) => {
    // 1. If it's already a React element/SVG (e.g. from defaultSkills), use it directly
    if (skill.icon && typeof skill.icon !== 'string') {
      return skill.icon;
    }

    // 2. Check the skill name to see if it matches our core stack.
    // We prioritize our high-quality official inline SVGs to prevent Firestore
    // from overriding them with custom/non-official image URLs.
    const normalizedName = (skill.name || skill.Name || '').toLowerCase();
    if (normalizedName.includes('html')) return defaultSkills[0].icon;
    if (normalizedName.includes('css') && !normalizedName.includes('tailwind')) return defaultSkills[1].icon;
    if (normalizedName.includes('javascript') || normalizedName === 'js') return defaultSkills[2].icon;
    if (normalizedName.includes('react') && !normalizedName.includes('router')) return defaultSkills[3].icon;
    if (normalizedName.includes('tailwind')) return defaultSkills[4].icon;
    if (normalizedName.includes('router')) return defaultSkills[5].icon;
    if (normalizedName.includes('firebase')) return defaultSkills[6].icon;
    if (normalizedName.includes('git') && !normalizedName.includes('hub')) return defaultSkills[7].icon;
    if (normalizedName.includes('github')) return defaultSkills[8].icon;

    if (normalizedName.includes('node') || normalizedName.includes('express')) {
      return (
        <svg className="w-8 h-8 text-[#339933]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 23.364l-10-5.772v-11.544l10-5.772 10 5.772v11.544zm-8-7.39l8 4.62 8-4.62v-7.854l-8-4.62-8 4.62z"/>
        </svg>
      );
    }
    if (normalizedName.includes('database') || normalizedName.includes('sql') || normalizedName.includes('mongo')) {
      return (
        <svg className="w-8 h-8 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .75c-.2 0-.39.05-.56.15-1.28.74-4.5 4.31-4.5 8.94 0 4.14 2.5 7.16 4.5 8.94.17.15.39.22.62.22.23 0 .45-.07.62-.22 2-1.78 4.5-4.8 4.5-8.94 0-4.63-3.22-8.2-4.5-8.94-.17-.1-.36-.15-.56-.15zM12 3v15.5c-1.39-1.42-3-3.8-3-6.64 0-3.32 1.61-6.14 3-6.86z"/>
        </svg>
      );
    }

    // 3. Fallback to image URLs from Firestore if it's a custom/unrecognized skill
    const iconUrl = skill.icon || skill.Icon || skill.image || skill.Image;
    if (iconUrl && typeof iconUrl === 'string') {
      return (
        <img 
          src={iconUrl} 
          alt={skill.name || 'Skill icon'} 
          className="w-8 h-8 object-contain rounded"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }

    // 4. Ultimate fallback to standard code icon
    return (
      <svg className="w-8 h-8 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  };

  if (loading) {
    return (
      <section id="skills" className="py-28 relative overflow-hidden bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" key="skills-loading-content">
          <div className="text-center mb-20 animate-pulse">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-400 font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 . Core Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
              My <span className="text-brand-400">Skills</span>
            </h2>
            <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="p-1.5 bg-zinc-900/10 backdrop-blur-sm border border-white/5 rounded-[2rem] animate-pulse">
                <div className="rounded-[calc(2rem-0.375rem)] bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 flex items-center gap-4 h-full">
                  <div className="w-14 h-14 bg-zinc-900/50 rounded-xl border border-zinc-800 shrink-0"></div>
                  <div className="flex-1 space-y-2.5">
                    <div className="h-5 w-24 bg-zinc-900/50 rounded-md"></div>
                    <div className="h-3 w-32 bg-zinc-900/50 rounded-md"></div>
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
    <section id="skills" className="py-28 relative overflow-hidden bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" key="skills-loaded-content">
        
        {/* Section Title */}
        <div className="text-center mb-20 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-wider text-brand-400 font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 . Core Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter">
            My <span className="text-brand-400">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-5 max-w-md mx-auto leading-relaxed font-mono">
            [<span className="text-brand-300">SYSTEM</span>] Scanning capabilities... <span className="text-brand-400">100% COMPLETE</span>
            <br />
            Found modern frontend tools and frameworks configured for web projects.
          </p>
        </div>

        {/* Skills Grid: Concentric Double-Bezel nested architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillList.map((skill, idx) => {
            const skillGradient = getSkillColor(skill);
            return (
              <div
                key={skill.id || idx}
                className="p-1.5 bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-[2rem] hover:border-brand-500/30 hover:scale-[1.02] hover:-translate-y-0.5 transition-premium group shadow-xl overflow-hidden relative reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Background hover light spots */}
                <div className={`absolute top-0 right-0 w-28 h-28 bg-brand-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`}></div>
                
                <div className="rounded-[calc(2rem-0.375rem)] bg-zinc-950/45 backdrop-blur-lg border border-white/10 p-6 flex items-center gap-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.5)] h-full">
                  <div className="p-3 bg-[#141416]/90 rounded-xl border border-[#27272a]/80 group-hover:scale-110 group-hover:border-[#3f3f46] transition-premium shrink-0 flex items-center justify-center backdrop-blur-sm">
                    {getSkillIcon(skill)}
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
          })}
        </div>

      </div>
    </section>
  );
}
