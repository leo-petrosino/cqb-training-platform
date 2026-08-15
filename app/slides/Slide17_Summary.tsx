'use client';

import { useEffect, useState } from 'react';

export default function Slide17_Summary() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const rows = [
    { n: '01', t: 'AREA OF RESPONSIBILITY', s: 'Divide 360° coverage among the element; never flag a teammate\'s sector.' },
    { n: '02', t: 'ORGANISING ELEMENTS', s: 'Shared commands — Ready Up, Detach, Fall In, Go-Code — keep the team synchronised.' },
    { n: '03', t: 'CQB FORMATIONS', s: 'Column, Y and Diamond formations trade speed for AOR coverage depending on threat level.' },
    { n: '04', t: 'CQB MANEUVERS', s: 'Wall Shift, Bounding Overwatch and Peel reposition the element without losing security.' },
    { n: '05', t: 'ENTRY TECHNIQUES', s: 'Buttonhook, Crossover, Limited Penetration and 4-In/2-Out clear rooms methodically.' },
    { n: '06', t: 'CO-ORDINATED ENTRY', s: 'Multiple teams breach simultaneously on a shared Go-Code for maximum shock value.' },
    { n: '07', t: 'BREACHING TECHNIQUES', s: 'Mechanical, ballistic, explosive and thermal methods are chosen by speed vs. risk.' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6 justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Module Recap</h2>
        <p className="text-military-300">Seven pillars of Close Quarters Battle doctrine</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.n}
            className="glass-panel px-4 py-2.5 flex items-center gap-4 border-l-2 border-military-600 transition-all duration-500"
            style={{ opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateX(0)' : 'translateX(-12px)', transitionDelay: `${i * 120}ms` }}
          >
            <span className="text-accent-gold font-mono text-sm font-bold w-8">{r.n}</span>
            <div>
              <p className="text-white font-mono text-sm font-bold">{r.t}</p>
              <p className="text-military-400 text-xs">{r.s}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`text-center transition-opacity duration-700 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-military-500 font-mono text-xs tracking-widest">END OF MODULE — TRAIN AS YOU FIGHT</p>
      </div>
    </div>
  );
}
