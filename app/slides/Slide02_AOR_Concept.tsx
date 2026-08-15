'use client';

import { useEffect, useState } from 'react';

export default function Slide02_AOR_Concept() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // 4-operator example: 090° primary sectors, evenly divided around 360°
  const sectors = [
    { start: -45, end: 45, label: 'OP 1', color: '#c9a227' },
    { start: 45, end: 135, label: 'OP 2', color: '#2d5a3f' },
    { start: 135, end: 225, label: 'OP 3', color: '#3a6ea5' },
    { start: 225, end: 315, label: 'OP 4', color: '#8b2635' },
  ];

  const cx = 200, cy = 200, r = 150;
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const arcPoint = (deg: number, radius: number) => ({
    x: cx + radius * Math.cos(toRad(deg)),
    y: cy + radius * Math.sin(toRad(deg)),
  });

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Area of Responsibility (AOR)</h2>
        <p className="text-military-300">Full Spectrum Coverage — dividing 360° among the element</p>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6 items-center">
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full max-w-md h-auto">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4a554f" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

            {sectors.map((s, i) => {
              const p1 = arcPoint(s.start, r);
              const p2 = arcPoint(s.end, r);
              const midDeg = (s.start + s.end) / 2;
              const labelPt = arcPoint(midDeg, r * 0.65);
              return (
                <g
                  key={s.label}
                  className="transition-opacity duration-700"
                  style={{ opacity: step >= 1 ? 1 : 0, transitionDelay: `${i * 200}ms` }}
                >
                  <path
                    d={`M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} Z`}
                    fill={s.color}
                    opacity="0.22"
                    stroke={s.color}
                    strokeWidth="1.5"
                  />
                  <text x={labelPt.x} y={labelPt.y} textAnchor="middle" fill={s.color} fontSize="13" fontFamily="monospace" fontWeight="bold">
                    {s.label}
                  </text>
                </g>
              );
            })}

            {/* Operator at center */}
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="#c9a227"
              className="transition-all duration-500"
              style={{ opacity: step >= 2 ? 1 : 0 }}
            />

            {/* Sweeping FOV indicator */}
            {step >= 3 && (
              <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="#ffffff" strokeWidth="1.5" opacity="0.5">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${cx} ${cy}`}
                  to={`360 ${cx} ${cy}`}
                  dur="8s"
                  repeatCount="indefinite"
                />
              </line>
            )}
          </svg>
        </div>

        <div className="space-y-3">
          <div className={`glass-panel p-4 border-l-2 border-accent-gold transition-all duration-700 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <p className="text-accent-gold font-mono text-xs font-bold mb-1">THE PRINCIPLE</p>
            <p className="text-military-300 text-sm">360° ÷ number of Operators = each individual's primary AOR. A 4-man element covers 090° per Operator, overlapping slightly with neighbours.</p>
          </div>
          <div className={`glass-panel p-4 border-l-2 border-military-600 transition-all duration-700 delay-150 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <p className="text-military-300 font-mono text-xs font-bold mb-1">SCALING EXAMPLES</p>
            <p className="text-military-400 text-sm font-mono">2-man → 180° &nbsp;·&nbsp; 3-man → 120° &nbsp;·&nbsp; 4-man → 090°<br />5-man → 072° &nbsp;·&nbsp; 6-man → 060°</p>
          </div>
          <div className={`glass-panel p-4 border-l-2 border-accent-red transition-all duration-700 delay-300 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <p className="text-accent-red font-mono text-xs font-bold mb-1">KEY RULE</p>
            <p className="text-military-300 text-sm">Each Operator sticks to their own sector — never flagging (crossing weapons/attention into) a teammate's AOR. Coverage is scalable: more Operators means tighter, more overlapping sectors.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
