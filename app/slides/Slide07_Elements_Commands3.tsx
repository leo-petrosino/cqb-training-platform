'use client';

import { useEffect, useState } from 'react';

export default function Slide07_Elements_Commands3() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2600),
      setTimeout(() => setStep(4), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Element Commands — Status Calls</h2>
        <p className="text-military-300">Clear / All Clear · IFF · Enemy Contact</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 500 300" className="w-full max-w-2xl h-auto">
          <rect x="120" y="40" width="260" height="200" fill="none" stroke="#4a554f" strokeWidth="2" strokeDasharray="6 3" opacity="0.5" />
          <text x="250" y="30" textAnchor="middle" fill="#8a958f" fontSize="11" fontFamily="monospace">ROOM</text>

          {/* Operator sweeping right */}
          <g className="transition-opacity duration-700" style={{ opacity: step >= 1 ? 1 : 0 }}>
            <circle cx="160" cy="140" r="12" fill="#c9a227" stroke="#fff" strokeWidth="2" />
            <text x="160" y="144" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0a0f0d">1</text>
            {step >= 1 && (
              <text x="160" y="170" textAnchor="middle" fill="#c9a227" fontSize="10" fontFamily="monospace">"RIGHT, CLEAR"</text>
            )}
          </g>

          {/* Operator sweeping left */}
          <g className="transition-opacity duration-700" style={{ opacity: step >= 2 ? 1 : 0 }}>
            <circle cx="340" cy="140" r="12" fill="#2d5a3f" stroke="#fff" strokeWidth="2" />
            <text x="340" y="144" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">2</text>
            {step >= 2 && (
              <text x="340" y="170" textAnchor="middle" fill="#2d5a3f" fontSize="10" fontFamily="monospace">"LEFT, CLEAR"</text>
            )}
          </g>

          {step >= 3 && (
            <text x="250" y="220" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="monospace" fontWeight="bold" className="animate-pulse">
              LEAD: "ALL CLEAR"
            </text>
          )}

          {step >= 4 && (
            <g>
              <circle cx="440" cy="140" r="12" fill="#8b2635" stroke="#fff" strokeWidth="2" />
              <text x="440" y="120" textAnchor="middle" fill="#8b2635" fontSize="10" fontFamily="monospace">"FRIENDLY?"</text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs font-mono">
        <div className={`glass-panel p-3 border-l-2 border-accent-gold transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
          <p className="text-accent-gold font-bold mb-1">CLEAR / ALL CLEAR</p>
          <p className="text-military-400">Each Operator calls their own sector clear, in entry order. Only then does the lead call "All Clear" for outside security.</p>
        </div>
        <div className={`glass-panel p-3 border-l-2 border-accent-red transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-30'}`}>
          <p className="text-accent-red font-bold mb-1">IFF (FRIEND/FOE)</p>
          <p className="text-military-400">Unknown contact with no visible signifiers → "FRIENDLY?" — act on the answer, or lack of one, per unit SOP.</p>
        </div>
        <div className="glass-panel p-3 border-l-2 border-military-600">
          <p className="text-military-300 font-bold mb-1">ENEMY CONTACT</p>
          <p className="text-military-400">Confirmed hostile → call "CONTACT" plus direction relative to the element's front, e.g. "CONTACT, LEFT."</p>
        </div>
      </div>
    </div>
  );
}
