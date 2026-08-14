'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, createSession, getCurrentUser } from '@/lib/supabase';
import { User, Session } from '@/types';
import { Shield, Plus, LogIn, LogOut, Clock, ChevronRight, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUser();
    loadSessions();
  }, []);

  async function loadUser() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/');
      return;
    }
    setUser(currentUser);
    setIsLoading(false);
  }

  async function loadSessions() {
    const { data } = await supabase
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    setSessions(data || []);
  }

  async function handleCreateSession(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !newSessionTitle.trim()) return;

    try {
      const session = await createSession(newSessionTitle, user.id);
      setShowCreateModal(false);
      setNewSessionTitle('');
      router.push(`/session/${session.code}`);
    } catch (error) {
      alert('Failed to create session');
    }
  }

  async function handleJoinSession(e: React.FormEvent) {
    e.preventDefault();
    if (!joinCode.trim()) return;

    const { data: session } = await supabase
      .from('sessions')
      .select('*')
      .eq('code', joinCode.toUpperCase())
      .single();

    if (!session) {
      alert('Session not found');
      return;
    }

    router.push(`/session/${session.code}`);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-military-700/50 bg-military-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-green rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">HERRICK TASKFORCE</h1>
              <p className="text-xs text-military-400 font-mono">CQB TRAINING PLATFORM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user?.avatar && (
                <img 
                  src={`https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full border border-military-600"
                />
              )}
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-white">{user?.username}</p>
                <p className="text-xs text-military-400 font-mono uppercase">{user?.role}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-military-800 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-military-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome */}
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.username}
          </h2>
          <p className="text-military-300">
            {user?.role === 'instructor' 
              ? 'You have instructor privileges. Create or manage training sessions below.'
              : 'Join an active training session using the code provided by your instructor.'}
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Join Session */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center">
                <LogIn className="w-5 h-5 text-accent-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Join Session</h3>
                <p className="text-sm text-military-400">Enter the session code</p>
              </div>
            </div>

            <form onSubmit={handleJoinSession} className="space-y-3">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="SESSION CODE"
                className="input-field font-mono tracking-widest text-center"
                maxLength={6}
              />
              <button type="submit" className="btn-primary w-full">
                Join Training Session
              </button>
            </form>
          </div>

          {/* Create Session (Instructors only) */}
          {user?.role === 'instructor' && (
            <div className="glass-panel p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-green/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Create Session</h3>
                  <p className="text-sm text-military-400">Start a new CQB training</p>
                </div>
              </div>

              <button 
                onClick={() => setShowCreateModal(true)}
                className="btn-primary w-full"
              >
                New Training Session
              </button>
            </div>
          )}
        </div>

        {/* Recent Sessions */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent-gold" />
              Recent Sessions
            </h3>
          </div>

          {sessions.length === 0 ? (
            <p className="text-military-400 text-center py-8">No sessions found</p>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => router.push(`/session/${session.code}`)}
                  className="flex items-center justify-between p-4 bg-military-800/50 rounded-lg hover:bg-military-700/50 cursor-pointer transition-colors border border-military-700/30"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      session.status === 'active' ? 'bg-accent-green animate-pulse' :
                      session.status === 'waiting' ? 'bg-accent-gold' :
                      session.status === 'quiz' ? 'bg-accent-red' :
                      'bg-military-500'
                    }`} />
                    <div>
                      <h4 className="font-semibold text-white">{session.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-military-400">
                        <span className="font-mono">{session.code}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(session.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-military-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-panel p-6 max-w-md w-full space-y-4">
            <h3 className="text-xl font-bold text-white">Create New Session</h3>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-military-300 mb-1">
                  Session Title
                </label>
                <input
                  type="text"
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  placeholder="e.g., CQB Room Clearing Fundamentals"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Create Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}