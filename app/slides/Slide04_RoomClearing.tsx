'use client';

import { useEffect, useState } from 'react';

export default function Slide04_RoomClearing() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setStep(4), 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const operators = [
    { id: 1, label: 'POINT', color: '#c9a227', path: 'M 300 80 L 160 100', corner: 'Near Left' },
    { id: 2, label: '2ND', color: '#2d5a3f', path: 'M 260 130 L 440 100', corner: 'Near Right' },
    { id: 3, label: '3RD', color: '#4a7c59', path: 'M 340 130 L 160 280', corner: 'Far Left' },
    { id: 4, label: 'REAR', color: '#8b2635', path: 'M 300 180 L 440 280', corner: 'Far Right' },
  ];

  return (
    <div className="h-full flex flex-col space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold text-white">Room Clearing — 4-Man Flow</h2>
        <p className="text-military-300">Each man has a corner. No gaps, no friendly fire.</p>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0">
        <svg viewBox="0 0 600 350" className="w-full max-w-3xl h-auto">
          {/* Room */}
          <rect x="100" y="40" width="400" height="270" fill="#1a1f1c" stroke="#4a554f" strokeWidth="2" />
          <text x="300" y="30" textAnchor="middle" fill="#6a756f" fontSize="10" fontFamily="monospace">ROOM</text>

          {/* Door */}
          <rect x="270" y="20" width="60" height="20" fill="#2a302c" stroke="#6a756f" strokeWidth="2" />

          {/* Corners */}
          {[
            { x: 120, y: 60, label: 'NL' },
            { x: 480, y: 60, label: 'NR' },
            { x: 120, y: 290, label: 'FL' },
            { x: 480, y: 290, label: 'FR' },
          ].map((c, i) => (
            <g key={i}>
              <rect x={c.x-20} y={c.y-20} width="40" height="40" fill="none" stroke="#4a554f" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
              <text x={c.x} y={c.y+4} textAnchor="middle" fill="#6a756f" fontSize="10" fontFamily="monospace">{c.label}</text>
            </g>
          ))}

          {/* Operators with animated movement */}
          {operators.map((op, i) => (
            <g key={op.id} className={`transition-all duration-1000 ${step > i ? 'opacity-100' : 'opacity-0'}`}>
              {/* Start position (stack) */}
              <circle cx={280 + i*20} cy={100 + i*30} r="14" fill={op.color} opacity="0.3" stroke={op.color} strokeWidth="1" strokeDasharray="3 3" />

              {/* End position (corner) */}
              <circle 
                cx={op.corner.includes('Left') ? (op.corner.includes('Near') ? 140 : 140) : 460} 
                cy={op.corner.includes('Near') ? 80 : 270} 
                r="16" 
                fill={op.color} 
                stroke="#fff" 
                strokeWidth="2"
              >
                {step > i && (
                  <animate 
                    attributeName="cx" 
                    from={300} 
                    to={op.corner.includes('Left') ? 140 : 460} 
                    dur="1.2s" 
                    fill="freeze" 
                    begin={`${i*0.3}s`}
                  />
                )}
                {step > i && (
                  <animate 
                    attributeName="cy" 
                    from={80 + i*25} 
                    to={op.corner.includes('Near') ? 80 : 270} 
                    dur="1.2s" 
                    fill="freeze" 
                    begin={`${i*0.3}s`}
                  />
                )}
              </circle>

              <text 
                x={op.corner.includes('Left') ? 140 : 460} 
                y={op.corner.includes('Near') ? 85 : 275} 
                textAnchor="middle" 
                fill="#fff" 
                fontSize="10" 
                fontWeight="bold"
              >
                {op.id}
              </text>

              {/* Label */}
              <text 
                x={op.corner.includes('Left') ? 140 : 460} 
                y={op.corner.includes('Near') ? 55 : 305} 
                textAnchor="middle" 
                fill={op.color} 
                fontSize="9" 
                fontFamily="monospace"
              >
                {op.label} — {op.corner}
              </text>

              {/* Sector of fire arc */}
              <path 
                d={`M ${op.corner.includes('Left') ? 140 : 460} ${op.corner.includes('Near') ? 80 : 270} L ${op.corner.includes('Left') ? 300 : 300} ${op.corner.includes('Near') ? 80 : 270} L ${op.corner.includes('Left') ? 140 : 460} ${op.corner.includes('Near') ? 200 : 150} Z`}
                fill={op.color}
                opacity="0.08"
                className={`transition-opacity duration-700 ${step > i ? 'opacity-100' : 'opacity-0'}`}
              />
            </g>
          ))}

          {/* Center clear indicator */}
          {step >= 4 && (
            <g>
              <circle cx="300" cy="175" r="30" fill="none" stroke="#c9a227" strokeWidth="2" strokeDasharray="6 3">
                <animate attributeName="r" values="25;35;25" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="300" y="180" textAnchor="middle" fill="#c9a227" fontSize="11" fontFamily="monospace" fontWeight="bold">
                ROOM CLEAR
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {operators.map((op) => (
          <div key={op.id} className="glass-panel p-2 text-center border-t-2" style={{ borderColor: op.color }}>
            <span className="font-mono font-bold" style={{ color: op.color }}>{op.label}</span>
            <p className="text-military-400 mt-1">{op.corner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
