import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Radio, Terminal, HelpCircle, ArrowRight } from 'lucide-react';

export default function QuickSearchModal({ 
  isOpen, 
  onClose, 
  courses, 
  liveClasses, 
  onNavigate 
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open
        }
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLive = liveClasses.filter(l =>
    l.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0c1527] border border-[#1e335a] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1e335a] flex items-center gap-3 bg-[#080e1b]">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, live classes, practice labs, tests..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-500"
          />
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-2 text-xs">
          {query.trim() === '' && (
            <div className="px-3 py-2 text-slate-400 text-[11px] uppercase font-mono">
              Quick Suggestions
            </div>
          )}

          {/* Quick Actions */}
          <div 
            onClick={() => { onNavigate('practice_lab'); onClose(); }}
            className="p-2.5 rounded-xl bg-[#080d19] hover:bg-[#13223f] border border-transparent hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-200">Open Interactive Python Practice Lab</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </div>

          <div 
            onClick={() => { onNavigate('classroom'); onClose(); }}
            className="p-2.5 rounded-xl bg-[#080d19] hover:bg-[#13223f] border border-transparent hover:border-blue-500/40 cursor-pointer flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-200">Continue Machine Learning (Module 4)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Courses Search Results */}
          {filteredCourses.slice(0, 4).map(c => (
            <div
              key={c.id}
              onClick={() => { onNavigate('courses'); onClose(); }}
              className="p-2.5 rounded-xl bg-[#080d19] hover:bg-[#13223f] border border-transparent hover:border-blue-500/40 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white">{c.title}</p>
                  <p className="text-[10px] text-slate-400">{c.category} • {c.durationHours} hrs</p>
                </div>
              </div>
              <span className="font-mono text-cyan-300 font-bold">₹{c.price}</span>
            </div>
          ))}

          {/* Live Classes Results */}
          {filteredLive.map(l => (
            <div
              key={l.id}
              onClick={() => { onNavigate('live'); onClose(); }}
              className="p-2.5 rounded-xl bg-[#080d19] hover:bg-[#13223f] border border-transparent hover:border-red-500/40 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                  <Radio className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white">{l.title}</p>
                  <p className="text-[10px] text-slate-400">{l.time}</p>
                </div>
              </div>
              <span className="text-[10px] text-red-400 font-bold uppercase">{l.status}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-[#080e1b] border-t border-[#1e335a] text-[10px] text-slate-500 flex justify-between font-mono">
          <span>Navigation: Enter to select</span>
          <span>Esc to close</span>
        </div>

      </div>
    </div>
  );
}
