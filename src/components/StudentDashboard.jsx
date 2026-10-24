import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  Radio, 
  Terminal, 
  Award, 
  HelpCircle, 
  Play, 
  ArrowRight, 
  Clock, 
  Calendar, 
  ChevronRight,
  Sparkles,
  Flame,
  Zap
} from 'lucide-react';

export default function StudentDashboard({ 
  user, 
  courses, 
  liveClasses, 
  setActiveView, 
  onContinueCourse,
  onJoinLiveClass 
}) {
  const enrolledCourses = courses.filter(c => c.enrolled);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner: Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#0d1c3a] via-[#091326] to-[#070d1a] border border-blue-500/30 shadow-neon-blue relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-mono">
              STUDENT DASHBOARD
            </span>
            <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>5 Day Streak!</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good Morning, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-sm text-slate-300">
            Continue learning and achieve your goals. You're making steady progress in AI.
          </p>
        </div>

        {/* Quick Resume CTA */}
        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => onContinueCourse(courses.find(c => c.id === 'complete-ml') || enrolledCourses[0])}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center gap-2 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Resume Machine Learning</span>
          </button>
        </div>
      </div>

      {/* Stats Summary & Circular Progress Journey Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 3 Metric Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Enrolled Courses */}
          <div className="p-5 rounded-2xl bg-[#0d1628]/90 border border-[#1a2b4c] hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Enrolled Courses</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white">{enrolledCourses.length}</div>
              <p className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
                <span>Active Learning Paths</span>
              </p>
            </div>
          </div>

          {/* Card 2: Completed Lessons */}
          <div className="p-5 rounded-2xl bg-[#0d1628]/90 border border-[#1a2b4c] hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Completed Lessons</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white">
                {user.completedLessons}<span className="text-base font-normal text-slate-400">/{user.totalLessons}</span>
              </div>
              <p className="text-[11px] text-emerald-400 mt-1">
                +4 lessons this week
              </p>
            </div>
          </div>

          {/* Card 3: Overall Progress */}
          <div className="p-5 rounded-2xl bg-[#0d1628]/90 border border-[#1a2b4c] hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Overall Progress</span>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-black text-white">{user.overallProgress}%</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
                  style={{ width: `${user.overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Access Action Bar matching the design */}
          <div className="sm:col-span-3 p-4 rounded-2xl bg-[#091122]/90 border border-[#1a2b4c] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider pl-1">
              Quick Access:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveView('courses')}
                className="px-3.5 py-1.5 rounded-lg bg-[#0f1b33] hover:bg-blue-600/20 text-slate-200 hover:text-blue-300 border border-[#1e335a] hover:border-blue-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>My Courses</span>
              </button>
              <button
                onClick={() => setActiveView('live')}
                className="px-3.5 py-1.5 rounded-lg bg-[#0f1b33] hover:bg-red-500/20 text-slate-200 hover:text-red-300 border border-[#1e335a] hover:border-red-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Radio className="w-3.5 h-3.5 text-red-400" />
                <span>Live Classes</span>
              </button>
              <button
                onClick={() => setActiveView('practice_lab')}
                className="px-3.5 py-1.5 rounded-lg bg-[#0f1b33] hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-[#1e335a] hover:border-cyan-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Practice Lab</span>
              </button>
              <button
                onClick={() => setActiveView('tests')}
                className="px-3.5 py-1.5 rounded-lg bg-[#0f1b33] hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-[#1e335a] hover:border-amber-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Tests & Results</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right: Circular Progress Gauge matching screenshot */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0d1628]/90 border border-[#1a2b4c] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl pointer-events-none"></div>

          <div className="text-left w-full mb-3">
            <h3 className="text-sm font-bold text-white">Keep Going!</h3>
            <p className="text-xs text-slate-400">Small steps make big progress.</p>
          </div>

          {/* Circular SVG Gauge */}
          <div className="relative w-36 h-36 my-2 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#15233d"
                strokeWidth="10"
              />
              {/* Progress arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="url(#blueCyanGrad)"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * user.overallProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="blueCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1d68ff" />
                  <stop offset="100%" stopColor="#00d2ff" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{user.overallProgress}%</span>
              <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">Completed</span>
            </div>
          </div>

          <p className="text-xs font-semibold text-slate-300 mt-2">
            Your Learning Journey
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            12 of 48 curriculum milestones reached
          </p>
        </div>

      </div>

      {/* Main Content Split: My Enrolled Courses (Left) & Upcoming Live Classes (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: My Enrolled Courses matching screenshot */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>My Enrolled Courses</span>
            </h2>
            <button 
              onClick={() => setActiveView('courses')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Enrolled Courses Cards List */}
          <div className="space-y-3">
            {enrolledCourses.map((course) => (
              <div 
                key={course.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#0d1628]/90 border border-[#1a2b4c] hover:border-blue-500/50 hover:bg-[#121f38] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Course Details & Icon */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${course.accentColor} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    {course.icon === 'python' && <Terminal className="w-6 h-6" />}
                    {course.icon === 'chart' && <TrendingUp className="w-6 h-6" />}
                    {course.icon === 'brain' && <Sparkles className="w-6 h-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        {course.category}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {course.modulesCount} modules • {course.durationHours} hrs
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors mt-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Continue Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                  <div className="w-32 text-left sm:text-right">
                    <div className="flex justify-between sm:justify-end gap-2 text-xs font-semibold mb-1">
                      <span className="text-slate-400 sm:hidden">Progress</span>
                      <span className="text-cyan-400">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => onContinueCourse(course)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow-neon-blue transition-all flex items-center gap-1.5"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Upcoming Live Classes matching screenshot */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Upcoming Live Classes</span>
            </h2>
            <button 
              onClick={() => setActiveView('live')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              Full Schedule
            </button>
          </div>

          <div className="space-y-3">
            {liveClasses.map((item) => (
              <div 
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isLive 
                    ? 'bg-gradient-to-b from-[#141b2e] to-[#0d1628] border-red-500/40 shadow-sm' 
                    : 'bg-[#0d1628]/90 border-[#1a2b4c] hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    item.isLive 
                      ? 'bg-red-500 text-white flex items-center gap-1' 
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
                    {item.isLive ? 'LIVE NOW' : 'SCHEDULED'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.participants} registered
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white mt-2 leading-tight">
                  {item.title}
                </h3>

                <div className="space-y-1 mt-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-blue-300">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                  <p className="text-slate-400">By {item.instructor}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#1e335a] flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {item.isLive ? 'Streaming in 1080p' : 'Zoom + Live Chat'}
                  </span>
                  
                  {item.isLive ? (
                    <button
                      onClick={() => onJoinLiveClass(item)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md flex items-center gap-1 animate-pulse"
                    >
                      <Radio className="w-3 h-3" />
                      <span>Join Now</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`Reminder set for: ${item.title}`)}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-[#142242] hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-colors"
                    >
                      Remind Me
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Quick certificate preview box */}
          <div 
            onClick={() => setActiveView('certificates')}
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0d1628] to-blue-500/10 border border-amber-500/30 hover:border-amber-400/60 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    1 Certificate Earned!
                  </p>
                  <p className="text-[10px] text-slate-400">Python for Machine Learning</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
