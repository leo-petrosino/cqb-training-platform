'use client';

import { useEffect, useState } from 'react';

export default function Slide02_StackFormation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 2000);
    const t3 = setTimeout(() => setStep(3), 4000);
    const t4 = setTimeout(() => setStep(4), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">The Stack — Entry Formation</h2>
        <p className="text-military-300">Order of movement and responsibilities</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 600 400" className="w-full max-w-2xl h-auto">
          <rect x="270" y="20" width="60" height="20" fill="#3a4540" stroke="#6a756f" strokeWidth="2" />
          <text x="300" y="14" textAnchor="middle" fill="#8a958f" fontSize="12" fontFamily="monospace">DOOR</text>
          <rect x="100" y="40" width="400" height="300" fill="none" stroke="#4a554f" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />

          <g className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="300" cy="80" r="18" fill="#c9a227" stroke="#fff" strokeWidth="2">
              <animate attributeName="cy" from="120" to="80" dur="1s" fill="freeze" begin="0.5s" />
            </circle>
            <text x="300" y="85" textAnchor="middle" fill="#0a0f0d" fontSize="10" fontWeight="bold">1</text>
            <text x="300" y="115" textAnchor="middle" fill="#c9a227" fontSize="11" fontFamily="monospace">POINT</text>
            <path d="M 318 80 L 380 50 L 380 110 Z" fill="#c9a227" opacity="0.15" className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`} />
          </g>

          <g className={`transition-all duration-1000 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="260" cy="130" r="18" fill="#2d5a3f" stroke="#fff" strokeWidth="2">
              <animate attributeName="cy" from="170" to="130" dur="1s" fill="freeze" begin="2s" />
            </circle>
            <text x="260" y="135" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>
            <text x="260" y="165" textAnchor="middle" fill="#8a958f" fontSize="11" fontFamily="monospace">2ND</text>
            <path d="M 242 130 L 180 100 L 180 160 Z" fill="#2d5a3f" opacity="0.15" className={`transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`} />
          </g>

          <g className={`transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="340" cy="130" r="18" fill="#2d5a3f" stroke="#fff" strokeWidth="2">
              <animate attributeName="cy" from="170" to="130" dur="1s" fill="freeze" begin="4s" />
            </circle>
            <text x="340" y="135" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>
            <text x="340" y="165" textAnchor="middle" fill="#8a958f" fontSize="11" fontFamily="monospace">3RD</text>
            <path d="M 358 130 L 420 100 L 420 160 Z" fill="#2d5a3f" opacity="0.15" className={`transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`} />
          </g>

          <g className={`transition-all duration-1000 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="300" cy="180" r="18" fill="#8b2635" stroke="#fff" strokeWidth="2">
              <animate attributeName="cy" from="220" to="180" dur="1s" fill="freeze" begin="6s" />
            </circle>
            <text x="300" y="185" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">4</text>
            <text x="300" y="215" textAnchor="middle" fill="#8b2635" fontSize="11" fontFamily="monospace">REAR</text>
          </g>

          {step >= 1 && (
            <g>
              <line x1="300" y1="150" x2="300" y2="100" stroke="#c9a227" strokeWidth="2" markerEnd="url(#arrowhead)" opacity="0.6">
                <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" />
              </line>
            </g>
          )}

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#c9a227" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
        {[
          { role: 'POINT MAN', color: 'text-accent-gold', desc: 'First entry, clears immediate threat' },
          { role: '2ND MAN', color: 'text-military-300', desc: 'Opposite corner, covers point blindside' },
          { role: '3RD MAN', color: 'text-military-300', desc: 'Deep clear, secures far corners' },
          { role: 'REAR GUARD', color: 'text-accent-red', desc: 'Security, covers entry point' },
        ].map((r, i) => (
          <div key={i} className={`glass-panel p-3 border-l-2 ${i === 0 ? 'border-accent-gold' : i === 3 ? 'border-accent-red' : 'border-military-600'}`}>
            <p className={`${r.color} font-bold mb-1`}>{r.role}</p>
            <p className="text-military-400">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
