'use client';

import { useEffect, useState } from 'react';

export default function Slide06_Communications() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(1), 300),
      setTimeout(() => setVisible(2), 1000),
      setTimeout(() => setVisible(3), 2000),
      setTimeout(() => setVisible(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const callouts = [
    { phrase: 'CLEAR', meaning: 'Area scanned, no threat', color: 'text-accent-green' },
    { phrase: 'CONTACT', meaning: 'Enemy sighted, engaging', color: 'text-accent-red' },
    { phrase: 'UP', meaning: 'Moving to next position', color: 'text-accent-gold' },
    { phrase: 'SET', meaning: 'In position, covering sector', color: 'text-military-200' },
    { phrase: 'LAST MAN', meaning: 'Final operator entering', color: 'text-military-300' },
    { phrase: 'ROOM CLEAR', meaning: 'All threats neutralized', color: 'text-accent-green' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Comms & Callouts</h2>
        <p className="text-military-300">Brevity saves lives. Everyone must hear and acknowledge.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full transition-all duration-700 ${visible >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          {callouts.map((c, i) => (
            <div 
              key={i} 
              className={`glass-panel p-4 text-center space-y-2 transition-all duration-500 ${visible >= 1 + i*0.3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className={`text-lg font-bold font-mono ${c.color}`}>{c.phrase}</p>
              <p className="text-xs text-military-400">{c.meaning}</p>
            </div>
          ))}
        </div>

        <div className={`glass-panel p-5 max-w-xl w-full transition-all duration-700 ${visible >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-white font-semibold mb-3 text-sm">Communication Rules</h3>
          <ul className="space-y-2 text-sm text-military-300">
            <li className="flex items-start gap-2">
              <span className="text-accent-gold font-mono">01</span>
              <span>Always acknowledge with <strong className="text-white">"COPY"</strong> or <strong className="text-white">"ROGER"</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-gold font-mono">02</span>
              <span>If you don't hear a callout, <strong className="text-white">repeat it</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-gold font-mono">03</span>
              <span>Never talk over another operator unless it's <strong className="text-accent-red">CONTACT</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-gold font-mono">04</span>
              <span>Keep radio traffic to <strong className="text-white">essential only</strong> during entry</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
