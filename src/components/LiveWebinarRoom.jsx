import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Hand, 
  Share2, 
  MessageSquare, 
  Users, 
  PhoneOff, 
  Send, 
  HelpCircle, 
  Sparkles,
  Smile,
  Volume2
} from 'lucide-react';

export default function LiveWebinarRoom({ session, onClose }) {
  const [micOn, setMicOn] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'qa', 'participants'
  const [chatMessage, setChatMessage] = useState('');
  
  const [chatLogs, setChatLogs] = useState([
    { id: 1, user: "Ananya Roy", text: "Good evening Dr. Sharma! Excited for the live session.", time: "7:02 PM" },
    { id: 2, user: "Karan Patel", text: "Sir, will we cover ROC-AUC curves today?", time: "7:03 PM" },
    { id: 3, user: "Dr. Amit Sharma", isHost: true, text: "Welcome everyone! Yes Karan, we will write live Python code for confusion matrices and ROC curves in 10 minutes.", time: "7:04 PM" }
  ]);

  const [qaLogs, setQaLogs] = useState([
    { id: 1, user: "Mohit S.", question: "What is the threshold value default in Scikit-Learn predict_proba()?", upvotes: 14, answered: true },
    { id: 2, user: "Sneha G.", question: "Can we use Cross-Validation with time-series data without lookahead bias?", upvotes: 21, answered: false }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs]);

  // Simulate periodic incoming student messages
  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedMessages = [
        { user: "Rohan V.", text: "The audio and video quality is crisp! 1080p stream." },
        { user: "Priya S.", text: "Precision-Recall trade-off makes so much sense now!" },
        { user: "Harsh Vardhan", text: "Can we download this Jupyter notebook after class?" },
        { user: "Tanvi M.", text: "Understood the matrix concept completely!" }
      ];
      const randomMsg = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
      setChatLogs(prev => [
        ...prev,
        {
          id: Date.now(),
          user: randomMsg.user,
          text: randomMsg.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatLogs(prev => [
      ...prev,
      {
        id: Date.now(),
        user: "Rahul Sharma (You)",
        text: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setChatMessage('');
  };

  const handlePostQA = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQaLogs(prev => [
      ...prev,
      {
        id: Date.now(),
        user: "Rahul Sharma",
        question: newQuestion,
        upvotes: 1,
        answered: false
      }
    ]);
    setNewQuestion('');
  };

  const handleUpvoteQA = (id) => {
    setQaLogs(prev => prev.map(q => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050811] flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Top Webinar Header Bar */}
      <header className="h-14 px-4 bg-[#080d19] border-b border-[#1a2b4c] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <img src="/brainbyte-logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-amber-400" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-600/30 text-red-400 font-bold border border-red-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                LIVE STREAM
              </span>
              <h2 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                {session?.title || "Machine Learning Fundamentals"}
              </h2>
            </div>
            <p className="text-[10px] text-slate-400">Host: Dr. Amit Sharma • 148 Students Connected</p>
          </div>
        </div>

        {/* Leave session button */}
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span>Leave Room</span>
        </button>
      </header>

      {/* Main Webinar Body Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left 8/9 Columns: Main Instructor Stage & Shared Screen */}
        <div className="lg:col-span-8 xl:col-span-9 bg-[#040710] flex flex-col justify-between p-4 relative overflow-hidden">
          
          {/* Main Stage Video Canvas */}
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#1a2b4c] bg-[#070b16] flex items-center justify-center group shadow-2xl">
            
            {/* Live Visual Presentation Canvas */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#091124] to-[#040813]">
              
              <div className="max-w-lg w-full p-6 rounded-2xl bg-[#0d1628]/90 border border-blue-500/40 shadow-neon-blue space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e335a]">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    🔴 Live Lecture Code Walkthrough
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    60 FPS • 1080p
                  </span>
                </div>

                <div className="text-left font-mono text-xs bg-[#050811] p-3 rounded-xl border border-slate-800 text-slate-300 space-y-1">
                  <p className="text-blue-400"># Evaluating Logistic Regression Model</p>
                  <p><span className="text-purple-400">from</span> sklearn.metrics <span className="text-purple-400">import</span> classification_report</p>
                  <p>y_pred = model.predict(X_test)</p>
                  <p className="text-emerald-400">print(classification_report(y_test, y_pred))</p>
                </div>

                {/* Animated Equalizer indicating instructor speaking */}
                <div className="flex items-center justify-center gap-1 py-1">
                  <span className="w-1 h-3 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-6 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                  <span className="w-1 h-8 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-5 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-1 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                </div>

                <p className="text-xs text-slate-300 italic">
                  "Notice how the precision for class 1 increases as we adjust the decision threshold..."
                </p>
              </div>

            </div>

            {/* Dr. Sharma Floating Host Webcam Picture */}
            <div className="absolute top-4 right-4 w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden border-2 border-blue-400 shadow-2xl bg-black z-20">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=350&auto=format&fit=crop&q=80" 
                alt="Dr. Sharma"
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Dr. Sharma (Host)
              </div>
            </div>

            {/* User Self Preview (if video is on) */}
            {videoOn && (
              <div className="absolute top-4 left-4 w-28 h-20 rounded-xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900 z-20">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
                  alt="Self" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/70 text-[9px] text-white">
                  You (Rahul)
                </div>
              </div>
            )}

            {/* Hand Raised Banner */}
            {handRaised && (
              <div className="absolute bottom-6 left-6 px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 backdrop-blur-md animate-bounce z-20">
                <Hand className="w-4 h-4 text-amber-400" />
                <span>Your hand is raised! Dr. Sharma has been notified.</span>
              </div>
            )}

          </div>

          {/* Bottom Floating Control Dock */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3 rounded-xl border transition-all ${
                micOn 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-neon-blue' 
                  : 'bg-[#0d1628] border-[#1e335a] text-slate-400 hover:text-white'
              }`}
              title={micOn ? "Mute Mic" : "Unmute Mic"}
            >
              {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-3 rounded-xl border transition-all ${
                videoOn 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-neon-blue' 
                  : 'bg-[#0d1628] border-[#1e335a] text-slate-400 hover:text-white'
              }`}
              title={videoOn ? "Turn Camera Off" : "Turn Camera On"}
            >
              {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                handRaised 
                  ? 'bg-amber-500 text-black border-amber-400 shadow-neon-gold' 
                  : 'bg-[#0d1628] border-[#1e335a] text-slate-300 hover:text-amber-300'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{handRaised ? "Lower Hand" : "Raise Hand"}</span>
            </button>

            <button
              onClick={() => alert("Screen share is currently managed by Host (Dr. Amit Sharma).")}
              className="p-3 rounded-xl bg-[#0d1628] border border-[#1e335a] text-slate-400 hover:text-white transition-colors"
              title="Share Screen"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right 4/3 Columns: Live Chat, Q&A & Participants Panel */}
        <div className="lg:col-span-4 xl:col-span-3 bg-[#080d19] border-l border-[#1a2b4c] flex flex-col justify-between h-full">
          
          {/* Tabs Selector */}
          <div className="flex items-center border-b border-[#1a2b4c] bg-[#050811]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-400 bg-blue-600/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeTab === 'qa'
                  ? 'border-blue-500 text-blue-400 bg-blue-600/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Q&A ({qaLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${
                activeTab === 'participants'
                  ? 'border-blue-500 text-blue-400 bg-blue-600/10'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Peers (148)
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            
            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <div className="space-y-3">
                {chatLogs.map((msg) => (
                  <div key={msg.id} className="text-xs space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold ${msg.isHost ? 'text-amber-400' : 'text-blue-300'}`}>
                        {msg.user}
                      </span>
                      {msg.isHost && (
                        <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          HOST
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 ml-auto">{msg.time}</span>
                    </div>
                    <p className="text-slate-200 bg-[#0d1628] p-2 rounded-lg border border-[#1e335a]/50">
                      {msg.text}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}

            {/* Q&A TAB */}
            {activeTab === 'qa' && (
              <div className="space-y-3">
                <form onSubmit={handlePostQA} className="flex gap-1.5 mb-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Submit a question to Dr. Sharma..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#0d1628] border border-[#1e335a] text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    Ask
                  </button>
                </form>

                {qaLogs.map((q) => (
                  <div key={q.id} className="p-2.5 rounded-xl bg-[#0d1628] border border-[#1e335a] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-slate-200 font-medium">{q.question}</p>
                      <button
                        onClick={() => handleUpvoteQA(q.id)}
                        className="px-2 py-0.5 rounded bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 text-[10px] font-mono font-bold border border-blue-500/30 shrink-0"
                      >
                        ▲ {q.upvotes}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Asked by {q.user}</span>
                      {q.answered ? (
                        <span className="text-emerald-400 font-semibold">Answered Live ✓</span>
                      ) : (
                        <span className="text-amber-400">In Queue</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PARTICIPANTS TAB */}
            {activeTab === 'participants' && (
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-[#0d1628] border border-blue-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Host" className="w-6 h-6 rounded-full" />
                    <div>
                      <p className="font-bold text-amber-300">Dr. Amit Sharma</p>
                      <p className="text-[10px] text-slate-400">Instructor & Host</p>
                    </div>
                  </div>
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                </div>

                <div className="p-2 rounded-lg bg-[#0d1628] border border-[#1e335a] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="You" className="w-6 h-6 rounded-full" />
                    <div>
                      <p className="font-bold text-white">Rahul Sharma (You)</p>
                      <p className="text-[10px] text-blue-400">Student</p>
                    </div>
                  </div>
                  <MicOff className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {["Ananya Roy", "Karan Patel", "Sneha Gupta", "Mohit Singhania", "Priya Verma", "Deepak Rao"].map((p, i) => (
                  <div key={i} className="p-2 rounded-lg bg-[#0d1628]/60 border border-slate-800/80 flex items-center justify-between text-slate-300">
                    <span>{p}</span>
                    <span className="text-[10px] text-slate-500">Student</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Bottom Chat Input Bar (only in Chat tab) */}
          {activeTab === 'chat' && (
            <form onSubmit={handleSendChat} className="p-3 border-t border-[#1a2b4c] bg-[#050811] flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Send a message to class..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#0d1628] border border-[#1e335a] text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
