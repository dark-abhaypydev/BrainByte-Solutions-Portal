import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  Video, 
  MessageSquare, 
  HelpCircle, 
  Download, 
  Play, 
  Calendar, 
  CheckCircle2, 
  Users, 
  Bell, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import LiveWebinarRoom from './LiveWebinarRoom';

export default function LiveClassesHub({ liveClasses, pastRecordings }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past'
  const [activeLiveSession, setActiveLiveSession] = useState(null);
  const [recordingModal, setRecordingModal] = useState(null);

  const features = [
    { title: "HD Video & Audio", desc: "Crystal clear 1080p 60fps streaming with dual-channel audio." },
    { title: "Live Chat", desc: "Interact with classmates and discuss code in real-time." },
    { title: "Q&A Session", desc: "Dedicated upvoted queue for student technical questions." },
    { title: "Session Recording", desc: "Automated recording posted within 2 hours of session end." },
    { title: "Download Resources", desc: "Jupyter notebooks, slides and dataset files provided." }
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-bold border border-red-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            INTERACTIVE SESSIONS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Live Classes
        </h1>
        <p className="text-sm text-slate-400">
          Join live sessions, interact with your instructor and get your doubts cleared.
        </p>
      </div>

      {/* Main Grid: Left Scheduled Sessions & Right Live Features / Recent Recordings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Tabs & Session Cards matching screenshot */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Tabs: Upcoming vs Past Sessions */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#091122] border border-[#1a2b4c] w-fit">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-neon-blue'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Upcoming ({liveClasses.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'past'
                  ? 'bg-blue-600 text-white shadow-neon-blue'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Past Sessions ({pastRecordings.length})
            </button>
          </div>

          {/* Tab 1: UPCOMING SESSIONS */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {liveClasses.map((item) => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.isLive
                      ? 'bg-gradient-to-r from-[#111e3b] via-[#0d1628] to-[#0a1122] border-blue-500/50 shadow-neon-blue'
                      : 'bg-[#0d1628]/95 border-[#1a2b4c] hover:border-blue-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-4">
                      
                      {/* Live Icon Box */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        item.isLive
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        <Radio className="w-6 h-6 animate-pulse" />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            item.isLive 
                              ? 'bg-red-500 text-white flex items-center gap-1' 
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          }`}>
                            {item.isLive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
                            {item.isLive ? 'LIVE NOW' : 'UPCOMING'}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {item.participants} registered
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white mt-1.5">
                          {item.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-300">
                          <span className="flex items-center gap-1 text-cyan-300">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{item.time}</span>
                          </span>
                          <span className="text-slate-500">•</span>
                          <span>By {item.instructor}</span>
                        </div>

                        <p className="text-xs text-slate-400 mt-2 max-w-xl">
                          {item.agenda}
                        </p>
                      </div>

                    </div>

                    {/* Action Button matching screenshot */}
                    <div className="sm:self-center shrink-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                      {item.isLive ? (
                        <button
                          onClick={() => setActiveLiveSession(item)}
                          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue flex items-center gap-2 hover:scale-105 transition-all"
                        >
                          <Radio className="w-4 h-4 animate-ping" />
                          <span>Join</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Reminder set for: ${item.title}`)}
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#13223f] hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-colors flex items-center gap-2"
                        >
                          <Bell className="w-3.5 h-3.5" />
                          <span>Remind Me</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: PAST RECORDINGS */}
          {activeTab === 'past' && (
            <div className="space-y-3">
              {pastRecordings.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-[#0d1628] border border-[#1a2b4c] hover:border-blue-500/40 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                      <p className="text-xs text-slate-400">
                        {rec.duration} • {rec.views} students watched • {rec.date}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setRecordingModal(rec)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition-colors"
                  >
                    Watch Recording
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Live Class Features & Recent Recordings matching screenshot */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Class Features Card matching screenshot */}
          <div className="p-6 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" />
              <span>Live Class Features</span>
            </h3>

            <div className="space-y-3">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">{feat.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-snug">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Recordings Box matching screenshot */}
          <div className="p-6 rounded-2xl bg-[#0d1628]/95 border border-[#1a2b4c] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Recent Recordings</span>
            </h3>

            <div className="space-y-2.5">
              {pastRecordings.slice(0, 2).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setRecordingModal(rec)}
                  className="p-3 rounded-xl bg-[#080e1b] border border-[#1e335a] hover:border-blue-500/40 cursor-pointer transition-colors flex items-center justify-between group"
                >
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-200 group-hover:text-blue-300 truncate">
                      {rec.title}
                    </p>
                    <p className="text-[10px] text-slate-400">{rec.duration}</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Live Webinar Room Fullscreen Modal */}
      {activeLiveSession && (
        <LiveWebinarRoom
          session={activeLiveSession}
          onClose={() => setActiveLiveSession(null)}
        />
      )}

      {/* Recording Player Modal */}
      {recordingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c1527] border border-[#1e335a] rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{recordingModal.title}</h3>
              <button
                onClick={() => setRecordingModal(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Close ✕
              </button>
            </div>
            
            <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center relative border border-slate-800">
              <div className="text-center p-6 space-y-2">
                <Play className="w-12 h-12 text-blue-400 mx-auto fill-current opacity-80" />
                <p className="text-sm text-slate-300 font-semibold">Recorded Webinar Archive</p>
                <p className="text-xs text-slate-400">Duration: {recordingModal.duration} • 1080p</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => alert("Downloading lecture notes and slides...")}
                className="px-4 py-2 rounded-xl bg-[#142242] text-blue-300 border border-blue-500/30 text-xs font-bold"
              >
                Download Slides
              </button>
              <button
                onClick={() => setRecordingModal(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
