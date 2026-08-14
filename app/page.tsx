'use client';

import { useEffect, useState } from 'react';
import { Shield, Lock, Users, BookOpen, Target, ChevronRight } from 'lucide-react';
import { getDiscordAuthUrl } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      router.push('/dashboard');
    }
  }

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = getDiscordAuthUrl();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-military-700/50 bg-military-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-green rounded-lg flex items-center justify-center border border-accent-green/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">HERRICK TASKFORCE</h1>
              <p className="text-xs text-military-400 font-mono tracking-wider">CQB TRAINING PLATFORM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-military-400 font-mono">RGR • GGRP</span>
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-red/10 border border-accent-red/30 rounded-full text-accent-red text-xs font-mono tracking-wider">
              <Lock className="w-3 h-3" />
              RESTRICTED ACCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Close Quarters Battle
              <span className="block text-accent-gold">Training Platform</span>
            </h2>
            <p className="text-military-300 text-lg max-w-xl mx-auto">
              Phase III of Herrick Taskforce Selection. Classroom instruction and field evaluation for elite CQB operators.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: BookOpen, label: 'Live Instruction', desc: 'Instructor-controlled presentations' },
              { icon: Users, label: 'Session Based', desc: 'Join active training sessions' },
              { icon: Target, label: 'Field Eval', desc: 'Scenario-based assessments' },
            ].map((feature) => (
              <div key={feature.label} className="glass-panel p-4 text-center space-y-2">
                <feature.icon className="w-6 h-6 text-accent-gold mx-auto" />
                <h3 className="text-sm font-semibold text-white">{feature.label}</h3>
                <p className="text-xs text-military-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Login Button */}
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              {isLoading ? (
                <span className="animate-spin">⟳</span>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Authenticate with Discord
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-xs text-military-500 font-mono">
              Discord verification required • GGRP server membership enforced
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-military-800 py-6 text-center">
        <p className="text-xs text-military-500 font-mono">
          HERRICK TASKFORCE • ROYAL GURKHA RIFLES • GRENADIER GUARDS ROLEPLAY
        </p>
      </footer>
    </div>
  );
}