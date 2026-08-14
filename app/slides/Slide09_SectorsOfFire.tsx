'use client';

import { useEffect, useState } from 'react';

export default function Slide09_SectorsOfFire() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold text-white">Sectors of Fire</h2>
        <p className="text-military-300">360° coverage. No gaps, no overlap.</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 500 400" className="w-full max-w-lg h-auto">
          {/* Room */}
          <rect x="50" y="50" width="400" height="300" fill="#1a1f1c" stroke="#4a554f" strokeWidth="2" />

          {/* Center reference */}
          <circle cx="250" cy="200" r="4" fill="#6a756f" />
          <text x="250" y="195" textAnchor="middle" fill="#6a756f" fontSize="8" fontFamily="monospace">CENTER</text>

          {/* Operator positions and sectors */}
          {[
            { pos: [80, 80], color: '#c9a227', label: '1', sector: 'M 80 80 L 250 200 L 180 50 Z', name: 'NEAR LEFT' },
            { pos: [420, 80], color: '#2d5a3f', label: '2', sector: 'M 420 80 L 250 200 L 320 50 Z', name: 'NEAR RIGHT' },
            { pos: [80, 320], color: '#4a7c59', label: '3', sector: 'M 80 320 L 250 200 L 180 350 Z', name: 'FAR LEFT' },
            { pos: [420, 320], color: '#8b2635', label: '4', sector: 'M 420 320 L 250 200 L 320 350 Z', name: 'FAR RIGHT' },
          ].map((op, i) => (
            <g key={i} className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              {/* Sector arc */}
              <path d={op.sector} fill={op.color} opacity="0.12" stroke={op.color} strokeWidth="1" strokeDasharray="4 2">
                <animate attributeName="opacity" values="0.12;0.2;0.12" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </path>

              {/* Operator */}
              <circle cx={op.pos[0]} cy={op.pos[1]} r="18" fill={op.color} stroke="#fff" strokeWidth="2" />
              <text x={op.pos[0]} y={op.pos[1] + 5} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">{op.label}</text>

              {/* Label */}
              <text x={op.pos[0]} y={op.pos[1] + (op.pos[1] < 200 ? -28 : 38)} textAnchor="middle" fill={op.color} fontSize="10" fontFamily="monospace">{op.name}</text>
            </g>
          ))}

          {/* Overlap warning */}
          {step >= 2 && (
            <g>
              <line x1="250" y1="50" x2="250" y2="350" stroke="#8b2635" strokeWidth="2" strokeDasharray="8 4" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="250" y="30" textAnchor="middle" fill="#8b2635" fontSize="10" fontFamily="monospace">DANGER: CROSSFIRE LINE</text>
            </g>
          )}

          {/* 360 indicator */}
          {step >= 3 && (
            <g>
              <circle cx="250" cy="200" r="120" fill="none" stroke="#c9a227" strokeWidth="1" strokeDasharray="6 3" opacity="0.3">
                <animate attributeName="r" values="100;130;100" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
              </circle>
              <text x="250" y="200" textAnchor="middle" fill="#c9a227" fontSize="14" fontFamily="monospace" fontWeight="bold" opacity="0.6">360°</text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="glass-panel p-4 border-l-2 border-accent-green">
          <p className="text-accent-green text-sm font-semibold mb-1">COVER YOUR SECTOR</p>
          <p className="text-xs text-military-400">Your eyes and weapon stay in your assigned arc. No wandering.</p>
        </div>
        <div className="glass-panel p-4 border-l-2 border-accent-red">
          <p className="text-accent-red text-sm font-semibold mb-1">WATCH CROSSFIRE</p>
          <p className="text-xs text-military-400">The center line is danger. Communicate before crossing sectors.</p>
        </div>
      </div>
    </div>
  );
}
