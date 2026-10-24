import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  Clock, 
  CheckCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  TrendingUp, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { QUIZZES_DATA } from '../data/portalData';

export default function TestsAndResults({ user, onTestCompleted }) {
  const [activeTab, setActiveTab] = useState('available'); // 'available', 'history'
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const [historyList, setHistoryList] = useState([
    { id: 1, title: "Python Fundamentals Assessment", date: "April 24, 2025", score: 90, total: 100, status: "Passed" },
    { id: 2, title: "NumPy & Vectorized Computing", date: "April 20, 2025", score: 85, total: 100, status: "Passed" },
    { id: 3, title: "Pandas Data Wrangling Test", date: "April 15, 2025", score: 70, total: 100, status: "Passed" },
    { id: 4, title: "Exploratory Data Analysis Quiz", date: "April 10, 2025", score: 68, total: 100, status: "Passed" }
  ]);

  // Timer countdown
  useEffect(() => {
    if (!activeQuiz || quizSubmitted) return;
    if (timeLeftSeconds <= 0) {
      handleSubmitQuiz();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeQuiz, quizSubmitted, timeLeftSeconds]);

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeLeftSeconds(quiz.timeLimitMinutes * 60);
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;
    let correctCount = 0;
    activeQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const scoreObj = {
      correct: correctCount,
      total: activeQuiz.questions.length,
      percentage
    };

    setQuizScore(scoreObj);
    setQuizSubmitted(true);

    if (percentage >= 70) {
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    // Add to history
    setHistoryList(prev => [
      {
        id: Date.now(),
        title: activeQuiz.title,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        score: percentage,
        total: 100,
        status: percentage >= 70 ? 'Passed' : 'Failed'
      },
      ...prev
    ]);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            ASSESSMENT PLATFORM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Tests & Results
        </h1>
        <p className="text-sm text-slate-400">
          Take tests, evaluate your performance and improve.
        </p>
      </div>

      {/* Main Grid: Available Tests (Left) & Your Performance (Right) matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Tabs & Test Cards matching screenshot */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Tabs: Available Tests vs Results History */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#091122] border border-[#1a2b4c] w-fit">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'available'
                  ? 'bg-blue-600 text-white shadow-neon-blue'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Available Tests ({QUIZZES_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-neon-blue'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Results History ({historyList.length})
            </button>
          </div>

          {/* TAB 1: AVAILABLE TESTS matching screenshot */}
          {activeTab === 'available' && (
            <div className="space-y-3">
              {QUIZZES_DATA.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-5 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] hover:border-blue-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {quiz.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">
                        {quiz.totalQuestions} questions • {quiz.timeLimitMinutes} mins
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-slate-400">
                      Evaluates concepts, syntax, code outputs and theoretical foundations.
                    </p>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: RESULTS HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {historyList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#0d1628] border border-[#1a2b4c] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400">Completed on {item.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-cyan-300 font-mono">
                      {item.score}%
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Your Performance Circular Meter matching screenshot! */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              Your Performance
            </h3>

            {/* Circular Progress Gauge showing 78% Average Score matching screenshot! */}
            <div className="relative w-40 h-40 my-4 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#15233d"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="url(#blueScoreGrad)"
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 78) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="blueScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1d68ff" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">78%</span>
                <span className="text-[9px] text-blue-400 font-semibold uppercase tracking-wider">Average Score</span>
              </div>
            </div>
          </div>

          {/* Test Statistics Breakdown matching screenshot */}
          <div className="pt-4 border-t border-[#1e335a] space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Total Tests</span>
              <span className="font-bold text-white">5</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Completed</span>
              <span className="font-bold text-emerald-400">4</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Average Score</span>
              <span className="font-bold text-cyan-400">78%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Exam Runner Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b1324] border border-[#1e335a] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col justify-between">
            
            {/* Header: Title + Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1e335a]">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">{activeQuiz.category} Assessment</span>
                <h2 className="text-lg font-bold text-white">{activeQuiz.title}</h2>
              </div>

              {!quizSubmitted && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-950/60 border border-blue-500/40 text-cyan-300 font-mono text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTime(timeLeftSeconds)}</span>
                </div>
              )}
            </div>

            {/* Test Content: If NOT submitted yet */}
            {!quizSubmitted ? (
              <div className="py-6 space-y-5 flex-1">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100)}% progress</span>
                </div>

                <div className="p-4 rounded-xl bg-[#070b16] border border-[#1a2b4c]">
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {activeQuiz.questions[currentQuestionIndex].question}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-2">
                  {activeQuiz.questions[currentQuestionIndex].options.map((opt, idx) => {
                    const qId = activeQuiz.questions[currentQuestionIndex].id;
                    const isSelected = selectedAnswers[qId] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(qId, idx)}
                        className={`w-full text-left p-3.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-600/30 border-blue-400 text-white shadow-neon-blue'
                            : 'bg-[#0e172a] border-[#1e335a] text-slate-300 hover:bg-[#13223f]'
                        }`}
                      >
                        <span>{opt}</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 bg-black rounded-full"></span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* RESULTS SUMMARY VIEW */
              <div className="py-6 text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-blue-600/20 text-cyan-300 border border-blue-500/40">
                  <Award className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-white">Quiz Evaluation Completed!</h3>
                <p className="text-xs text-slate-300">
                  You scored <span className="text-cyan-400 font-bold text-base">{quizScore.percentage}%</span> ({quizScore.correct}/{quizScore.total} questions correct).
                </p>

                {quizScore.percentage >= 70 ? (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                    Congratulations! You passed the assessment and unlocked your completion badge!
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                    Keep practicing! You need 70% to pass this module. Review the explanations below and retake anytime.
                  </div>
                )}

                {/* Question Review & Explanations */}
                <div className="mt-4 text-left max-h-56 overflow-y-auto space-y-3 p-2">
                  {activeQuiz.questions.map((q, i) => (
                    <div key={q.id} className="p-3 rounded-xl bg-[#070b16] border border-[#1a2b4c] text-xs space-y-1">
                      <p className="font-semibold text-slate-200">
                        {i + 1}. {q.question}
                      </p>
                      <p className="text-[11px] text-emerald-400">
                        Correct: {q.options[q.correctIndex]}
                      </p>
                      <p className="text-[10px] text-slate-400 italic">
                        Explanation: {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1e335a]">
              {!quizSubmitted ? (
                <>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel Test
                  </button>

                  <div className="flex gap-2">
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        className="px-4 py-2 rounded-xl text-xs bg-[#13223f] text-slate-300 hover:text-white"
                      >
                        Previous
                      </button>
                    )}

                    {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full flex justify-end gap-3">
                  <button
                    onClick={() => handleStartQuiz(activeQuiz)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#13223f] text-blue-300 border border-blue-500/30"
                  >
                    Retake Test
                  </button>
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
                  >
                    Done & Return
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
