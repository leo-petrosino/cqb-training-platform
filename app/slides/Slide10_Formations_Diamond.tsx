'use client';

import { useEffect, useState } from 'react';

export default function Slide10_Formations_Diamond() {
  const [size, setSize] = useState(4);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 300);
    const iv = setInterval(() => setSize((s) => (s >= 6 ? 4 : s + 1)), 2600);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  const layouts: Record<number, { x: number; y: number; label: string; color: string }[]> = {
    4: [
      { x: 200, y: 90, label: 'PT', color: '#c9a227' },
      { x: 130, y: 180, label: 'L', color: '#2d5a3f' },
      { x: 270, y: 180, label: 'R', color: '#2d5a3f' },
      { x: 200, y: 270, label: 'RG', color: '#8b2635' },
    ],
    5: [
      { x: 200, y: 90, label: 'PT', color: '#c9a227' },
      { x: 130, y: 180, label: 'L', color: '#2d5a3f' },
      { x: 270, y: 180, label: 'R', color: '#2d5a3f' },
      { x: 200, y: 220, label: 'RS', color: '#3a6ea5' },
      { x: 200, y: 280, label: 'RG', color: '#8b2635' },
    ],
    6: [
      { x: 200, y: 90, label: 'PT', color: '#c9a227' },
      { x: 130, y: 180, label: 'L', color: '#2d5a3f' },
      { x: 270, y: 180, label: 'R', color: '#2d5a3f' },
      { x: 170, y: 260, label: 'RG', color: '#8b2635' },
      { x: 200, y: 290, label: 'RG', color: '#8b2635' },
      { x: 230, y: 260, label: 'RG', color: '#8b2635' },
    ],
  };

  const pts = layouts[size];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">CQB Formations — Diamond</h2>
        <p className="text-accent-gold font-mono text-sm tracking-widest">{size}-MAN DIAMOND — LOW SPEED, EVEN AOR</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 340" className="w-full max-w-sm h-auto">
          <polyline points="200,90 130,180 200,280 270,180 200,90" fill="none" stroke="#4a554f" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />

          {pts.map((p, i) => (
            <g key={i} className="transition-all duration-700" style={{ opacity: step >= 1 ? 1 : 0 }}>
              <circle cx={p.x} cy={p.y} r="16" fill={p.color} stroke="#fff" strokeWidth="2" style={{ transition: 'cx 0.9s, cy 0.9s' }} />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff" style={{ transition: 'cx 0.9s, cy 0.9s' }}>
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
        {[4, 5, 6].map((n) => (
          <div key={n} className={`glass-panel p-2 text-center border-t-2 transition-all duration-300 ${size === n ? 'border-accent-gold scale-105' : 'border-military-600 opacity-50'}`}>
            <p className="text-white font-bold">{n}-MAN</p>
          </div>
        ))}
      </div>
      <p className="text-center text-military-400 text-xs">
        A single Pointman leads, flanked by Left and Right Operators giving even, overlapping AOR coverage on both sides, with Rear Guard(s) securing the six. Deployed against suspected medium threats — slower but more evenly covered than the Y formation.
      </p>
    </div>
  );
}
