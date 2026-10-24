import React from 'react';
import { 
  Home, 
  BookOpen, 
  Radio, 
  Terminal, 
  Award, 
  HelpCircle, 
  Users, 
  Settings, 
  GraduationCap, 
  CheckCircle,
  Sparkles,
  CreditCard,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, user, userRole, setUserRole }) {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: Home, badge: null },
    { id: 'courses', label: 'My Courses', icon: BookOpen, badge: '3' },
    { id: 'classroom', label: 'Classroom', icon: Sparkles, badge: 'Resume' },
    { id: 'live', label: 'Live Classes', icon: Radio, badge: 'LIVE', badgeColor: 'bg-red-500' },
    { id: 'practice_lab', label: 'Practice Lab', icon: Terminal, badge: 'Python' },
    { id: 'tests', label: 'Tests & Results', icon: HelpCircle, badge: '4/5' },
    { id: 'certificates', label: 'Certificates', icon: Award, badge: '1' },
    { id: 'community', label: 'Community', icon: Users, badge: null },
    { id: 'pricing', label: 'Subscription', icon: CreditCard, badge: 'Pro' }
  ];

  return (
    <aside className="w-64 bg-[#080e1b] border-r border-[#1a2b4c]/80 flex flex-col justify-between shrink-0 h-[calc(100vh-61px)] sticky top-[61px] select-none">
      
      {/* Upper Navigation Links */}
      <div className="p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Student Portal
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-neon-blue'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#0f1b33]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-400'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  item.badgeColor 
                    ? `${item.badgeColor} text-white animate-pulse` 
                    : isActive 
                      ? 'bg-blue-500/30 text-blue-300' 
                      : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Instructor portal link */}
        <div className="pt-4 border-t border-[#1a2b4c]/50">
          <button
            onClick={() => {
              setUserRole('instructor');
              setActiveView('instructor');
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-amber-400/90 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Instructor Suite</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Profile & Settings Section */}
      <div className="p-4 border-t border-[#1a2b4c]/80 bg-[#060b14]/50">
        <button 
          onClick={() => alert("Settings: Customize notifications, code editor theme and learning goals.")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors mb-2"
        >
          <Settings className="w-4 h-4" />
          <span>Portal Settings</span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0d1628] border border-[#1e335a]">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-9 h-9 rounded-full object-cover border border-blue-400"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0d1628] rounded-full"></span>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
              <span>{user.role}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">Online</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
