'use client';

import { useEffect, useState } from 'react';

export default function Slide06_Elements_Commands2() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 400);
    return () => clearTimeout(t);
  }, []);

  const [spacing, setSpacing] = useState<'tight' | 'spread'>('tight');
  useEffect(() => {
    const iv = setInterval(() => setSpacing((s) => (s === 'tight' ? 'spread' : 'tight')), 2000);
    return () => clearInterval(iv);
  }, []);

  const dots = [0, 1, 2, 3];

  const items = [
    { title: 'WAYPOINT STATUS', body: '"RED, OUTSIDE WAYPOINT 1" → "RED, SECURING WAYPOINT 1" → "WAYPOINT ONE: SECURE"', color: '#c9a227' },
    { title: 'OBJECTIVE STATUS', body: '"RED, AWAITING GO AT OBJECTIVE ALPHA" — element holds until the Go-Code is authorised.', color: '#2d5a3f' },
    { title: 'RENDEZVOUS (RV)', body: 'Leader designates a convergence point; all elements confirm and move there, then Ready Up.', color: '#3a6ea5' },
    { title: 'GO-CODE', body: '"BLUE, BREACH, BANG AND CLEAR, ON ZULU" — every element executes simultaneously on the codeword.', color: '#8b2635' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Element Commands — Spacing &amp; Coordination</h2>
        <p className="text-military-300">Tighten Up / Spread Out, Waypoints, Objectives, RV, Go-Codes</p>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg viewBox="0 0 320 100" className="w-full max-w-sm">
            {dots.map((d) => {
              const tightX = 60 + d * 55;
              const spreadX = 20 + d * 90;
              const x = spacing === 'tight' ? tightX : spreadX;
              return (
                <circle
                  key={d}
                  cx={x}
                  cy={50}
                  r="14"
                  fill="#2d5a3f"
                  stroke="#fff"
                  strokeWidth="2"
                  style={{ transition: 'cx 1.5s ease-in-out' }}
                />
              );
            })}
          </svg>
          <p className="text-military-400 font-mono text-xs">
            {spacing === 'tight' ? '"TIGHTEN UP" — close spacing for control' : '"SPREAD OUT" — wider spacing to reduce risk'}
          </p>
        </div>

        <div className="space-y-2">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="glass-panel p-3 border-l-2 transition-all duration-500"
              style={{ borderColor: it.color, opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateX(0)' : 'translateX(10px)', transitionDelay: `${i * 180}ms` }}
            >
              <p className="font-mono text-xs font-bold" style={{ color: it.color }}>{it.title}</p>
              <p className="text-military-400 text-xs mt-1">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
