'use client';

import { useEffect, useState } from 'react';

export default function Slide01_Title() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const modules = [
    'AREA OF RESPONSIBILITY',
    'ORGANISING ELEMENTS',
    'CQB FORMATIONS',
    'CQB MANEUVERS',
    'ENTRY TECHNIQUES',
    'CO-ORDINATED ENTRY',
    'BREACHING TECHNIQUES',
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-10 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#6a756f 1px, transparent 1px), linear-gradient(90deg, #6a756f 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <p className="text-military-400 font-mono text-xs tracking-[0.4em] text-center mb-3">
          TACTICAL OPERATIONS CENTER — TRAINING RESOURCES
        </p>
      </div>

      <div className={`text-center transition-all duration-1000 ${phase >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          CLOSE QUARTERS <span className="text-accent-gold">BATTLE</span>
        </h1>
        <p className="text-military-300 font-mono text-sm mt-3 tracking-widest">
          TACTICS · TECHNIQUES · PROCEDURES
        </p>
      </div>

      <div className={`w-2/3 max-w-xl h-px bg-military-600 transition-all duration-1000 origin-center ${phase >= 3 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />

      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl px-6 transition-opacity duration-700 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        {modules.map((m, i) => (
          <div
            key={m}
            className="glass-panel px-3 py-2 border-l-2 border-military-600 transition-all duration-500"
            style={{ transitionDelay: `${i * 100}ms`, opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? 'translateY(0)' : 'translateY(8px)' }}
          >
            <p className="text-military-300 font-mono text-[10px] tracking-wider">{`0${i + 1}`}</p>
            <p className="text-white font-mono text-xs mt-0.5">{m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
