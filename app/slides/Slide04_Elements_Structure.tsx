'use client';

import { useEffect, useState } from 'react';

export default function Slide04_Elements_Structure() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const tiers = [
    { label: 'STRATEGIC', desc: 'National-level management of the conflict as a whole', width: 'w-full', color: '#8b2635' },
    { label: 'OPERATIONAL', desc: 'Gaining advantage over the opposing force within a battlespace', width: 'w-3/4', color: '#c9a227' },
    { label: 'TACTICAL', desc: 'Small-scale maneuvers and engagements — this is where the Element lives', width: 'w-1/2', color: '#2d5a3f' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Organising Elements</h2>
        <p className="text-military-300">Where a tactical Element sits in the command structure</p>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          {tiers.map((t, i) => (
            <div
              key={t.label}
              className={`${t.width} mx-auto glass-panel p-3 border-l-4 transition-all duration-700`}
              style={{ borderColor: t.color, opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateY(0)' : 'translateY(-10px)', transitionDelay: `${i * 250}ms` }}
            >
              <p className="font-mono text-sm font-bold" style={{ color: t.color }}>{t.label}</p>
              <p className="text-military-400 text-xs mt-1">{t.desc}</p>
            </div>
          ))}
          <div className={`text-center transition-opacity duration-700 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-military-500 font-mono text-[11px]">Each tier complements the others — large to medium to small scale</p>
          </div>
        </div>

        <div className={`space-y-4 transition-all duration-700 ${step >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}>
          <div className="glass-panel p-4 border-l-2 border-accent-gold">
            <p className="text-accent-gold font-mono text-xs font-bold mb-1">DEFINITION: ELEMENT</p>
            <p className="text-military-300 text-sm italic">"A tactical-level personnel structure, organic to an active operational-level command."</p>
          </div>
          <div className="glass-panel p-4 border-l-2 border-military-600">
            <p className="text-military-300 font-mono text-xs font-bold mb-1">IN PRACTICE</p>
            <p className="text-military-400 text-sm">An Element can be a fireteam, section, or squad. Every individual Operator gains cohesion through consistent coordination, communication, and situational clarity — not rank alone.</p>
          </div>
          <div className="glass-panel p-4 border-l-2 border-accent-red">
            <p className="text-accent-red font-mono text-xs font-bold mb-1">RADIO EXAMPLE</p>
            <p className="text-military-300 text-sm font-mono">"Two ground elements en route to the objective, ETA one mike."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
