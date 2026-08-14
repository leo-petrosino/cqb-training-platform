'use client';

import { useEffect, useState } from 'react';

export default function Slide01_Intro() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(1), 400),
      setTimeout(() => setVisible(2), 900),
      setTimeout(() => setVisible(3), 1500),
      setTimeout(() => setVisible(4), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <div className={`text-center space-y-4 transition-all duration-700 ${visible >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-red/10 border border-accent-red/30 rounded-full text-accent-red text-sm font-mono tracking-widest">
          HERRICK TASKFORCE — PHASE III
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Close Quarters Battle
        </h1>
        <p className="text-xl text-accent-gold font-semibold tracking-wide">
          CQB TRAINING — CLASSROOM MODULE
        </p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl w-full transition-all duration-700 delay-300 ${visible >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {[
          { num: '01', label: 'Fundamentals', desc: 'Stack, threshold, entry' },
          { num: '02', label: 'Tactics', desc: 'Room clearing, pieing, sectors' },
          { num: '03', label: 'Evaluation', desc: 'Scenario-based assessment' },
        ].map((item) => (
          <div key={item.num} className="glass-panel p-5 text-center space-y-2 border-l-2 border-accent-gold">
            <span className="text-3xl font-bold text-accent-gold font-mono">{item.num}</span>
            <h3 className="text-white font-semibold">{item.label}</h3>
            <p className="text-sm text-military-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className={`text-center space-y-3 transition-all duration-700 ${visible >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center gap-4 text-military-400 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            RESTRICTED
          </span>
          <span>|</span>
          <span className="font-mono">RGR • GGRP</span>
        </div>
      </div>

      <div className={`transition-all duration-1000 ${visible >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-xs text-military-600 font-mono max-w-lg text-center">
          All material is classified Herrick Taskforce property. Unauthorized distribution is punishable under GGRP regulations.
        </p>
      </div>
    </div>
  );
}
