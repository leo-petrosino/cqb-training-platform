'use client';

import { useEffect, useState } from 'react';

export default function Slide15_CoordinatedEntry() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const cycle = () => {
      setStep(0);
      setTimeout(() => setStep(1), 300);
      setTimeout(() => setStep(2), 1400);
      setTimeout(() => setStep(3), 2600);
      setTimeout(() => setStep(4), 3400);
    };
    cycle();
    const iv = setInterval(cycle, 5200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Co-ordinated Entry</h2>
        <p className="text-military-300">Multiple detachments breach at once, on a shared Go-Code</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 420 300" className="w-full max-w-lg h-auto">
          <rect x="120" y="60" width="180" height="180" fill="none" stroke="#4a554f" strokeWidth="2" opacity="0.5" />
          <text x="210" y="50" textAnchor="middle" fill="#8a958f" fontSize="10" fontFamily="monospace">OBJECTIVE</text>

          {/* Team RED, standing by top-left */}
          <g className="transition-opacity duration-700" style={{ opacity: step >= 1 ? 1 : 0 }}>
            <circle cx="90" cy="70" r="12" fill="#8b2635" stroke="#fff" strokeWidth="2" />
            <text x="90" y="55" textAnchor="middle" fill="#8b2635" fontSize="9" fontFamily="monospace">RED</text>
            {step >= 1 && step < 3 && <text x="90" y="95" textAnchor="middle" fill="#8b2635" fontSize="8" fontFamily="monospace">"AWAITING GO"</text>}
          </g>

          {/* Team BLUE, standing by bottom-right */}
          <g className="transition-opacity duration-700" style={{ opacity: step >= 2 ? 1 : 0 }}>
            <circle cx="330" cy="230" r="12" fill="#3a6ea5" stroke="#fff" strokeWidth="2" />
            <text x="330" y="248" textAnchor="middle" fill="#3a6ea5" fontSize="9" fontFamily="monospace">BLUE</text>
            {step >= 2 && step < 3 && <text x="330" y="205" textAnchor="middle" fill="#3a6ea5" fontSize="8" fontFamily="monospace">"AWAITING GO"</text>}
          </g>

          {step === 3 && (
            <text x="210" y="150" textAnchor="middle" fill="#c9a227" fontSize="16" fontWeight="bold" fontFamily="monospace" className="animate-pulse">
              "ZULU, GO!"
            </text>
          )}

          {/* Simultaneous push to entry points */}
          <circle cx={step >= 4 ? 130 : 90} cy={step >= 4 ? 70 : 70} r="12" fill="#8b2635" stroke="#fff" strokeWidth="2" opacity={step >= 1 ? 1 : 0} style={{ transition: 'cx 0.9s ease-in-out' }} />
          <circle cx={step >= 4 ? 290 : 330} cy={step >= 4 ? 230 : 230} r="12" fill="#3a6ea5" stroke="#fff" strokeWidth="2" opacity={step >= 2 ? 1 : 0} style={{ transition: 'cx 0.9s ease-in-out' }} />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs font-mono">
        <div className="glass-panel p-3 border-l-2 border-accent-gold">
          <p className="text-accent-gold font-bold mb-1">WHY COORDINATE</p>
          <p className="text-military-400">Multiple simultaneous entry points create overwhelming shock value and prevent hostiles from concentrating on a single breach.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-military-600">
          <p className="text-military-300 font-bold mb-1">GO-CODES &amp; IPR</p>
          <p className="text-military-400">A shared codeword ("Zulu") triggers every team at once; an Identifier-Per-Room (IPR) keeps radio traffic unambiguous about which space is being called.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-accent-red">
          <p className="text-accent-red font-bold mb-1">PLANNING</p>
          <p className="text-military-400">Callsigns, walkthroughs, and clear no-push zones are agreed beforehand so converging teams don't cross into each other's line of fire.</p>
        </div>
      </div>
    </div>
  );
}
