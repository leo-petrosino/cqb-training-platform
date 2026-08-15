'use client';

import { useEffect, useState } from 'react';

export default function Slide03_AOR_Applied() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // 4-man stack, each operator's AOR cone drawn from their position
  const ops = [
    { x: 200, y: 320, dir: -90, label: '1', color: '#c9a227', name: 'POINT' },
    { x: 200, y: 260, dir: -60, label: '2', color: '#2d5a3f', name: 'RIGHT WATCH' },
    { x: 200, y: 200, dir: -120, label: '3', color: '#3a6ea5', name: 'LEFT WATCH' },
    { x: 200, y: 140, dir: 90, label: '4', color: '#8b2635', name: 'REAR GUARD' },
  ];

  const toRad = (d: number) => (d * Math.PI) / 180;
  const cone = (x: number, y: number, dir: number, spread: number, len: number) => {
    const a1 = dir - spread, a2 = dir + spread;
    const p1 = { x: x + len * Math.cos(toRad(a1)), y: y + len * Math.sin(toRad(a1)) };
    const p2 = { x: x + len * Math.cos(toRad(a2)), y: y + len * Math.sin(toRad(a2)) };
    return `M ${x} ${y} L ${p1.x} ${p1.y} A ${len} ${len} 0 0 1 ${p2.x} ${p2.y} Z`;
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">AOR Applied — Stacked Element</h2>
        <p className="text-military-300">Non-ideal but common: sectors while queued outside a doorway</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">
          <rect x="150" y="20" width="100" height="24" fill="#3a4540" stroke="#6a756f" strokeWidth="2" />
          <text x="200" y="15" textAnchor="middle" fill="#8a958f" fontSize="11" fontFamily="monospace">DOOR / OBJECTIVE</text>

          {ops.map((op, i) => (
            <g key={op.label} className="transition-opacity duration-700" style={{ opacity: step >= 1 ? 1 : 0, transitionDelay: `${i * 150}ms` }}>
              <path d={cone(op.x, op.y, op.dir, 35, 90)} fill={op.color} opacity={step >= 2 ? 0.2 : 0} className="transition-opacity duration-700" style={{ transitionDelay: `${400 + i * 150}ms` }} />
              <circle cx={op.x} cy={op.y} r="16" fill={op.color} stroke="#fff" strokeWidth="2" />
              <text x={op.x} y={op.y + 4} textAnchor="middle" fill="#0a0f0d" fontSize="11" fontWeight="bold">{op.label}</text>
              <text x={op.x + 30} y={op.y + 4} textAnchor="start" fill={op.color} fontSize="10" fontFamily="monospace">{op.name}</text>
            </g>
          ))}

          {step >= 3 && (
            <text x="200" y="380" textAnchor="middle" fill="#c9a227" fontSize="11" fontFamily="monospace" className="animate-pulse">
              "SHARED AOR" — VULNERABLE DURING BREACH / ENTRY
            </text>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs font-mono">
        <div className="glass-panel p-3 border-l-2 border-accent-gold">
          <p className="text-accent-gold font-bold mb-1">STACKED = COMPROMISE</p>
          <p className="text-military-400">In file, only Operators 1 and the last man have a real forward/rear view — middle Operators must share a secondary AOR left/right.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-military-600">
          <p className="text-military-300 font-bold mb-1">WHY IT MATTERS</p>
          <p className="text-military-400">The stack element is at its most exposed the instant before breaching or entry — 360° coverage temporarily narrows to a queue.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-accent-red">
          <p className="text-accent-red font-bold mb-1">MITIGATION</p>
          <p className="text-military-400">Rear guard and flank cover positions are added outside the stack to restore coverage until the door is breached.</p>
        </div>
      </div>
    </div>
  );
}
