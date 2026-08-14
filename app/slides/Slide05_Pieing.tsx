'use client';

import { useEffect, useState } from 'react';

export default function Slide05_Pieing() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 2500);
    const t3 = setTimeout(() => setStep(3), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Pieing the Corner</h2>
        <p className="text-military-300">Incremental exposure. Slice the pie, do not take the whole cake.</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-xl h-72">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-military-800 border-r-4 border-military-600">
            <div className="absolute top-4 right-4 text-military-500 text-xs font-mono">WALL</div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-32 bg-military-700" />

          <div className={`absolute left-8 transition-all duration-1000 ${step >= 1 ? 'bottom-20' : 'bottom-8'}`}>
            <div className="w-10 h-10 bg-accent-gold rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-military-900 font-bold text-xs">1</span>
            </div>
            <div className={`mt-2 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-accent-gold text-xs font-mono">POSITION A</p>
            </div>
          </div>

          <div className={`absolute left-24 transition-all duration-1000 ${step >= 2 ? 'bottom-24' : 'bottom-8'}`}>
            <div className="w-10 h-10 bg-accent-gold rounded-full border-2 border-white flex items-center justify-center opacity-70">
              <span className="text-military-900 font-bold text-xs">1</span>
            </div>
            <div className={`mt-2 transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-accent-gold text-xs font-mono">POSITION B</p>
            </div>
          </div>

          <div className={`absolute left-40 transition-all duration-1000 ${step >= 3 ? 'bottom-28' : 'bottom-8'}`}>
            <div className="w-10 h-10 bg-accent-gold rounded-full border-2 border-white flex items-center justify-center opacity-40">
              <span className="text-military-900 font-bold text-xs">1</span>
            </div>
            <div className={`mt-2 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-accent-gold text-xs font-mono">POSITION C</p>
            </div>
          </div>

          <div className={`absolute left-20 bottom-32 transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-0 h-0 border-l-[60px] border-r-0 border-b-[40px] border-l-transparent border-r-transparent border-b-accent-gold/10 transform -rotate-12" />
          </div>

          <div className={`absolute left-36 bottom-36 transition-all duration-1000 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-0 h-0 border-l-[80px] border-r-0 border-b-[50px] border-l-transparent border-r-transparent border-b-accent-gold/10 transform -rotate-6" />
          </div>

          <div className={`absolute left-52 bottom-40 transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-0 h-0 border-l-[100px] border-r-0 border-b-[60px] border-l-transparent border-r-transparent border-b-accent-gold/10" />
          </div>

          <div className={`absolute right-16 top-16 transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-8 h-8 bg-accent-red rounded-sm border border-accent-red animate-pulse" />
            <p className="text-accent-red text-xs font-mono mt-1">THREAT</p>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 288">
            <path d="M 40 260 Q 80 240, 120 220 Q 160 200, 200 180" fill="none" stroke="#c9a227" strokeWidth="2" strokeDasharray="6 4" className={`transition-opacity duration-1000 ${step >= 2 ? 'opacity-40' : 'opacity-0'}`} />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: 'SLICE INCREMENTALLY', desc: 'Move a few inches, scan, stop. Repeat.' },
          { title: 'WEAPON READY', desc: 'Muzzle leads the eyes. Never scan with head only.' },
          { title: 'DO NOT RUSH', desc: 'Speed comes from efficiency, not haste.' },
        ].map((tip, i) => (
          <div key={i} className="glass-panel p-4 border-l-2 border-accent-gold">
            <p className="text-white text-sm font-semibold mb-1">{tip.title}</p>
            <p className="text-xs text-military-400">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
