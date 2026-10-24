import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Maximize, 
  CheckCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Download, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight, 
  Sparkles,
  Lock,
  ExternalLink,
  Code,
  Share2
} from 'lucide-react';

export default function Classroom({ course, onNextModule }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'resources', 'discussion'
  const [activeLessonId, setActiveLessonId] = useState('cml_l8');
  const [isCompleted, setIsCompleted] = useState(false);
  const [studentNotes, setStudentNotes] = useState(
    "Key Points:\n• Accuracy is not always the best metric for imbalanced data.\n• Use precision, recall and F1-score for better evaluation.\n• Confusion matrix helps in understanding model performance.\n• Type I Error = False Positive; Type II Error = False Negative."
  );

  // Helper to get embeddable video URL
  const getVideoEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
    }
    return url;
  };

  const currentVideoUrl = getVideoEmbedUrl(course?.videoUrl);

  const [userComment, setUserComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      author: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      time: "2 days ago",
      text: "Is ROC-AUC preferred over PR-AUC when positive class is very rare?"
    },
    {
      id: 2,
      author: "Dr. Amit Sharma",
      isInstructor: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      time: "1 day ago",
      text: "When the positive class is very rare (like 0.1% fraud), PR-AUC is much more informative than ROC-AUC because ROC-AUC can remain deceptively high due to the huge number of True Negatives!"
    }
  ]);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    setCommentsList([
      ...commentsList,
      {
        id: Date.now(),
        author: "Rahul Sharma",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        time: "Just now",
        text: userComment
      }
    ]);
    setUserComment('');
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Course Top Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1a2b4c]/70">
        <div>
          <span className="text-xs font-mono text-blue-400">Complete Machine Learning</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Module 4: Model Evaluation
          </h1>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-mono text-cyan-400 font-bold">Course Progress: 45%</span>
            <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Syllabus Accordion (Left) & Video + Tabs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Syllabus Accordion matching screenshot (Order 2 on mobile, Order 1 on Desktop) */}
        <div className="lg:col-span-4 order-2 lg:order-1 bg-[#0d1628]/95 border border-[#1a2b4c] rounded-2xl p-4 space-y-3 h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Course Content
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">6 Modules</span>
          </div>

          <div className="space-y-2 text-xs">
            
            {/* Module 1 */}
            <div className="p-2.5 rounded-xl bg-[#091122] border border-[#1e335a] text-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>1. Introduction to ML</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Module 2 */}
            <div className="p-2.5 rounded-xl bg-[#091122] border border-[#1e335a] text-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Data Preprocessing</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Module 3 */}
            <div className="p-2.5 rounded-xl bg-[#091122] border border-[#1e335a] text-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>3. Exploratory Data Analysis</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Module 4: ACTIVE EXPANDED MODULE matching screenshot */}
            <div className="rounded-xl bg-[#111e38] border border-blue-500/50 shadow-neon-blue overflow-hidden">
              <div className="p-2.5 text-blue-300 font-bold flex items-center justify-between bg-blue-900/30">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>4. Model Evaluation</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
              </div>

              {/* Sub-lessons */}
              <div className="p-2 space-y-1.5 bg-[#0b1426]">
                <button
                  onClick={() => setActiveLessonId('cml_l8')}
                  className={`w-full text-left p-2 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                    activeLessonId === 'cml_l8'
                      ? 'bg-blue-600/30 text-white font-bold border border-blue-500/40'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span className="truncate">4.1 Evaluation Metrics</span>
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono">35m</span>
                </button>

                <button
                  onClick={() => setActiveLessonId('cml_l9')}
                  className={`w-full text-left p-2 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                    activeLessonId === 'cml_l9'
                      ? 'bg-blue-600/30 text-white font-bold border border-blue-500/40'
                      : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                    <span className="truncate">4.2 Confusion Matrix</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">45m</span>
                </button>

                <button
                  onClick={() => setActiveLessonId('cml_l10')}
                  className={`w-full text-left p-2 rounded-lg text-[11px] flex items-center justify-between transition-colors ${
                    activeLessonId === 'cml_l10'
                      ? 'bg-blue-600/30 text-white font-bold border border-blue-500/40'
                      : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                    <span className="truncate">4.3 Cross Validation</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">40m</span>
                </button>
              </div>
            </div>

            {/* Module 5 */}
            <div className="p-2.5 rounded-xl bg-[#091122] border border-[#1e335a] text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>5. Hyperparameter Tuning</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </div>

            {/* Module 6 */}
            <div className="p-2.5 rounded-xl bg-[#091122] border border-[#1e335a] text-slate-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-600" />
                <span>6. Real-World Projects</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </div>

          </div>
        </div>

        {/* Right Main Player & Interactive Tabs (Order 1 on mobile, Order 2 on Desktop) */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-4">
          
          {/* Video Player Container matching the screenshot */}
          <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 bg-[#070c17] shadow-2xl aspect-video group">
            
            {/* If Real Video URL is active and playing */}
            {currentVideoUrl && isPlaying ? (
              <div className="absolute inset-0 bg-black z-20">
                <iframe
                  src={currentVideoUrl}
                  title="Lecture Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/80 text-white text-xs z-30 hover:bg-slate-800"
                >
                  Close Video ✕
                </button>
              </div>
            ) : (
              /* Visual Canvas / Slide Content representing Model Evaluation */
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c162c] to-[#040813] flex flex-col items-center justify-center p-6 text-center select-none">
                
                {/* Slide Header */}
                <div className="absolute top-4 left-6 flex items-center gap-2">
                  <img src="/brainbyte-logo.jpg" alt="Logo" className="w-6 h-6 rounded-full border border-amber-400" />
                  <span className="text-xs font-mono font-bold text-slate-300">BrainByte Solutions • AI Lecture</span>
                </div>

                {/* Central Graphic: Confusion Matrix Diagram matching screenshot */}
                <div className="max-w-md w-full p-4 rounded-xl bg-[#0a1224]/90 border border-blue-500/40 shadow-neon-blue">
                  <h4 className="text-sm font-bold text-blue-300 mb-2">Model Evaluation Matrix</h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      <p className="font-bold text-[10px] text-emerald-400 uppercase">True Positive (TP)</p>
                      <p className="text-base font-mono font-extrabold mt-0.5">85</p>
                    </div>
                    <div className="p-2.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300">
                      <p className="font-bold text-[10px] text-rose-400 uppercase">False Positive (FP)</p>
                      <p className="text-base font-mono font-extrabold mt-0.5">15</p>
                    </div>
                    <div className="p-2.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300">
                      <p className="font-bold text-[10px] text-amber-400 uppercase">False Negative (FN)</p>
                      <p className="text-base font-mono font-extrabold mt-0.5">10</p>
                    </div>
                    <div className="p-2.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-300">
                      <p className="font-bold text-[10px] text-blue-400 uppercase">True Negative (TN)</p>
                      <p className="text-base font-mono font-extrabold mt-0.5">90</p>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] font-mono text-cyan-300 bg-black/40 p-1.5 rounded">
                    Precision = TP / (TP + FP) = 85.0%
                  </div>
                </div>

                {/* Big Play Button Overlay */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group/play"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-neon-blue group-hover/play:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </button>

                {/* Corner PIP Instructor Webcam Video Bubble matching screenshot! */}
                <div className="absolute bottom-14 right-4 w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden border-2 border-blue-400 shadow-2xl bg-black z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80" 
                    alt="Dr. Sharma"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[9px] font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Dr. Sharma
                  </div>
                </div>

              </div>
            )}

            {/* Video Controls Bottom Bar matching screenshot */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 pt-6 flex items-center justify-between text-xs text-slate-200 z-30">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-blue-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span className="font-mono text-[11px] text-slate-300">12:34 / 28:45</span>
              </div>

              {/* Timeline scrubber */}
              <div className="flex-1 mx-4 h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer relative group/scrub">
                <div className="h-full bg-blue-500 rounded-full relative" style={{ width: '43%' }}>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md"></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">1080p</span>
                <Volume2 className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
                <Maximize className="w-4 h-4 text-slate-300 hover:text-white cursor-pointer" />
              </div>
            </div>

          </div>

          {/* Action Row: Mark as Complete & Next Lesson matching screenshot */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#0d1628] border border-[#1a2b4c]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkComplete}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-[#15233d] hover:bg-emerald-600 text-slate-200 hover:text-white border border-[#1e335a]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isCompleted ? "Completed! ✓" : "Mark as Complete"}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setActiveLessonId('cml_l9');
                alert("Navigating to Lesson 4.2: Confusion Matrix & ROC-AUC Curve");
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center gap-1.5 transition-all"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tabs Section: Notes, Resources, Discussion matching screenshot */}
          <div className="rounded-2xl bg-[#0d1628] border border-[#1a2b4c] overflow-hidden">
            
            {/* Tabs Header */}
            <div className="flex items-center border-b border-[#1a2b4c] bg-[#091122]">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-blue-400 bg-blue-600/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Notes</span>
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'resources'
                    ? 'border-blue-500 text-blue-400 bg-blue-600/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resources</span>
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === 'discussion'
                    ? 'border-blue-500 text-blue-400 bg-blue-600/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discussion ({commentsList.length})</span>
              </button>
            </div>

            {/* Tab 1: Notes (Interactive textarea with auto-save) */}
            {activeTab === 'notes' && (
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Editable Lecture Notebook</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Auto-saved to Browser</span>
                </div>
                <textarea
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  rows={6}
                  className="w-full p-3 rounded-xl bg-[#080d19] border border-[#1e335a] focus:border-blue-500 text-xs font-mono text-slate-200 focus:outline-none leading-relaxed"
                />
              </div>
            )}

            {/* Tab 2: Resources */}
            {activeTab === 'resources' && (
              <div className="p-5 space-y-3">
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-[#091122] border border-[#1e335a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Module_4_Model_Evaluation_Slides.pdf</p>
                        <p className="text-[10px] text-slate-400">4.2 MB • Presentation deck by Dr. Sharma</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("Downloading lecture slides PDF...")}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#091122] border border-[#1e335a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <Code className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">confusion_matrix_cheatsheet.ipynb</p>
                        <p className="text-[10px] text-slate-400">Jupyter notebook with complete Scikit-Learn code</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert("Downloading Jupyter Notebook...")}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Discussion */}
            {activeTab === 'discussion' && (
              <div className="p-5 space-y-4">
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input
                    type="text"
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Ask Dr. Sharma or peers a question..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#080d19] border border-[#1e335a] focus:border-blue-500 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                  >
                    Post Question
                  </button>
                </form>

                <div className="space-y-3">
                  {commentsList.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-[#091122] border border-[#1a2b4c] space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={c.avatar} alt={c.author} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-xs font-bold text-slate-200">{c.author}</span>
                          {c.isInstructor && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono border border-blue-500/40">
                              Instructor
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 pl-8">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
