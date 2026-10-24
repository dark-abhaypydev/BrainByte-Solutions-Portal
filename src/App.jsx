import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LandingHero from './components/LandingHero';
import StudentDashboard from './components/StudentDashboard';
import AllCourses from './components/AllCourses';
import Classroom from './components/Classroom';
import LiveClassesHub from './components/LiveClassesHub';
import LiveWebinarRoom from './components/LiveWebinarRoom';
import PracticeLab from './components/PracticeLab';
import TestsAndResults from './components/TestsAndResults';
import CertificatesView from './components/CertificatesView';
import PricingPlans from './components/PricingPlans';
import AdminSuite from './components/AdminSuite';
import CommunityForum from './components/CommunityForum';
import QuickSearchModal from './components/QuickSearchModal';
import AuthModal from './components/AuthModal';
import MobileBottomNav from './components/MobileBottomNav';

import { 
  INITIAL_USER, 
  INSTRUCTOR_DATA, 
  COURSES_DATA, 
  LIVE_CLASSES, 
  PAST_RECORDINGS 
} from './data/portalData';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  
  // Current Logged in User (Student or Admin or null)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('brainbyte_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Fresh Mode vs Demo Mode toggle
  const [isFreshMode, setIsFreshMode] = useState(() => {
    const saved = localStorage.getItem('brainbyte_fresh_mode');
    return saved === 'true';
  });

  // Courses state
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('brainbyte_courses');
    if (saved) return JSON.parse(saved);
    return isFreshMode ? [] : COURSES_DATA;
  });

  // Live classes state
  const [liveClasses, setLiveClasses] = useState(() => {
    const saved = localStorage.getItem('brainbyte_live_classes');
    if (saved) return JSON.parse(saved);
    return isFreshMode ? [] : LIVE_CLASSES;
  });

  const [pastRecordings] = useState(PAST_RECORDINGS);
  const [activeLiveSession, setActiveLiveSession] = useState(null);
  
  // Admin password & Razorpay Key
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('brainbyte_admin_password') || 'admin123';
  });

  const [razorpayKey, setRazorpayKey] = useState(() => {
    return localStorage.getItem('brainbyte_razorpay_key') || '';
  });

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, defaultTab: 'student_login' });

  // Sync to LocalStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('brainbyte_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('brainbyte_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('brainbyte_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('brainbyte_live_classes', JSON.stringify(liveClasses));
  }, [liveClasses]);

  useEffect(() => {
    localStorage.setItem('brainbyte_fresh_mode', isFreshMode.toString());
  }, [isFreshMode]);

  // Reset to Demo Data
  const handleResetToDemoData = () => {
    setCourses(COURSES_DATA);
    setLiveClasses(LIVE_CLASSES);
    setIsFreshMode(false);
    setCurrentUser(INITIAL_USER);
    alert("Loaded Demo Preview Data! You can switch back to Fresh Mode anytime from the Admin Suite.");
  };

  // Handle course enrollment
  const handleEnrollCourse = (course) => {
    const updatedCourses = courses.map(c => 
      c.id === course.id ? { ...c, enrolled: true, progress: 5 } : c
    );
    setCourses(updatedCourses);

    if (currentUser) {
      setCurrentUser(prev => ({
        ...prev,
        enrolledCourseCount: (prev.enrolledCourseCount || 0) + 1,
        enrolledCourseIds: [...(prev.enrolledCourseIds || []), course.id]
      }));
    }
    setActiveView('classroom');
  };

  // Handle plan purchase
  const handlePlanPurchased = (plan) => {
    const updated = courses.map(c => ({ ...c, enrolled: true }));
    setCourses(updated);
    if (currentUser) {
      setCurrentUser(prev => ({
        ...prev,
        enrolledCourseCount: courses.length
      }));
    }
    setActiveView('courses');
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenAuth={(tab = 'student_login') => setAuthModalState({ isOpen: true, defaultTab: tab })}
        onOpenSearch={() => setIsSearchOpen(true)}
        isFreshMode={isFreshMode}
      />

      {/* Fresh Mode Notice Pill (if active) */}
      {isFreshMode && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/30 px-4 py-1.5 text-center text-xs text-emerald-300 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span><strong>Fresh Mode Active:</strong> Clean slate (0 fake records). Go to <strong>Admin Control</strong> to add your real videos & courses.</span>
        </div>
      )}

      {/* Main Body Layout */}
      {activeView === 'landing' ? (
        // Full width landing page
        <main className="flex-1 bg-grid-cyber">
          <LandingHero 
            setActiveView={setActiveView} 
            onOpenVideoModal={() => setActiveView('classroom')}
          />
        </main>
      ) : (
        // Portal Layout with Sidebar + Main Content Area
        <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
          
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <Sidebar
              activeView={activeView}
              setActiveView={setActiveView}
              user={currentUser || { name: "Guest User", role: "Visitor", avatar: "/brainbyte-logo.jpg" }}
              userRole={currentUser?.isAdmin ? 'instructor' : 'student'}
              setUserRole={(role) => {
                if (role === 'instructor') setActiveView('admin');
                else setActiveView('dashboard');
              }}
            />
          </div>

          {/* Main Dynamic View Content */}
          <main className="flex-1 px-3 sm:px-6 lg:px-8 py-5 pb-24 md:pb-8 overflow-y-auto max-w-full">
            
            {activeView === 'dashboard' && (
              <StudentDashboard
                user={currentUser || INITIAL_USER}
                courses={courses}
                liveClasses={liveClasses}
                setActiveView={setActiveView}
                onContinueCourse={() => setActiveView('classroom')}
                onJoinLiveClass={(session) => setActiveLiveSession(session)}
              />
            )}

            {activeView === 'courses' && (
              <AllCourses
                courses={courses}
                onSelectCourse={() => setActiveView('classroom')}
                onEnrollCourse={handleEnrollCourse}
              />
            )}

            {activeView === 'classroom' && (
              <Classroom
                course={courses.find(c => c.enrolled) || courses[0] || { title: "Machine Learning Foundations" }}
                onNextModule={() => alert("Advancing to next curriculum section...")}
              />
            )}

            {activeView === 'live' && (
              <LiveClassesHub
                liveClasses={liveClasses}
                pastRecordings={pastRecordings}
              />
            )}

            {activeView === 'practice_lab' && (
              <PracticeLab />
            )}

            {activeView === 'tests' && (
              <TestsAndResults
                user={currentUser || INITIAL_USER}
                onTestCompleted={() => {}}
              />
            )}

            {activeView === 'certificates' && (
              <CertificatesView user={currentUser || INITIAL_USER} />
            )}

            {activeView === 'pricing' && (
              <PricingPlans 
                onPlanPurchased={handlePlanPurchased} 
                razorpayKey={razorpayKey}
              />
            )}

            {activeView === 'admin' && (
              <AdminSuite
                courses={courses}
                setCourses={setCourses}
                liveClasses={liveClasses}
                setLiveClasses={setLiveClasses}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
                razorpayKey={razorpayKey}
                setRazorpayKey={setRazorpayKey}
                isFreshMode={isFreshMode}
                setIsFreshMode={setIsFreshMode}
                onResetToDemoData={handleResetToDemoData}
              />
            )}

            {activeView === 'community' && (
              <CommunityForum user={currentUser || INITIAL_USER} />
            )}

          </main>

        </div>
      )}

      {/* Auth Modal (Login / Sign Up / Admin Login) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        defaultTab={authModalState.defaultTab}
        adminPassword={adminPassword}
        onClose={() => setAuthModalState({ isOpen: false, defaultTab: 'student_login' })}
        onLoginSuccess={(userData, role) => {
          setCurrentUser(userData);
          if (role === 'admin') setActiveView('admin');
          else setActiveView('dashboard');
        }}
      />

      {/* Global Live Stream Modal */}
      {activeLiveSession && (
        <LiveWebinarRoom
          session={activeLiveSession}
          onClose={() => setActiveLiveSession(null)}
        />
      )}

      {/* Command Palette Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        courses={courses}
        liveClasses={liveClasses}
        onNavigate={(view) => setActiveView(view)}
      />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={currentUser}
        onOpenAuth={(tab) => setAuthModalState({ isOpen: true, defaultTab: tab })}
      />

      {/* Footer */}
      <footer className="bg-[#04070f] border-t border-[#1a2b4c]/60 py-6 px-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/brainbyte-logo.jpg" alt="BrainByte Logo" className="w-7 h-7 rounded-full border border-amber-400 object-cover" />
            <span className="font-bold text-slate-200">BrainByte Solutions</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300/80">Transforming Ideas Into Digital Success</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Admin Default Password: <code>admin123</code></span>
            <span>•</span>
            <button 
              onClick={() => setActiveView('admin')} 
              className="text-amber-400 hover:underline font-bold"
            >
              Open Admin Suite ↗
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
