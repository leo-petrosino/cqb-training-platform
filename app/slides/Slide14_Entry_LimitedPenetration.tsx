'use client';

import { useEffect, useState } from 'react';

export default function Slide14_Entry_LimitedPenetration() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Entry Techniques — Limited Penetration &amp; 4-In / 2-Out</h2>
        <p className="text-military-300">Not every clear requires the whole element to enter the room</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 420 300" className="w-full max-w-lg h-auto">
          <rect x="120" y="60" width="220" height="180" fill="none" stroke="#4a554f" strokeWidth="2" opacity="0.5" />
          <rect x="205" y="56" width="50" height="8" fill="#3a4540" stroke="#6a756f" strokeWidth="1" />
          <text x="230" y="48" textAnchor="middle" fill="#8a958f" fontSize="10" fontFamily="monospace">DOORWAY</text>

          {/* limited penetration: operator leans in from threshold, sweeps without fully entering */}
          <g className="transition-opacity duration-700" style={{ opacity: step >= 1 ? 1 : 0 }}>
            <circle cx="230" cy="50" r="12" fill="#c9a227" stroke="#fff" strokeWidth="2" />
            <path d="M 230 50 L 150 90 M 230 50 L 310 90" stroke="#c9a227" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3">
              {step >= 1 && (
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
              )}
            </path>
            {step >= 1 && <text x="230" y="35" textAnchor="middle" fill="#c9a227" fontSize="9" fontFamily="monospace">LIMITED PENETRATION — SWEEP FROM THRESHOLD</text>}
          </g>

          {/* 4 in */}
          {[
            [160, 110], [160, 160], [300, 110], [300, 160],
          ].map(([x, y], i) => (
            <circle key={`in-${i}`} cx={x} cy={y} r="11" fill="#2d5a3f" stroke="#fff" strokeWidth="2" className="transition-opacity duration-700" style={{ opacity: step >= 2 ? 1 : 0, transitionDelay: `${i * 150}ms` }} />
          ))}
          {step >= 2 && <text x="230" y="220" textAnchor="middle" fill="#2d5a3f" fontSize="10" fontFamily="monospace">4 OPERATORS IN — CLEAR THE ROOM</text>}

          {/* 2 out */}
          {[[80, 150], [380, 150]].map(([x, y], i) => (
            <circle key={`out-${i}`} cx={x} cy={y} r="11" fill="#8b2635" stroke="#fff" strokeWidth="2" className="transition-opacity duration-700" style={{ opacity: step >= 3 ? 1 : 0, transitionDelay: `${i * 150}ms` }} />
          ))}
          {step >= 3 && (
            <>
              <text x="80" y="130" textAnchor="middle" fill="#8b2635" fontSize="9" fontFamily="monospace">2 OUT</text>
              <text x="380" y="130" textAnchor="middle" fill="#8b2635" fontSize="9" fontFamily="monospace">2 OUT</text>
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="glass-panel p-3 border-l-2 border-accent-gold">
          <p className="text-accent-gold font-bold mb-1">LIMITED PENETRATION</p>
          <p className="text-military-400">Operator sweeps the room from the doorway threshold rather than fully entering — used to rapidly check small or low-risk rooms without exposing the full element.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-accent-red">
          <p className="text-accent-red font-bold mb-1">4-IN / 2-OUT</p>
          <p className="text-military-400">A split entry: four Operators make full entry and clear the room while two remain outside as door assist and exterior rear guard, securing the hallway during the clear.</p>
        </div>
      </div>
    </div>
  );
}
