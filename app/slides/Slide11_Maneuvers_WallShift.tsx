'use client';

import { useEffect, useState } from 'react';

export default function Slide11_Maneuvers_WallShift() {
  const [phase, setPhase] = useState(0); // 0 at wall A, 1 mid-shift, 2 at wall B
  const [mode, setMode] = useState<'individual' | 'team'>('individual');

  useEffect(() => {
    const cycle = () => {
      setPhase(0);
      setTimeout(() => setPhase(1), 900);
      setTimeout(() => setPhase(2), 2200);
    };
    cycle();
    const iv = setInterval(() => {
      setMode((m) => (m === 'individual' ? 'team' : 'individual'));
      cycle();
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const startY = [80, 130, 180, 230];
  const wallAx = 120, wallBx = 280;

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">CQB Maneuvers — Wall Shift</h2>
        <p className="text-accent-gold font-mono text-sm tracking-widest">{mode === 'individual' ? '"SHIFT RIGHT" — ONE BY ONE, LAST TO FIRST' : '"TEAM, SHIFT RIGHT" — ON THE GO'}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto">
          <line x1={wallAx} y1="50" x2={wallAx} y2="270" stroke="#6a756f" strokeWidth="4" />
          <line x1={wallBx} y1="50" x2={wallBx} y2="270" stroke="#6a756f" strokeWidth="4" />
          <text x={wallAx} y="40" textAnchor="middle" fill="#8a958f" fontSize="10" fontFamily="monospace">WALL A</text>
          <text x={wallBx} y="40" textAnchor="middle" fill="#8a958f" fontSize="10" fontFamily="monospace">WALL B</text>

          {startY.map((y, i) => {
            const order = mode === 'individual' ? [3, 2, 1, 0].indexOf(i) : 0;
            const delayed = phase >= 1;
            const atB = phase >= 2 || (mode === 'team' && phase >= 1);
            const x = atB ? wallBx - 15 : wallAx + 15;
            const colors = ['#c9a227', '#2d5a3f', '#2d5a3f', '#8b2635'];
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="13"
                fill={colors[i]}
                stroke="#fff"
                strokeWidth="2"
                style={{
                  transition: `cx 0.9s ease-in-out`,
                  transitionDelay: mode === 'individual' ? `${order * 350}ms` : '0ms',
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="glass-panel p-3 border-l-2 border-accent-gold">
          <p className="text-accent-gold font-bold mb-1">"SHIFT RIGHT" (INDIVIDUAL)</p>
          <p className="text-military-400">Element moves one-by-one under cover, last man moving first, reversing the stack order at the new wall.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-accent-red">
          <p className="text-accent-red font-bold mb-1">"TEAM, SHIFT RIGHT"</p>
          <p className="text-military-400">Whole element shifts together, but only on the leader's "GO" — used when speed matters more than sequencing.</p>
        </div>
      </div>
    </div>
  );
}
