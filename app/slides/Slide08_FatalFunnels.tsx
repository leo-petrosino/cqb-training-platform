'use client';

import { useEffect, useState } from 'react';

export default function Slide08_FatalFunnels() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold text-white">Fatal Funnels</h2>
        <p className="text-military-300">Doorways, hallways, stairwells — kill zones by design.</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-2xl h-72">
          {/* Hallway */}
          <div className="absolute left-1/4 top-0 w-1/2 h-full bg-military-800/50 border-x-4 border-military-600">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-military-500 text-xs font-mono">HALLWAY</div>
          </div>

          {/* Doorway (the funnel) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-32 bg-accent-red/10 border-2 border-accent-red rounded">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-accent-red text-xs font-mono font-bold">FATAL FUNNEL</div>
          </div>

          {/* Crossfire indicators */}
          <div className={`absolute left-4 top-16 transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-0 h-0 border-t-[30px] border-t-transparent border-r-[60px] border-r-accent-red/20 border-b-[30px] border-b-transparent transform rotate-12" />
            <div className="absolute top-0 left-16 text-accent-red text-xs font-mono">ENEMY FIRE</div>
          </div>

          <div className={`absolute right-4 top-16 transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-0 h-0 border-t-[30px] border-t-transparent border-l-[60px] border-l-accent-red/20 border-b-[30px] border-b-transparent transform -rotate-12" />
            <div className="absolute top-0 right-16 text-accent-red text-xs font-mono">ENEMY FIRE</div>
          </div>

          {/* Operators stuck in funnel */}
          <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ${step >= 2 ? 'bottom-24 opacity-100' : 'bottom-8 opacity-0'}`}>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-accent-gold rounded-full border border-white" />
              <div className="w-8 h-8 bg-accent-gold rounded-full border border-white opacity-70" />
              <div className="w-8 h-8 bg-accent-gold rounded-full border border-white opacity-40" />
            </div>
            <p className="text-accent-red text-xs font-mono mt-2 text-center">STACKED — VULNERABLE</p>
          </div>

          {/* Solution: flow through */}
          <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ${step >= 3 ? 'top-16 opacity-100' : 'top-32 opacity-0'}`}>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-accent-green rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div className="w-10 h-10 bg-accent-green rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div className="w-10 h-10 bg-accent-green rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </div>
            <p className="text-accent-green text-xs font-mono mt-2 text-center">FLOW THROUGH — DON'T STOP</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: 'NEVER PAUSE', desc: 'In a doorway, you are a target. Keep moving.' },
          { title: 'SPREAD OUT', desc: 'Single file in a hallway = one grenade kills all.' },
          { title: 'CLEAR FORWARD', desc: 'Don't look back. The rear guard has your six.' },
        ].map((tip, i) => (
          <div key={i} className="glass-panel p-4 border-l-2 border-accent-red">
            <p className="text-white text-sm font-semibold mb-1">{tip.title}</p>
            <p className="text-xs text-military-400">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
