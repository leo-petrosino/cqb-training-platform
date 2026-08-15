'use client';

import { useEffect, useState } from 'react';

export default function Slide08_Formations_Column() {
  const [variant, setVariant] = useState(0); // 0 column, 1 staggered, 2 double
  const [step, setStep] = useState(0);
  const names = ['COLUMN / FILE', 'STAGGERED COLUMN', 'DOUBLE COLUMN'];

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 300);
    const iv = setInterval(() => setVariant((v) => (v + 1) % 3), 3200);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, []);

  const positions = (v: number) => {
    if (v === 0) return [[200, 60], [200, 120], [200, 180], [200, 240], [200, 300]];
    if (v === 1) return [[200, 60], [220, 120], [180, 180], [220, 240], [180, 300]];
    return [[180, 60], [220, 90], [180, 150], [220, 180], [180, 240]];
  };

  const pts = positions(variant);
  const colors = ['#c9a227', '#2d5a3f', '#2d5a3f', '#2d5a3f', '#8b2635'];
  const labels = ['1', '2', '3', '4', '5'];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">CQB Formations — File Family</h2>
        <p className="text-accent-gold font-mono text-sm tracking-widest">{names[variant]}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 360" className="w-full max-w-sm h-auto">
          <rect x="60" y="30" width="280" height="310" fill="none" stroke="#4a554f" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
          {pts.map(([x, y], i) => (
            <g key={i} className="transition-all duration-[1200ms] ease-in-out" style={{ opacity: step >= 1 ? 1 : 0 }}>
              <circle cx={x} cy={y} r="16" fill={colors[i]} stroke="#fff" strokeWidth="2" style={{ transition: 'cx 1.2s ease-in-out, cy 1.2s ease-in-out' }} />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill={i === 0 ? '#0a0f0d' : '#fff'} style={{ transition: 'cx 1.2s ease-in-out, cy 1.2s ease-in-out' }}>
                {labels[i]}
              </text>
            </g>
          ))}
          {/* connecting line */}
          <polyline
            points={pts.map((p) => p.join(',')).join(' ')}
            fill="none"
            stroke="#6a756f"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.5"
            style={{ transition: 'all 1.2s ease-in-out' }}
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs font-mono">
        <div className="glass-panel p-3 border-l-2 border-accent-gold">
          <p className="text-accent-gold font-bold mb-1">POINTMAN</p>
          <p className="text-military-400">Negotiates terrain, directed by the leader; minimum of one.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-military-600">
          <p className="text-military-300 font-bold mb-1">OPERATORS</p>
          <p className="text-military-400">Fill the body of the file — leader, marksman, breacher, support.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-accent-red">
          <p className="text-accent-red font-bold mb-1">REAR GUARD</p>
          <p className="text-military-400">Covers the six, secures the rear of the element at all times.</p>
        </div>
      </div>
      <p className="text-center text-military-500 font-mono text-[11px]">Scalable 3–6+ personnel · used in MOUT, CQB, VBSS and similar tight environments</p>
    </div>
  );
}
