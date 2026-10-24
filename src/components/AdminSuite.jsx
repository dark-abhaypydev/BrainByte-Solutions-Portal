import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Trash2, 
  Plus, 
  RotateCcw, 
  KeyRound, 
  CreditCard, 
  Video, 
  Radio, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react';

export default function AdminSuite({ 
  courses, 
  setCourses, 
  liveClasses, 
  setLiveClasses, 
  adminPassword, 
  setAdminPassword,
  razorpayKey,
  setRazorpayKey,
  isFreshMode,
  setIsFreshMode,
  onResetToDemoData
}) {
  const [activeSection, setActiveSection] = useState('courses'); // 'courses', 'live', 'tests', 'students', 'payment', 'settings'
  
  // New Course Modal State
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'Intermediate',
    description: '',
    price: 3499,
    durationHours: 25,
    modulesCount: 4,
    videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk', // sample 3blue1brown neural network lecture
    tags: 'AI, Machine Learning, Python'
  });

  // New Live Class Modal State
  const [showAddLive, setShowAddLive] = useState(false);
  const [liveForm, setLiveForm] = useState({
    title: '',
    time: 'Tomorrow, 7:00 PM - 8:30 PM',
    instructor: 'Your Name (Admin)',
    agenda: 'Hands-on live doubt clearing and practical coding.',
    platform: 'Zoom', // 'Zoom', 'Google Meet', 'YouTube Live'
    meetingUrl: 'https://zoom.us/j/123456789'
  });

  // Registered students list from localStorage
  const registeredStudents = JSON.parse(localStorage.getItem('brainbyte_registered_students') || '[]');

  // Admin password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');

  // Handle Wipe Fake Data
  const handleWipeData = () => {
    if (window.confirm("Bhai, kya aap poora demo/fake data hatakar portal ko 100% FRESH (0 records) karna chahte hain?")) {
      setCourses([]);
      setLiveClasses([]);
      setIsFreshMode(true);
      alert("Portal is now 100% FRESH! Dummy courses and classes removed. You can now add your real courses below!");
    }
  };

  // Handle Add Real Course
  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    const newCourseObj = {
      id: `course_${Date.now()}`,
      title: courseForm.title,
      category: courseForm.category,
      description: courseForm.description || "Practical hands-on curriculum with real industry projects.",
      price: Number(courseForm.price),
      originalPrice: Number(courseForm.price) * 2,
      durationHours: Number(courseForm.durationHours),
      modulesCount: Number(courseForm.modulesCount),
      enrolled: false,
      progress: 0,
      rating: 5.0,
      studentsCount: 0,
      accentColor: "from-blue-600 to-cyan-500",
      icon: "brain",
      videoUrl: courseForm.videoUrl,
      tags: courseForm.tags.split(',').map(t => t.trim()),
      modules: [
        {
          id: `m_${Date.now()}`,
          title: "Module 1: Foundations & Architecture",
          duration: "3 hours",
          lessons: [
            {
              id: `l_${Date.now()}_1`,
              title: "1.1 Introduction & Setup",
              duration: "20m",
              completed: false,
              videoUrl: courseForm.videoUrl
            },
            {
              id: `l_${Date.now()}_2`,
              title: "1.2 Core Concepts & Implementation",
              duration: "45m",
              completed: false,
              videoUrl: courseForm.videoUrl
            }
          ]
        }
      ]
    };

    setCourses([newCourseObj, ...courses]);
    setShowAddCourse(false);
    setCourseForm({
      title: '',
      category: 'Intermediate',
      description: '',
      price: 3499,
      durationHours: 25,
      modulesCount: 4,
      videoUrl: '',
      tags: 'AI, Machine Learning, Python'
    });
    alert(`Course "${newCourseObj.title}" published successfully!`);
  };

  // Handle Add Live Class
  const handleSaveLiveClass = (e) => {
    e.preventDefault();
    if (!liveForm.title.trim()) return;

    const newLiveObj = {
      id: `live_${Date.now()}`,
      title: liveForm.title,
      time: liveForm.time,
      instructor: liveForm.instructor,
      agenda: liveForm.agenda,
      status: "upcoming",
      badge: "Join Now",
      participants: 0,
      isLive: false,
      platform: liveForm.platform,
      meetingUrl: liveForm.meetingUrl
    };

    setLiveClasses([newLiveObj, ...liveClasses]);
    setShowAddLive(false);
    alert(`Live Session "${newLiveObj.title}" scheduled successfully!`);
  };

  // Handle Update Admin Password
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setPasswordNotice('Password must be at least 4 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice('Passwords do not match.');
      return;
    }

    setAdminPassword(newPassword);
    localStorage.setItem('brainbyte_admin_password', newPassword);
    setPasswordNotice('Admin password updated successfully! Keep it safe.');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Handle Delete a Course
  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== courseId));
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      
      {/* Top Banner: Master Control */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#0d1628] to-[#080d19] border border-amber-500/40 shadow-neon-gold flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              ADMIN MASTER SUITE
            </span>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
              isFreshMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}>
              {isFreshMode ? "Mode: 100% Fresh (Real)" : "Mode: Demo Preview"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Portal Control & Management
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Yahan se aap courses add/edit/delete kar sakte hain, video links daal sakte hain, live classes schedule kar sakte hain, aur payment gateway setup kar sakte hain.
          </p>
        </div>

        {/* Quick Fresh / Demo Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {!isFreshMode ? (
            <button
              onClick={handleWipeData}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hatao Demo Data (Start Fresh)</span>
            </button>
          ) : (
            <button
              onClick={onResetToDemoData}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Demo Preview Data</span>
            </button>
          )}

          <button
            onClick={() => setShowAddCourse(true)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Real Course</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#091122] border border-[#1a2b4c] overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSection('courses')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeSection === 'courses' ? 'bg-blue-600 text-white shadow-neon-blue' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Courses ({courses.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('live')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeSection === 'live' ? 'bg-blue-600 text-white shadow-neon-blue' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Live Classes ({liveClasses.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('students')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeSection === 'students' ? 'bg-blue-600 text-white shadow-neon-blue' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Registered Students ({registeredStudents.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('payment')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeSection === 'payment' ? 'bg-blue-600 text-white shadow-neon-blue' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payment Gateway (Razorpay)</span>
        </button>

        <button
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeSection === 'settings' ? 'bg-amber-600 text-white shadow-neon-gold' : 'text-amber-400/80 hover:text-amber-300'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Change Admin Password</span>
        </button>
      </div>

      {/* SECTION 1: COURSES MANAGEMENT */}
      {activeSection === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Course Library</h3>
            <button
              onClick={() => setShowAddCourse(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="p-12 rounded-2xl bg-[#0d1628]/80 border border-[#1a2b4c] text-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
              <h4 className="text-lg font-bold text-white">Abhi koi course published nahi hai (Clean Slate)</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Aapka portal 100% fresh hai! Upar diye gaye <strong>"+ Add Real Course"</strong> button par click karke apna pehla AI/ML course add karein with video link.
              </p>
              <button
                onClick={() => setShowAddCourse(true)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              >
                + Add First Course
              </button>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d19] text-slate-400 font-mono border-b border-[#1a2b4c] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Course</th>
                    <th className="px-5 py-3.5">Level</th>
                    <th className="px-5 py-3.5">Duration</th>
                    <th className="px-5 py-3.5">Price</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2b4c]/60 text-slate-200">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-[#121f38] transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-white">{course.title}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{course.description}</p>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-cyan-300">{course.category}</td>
                      <td className="px-5 py-3.5 font-mono">{course.durationHours} hrs ({course.modulesCount} modules)</td>
                      <td className="px-5 py-3.5 font-mono font-bold text-emerald-400">₹{course.price}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                          title="Delete Course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: LIVE CLASSES MANAGEMENT */}
      {activeSection === 'live' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Live Classes Schedule</h3>
            <button
              onClick={() => setShowAddLive(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Live Class</span>
            </button>
          </div>

          {liveClasses.length === 0 ? (
            <div className="p-12 rounded-2xl bg-[#0d1628]/80 border border-[#1a2b4c] text-center space-y-3">
              <Radio className="w-12 h-12 text-slate-500 mx-auto" />
              <h4 className="text-lg font-bold text-white">Koi Live Class scheduled nahi hai</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Schedule your first live webinar with Zoom, Google Meet ya YouTube Live embed!
              </p>
              <button
                onClick={() => setShowAddLive(true)}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                + Schedule Live Class
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {liveClasses.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-[#0d1628] border border-[#1a2b4c] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-cyan-300 font-mono mt-0.5">{item.time} • Instructor: {item.instructor}</p>
                    {item.meetingUrl && (
                      <p className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
                        <span>Platform Link:</span>
                        <a href={item.meetingUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-md">
                          {item.meetingUrl}
                        </a>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setLiveClasses(liveClasses.filter(l => l.id !== item.id))}
                    className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: REGISTERED STUDENTS */}
      {activeSection === 'students' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Real Registered Students</h3>
          
          {registeredStudents.length === 0 ? (
            <div className="p-12 rounded-2xl bg-[#0d1628]/80 border border-[#1a2b4c] text-center space-y-2">
              <Users className="w-12 h-12 text-slate-500 mx-auto" />
              <h4 className="text-base font-bold text-white">Abhi tak kisi naye student ne register nahi kiya hai</h4>
              <p className="text-xs text-slate-400">
                Jab koi student front-end par "Sign Up" karega, uska naam, email, phone number aur registered date yahan automatically dikhegi!
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#080d19] text-slate-400 font-mono border-b border-[#1a2b4c] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Student Name</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Phone / WhatsApp</th>
                    <th className="px-5 py-3.5">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a2b4c]/60 text-slate-200">
                  {registeredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-[#121f38] transition-colors">
                      <td className="px-5 py-3.5 font-bold text-white">{std.name}</td>
                      <td className="px-5 py-3.5 font-mono text-cyan-300">{std.email}</td>
                      <td className="px-5 py-3.5 font-mono">{std.phone}</td>
                      <td className="px-5 py-3.5 text-slate-400">{std.registeredAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: PAYMENT GATEWAY (RAZORPAY SETUP) */}
      {activeSection === 'payment' && (
        <div className="p-6 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Payment Gateway Configuration (Razorpay India)</h3>
              <p className="text-xs text-slate-400">Enable real UPI, GPay, PhonePe, QR Code, Debit/Credit Card payments for courses.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#070b16] border border-[#1e335a] space-y-3 text-xs leading-relaxed text-slate-300">
            <p className="font-bold text-cyan-300">💡 Real Payment Setup Kaise Karein (Step-by-Step):</p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
              <li>Pehle <a href="https://razorpay.com" target="_blank" rel="noreferrer" className="text-blue-400 underline font-bold">razorpay.com</a> par jaakar apna free account banayein.</li>
              <li>Settings &gt; <strong>API Keys</strong> me jayein aur <strong>Key ID</strong> copy karein (Test mode me shuru hota hai: <code>rzp_test_...</code>).</li>
              <li>Neeche box me apni Razorpay Key ID paste karke <strong>"Save Key"</strong> click karein.</li>
              <li>Jaise hi aap Key save karenge, poore portal ke "Buy Now" aur "Enroll" buttons par <strong>Real Razorpay Checkout</strong> khulega!</li>
              <li>Student se jo payment aayegi wo direct aapke linked Bank Account me transfer ho jayegi!</li>
            </ol>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Razorpay Key ID (rzp_test_... or rzp_live_...)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
                placeholder="Paste your Razorpay Key ID here (e.g. rzp_test_ABC123xyz)"
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#070b16] border border-[#1e335a] text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              <button
                onClick={() => {
                  localStorage.setItem('brainbyte_razorpay_key', razorpayKey);
                  alert(razorpayKey ? "Razorpay Key ID saved! Real payments are now active." : "Sandbox test mode is active.");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue"
              >
                Save Key
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              {razorpayKey ? `✅ Active Key: ${razorpayKey.substring(0, 10)}... (Real gateway enabled)` : "ℹ️ Abhi sandbox simulated checkout active hai (bina key ke test kar sakte hain)."}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 5: CHANGE ADMIN PASSWORD */}
      {activeSection === 'settings' && (
        <div className="max-w-md p-6 rounded-2xl bg-[#0d1628]/95 border border-amber-500/40 shadow-neon-gold space-y-4">
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Update Admin Password</h3>
          </div>

          <p className="text-xs text-slate-300">
            Admin panel ka password change karein taaki sirf aap hi courses add/delete kar sakein aur students ka data dekh sakein.
          </p>

          {passwordNotice && (
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-medium">
              {passwordNotice}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">New Admin Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-amber-500 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-amber-500 text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-neon-gold transition-all"
            >
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* ADD REAL COURSE MODAL */}
      {showAddCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b1324] border border-[#1e335a] rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddCourse(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1">Create & Publish Real AI Course</h3>
            <p className="text-xs text-slate-400 mb-4">Add course details and your actual lecture video URL.</p>

            <form onSubmit={handleSaveCourse} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Master Generative AI & LLMs with LangChain"
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Level</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Lecture Video URL (YouTube Unlisted, Vimeo, or MP4 Link)
                </label>
                <input
                  type="text"
                  value={courseForm.videoUrl}
                  onChange={(e) => setCourseForm({ ...courseForm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or Vimeo URL"
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-cyan-300 font-mono text-[11px]"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  YouTube par apni video ko "Unlisted" karke upload karein aur link yahan daalein! Sirf enrolled students classroom me dekh payenge.
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Description</label>
                <textarea
                  rows={2}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Short summary of what students will achieve..."
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e335a]">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue"
                >
                  Publish Course Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE LIVE CLASS MODAL */}
      {showAddLive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0b1324] border border-[#1e335a] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowAddLive(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white mb-1">Schedule Live Webinar Class</h3>
            <p className="text-xs text-slate-400 mb-4">Set date, time, and your Zoom / Google Meet / YouTube Live link.</p>

            <form onSubmit={handleSaveLiveClass} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Live Session Title</label>
                <input
                  type="text"
                  required
                  value={liveForm.title}
                  onChange={(e) => setLiveForm({ ...liveForm, title: e.target.value })}
                  placeholder="e.g. Live Q&A and GenAI Project Review"
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date & Time</label>
                  <input
                    type="text"
                    value={liveForm.time}
                    onChange={(e) => setLiveForm({ ...liveForm, time: e.target.value })}
                    placeholder="e.g. Today, 7:00 PM - 8:30 PM"
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Platform</label>
                  <select
                    value={liveForm.platform}
                    onChange={(e) => setLiveForm({ ...liveForm, platform: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-white"
                  >
                    <option value="Zoom">Zoom Meeting</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="YouTube Live">YouTube Live Stream</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Meeting Link / Stream URL</label>
                <input
                  type="text"
                  value={liveForm.meetingUrl}
                  onChange={(e) => setLiveForm({ ...liveForm, meetingUrl: e.target.value })}
                  placeholder="https://zoom.us/j/... or https://meet.google.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] text-cyan-300 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e335a]">
                <button
                  type="button"
                  onClick={() => setShowAddLive(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white shadow-md"
                >
                  Schedule Live Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
