'use client';

import { useEffect, useState } from 'react';

export default function Slide03_Threshold() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Threshold Evaluation</h2>
        <p className="text-military-300">The most dangerous moment in CQB</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-80">
          {/* Door frame */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-40 h-full border-4 border-military-600 bg-military-800/30">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-military-500 font-mono">DOOR FRAME</div>
          </div>

          {/* Threshold line */}
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-20 w-48 h-1 bg-accent-red transition-all duration-1000 ${phase >= 1 ? 'opacity-100 shadow-[0_0_20px_rgba(139,38,53,0.6)]' : 'opacity-0'}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-accent-red text-xs font-mono font-bold tracking-widest">THRESHOLD</div>
          </div>

          {/* Operator approaching */}
          <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ${phase >= 1 ? 'bottom-32' : 'bottom-8'}`}>
            <div className="w-12 h-12 bg-accent-gold rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <span className="text-military-900 font-bold text-sm">1</span>
            </div>
            <div className={`mt-2 text-center transition-opacity duration-500 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-accent-gold text-xs font-mono">PIE THE DOOR</p>
            </div>
          </div>

          {/* Vision cone - appears during pieing */}
          <div className={`absolute left-1/2 transition-all duration-1000 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative -translate-x-1/2 top-24">
              <div className="w-0 h-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-accent-gold/10" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-accent-gold/60 font-mono">VISION CONE</div>
            </div>
          </div>

          {/* Hard corner indicators */}
          <div className={`absolute left-8 top-20 transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <div className="w-16 h-16 bg-accent-red/20 border border-accent-red rounded-lg flex items-center justify-center">
              <span className="text-accent-red text-xs font-mono font-bold">HARD<br/>CORNER</span>
            </div>
          </div>

          <div className={`absolute right-8 top-20 transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <div className="w-16 h-16 bg-accent-red/20 border border-accent-red rounded-lg flex items-center justify-center">
              <span className="text-accent-red text-xs font-mono font-bold">HARD<br/>CORNER</span>
            </div>
          </div>

          {/* Entry burst */}
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-40 transition-all duration-700 ${phase >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-3 h-3 bg-accent-gold rounded-full animate-ping" style={{ animationDelay: `${i*0.2}s` }} />
              ))}
            </div>
            <p className="text-accent-gold text-xs font-mono mt-2 text-center">EXPLOIT THE THRESHOLD</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { step: '01', title: 'PIE THE DOOR', desc: 'Clear what you can see before crossing. Never enter blind.' },
          { step: '02', title: 'HARD CORNERS', desc: 'Identify corners you cannot clear from outside. Plan your entry.' },
          { step: '03', title: 'EXPLOIT', desc: 'Cross the threshold fast. The enemy knows you're coming.' },
        ].map((s, i) => (
          <div key={i} className={`glass-panel p-4 border-l-2 transition-all duration-500 ${phase > i ? 'border-accent-gold' : 'border-military-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent-gold font-mono font-bold">{s.step}</span>
              <span className="text-white text-sm font-semibold">{s.title}</span>
            </div>
            <p className="text-xs text-military-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
