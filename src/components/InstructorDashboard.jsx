import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  X, 
  CheckCircle2, 
  Radio, 
  Video,
  Clock,
  Sparkles
} from 'lucide-react';
import { INSTRUCTOR_DATA } from '../data/portalData';

export default function InstructorDashboard({ courses, onAddCourse }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Intermediate',
    description: '',
    price: 3499,
    durationHours: 30,
    modulesCount: 8,
    tags: 'PyTorch, Machine Learning, Deep Learning'
  });

  const instructorStats = [
    { label: "Total Students", value: "248", change: "+18 this month", icon: Users, color: "text-blue-400" },
    { label: "Total Courses", value: `${courses.length}`, change: "2 in draft", icon: BookOpen, color: "text-cyan-400" },
    { label: "Total Revenue", value: "₹48,500", change: "+24% vs last mo", icon: DollarSign, color: "text-emerald-400" },
    { label: "Completion Rate", value: "72%", change: "+5% cohort avg", icon: TrendingUp, color: "text-purple-400" },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    const courseObj = {
      id: `course-${Date.now()}`,
      title: newCourse.title,
      category: newCourse.category,
      description: newCourse.description || "Comprehensive hands-on AI course covering real-world industry applications.",
      modulesCount: Number(newCourse.modulesCount),
      durationHours: Number(newCourse.durationHours),
      price: Number(newCourse.price),
      originalPrice: Number(newCourse.price) * 2,
      enrolled: false,
      progress: 0,
      rating: 5.0,
      studentsCount: 1,
      accentColor: "from-blue-600 to-cyan-500",
      icon: "brain",
      level: newCourse.category,
      instructor: INSTRUCTOR_DATA.name,
      tags: newCourse.tags.split(',').map(t => t.trim())
    };

    onAddCourse(courseObj);
    setShowCreateModal(false);
    setNewCourse({
      title: '',
      category: 'Intermediate',
      description: '',
      price: 3499,
      durationHours: 30,
      modulesCount: 8,
      tags: 'PyTorch, Machine Learning, Deep Learning'
    });
    alert(`Course "${courseObj.title}" created successfully and published to portal!`);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Top Banner matching screenshot */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#141b2e] via-[#0d1628] to-[#080d19] border border-amber-500/30 shadow-neon-gold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              INSTRUCTOR STUDIO
            </span>
            <span className="text-xs text-slate-400">Dr. Amit Sharma</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Instructor Dashboard
          </h1>
          <p className="text-sm text-slate-300">
            Welcome back, Dr. Sharma! Here's what's happening with your courses and student cohorts.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue flex items-center gap-2 hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Course</span>
        </button>
      </div>

      {/* 4 Metric Cards matching screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {instructorStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <p className="text-[11px] text-emerald-400 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Management Table matching screenshot */}
      <div className="rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#1a2b4c] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">Course Management</h2>
            <p className="text-xs text-slate-400">Create, edit and manage your AI courses.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Active Cohort: <strong>Oct 2026</strong></span>
          </div>
        </div>

        {/* Table matching screenshot */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#091122] text-slate-400 font-mono border-b border-[#1e335a] uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Course Name</th>
                <th className="px-5 py-3.5">Students</th>
                <th className="px-5 py-3.5">Revenue</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e335a]/60 text-slate-200">
              {courses.slice(0, 5).map((course, i) => (
                <tr key={course.id} className="hover:bg-[#121f38] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${course.accentColor} flex items-center justify-center text-white shrink-0`}>
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs sm:text-sm">{course.title}</p>
                        <p className="text-[10px] text-slate-400">{course.modulesCount} modules • {course.durationHours} hrs</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono">
                    {course.studentsCount || (124 - i * 22)}
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-emerald-400">
                    ₹{((course.studentsCount || 80) * (course.price || 1499) * 0.05).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Published
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => alert(`Editing syllabus for ${course.title}`)}
                        className="p-1.5 rounded-lg bg-[#15233d] hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit Course"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => alert(`Analytics for ${course.title}: 94% positive student feedback, average completion 76%.`)}
                        className="p-1.5 rounded-lg bg-[#15233d] hover:bg-cyan-600 text-slate-300 hover:text-white transition-colors"
                        title="View Analytics"
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0c1527] border border-[#1e335a] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Add New AI Course</h3>
                <p className="text-xs text-slate-400">Expand your BrainByte curriculum catalog.</p>
              </div>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="e.g. Generative AI with LangChain & Llama-3"
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Difficulty Level</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
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
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    value={newCourse.durationHours}
                    onChange={(e) => setNewCourse({ ...newCourse, durationHours: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Modules Count</label>
                  <input
                    type="number"
                    value={newCourse.modulesCount}
                    onChange={(e) => setNewCourse({ ...newCourse, modulesCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="What will students learn in this curriculum?"
                  className="w-full px-3 py-2 rounded-xl bg-[#070b16] border border-[#1e335a] focus:border-blue-500 text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e335a]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
