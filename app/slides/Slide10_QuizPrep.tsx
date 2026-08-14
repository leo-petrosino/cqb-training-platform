'use client';

import { useEffect, useState } from 'react';
import { Shield, Target, AlertTriangle, Clock } from 'lucide-react';

export default function Slide10_QuizPrep() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(1), 300),
      setTimeout(() => setVisible(2), 1000),
      setTimeout(() => setVisible(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <div className={`text-center space-y-4 transition-all duration-700 ${visible >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-20 h-20 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto border-2 border-accent-gold">
          <Target className="w-10 h-10 text-accent-gold" />
        </div>
        <h2 className="text-4xl font-bold text-white">Field Evaluation</h2>
        <p className="text-xl text-military-300">Quiz incoming. Instructor will unlock shortly.</p>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg w-full transition-all duration-700 ${visible >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="glass-panel p-4 flex items-center gap-3">
          <Clock className="w-6 h-6 text-accent-gold" />
          <div>
            <p className="text-white text-sm font-semibold">Time Limit</p>
            <p className="text-xs text-military-400">Varies per question</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-accent-red" />
          <div>
            <p className="text-white text-sm font-semibold">No Notes</p>
            <p className="text-xs text-military-400">Use what you learned</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <Shield className="w-6 h-6 text-accent-green" />
          <div>
            <p className="text-white text-sm font-semibold">Pass Mark</p>
            <p className="text-xs text-military-400">80% minimum</p>
          </div>
        </div>
        <div className="glass-panel p-4 flex items-center gap-3">
          <Target className="w-6 h-6 text-military-300" />
          <div>
            <p className="text-white text-sm font-semibold">Mixed Format</p>
            <p className="text-xs text-military-400">MCQ + Scenario</p>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-1000 ${visible >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-military-500 text-xs font-mono text-center max-w-md">
          The quiz will test your understanding of CQB fundamentals covered in this session.
          <br />
          Good luck, operator.
        </p>
      </div>
    </div>
  );
}
