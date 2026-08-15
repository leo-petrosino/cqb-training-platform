'use client';

import { useEffect, useState } from 'react';

export default function Slide05_Elements_Commands1() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const timers = [0, 1, 2].map((i) => setTimeout(() => setActive(i), 500 + i * 1100));
    return () => timers.forEach(clearTimeout);
  }, []);

  const commands = [
    {
      title: 'READY UP',
      color: '#c9a227',
      desc: 'Leader prepares the element for entry or re-organises after a rally.',
      exchange: ['LEAD: "Ready up."', 'OP 1: "One, up."', 'OP 2: "Two, up."', 'OP 3: "Three, up."'],
    },
    {
      title: 'DETACH',
      color: '#2d5a3f',
      desc: 'Splits the element into smaller, lighter groupings under a callsign.',
      exchange: ['LEAD: "Two-man, split Alpha, left."', 'ALPHA: "Alpha, ready up."', 'A1: "One, up."', 'A2: "Two, up."'],
    },
    {
      title: 'FALL IN',
      color: '#3a6ea5',
      desc: 'Re-unifies a separated element, or attaches a stray Operator back into the team.',
      exchange: ['LEAD: "Alpha, fall in."', 'ALPHA: "Falling in."', 'LEAD: "Ready up."', 'ALL: "Up."'],
    },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Element Commands — Organisation</h2>
        <p className="text-military-300">Ready Up · Detach · Fall In</p>
      </div>

      <div className="flex-1 grid md:grid-cols-3 gap-4">
        {commands.map((c, i) => (
          <div
            key={c.title}
            className="glass-panel p-4 flex flex-col transition-all duration-500"
            style={{
              borderTop: `3px solid ${c.color}`,
              opacity: active >= i ? 1 : 0.25,
              transform: active >= i ? 'scale(1)' : 'scale(0.97)',
            }}
          >
            <p className="font-mono font-bold text-lg mb-2" style={{ color: c.color }}>{c.title}</p>
            <p className="text-military-400 text-xs mb-3">{c.desc}</p>
            <div className="mt-auto space-y-1 font-mono text-[11px]">
              {c.exchange.map((line, li) => (
                <p
                  key={li}
                  className="text-military-300 transition-all duration-500"
                  style={{
                    opacity: active >= i ? 1 : 0,
                    transform: active >= i ? 'translateX(0)' : 'translateX(-8px)',
                    transitionDelay: `${li * 200}ms`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
