'use client';

import { useEffect, useState } from 'react';

export default function Slide09_Formations_Y() {
  const [size, setSize] = useState(3);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 300);
    const iv = setInterval(() => setSize((s) => (s >= 6 ? 3 : s + 1)), 2600);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  // Base Y: two point men, center support, rear guard(s)
  const layouts: Record<number, { x: number; y: number; label: string; color: string }[]> = {
    3: [
      { x: 150, y: 100, label: 'P', color: '#c9a227' },
      { x: 250, y: 100, label: 'P', color: '#c9a227' },
      { x: 200, y: 260, label: 'R', color: '#8b2635' },
    ],
    4: [
      { x: 150, y: 100, label: 'P', color: '#c9a227' },
      { x: 250, y: 100, label: 'P', color: '#c9a227' },
      { x: 200, y: 170, label: 'C', color: '#2d5a3f' },
      { x: 200, y: 260, label: 'R', color: '#8b2635' },
    ],
    5: [
      { x: 150, y: 100, label: 'P', color: '#c9a227' },
      { x: 250, y: 100, label: 'P', color: '#c9a227' },
      { x: 170, y: 170, label: 'C', color: '#2d5a3f' },
      { x: 230, y: 170, label: 'C', color: '#2d5a3f' },
      { x: 200, y: 260, label: 'R', color: '#8b2635' },
    ],
    6: [
      { x: 150, y: 100, label: 'P', color: '#c9a227' },
      { x: 250, y: 100, label: 'P', color: '#c9a227' },
      { x: 160, y: 170, label: 'C', color: '#2d5a3f' },
      { x: 200, y: 190, label: 'C', color: '#2d5a3f' },
      { x: 240, y: 170, label: 'C', color: '#2d5a3f' },
      { x: 200, y: 260, label: 'R', color: '#8b2635' },
    ],
  };

  const pts = layouts[size];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">CQB Formations — Y Formation</h2>
        <p className="text-accent-gold font-mono text-sm tracking-widest">{size}-MAN Y — HIGH SPEED, AOR-CENTRIC</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 320" className="w-full max-w-sm h-auto">
          <polyline points="150,100 200,190 250,100" fill="none" stroke="#4a554f" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
          <line x1="200" y1="190" x2="200" y2="260" stroke="#4a554f" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />

          {pts.map((p, i) => (
            <g key={i} className="transition-all duration-700" style={{ opacity: step >= 1 ? 1 : 0 }}>
              <circle cx={p.x} cy={p.y} r="15" fill={p.color} stroke="#fff" strokeWidth="2" style={{ transition: 'cx 0.9s, cy 0.9s' }} />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff" style={{ transition: 'cx 0.9s, cy 0.9s' }}>
                {p.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-2 text-[11px] font-mono">
        {[3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className={`glass-panel p-2 text-center border-t-2 transition-all duration-300 ${size === n ? 'border-accent-gold scale-105' : 'border-military-600 opacity-50'}`}
          >
            <p className="text-white font-bold">{n}-MAN</p>
          </div>
        ))}
      </div>
      <p className="text-center text-military-400 text-xs">
        Two Pointmen negotiate terrain with teamwork; Center Support (added at 4-man+) abridges the AOR; Rear Guard maintains security and comms. Deployed against suspected heavy threats where speed and expansive AOR coverage matter most.
      </p>
    </div>
  );
}
