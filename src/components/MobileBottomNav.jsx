import React from 'react';
import { 
  Home, 
  BookOpen, 
  PlayCircle, 
  Radio, 
  ShieldCheck, 
  Terminal, 
  Award, 
  User
} from 'lucide-react';

export default function MobileBottomNav({ 
  activeView, 
  setActiveView, 
  currentUser, 
  onOpenAuth 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'classroom', label: 'Learn', icon: PlayCircle },
    { id: 'live', label: 'Live', icon: Radio, isLive: true },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, isAdmin: true }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#080e1b]/95 backdrop-blur-xl border-t border-[#1a2b4c] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAdmin && !currentUser?.isAdmin) {
                  onOpenAuth('admin_login');
                } else {
                  setActiveView(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? item.isAdmin 
                    ? 'text-amber-400 font-bold' 
                    : 'text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? item.isAdmin ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                    : ''
                }`} />

                {item.isLive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </div>

              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>

              {isActive && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${item.isAdmin ? 'bg-amber-400' : 'bg-blue-400'}`}></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
