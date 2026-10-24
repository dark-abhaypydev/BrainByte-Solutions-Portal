import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Radio, 
  Sparkles, 
  BookOpen, 
  Code, 
  Award, 
  Users, 
  GraduationCap, 
  ChevronDown, 
  LogOut, 
  Settings, 
  CheckCircle2, 
  ShieldCheck, 
  LogIn, 
  KeyRound,
  Menu,
  X,
  HelpCircle,
  Terminal,
  CreditCard,
  Flame
} from 'lucide-react';

export default function Header({ 
  activeView, 
  setActiveView, 
  currentUser, 
  setCurrentUser,
  onOpenAuth,
  onOpenSearch,
  isFreshMode
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'courses', label: 'Courses' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'live', label: 'Live Classes', isLive: true },
    { id: 'practice_lab', label: 'Practice Lab' },
    { id: 'tests', label: 'Tests' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'community', label: 'Community' },
    { id: 'pricing', label: 'Pricing' }
  ];

  const handleMobileNav = (id) => {
    setActiveView(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#050811]/95 backdrop-blur-md border-b border-[#1a2b4c]/80 px-3 sm:px-6 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Brand Logo & Title */}
        <div 
          onClick={() => setActiveView('landing')} 
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none shrink-0"
        >
          <div className="relative">
            <img 
              src="/brainbyte-logo.jpg" 
              alt="BrainByte Solutions" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-amber-400 shadow-neon-gold group-hover:scale-105 transition-transform duration-300 object-cover bg-black"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 border-2 border-[#050811] rounded-full animate-ping opacity-75"></span>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 border-2 border-[#050811] rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                BrainByte
              </span>
              <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOLUTIONS
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-amber-200/70 font-medium tracking-wider uppercase hidden sm:block">
              Transforming Ideas Into Digital Success
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Links (Hidden on < lg) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-semibold">
          {navLinks.slice(0, 7).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                activeView === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-neon-blue'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={() => setActiveView('pricing')}
            className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'pricing'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-neon-blue'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Pricing
          </button>

          {/* Admin Suite Nav Link */}
          <button
            onClick={() => {
              if (currentUser?.isAdmin) {
                setActiveView('admin');
              } else {
                onOpenAuth('admin_login');
              }
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeView === 'admin'
                ? 'bg-amber-600 text-white shadow-neon-gold'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Control</span>
          </button>
        </nav>

        {/* Right Controls: Search, Auth / Profile, Mobile Hamburger */}
        <div className="flex items-center gap-2">
          
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0e182e] border border-[#1e335a] hover:border-blue-500/50 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            title="Search courses & tests"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden xl:inline-block px-1.5 py-0.2 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono">Ctrl K</kbd>
          </button>

          {/* If user is logged in */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-[#0d1628] border border-[#1e335a] hover:border-blue-500/50 transition-colors"
              >
                <img 
                  src={currentUser.avatar || "/brainbyte-logo.jpg"} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-full object-cover border border-amber-400"
                />
                <div className="text-left hidden sm:block max-w-[80px] xl:max-w-[110px]">
                  <p className="text-xs font-bold text-white truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-cyan-400 font-mono leading-tight truncate">
                    {currentUser.role || 'Student'}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0c1424] border border-[#1e335a] rounded-2xl shadow-2xl z-50 p-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-[#1e335a] mb-1">
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => { setActiveView('dashboard'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    Student Dashboard
                  </button>

                  <button
                    onClick={() => { setActiveView('certificates'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    My Certificates
                  </button>

                  <button
                    onClick={() => { setActiveView('admin'); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-amber-300 hover:bg-amber-500/10 flex items-center gap-2 font-bold"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    Admin Control Suite
                  </button>

                  <div className="border-t border-[#1e335a] my-1"></div>

                  <button
                    onClick={() => {
                      setCurrentUser(null);
                      setShowProfileMenu(false);
                      setActiveView('landing');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If logged out: Show Login & Sign Up buttons
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth('student_login')}
                className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('student_signup')}
                className="px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 text-white shadow-neon-blue transition-all"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle (Visible on < lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0e182e] border border-[#1e335a] text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Slide-down Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#1a2b4c] space-y-2 animate-in slide-in-from-top-3 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMobileNav(item.id)}
                className={`p-2.5 rounded-xl text-left flex items-center justify-between border transition-all ${
                  activeView === item.id
                    ? 'bg-blue-600/30 text-white border-blue-400 shadow-neon-blue'
                    : 'bg-[#0d1628] text-slate-300 border-[#1a2b4c] hover:bg-[#13223f]'
                }`}
              >
                <span>{item.label}</span>
                {item.isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
              </button>
            ))}
          </div>

          {/* Mobile Admin Suite Button */}
          <button
            onClick={() => {
              if (currentUser?.isAdmin) {
                handleMobileNav('admin');
              } else {
                setMobileMenuOpen(false);
                onOpenAuth('admin_login');
              }
            }}
            className="w-full p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Master Suite (Protected)</span>
            </div>
            <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded">Owner Only</span>
          </button>
        </div>
      )}

    </header>
  );
}
