import { createClient } from '@supabase/supabase-js';
import { User, Session, Slide, Note, QuizQuestion, QuizResponse } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Auth helpers
export async function signInWithDiscord() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      scopes: 'identify guilds',
    },
  });

  if (error) throw error;
  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Session helpers
export async function createSession(title: string, instructorId: string): Promise<Session> {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const { data, error } = await supabase
    .from('sessions')
    .insert([{
      code,
      instructor_id: instructorId,
      status: 'waiting',
      current_slide: 0,
      total_slides: 0,
      title,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSessionByCode(code: string): Promise<Session | null> {
  const { data } = await supabase
    .from('sessions')
    .select('*')
    .eq('code', code)
    .single();

  return data;
}

export async function joinSession(sessionId: string, userId: string) {
  const { error } = await supabase
    .from('session_attendees')
    .insert([{ session_id: sessionId, user_id: userId }]);

  if (error) throw error;
}

export async function updateSessionStatus(sessionId: string, status: Session['status']) {
  const { error } = await supabase
    .from('sessions')
    .update({ status })
    .eq('id', sessionId);

  if (error) throw error;
}

export async function updateCurrentSlide(sessionId: string, slideIndex: number) {
  const { error } = await supabase
    .from('sessions')
    .update({ current_slide: slideIndex })
    .eq('id', sessionId);

  if (error) throw error;
}

// Slide helpers
export async function getSlides(sessionId: string): Promise<Slide[]> {
  const { data } = await supabase
    .from('slides')
    .select('*')
    .eq('session_id', sessionId)
    .order('order', { ascending: true });

  return data || [];
}

// Notes helpers
export async function saveNote(userId: string, sessionId: string, content: string) {
  const { error } = await supabase
    .from('notes')
    .upsert([{ user_id: userId, session_id: sessionId, content }], {
      onConflict: 'user_id,session_id',
    });

  if (error) throw error;
}

export async function getNote(userId: string, sessionId: string): Promise<Note | null> {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .eq('session_id', sessionId)
    .single();

  return data;
}

// Quiz helpers
export async function getQuizQuestions(sessionId: string): Promise<QuizQuestion[]> {
  const { data } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('session_id', sessionId)
    .order('order', { ascending: true });

  return data || [];
}

export async function submitQuizResponse(response: Omit<QuizResponse, 'id' | 'created_at'>) {
  const { error } = await supabase
    .from('quiz_responses')
    .insert([response]);

  if (error) throw error;
}

export async function getQuizResults(sessionId: string, userId: string): Promise<QuizResponse[]> {
  const { data } = await supabase
    .from('quiz_responses')
    .select('*')
    .eq('session_id', sessionId)
    .eq('user_id', userId);

  return data || [];
}

// Real-time subscriptions
export function subscribeToSession(sessionId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`session:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'sessions',
        filter: `id=eq.${sessionId}`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToSlides(sessionId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`slides:${sessionId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'slides',
        filter: `session_id=eq.${sessionId}`,
      },
      callback
    )
    .subscribe();
}