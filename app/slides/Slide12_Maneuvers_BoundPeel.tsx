'use client';

import { useEffect, useState } from 'react';

export default function Slide12_Maneuvers_BoundPeel() {
  const [mode, setMode] = useState<'bound' | 'peel'>('bound');
  const [t, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick((v) => (v + 1) % 4), 900);
    const swap = setInterval(() => setMode((m) => (m === 'bound' ? 'peel' : 'bound')), 4200);
    return () => {
      clearInterval(iv);
      clearInterval(swap);
    };
  }, []);

  // bounding overwatch: pairs alternate advancing while other covers
  const boundPositions = [
    [[80, 260], [80, 200]],
    [[150, 260], [80, 200]],
    [[150, 260], [150, 200]],
    [[220, 260], [150, 200]],
  ];

  // peel: rearmost operator disengages and moves to the front of the line, opposite of bounding overwatch
  const peelOrder = [
    [[200, 100], [200, 150], [200, 200], [200, 250]],
    [[200, 100], [200, 150], [200, 200], [140, 260]],
    [[200, 100], [200, 150], [140, 210], [200, 250]],
    [[140, 60], [200, 100], [200, 150], [200, 200]],
  ];

  const positions = mode === 'bound' ? boundPositions[t] : peelOrder[t];
  const colors = mode === 'bound' ? ['#c9a227', '#2d5a3f'] : ['#c9a227', '#2d5a3f', '#3a6ea5', '#8b2635'];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">CQB Maneuvers — Bounding Overwatch &amp; Peel</h2>
        <p className="text-accent-gold font-mono text-sm tracking-widest">{mode === 'bound' ? 'BOUNDING OVERWATCH' : 'PEEL (OPPOSITE OF BOUNDING)'}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 300 320" className="w-full max-w-xs h-auto">
          <rect x="20" y="30" width="260" height="270" fill="none" stroke="#4a554f" strokeWidth="1" strokeDasharray="5 3" opacity="0.4" />
          {positions.map((p, i) => (
            <circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r="13"
              fill={colors[i % colors.length]}
              stroke="#fff"
              strokeWidth="2"
              style={{ transition: 'cx 0.8s ease-in-out, cy 0.8s ease-in-out' }}
            />
          ))}
          <text x="150" y="20" textAnchor="middle" fill="#8a958f" fontSize="10" fontFamily="monospace">DIRECTION OF ADVANCE / CONTACT ↑</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className={`glass-panel p-3 border-l-2 transition-opacity duration-500 ${mode === 'bound' ? 'opacity-100 border-accent-gold' : 'opacity-40 border-military-600'}`}>
          <p className="text-accent-gold font-bold mb-1">BOUNDING OVERWATCH</p>
          <p className="text-military-400">One element or pair advances while the other holds position and covers, then the roles alternate — used to close distance under potential fire.</p>
        </div>
        <div className={`glass-panel p-3 border-l-2 transition-opacity duration-500 ${mode === 'peel' ? 'opacity-100 border-accent-red' : 'opacity-40 border-military-600'}`}>
          <p className="text-accent-red font-bold mb-1">PEEL</p>
          <p className="text-military-400">The rearmost Operator disengages, moves to the front of the line, and the rest shift back — used to break contact while maintaining continuous fire toward the threat.</p>
        </div>
      </div>
    </div>
  );
}
