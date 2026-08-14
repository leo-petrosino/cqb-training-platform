'use client';

import { useEffect, useState } from 'react';

export default function Slide07_ReactToContact() {
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
        <h2 className="text-3xl font-bold text-white">React to Contact — Hard Corner</h2>
        <p className="text-military-300">Contact is immediate. No time to think — only to react.</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 600 320" className="w-full max-w-3xl h-auto">
          {/* Room */}
          <rect x="80" y="40" width="440" height="240" fill="#1a1f1c" stroke="#4a554f" strokeWidth="2" />

          {/* Hard corner wall */}
          <rect x="80" y="40" width="120" height="240" fill="#2a302c" stroke="#6a756f" strokeWidth="1" />
          <text x="100" y="60" fill="#8a958f" fontSize="9" fontFamily="monospace">HARD CORNER</text>

          {/* Threat */}
          <g className={`transition-all duration-700 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="100" y="140" width="24" height="40" fill="#8b2635" rx="2">
              <animate attributeName="opacity" values="1;0.5;1" dur="0.3s" repeatCount="3" begin="0.5s" />
            </rect>
            <text x="112" y="195" textAnchor="middle" fill="#8b2635" fontSize="9" fontFamily="monospace">THREAT</text>
            {/* Muzzle flash */}
            <circle cx="130" cy="155" r="8" fill="#c9a227" opacity="0.6" className={`${step >= 1 ? 'animate-ping' : ''}`} style={{ animationDuration: '0.2s' }} />
          </g>

          {/* Operator entering */}
          <g className={`transition-all duration-1000 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <circle cx="280" cy="160" r="16" fill="#c9a227" stroke="#fff" strokeWidth="2">
              <animate attributeName="cx" from="280" to="180" dur="0.8s" fill="freeze" begin="0.5s" />
            </circle>
            <text x="280" y="165" textAnchor="middle" fill="#0a0f0d" fontSize="10" fontWeight="bold">
              <animate attributeName="x" from="280" to="180" dur="0.8s" fill="freeze" begin="0.5s" />
              1
            </text>
          </g>

          {/* CONTACT flash */}
          <g className={`transition-all duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <rect x="200" y="120" width="80" height="30" fill="#8b2635" rx="4" />
            <text x="240" y="140" textAnchor="middle" fill="#fff" fontSize="12" fontFamily="monospace" fontWeight="bold">CONTACT!</text>
          </g>

          {/* Immediate action drill */}
          <g className={`transition-all duration-1000 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            {/* Operator drops to knee */}
            <circle cx="180" cy="175" r="14" fill="#c9a227" stroke="#fff" strokeWidth="2" opacity="0.5" />
            <text x="180" y="180" textAnchor="middle" fill="#fff" fontSize="9" opacity="0.5">1</text>

            {/* Return fire line */}
            <line x1="170" y1="160" x2="125" y2="150" stroke="#c9a227" strokeWidth="3" markerEnd="url(#arrowContact)" />
            <line x1="175" y1="165" x2="130" y2="155" stroke="#c9a227" strokeWidth="2" opacity="0.6" />
            <line x1="165" y1="165" x2="120" y2="160" stroke="#c9a227" strokeWidth="2" opacity="0.6" />

            {/* Threat neutralized */}
            <rect x="100" y="140" width="24" height="40" fill="#4a554f" rx="2" opacity="0.4" />
            <text x="112" y="195" textAnchor="middle" fill="#4a554f" fontSize="9" fontFamily="monospace">NEUTRALIZED</text>
          </g>

          <defs>
            <marker id="arrowContact" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#c9a227" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { step: '1', title: 'RECOGNIZE', desc: 'See the threat. No hesitation.' },
          { step: '2', title: 'CALL IT', desc: 'Shout CONTACT. Everyone must know.' },
          { step: '3', title: 'ACT', desc: 'Return fire, get to cover, reassess.' },
        ].map((s, i) => (
          <div key={i} className={`glass-panel p-3 border-l-2 transition-all duration-500 ${step > i ? 'border-accent-red' : 'border-military-700'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-accent-red font-mono font-bold">{s.step}</span>
              <span className="text-white text-sm font-semibold">{s.title}</span>
            </div>
            <p className="text-xs text-military-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
