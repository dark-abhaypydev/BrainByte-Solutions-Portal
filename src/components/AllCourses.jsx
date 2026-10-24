import React, { useState } from 'react';
import { 
  Search, 
  Terminal, 
  TrendingUp, 
  Sparkles, 
  Database, 
  Server, 
  Camera, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Users, 
  X,
  Play
} from 'lucide-react';

export default function AllCourses({ 
  courses, 
  onSelectCourse, 
  onEnrollCourse 
}) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewCourse, setPreviewCourse] = useState(null);

  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesFilter = selectedFilter === 'All' || course.category === selectedFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (course.tags && course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  const getCourseIcon = (iconName) => {
    switch (iconName) {
      case 'python': return <Terminal className="w-7 h-7" />;
      case 'chart': return <TrendingUp className="w-7 h-7" />;
      case 'brain': return <Sparkles className="w-7 h-7" />;
      case 'database': return <Database className="w-7 h-7" />;
      case 'server': return <Server className="w-7 h-7" />;
      case 'camera': return <Camera className="w-7 h-7" />;
      case 'sparkles': return <Sparkles className="w-7 h-7" />;
      default: return <BookOpen className="w-7 h-7" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          All Courses
        </h1>
        <p className="text-sm text-slate-400">
          Choose from our expertly designed courses and start your AI journey today.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search Bar matching screenshot */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d1628] border border-[#1e335a] focus:border-blue-500 focus:outline-none text-slate-100 placeholder-slate-500 text-xs sm:text-sm transition-colors shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills matching screenshot: All, Beginner, Intermediate, Advanced */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#091122] border border-[#1a2b4c] self-start sm:self-auto overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white shadow-neon-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>

      {/* Courses Cards Grid - Exactly matching the screenshot cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] hover:border-blue-500/50 hover:shadow-neon-blue transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Row: Icon + Level Badge */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${course.accentColor} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                  {getCourseIcon(course.icon)}
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold tracking-wider uppercase border ${
                  course.category === 'Beginner'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : course.category === 'Intermediate'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {course.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                {course.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mt-2 min-h-[38px] line-clamp-2">
                {course.description}
              </p>

              {/* Tags */}
              {course.tags && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#13223f] text-slate-300 border border-slate-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Middle: Stats row */}
            <div className="mt-5 pt-4 border-t border-[#1a2b4c]/70 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>{course.modulesCount} modules</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{course.durationHours} hours</span>
              </div>
              <div className="font-bold text-white text-sm">
                ₹{course.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Bottom Actions: View Details -> Button */}
            <div className="mt-4 pt-3 flex items-center justify-between gap-3">
              <button
                onClick={() => setPreviewCourse(course)}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors group/link"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </button>

              {course.enrolled ? (
                <button
                  onClick={() => onSelectCourse(course)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition-all flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Resume</span>
                </button>
              ) : (
                <button
                  onClick={() => onEnrollCourse(course)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-sm transition-all"
                >
                  Enroll Now
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {previewCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0c1527] border border-[#1e335a] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setPreviewCourse(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${previewCourse.accentColor} flex items-center justify-center text-white shadow-md`}>
                {getCourseIcon(previewCourse.icon)}
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {previewCourse.category} Level
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{previewCourse.title}</h2>
              </div>
            </div>

            <p className="text-sm text-slate-300 mt-4 leading-relaxed">
              {previewCourse.description}
            </p>

            <div className="grid grid-cols-3 gap-3 my-5 p-3 rounded-xl bg-[#070c17] border border-[#1a2b4c] text-center">
              <div>
                <p className="text-[10px] text-slate-400">Total Duration</p>
                <p className="text-sm font-bold text-cyan-400">{previewCourse.durationHours} Hours</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Curriculum</p>
                <p className="text-sm font-bold text-blue-400">{previewCourse.modulesCount} Modules</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Price</p>
                <p className="text-sm font-bold text-emerald-400">₹{previewCourse.price.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Course Highlights & Syllabus
            </h4>
            <div className="space-y-2 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hands-on Google Colab & VS Code notebooks included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Lifetime access to recordings, slides, and cheat sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Certificate with verification ID upon passing quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Weekly live doubt resolution classes with Dr. Amit Sharma</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e335a]">
              <button
                onClick={() => setPreviewCourse(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setPreviewCourse(null);
                  if (previewCourse.enrolled) {
                    onSelectCourse(previewCourse);
                  } else {
                    onEnrollCourse(previewCourse);
                  }
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center gap-2"
              >
                <span>{previewCourse.enrolled ? "Go to Classroom" : "Enroll & Start Learning"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
