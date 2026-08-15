'use client';

import { useEffect, useState } from 'react';

export default function Slide13_Entry_ButtonhookCrossover() {
  const [mode, setMode] = useState<'button' | 'cross'>('button');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 300);
      setTimeout(() => setStep(2), 1600);
    };
    run();
    const iv = setInterval(() => {
      setMode((m) => (m === 'button' ? 'cross' : 'button'));
      run();
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const doorX = 200;

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Entry Techniques — Buttonhook &amp; Crossover</h2>
        <p className="text-accent-gold font-mono text-sm tracking-widest">{mode === 'button' ? 'BUTTONHOOK (HOOK) ENTRY' : 'CROSSOVER ENTRY'}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
          <rect x="100" y="100" width="200" height="150" fill="none" stroke="#4a554f" strokeWidth="2" opacity="0.5" />
          <rect x={doorX - 25} y="96" width="50" height="8" fill="#3a4540" stroke="#6a756f" strokeWidth="1" />
          <text x={doorX} y="90" textAnchor="middle" fill="#8a958f" fontSize="10" fontFamily="monospace">DOORWAY</text>

          {mode === 'button' ? (
            <>
              {/* enters and hooks to near corner (same-side hard corner) */}
              <path
                d={`M ${doorX} 60 L ${doorX} 105 Q ${doorX - 10} 130 120 130`}
                fill="none"
                stroke="#c9a227"
                strokeWidth="2"
                strokeDasharray="300"
                strokeDashoffset={step >= 1 ? 0 : 300}
                style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
              />
              <circle
                cx={step >= 1 ? 120 : doorX}
                cy={step >= 1 ? 130 : 60}
                r="13"
                fill="#c9a227"
                stroke="#fff"
                strokeWidth="2"
                style={{ transition: 'cx 1.2s ease-in-out, cy 1.2s ease-in-out' }}
              />
              {step >= 2 && <text x="120" y="115" textAnchor="middle" fill="#c9a227" fontSize="10" fontFamily="monospace">HOOKS TO NEAR CORNER</text>}
            </>
          ) : (
            <>
              {/* enters and crosses to the far corner across the doorway funnel */}
              <path
                d={`M ${doorX} 60 L ${doorX} 105 Q ${doorX + 10} 130 280 130`}
                fill="none"
                stroke="#2d5a3f"
                strokeWidth="2"
                strokeDasharray="300"
                strokeDashoffset={step >= 1 ? 0 : 300}
                style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
              />
              <circle
                cx={step >= 1 ? 280 : doorX}
                cy={step >= 1 ? 130 : 60}
                r="13"
                fill="#2d5a3f"
                stroke="#fff"
                strokeWidth="2"
                style={{ transition: 'cx 1.2s ease-in-out, cy 1.2s ease-in-out' }}
              />
              {step >= 2 && <text x="280" y="115" textAnchor="middle" fill="#2d5a3f" fontSize="10" fontFamily="monospace">CROSSES TO FAR CORNER</text>}
            </>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className={`glass-panel p-3 border-l-2 transition-opacity duration-500 ${mode === 'button' ? 'opacity-100 border-accent-gold' : 'opacity-40 border-military-600'}`}>
          <p className="text-accent-gold font-bold mb-1">BUTTONHOOK</p>
          <p className="text-military-400">Operator hooks toward the nearest hard corner just inside the door, placing their back to the wall to consolidate AOR on the rest of the room as teammates follow.</p>
        </div>
        <div className={`glass-panel p-3 border-l-2 transition-opacity duration-500 ${mode === 'cross' ? 'opacity-100 border-military-600' : 'opacity-40 border-military-600'}`}>
          <p className="text-military-300 font-bold mb-1">CROSSOVER</p>
          <p className="text-military-400">Operator crosses the doorway's funnel to take the far corner, letting the next Operator take the near corner without stacking on top of each other.</p>
        </div>
      </div>
    </div>
  );
}
