'use client';

import { useEffect, useState } from 'react';

export default function Slide16_BreachingTechniques() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const timers = [0, 1, 2, 3].map((i) => setTimeout(() => setActive(i), 400 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, []);

  const methods = [
    { title: 'MECHANICAL', speed: 'SLOWER', color: '#2d5a3f', desc: 'Manual or hydraulic tools — picks, rams, hydraulic spreaders — used to defeat a lock or door with minimal collateral damage.' },
    { title: 'BALLISTIC', speed: 'FAST', color: '#c9a227', desc: 'Small-arms fire directed at hinges or the locking mechanism to defeat a door quickly under controlled conditions.' },
    { title: 'EXPLOSIVE', speed: 'FASTEST', color: '#8b2635', desc: 'Specialist charges placed by a qualified breacher — the fastest option, reserved for reinforced barriers and planned by trained personnel only.' },
    { title: 'THERMAL', speed: 'SLOWER', color: '#3a6ea5', desc: 'Cutting torches or thermal lances used against heavy metal barriers where mechanical or ballistic methods are impractical.' },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Breaching Techniques — Method Overview</h2>
        <p className="text-military-300">Choosing a method is a leadership decision, weighed against speed, risk and the environment</p>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
        {methods.map((m, i) => (
          <div
            key={m.title}
            className="glass-panel p-4 flex flex-col transition-all duration-500"
            style={{
              borderTop: `3px solid ${m.color}`,
              opacity: active >= i ? 1 : 0.2,
              transform: active >= i ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <p className="font-mono font-bold text-lg" style={{ color: m.color }}>{m.title}</p>
            <p className="font-mono text-[10px] text-military-500 mb-2 tracking-widest">{m.speed}</p>
            <p className="text-military-400 text-xs">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-4 border-l-2 border-accent-gold text-sm">
        <p className="text-accent-gold font-mono text-xs font-bold mb-1">DECISION FACTORS</p>
        <p className="text-military-300">
          Barricaded vs. reinforced doors call for different tools. Ballistic and explosive methods are fastest but carry the highest
          risk to occupants — in hostage situations, the plan is reassessed to avoid injury or giving warning to hostile forces. Slower
          mechanical or thermal methods trade speed for control when that trade-off is worth it.
        </p>
      </div>
    </div>
  );
}
