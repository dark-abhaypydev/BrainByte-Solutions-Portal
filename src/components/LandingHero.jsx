import React from 'react';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Star, 
  ShieldCheck, 
  Code, 
  Terminal, 
  BrainCircuit, 
  Cpu, 
  Zap,
  Award,
  Video
} from 'lucide-react';

export default function LandingHero({ setActiveView, onOpenVideoModal }) {
  const stats = [
    { value: '500+', label: 'Happy Students', icon: Users, color: 'text-blue-400' },
    { value: '10+', label: 'Expert Courses', icon: BookOpen, color: 'text-cyan-400' },
    { value: '4.8/5', label: 'Average Rating', icon: Star, color: 'text-amber-400' },
    { value: '100%', label: 'Placement Support', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  const highlights = [
    {
      title: "Interactive Live Classes",
      desc: "Live stream classes with real-time doubt clearing, Q&A, and live screen coding.",
      icon: Video,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Cloud Practice Lab",
      desc: "In-browser Python, NumPy, Pandas and PyTorch runner with real output feedback.",
      icon: Terminal,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Industry Tests & Quizzes",
      desc: "Timed assessments with automatic score grading and comprehensive explanations.",
      icon: BrainCircuit,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Verified Certifications",
      desc: "BrainByte Solutions accredited certificates with unique verification IDs and QR codes.",
      icon: Award,
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-20">
      
      {/* Background Neon Glows and Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 lg:pt-16">
          
          {/* Left Column: Headline, Description & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Super Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-semibold backdrop-blur-md shadow-neon-blue">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              <span>Next Cohort Starting Soon • Live Admissions Open</span>
            </div>

            {/* Main Headline matching user image */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Master Machine Learning. <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm">
                Build Real-World AI.
              </span>
            </h1>

            {/* Subtitle matching user image */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Join Brain Byte Solutions and learn from industry experts. Get hands-on with real projects, live classes and personalized support to build your future in AI & Machine Learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveView('courses')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-neon-blue hover:shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setActiveView('live')}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#0d1628]/90 hover:bg-[#13223f] text-slate-200 border border-[#1e335a] hover:border-blue-500/50 transition-all flex items-center gap-2.5 backdrop-blur-md"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/40">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Intro</span>
              </button>

              <button
                onClick={() => setActiveView('dashboard')}
                className="px-5 py-3.5 rounded-xl font-semibold text-xs text-blue-300 bg-blue-950/40 border border-blue-800/60 hover:bg-blue-900/40 transition-colors"
              >
                Demo Student Portal ↗
              </button>
            </div>

            {/* Quick trust bullet points */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% Practical AI Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Weekly Live Q&A</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Industry Verified Certificate</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic AI Brain & Cyber Platform Graphic */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              
              {/* Outer Glowing Neon Ring */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20 bg-gradient-to-b from-blue-500/10 via-transparent to-cyan-500/10 animate-pulse"></div>
              
              {/* Circuit Pedestal / Platform */}
              <div className="absolute -bottom-6 w-72 h-20 bg-gradient-to-t from-blue-600/30 to-transparent rounded-[100%] blur-md border-b-2 border-cyan-400/50"></div>
              
              {/* Central Holographic Brain Card */}
              <div className="relative z-10 w-80 p-5 rounded-2xl bg-[#091124]/90 border border-blue-500/40 shadow-neon-blue backdrop-blur-xl animate-hologram">
                
                {/* Logo Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
                  <div className="flex items-center gap-2">
                    <img src="/brainbyte-logo.jpg" alt="BrainByte" className="w-7 h-7 rounded-full border border-amber-400" />
                    <span className="text-xs font-bold text-slate-200">BrainByte AI Engine</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ONLINE
                  </span>
                </div>

                {/* Animated Brain Hologram Art */}
                <div className="py-6 flex flex-col items-center justify-center relative">
                  
                  {/* Rotating Synapse Ring */}
                  <div className="w-36 h-36 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '20s' }}></div>
                  
                  {/* Inner Glowing Core */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative p-4 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-neon-cyan">
                      <BrainCircuit className="w-16 h-16 text-white animate-pulse" />
                    </div>
                  </div>

                  {/* Floating Tags */}
                  <div className="absolute top-2 left-0 px-2 py-1 rounded bg-[#0f1b33] border border-blue-400/40 text-[10px] text-blue-300 font-mono shadow-md">
                    Learn • Practice
                  </div>
                  <div className="absolute bottom-2 right-0 px-2 py-1 rounded bg-[#0f1b33] border border-cyan-400/40 text-[10px] text-cyan-300 font-mono shadow-md">
                    Build • Grow
                  </div>
                </div>

                {/* Micro Stats in Card */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-blue-900/60">
                  <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/40">
                    <p className="text-[10px] text-slate-400">Deep Learning Model</p>
                    <p className="text-xs font-bold text-blue-300">PyTorch 2.4 GPU</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-800/40">
                    <p className="text-[10px] text-slate-400">Live Accuracy</p>
                    <p className="text-xs font-bold text-emerald-400">99.4% F1-Score</p>
                  </div>
                </div>

              </div>

              {/* Floating Orbiting Widget 1: Live Class notification */}
              <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-[#0d1628]/95 border border-blue-400/30 shadow-2xl backdrop-blur-md hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
                  <p className="text-[11px] font-bold text-white">Live Webinar Today</p>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">7:00 PM • Dr. Amit Sharma</p>
              </div>

              {/* Floating Orbiting Widget 2: Code Runner */}
              <div className="absolute -bottom-6 -left-4 p-3 rounded-xl bg-[#0d1628]/95 border border-cyan-400/30 shadow-2xl backdrop-blur-md hidden sm:block">
                <p className="text-[10px] font-mono text-cyan-300">
                  &gt; model.fit(X_train, y_train)<br />
                  <span className="text-emerald-400">✓ Epoch 100/100 completed</span>
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Stats Row matching screenshot */}
        <div className="mt-16 pt-8 border-t border-[#1a2b4c]/70">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-[#091122]/80 border border-[#1a2b4c] hover:border-blue-500/40 transition-all text-center group"
                >
                  <div className="inline-flex p-2.5 rounded-xl bg-blue-600/10 mb-2 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-2">
              Why BrainByte Solutions?
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              An All-in-One Operating System for AI Engineers
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Everything your client needs to run recorded courses, interactive live webinars, in-browser code labs, and assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0d1628]/80 border border-[#1a2b4c] hover:border-blue-500/50 hover:bg-[#121e36] transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
