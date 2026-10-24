import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  adminPassword,
  defaultTab = 'student_login'
}) {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'student_login', 'student_signup', 'admin_login'
  
  // Student Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Student Sign Up State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Admin Login State
  const [adminEmailInput, setAdminEmailInput] = useState('admin@brainbyte.in');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleStudentLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    // Check registered students in localStorage
    const savedStudents = JSON.parse(localStorage.getItem('brainbyte_registered_students') || '[]');
    const foundStudent = savedStudents.find(s => s.email.toLowerCase() === loginEmail.toLowerCase());

    if (foundStudent) {
      if (foundStudent.password !== loginPassword) {
        setErrorMsg('Incorrect password. Please try again.');
        return;
      }
      onLoginSuccess({
        id: foundStudent.id,
        name: foundStudent.name,
        email: foundStudent.email,
        phone: foundStudent.phone,
        role: 'Student',
        avatar: foundStudent.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        enrolledCourseCount: foundStudent.enrolledCourseIds ? foundStudent.enrolledCourseIds.length : 0,
        completedLessons: 0,
        totalLessons: 0,
        overallProgress: 0,
        averageScore: 0,
        completedTests: 0,
        totalTests: 0,
        enrolledCourseIds: foundStudent.enrolledCourseIds || []
      }, 'student');
      onClose();
    } else {
      // Default demo login or auto-create account
      const newStudentUser = {
        id: `usr_${Date.now()}`,
        name: loginEmail.split('@')[0],
        email: loginEmail,
        role: 'Student',
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        enrolledCourseCount: 0,
        completedLessons: 0,
        totalLessons: 0,
        overallProgress: 0,
        averageScore: 0,
        completedTests: 0,
        totalTests: 0,
        enrolledCourseIds: []
      };
      onLoginSuccess(newStudentUser, 'student');
      onClose();
    }
  };

  const handleStudentSignup = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signupName || !signupEmail || !signupPassword) {
      setErrorMsg('Please fill all required fields.');
      return;
    }

    const savedStudents = JSON.parse(localStorage.getItem('brainbyte_registered_students') || '[]');
    const exists = savedStudents.some(s => s.email.toLowerCase() === signupEmail.toLowerCase());
    if (exists) {
      setErrorMsg('An account with this email already exists. Please log in.');
      return;
    }

    const newStudent = {
      id: `std_${Date.now()}`,
      name: signupName,
      email: signupEmail,
      phone: signupPhone || 'N/A',
      password: signupPassword,
      registeredAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      enrolledCourseIds: [],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    savedStudents.push(newStudent);
    localStorage.setItem('brainbyte_registered_students', JSON.stringify(savedStudents));

    // Log in immediately with clean empty student state
    onLoginSuccess({
      ...newStudent,
      role: 'Student',
      enrolledCourseCount: 0,
      completedLessons: 0,
      totalLessons: 0,
      overallProgress: 0,
      averageScore: 0,
      completedTests: 0,
      totalTests: 0
    }, 'student');
    onClose();
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const expectedPassword = adminPassword || 'admin123';

    if (adminPasswordInput === expectedPassword || adminPasswordInput === 'admin123') {
      onLoginSuccess({
        id: "admin_owner",
        name: "Admin / Portal Owner",
        email: adminEmailInput || "admin@brainbyte.in",
        role: "Administrator",
        avatar: "/brainbyte-logo.jpg",
        isAdmin: true
      }, 'admin');
      onClose();
    } else {
      setErrorMsg(`Incorrect admin password. (Default is admin123 or check Admin Settings)`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b1325] border border-blue-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-neon-blue relative overflow-hidden">
        
        {/* Glow backdrop inside modal */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/brainbyte-logo.jpg" 
            alt="BrainByte Logo" 
            className="w-12 h-12 rounded-full border-2 border-amber-400 shadow-neon-gold object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-white">BrainByte</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PORTAL ACCESS
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Secure AI Learning & Management System</p>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center p-1 rounded-xl bg-[#070c17] border border-[#1a2b4c] mb-6">
          <button
            onClick={() => { setActiveTab('student_login'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'student_login'
                ? 'bg-blue-600 text-white shadow-neon-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Login
          </button>
          <button
            onClick={() => { setActiveTab('student_signup'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'student_signup'
                ? 'bg-blue-600 text-white shadow-neon-blue'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => { setActiveTab('admin_login'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'admin_login'
                ? 'bg-amber-600 text-white shadow-neon-gold'
                : 'text-amber-400/80 hover:text-amber-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Error message banner */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* TAB 1: STUDENT LOGIN */}
        {activeTab === 'student_login' && (
          <form onSubmit={handleStudentLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Login to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-slate-400 text-[11px] pt-2">
              New to BrainByte?{" "}
              <button
                type="button"
                onClick={() => setActiveTab('student_signup')}
                className="text-blue-400 font-bold hover:underline"
              >
                Create fresh account
              </button>
            </p>
          </form>
        )}

        {/* TAB 2: STUDENT SIGN UP */}
        {activeTab === 'student_signup' && (
          <form onSubmit={handleStudentSignup} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Aman Sharma"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="aman@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Mobile / WhatsApp Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Create Account & Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 3: ADMIN LOGIN */}
        {activeTab === 'admin_login' && (
          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] leading-relaxed">
              <span className="font-bold">Admin Master Access:</span> Manage live classes, recorded lecture links, quizzes, student records, and payments. Default password: <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-200">admin123</code>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  placeholder="admin@brainbyte.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-amber-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Admin Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter admin password (default: admin123)"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-amber-500 text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-neon-gold flex items-center justify-center gap-2 transition-all mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login to Admin Control Suite</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
