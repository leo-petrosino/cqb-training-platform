'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase, getCurrentUser, getSessionByCode, getSlides, joinSession, updateSessionStatus, updateCurrentSlide, saveNote, getNote, getQuizQuestions } from '@/lib/supabase';
import { User, Session, Note, QuizQuestion } from '@/types';
import { subscribeToSession } from '@/lib/supabase';
import { SLIDE_SET } from '@/app/slides';
import { Shield, LogOut, Users, Play, Square, ChevronLeft, ChevronRight, FileText, MessageSquare, HelpCircle, AlertTriangle, Clock } from 'lucide-react';

export default function SessionRoom() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [attendees, setAttendees] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState({ x: 20, y: 20 });
  const [isLoading, setIsLoading] = useState(true);

  const totalSlides = SLIDE_SET.length;
  const ActiveSlideComponent = SLIDE_SET[currentSlide]?.component;

  // Anti-screenshot: blur on focus loss
  useEffect(() => {
    const handleBlur = () => setIsBlurred(true);
    const handleFocus = () => setIsBlurred(false);
    const handleVisibility = () => {
      if (document.hidden) setIsBlurred(true);
      else setTimeout(() => setIsBlurred(false), 500);
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Anti-screenshot: periodic watermark reposition
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkPos({
        x: 10 + Math.random() * 60,
        y: 10 + Math.random() * 60,
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Load session data
  useEffect(() => {
    loadData();
  }, [code]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!session) return;

    const subscription = subscribeToSession(session.id, (payload) => {
      const updated = payload.new;
      setSession(updated);
      setCurrentSlide(updated.current_slide);

      if (updated.status === 'quiz' && !showQuiz) {
        setShowQuiz(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session?.id]);

  async function loadData() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/');
      return;
    }
    setUser(currentUser);

    const sessionData = await getSessionByCode(code);
    if (!sessionData) {
      alert('Session not found');
      router.push('/dashboard');
      return;
    }
    setSession(sessionData);
    setCurrentSlide(sessionData.current_slide);

    // Join as attendee if not instructor
    if (currentUser.id !== sessionData.instructor_id) {
      await joinSession(sessionData.id, currentUser.id);
    }

    // Load notes
    const noteData = await getNote(currentUser.id, sessionData.id);
    if (noteData) setNotes(noteData.content);

    // Load quiz questions
    const questions = await getQuizQuestions(sessionData.id);
    setQuizQuestions(questions);

    // Count attendees
    const { count } = await supabase
      .from('session_attendees')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionData.id);
    setAttendees(count || 0);

    setIsLoading(false);
  }

  const handlePrevSlide = useCallback(async () => {
    if (!session || currentSlide <= 0) return;
    const newIndex = currentSlide - 1;
    await updateCurrentSlide(session.id, newIndex);
    setCurrentSlide(newIndex);
  }, [session, currentSlide]);

  const handleNextSlide = useCallback(async () => {
    if (!session || currentSlide >= totalSlides - 1) return;
    const newIndex = currentSlide + 1;
    await updateCurrentSlide(session.id, newIndex);
    setCurrentSlide(newIndex);
  }, [session, currentSlide, totalSlides]);

  const handleStartSession = async () => {
    if (!session) return;
    await updateSessionStatus(session.id, 'active');
    setSession({ ...session, status: 'active' });
  };

  const handleEndSession = async () => {
    if (!session) return;
    await updateSessionStatus(session.id, 'ended');
    setSession({ ...session, status: 'ended' });
  };

  const handleStartQuiz = async () => {
    if (!session) return;
    await updateSessionStatus(session.id, 'quiz');
    setSession({ ...session, status: 'quiz' });
    setShowQuiz(true);
  };

  const handleSaveNotes = async () => {
    if (!user || !session) return;
    await saveNote(user.id, session.id, notes);
  };

  const isInstructor = user?.id === session?.instructor_id;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-military-700/50 bg-military-900/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">{session?.title}</h1>
              <p className="text-xs text-military-400 font-mono">CODE: {session?.code}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-military-400">
              <Users className="w-4 h-4" />
              <span>{attendees}</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
              session?.status === 'active' ? 'bg-accent-green/20 text-accent-green' :
              session?.status === 'waiting' ? 'bg-accent-gold/20 text-accent-gold' :
              session?.status === 'quiz' ? 'bg-accent-red/20 text-accent-red' :
              'bg-military-700 text-military-400'
            }`}>
              {session?.status?.toUpperCase()}
            </div>
            <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-military-800 rounded-lg">
              <LogOut className="w-4 h-4 text-military-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Slide Viewer — ADATTABILE E SCORREVOLE */}
          <div className="flex-1 p-4 overflow-auto">
            <div 
              className={`slide-container max-w-5xl mx-auto min-h-[300px] p-6 relative transition-all duration-300 ${
                isBlurred ? 'blur-content' : ''
              }`}
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Dynamic Watermark */}
              <div 
                className="watermark-text z-10"
                style={{ 
                  left: `${watermarkPos.x}%`, 
                  top: `${watermarkPos.y}%`,
                  transform: 'rotate(-15deg)',
                }}
              >
                {user?.username} &bull; {new Date().toISOString()} &bull; {session?.code}
              </div>
              <div 
                className="watermark-text z-10"
                style={{ 
                  left: `${100 - watermarkPos.x - 20}%`, 
                  top: `${100 - watermarkPos.y - 10}%`,
                  transform: 'rotate(15deg)',
                }}
              >
                CONFIDENTIAL &bull; HERRICK TF &bull; {user?.username}
              </div>

              {/* Slide Content */}
              {session?.status === 'waiting' && !isInstructor ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 text-center min-h-[300px]">
                  <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-8 h-8 text-accent-gold" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Waiting for Instructor</h2>
                  <p className="text-military-400">The session will begin shortly. Please wait.</p>
                </div>
              ) : ActiveSlideComponent ? (
                <div className="no-select">
                  <div className="flex items-center justify-between mb-4 border-b border-military-700/50 pb-3">
                    <div>
                      <span className="text-accent-gold font-mono text-sm">SLIDE {currentSlide + 1} / {totalSlides}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{SLIDE_SET[currentSlide].title}</h3>
                    </div>
                    {SLIDE_SET[currentSlide].duration && (
                      <div className="flex items-center gap-1 text-military-500 text-xs font-mono">
                        <Clock className="w-3 h-3" />
                        ~{SLIDE_SET[currentSlide].duration}s
                      </div>
                    )}
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                    <ActiveSlideComponent />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-military-500 min-h-[300px]">
                  No slide available
                </div>
              )}
            </div>
          </div>

          {/* Instructor Controls */}
          {isInstructor && (
            <div className="border-t border-military-700/50 bg-military-800/50 p-4">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {session?.status === 'waiting' && (
                    <button onClick={handleStartSession} className="btn-primary flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Start Session
                    </button>
                  )}
                  {session?.status === 'active' && (
                    <>
                      <button 
                        onClick={handlePrevSlide}
                        disabled={currentSlide === 0}
                        className="btn-secondary disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-military-300 font-mono px-4">
                        {currentSlide + 1} / {totalSlides}
                      </span>
                      <button 
                        onClick={handleNextSlide}
                        disabled={currentSlide >= totalSlides - 1}
                        className="btn-secondary disabled:opacity-50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button onClick={handleStartQuiz} className="btn-danger ml-4 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Start Quiz
                      </button>
                    </>
                  )}
                  {session?.status === 'quiz' && (
                    <button onClick={handleEndSession} className="btn-danger flex items-center gap-2">
                      <Square className="w-4 h-4" />
                      End Session
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Attendee Navigation */}
          {!isInstructor && session?.status === 'active' && (
            <div className="border-t border-military-700/50 bg-military-800/50 p-4">
              <div className="max-w-5xl mx-auto flex items-center justify-center gap-4">
                <span className="text-sm text-military-400 font-mono">
                  Slide {currentSlide + 1} of {totalSlides}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-military-700/50 bg-military-800/30 flex flex-col shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-military-700/50">
            <button 
              onClick={() => { setShowNotes(false); setShowQuiz(false); }}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                !showNotes && !showQuiz ? 'text-accent-gold border-b-2 border-accent-gold' : 'text-military-400'
              }`}
            >
              <FileText className="w-4 h-4" />
              Info
            </button>
            <button 
              onClick={() => { setShowNotes(true); setShowQuiz(false); }}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                showNotes ? 'text-accent-gold border-b-2 border-accent-gold' : 'text-military-400'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Notes
            </button>
            <button 
              onClick={() => { setShowNotes(false); setShowQuiz(true); }}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
                showQuiz ? 'text-accent-gold border-b-2 border-accent-gold' : 'text-military-400'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Quiz
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto p-4">
            {!showNotes && !showQuiz && (
              <div className="space-y-4">
                <div className="glass-panel p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Session Info</h3>
                  <div className="space-y-2 text-xs text-military-300">
                    <p><span className="text-military-500">Instructor:</span> {isInstructor ? 'You' : 'Instructor'}</p>
                    <p><span className="text-military-500">Status:</span> {session?.status}</p>
                    <p><span className="text-military-500">Slides:</span> {totalSlides}</p>
                    <p><span className="text-military-500">Attendees:</span> {attendees}</p>
                  </div>
                </div>

                <div className="glass-panel p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Slide Overview</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {SLIDE_SET.map((slide, idx) => (
                      <div 
                        key={slide.id}
                        className={`flex items-center gap-2 p-2 rounded text-xs ${
                          idx === currentSlide ? 'bg-accent-gold/20 text-accent-gold' : 'text-military-400'
                        }`}
                      >
                        <span className="font-mono w-6">{slide.id}</span>
                        <span className="truncate">{slide.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel p-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Instructions</h3>
                  <ul className="space-y-2 text-xs text-military-300">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold">1.</span>
                      Wait for the instructor to start the session
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold">2.</span>
                      Take notes in the Notes tab
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold">3.</span>
                      Content blurs if you leave the window
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold">4.</span>
                      Complete the quiz when unlocked
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {showNotes && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Your Notes</h3>
                  <button onClick={handleSaveNotes} className="text-xs text-accent-gold hover:text-accent-gold/80">
                    Save
                  </button>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take your notes here..."
                  className="w-full h-[400px] bg-military-800 border border-military-600 rounded-lg p-3 text-sm text-military-100 placeholder-military-500 resize-none focus:outline-none focus:border-accent-gold"
                />
                <p className="text-xs text-military-500">
                  Notes are saved automatically when you click Save. Only you can see your notes.
                </p>
              </div>
            )}

            {showQuiz && (
              <QuizPanel 
                questions={quizQuestions}
                sessionId={session?.id || ''}
                userId={user?.id || ''}
                isActive={session?.status === 'quiz'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Quiz Panel Component
function QuizPanel({ questions, sessionId, userId, isActive }: {
  questions: QuizQuestion[];
  sessionId: string;
  userId: string;
  isActive: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    let totalScore = 0;

    for (const question of questions) {
      const answer = answers[question.id] || '';
      const isCorrect = question.type === 'multiple_choice' 
        ? answer === question.correct_answer
        : answer.length > 20;

      const points = isCorrect ? 1 : 0;
      totalScore += points;

      await supabase.from('quiz_responses').insert([{
        user_id: userId,
        session_id: sessionId,
        question_id: question.id,
        answer,
        score: points,
      }]);
    }

    setScore(totalScore);
    setSubmitted(true);
  };

  if (!isActive && !submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <HelpCircle className="w-12 h-12 text-military-600 mx-auto" />
        <p className="text-military-400 text-sm">Quiz not yet active. Wait for the instructor to unlock it.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8 text-accent-green" />
        </div>
        <h3 className="text-lg font-bold text-white">Quiz Submitted</h3>
        <p className="text-military-300">
          Score: <span className="text-accent-gold font-bold">{score}</span> / {questions.length}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="glass-panel p-4 space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-accent-gold font-mono text-sm">Q{index + 1}</span>
            <p className="text-sm text-white font-medium">{question.question}</p>
          </div>

          {question.scenario_context && (
            <div className="bg-military-900/50 p-3 rounded text-xs text-military-300 border-l-2 border-accent-gold">
              {question.scenario_context}
            </div>
          )}

          {question.type === 'multiple_choice' && question.options && (
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <label 
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    answers[question.id] === option
                      ? 'border-accent-gold bg-accent-gold/10'
                      : 'border-military-700 hover:border-military-600'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    className="accent-accent-gold"
                  />
                  <span className="text-sm text-military-200">{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === 'scenario' && (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder="Describe your tactical response..."
              className="w-full h-24 bg-military-800 border border-military-600 rounded-lg p-3 text-sm text-military-100 placeholder-military-500 resize-none focus:outline-none focus:border-accent-gold"
            />
          )}
        </div>
      ))}

      <button 
        onClick={handleSubmit}
        className="btn-primary w-full"
        disabled={Object.keys(answers).length < questions.length}
      >
        Submit Quiz
      </button>
    </div>
  );
}
