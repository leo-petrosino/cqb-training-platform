export interface User {
  id: string;
  discord_id: string;
  username: string;
  avatar: string;
  role: 'instructor' | 'attendee';
  created_at: string;
}

export interface Session {
  id: string;
  code: string;
  instructor_id: string;
  status: 'waiting' | 'active' | 'quiz' | 'ended';
  current_slide: number;
  total_slides: number;
  created_at: string;
  title: string;
}

export interface Slide {
  id: string;
  session_id: string;
  order: number;
  title: string;
  content: string;
  type: 'content' | 'diagram' | 'video';
}

export interface Note {
  id: string;
  user_id: string;
  session_id: string;
  content: string;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  session_id: string;
  order: number;
  question: string;
  type: 'multiple_choice' | 'scenario';
  options?: string[];
  correct_answer?: string;
  scenario_context?: string;
}

export interface QuizResponse {
  id: string;
  user_id: string;
  session_id: string;
  question_id: string;
  answer: string;
  score: number;
  created_at: string;
}