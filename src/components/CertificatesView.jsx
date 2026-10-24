import React from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Download, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Printer,
  Sparkles
} from 'lucide-react';
import { CERTIFICATES_DATA } from '../data/portalData';

export default function CertificatesView({ user }) {
  const cert = CERTIFICATES_DATA[0];

  const handlePrintCertificate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const handleShare = () => {
    const text = `I just earned my certified credential in ${cert.courseTitle} from BrainByte Solutions! Verification ID: ${cert.verificationId}`;
    if (navigator.share) {
      navigator.share({
        title: "BrainByte Solutions Certificate",
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      alert("Certificate verification link & text copied to clipboard!");
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            ACCREDITED CREDENTIALS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          My Certificates
        </h1>
        <p className="text-sm text-slate-400">
          Showcase your achievements and build your career.
        </p>
      </div>

      {/* Main Certificate Showcase Container matching screenshot */}
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Certificate Decorative Card Frame */}
        <div className="p-1.5 sm:p-4 rounded-3xl bg-gradient-to-br from-amber-500/30 via-blue-600/20 to-cyan-500/30 border border-amber-500/40 shadow-neon-gold backdrop-blur-xl overflow-x-auto">
          
          {/* Inner Certificate Parchment (White/Off-white high contrast formal styling matching screenshot!) */}
          <div 
            id="certificate-print-area"
            className="min-w-[320px] rounded-2xl bg-gradient-to-b from-slate-50 via-white to-amber-50/40 text-slate-900 p-4 sm:p-8 sm:p-12 border-2 sm:border-4 border-amber-600/40 shadow-2xl relative overflow-hidden text-center"
          >
            {/* Corner Ornate Accents */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-amber-600"></div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-amber-600"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-amber-600"></div>
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-amber-600"></div>

            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <img src="/brainbyte-logo.jpg" alt="Watermark" className="w-64 sm:w-96 h-64 sm:h-96 object-contain" />
            </div>

            {/* Top Brand Header */}
            <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 relative z-10">
              <img 
                src="/brainbyte-logo.jpg" 
                alt="BrainByte Solutions" 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-amber-500 shadow-md mb-2 object-cover"
              />
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
                  BrainByte
                </span>
                <span className="text-[9px] sm:text-xs px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-800 border border-amber-600/40">
                  SOLUTIONS
                </span>
              </div>
              <p className="text-[8px] sm:text-[10px] text-amber-800 font-semibold uppercase tracking-widest mt-0.5">
                Transforming Ideas Into Digital Success
              </p>
            </div>

            {/* Main Certificate Title */}
            <div className="my-2 sm:my-4 relative z-10">
              <h2 className="text-xl sm:text-4xl font-serif font-bold text-amber-900 tracking-wide">
                Certificate of Completion
              </h2>
              <div className="w-32 sm:w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Recipient Details */}
            <p className="text-xs sm:text-sm text-slate-600 font-serif italic mt-3 relative z-10">
              This is to certify that
            </p>

            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight my-2 underline decoration-amber-400 decoration-2 underline-offset-8 relative z-10">
              {user.name}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed relative z-10">
              has successfully completed all lectures, interactive code labs, and assessments for the professional course
            </p>

            <h4 className="text-base sm:text-xl font-bold text-blue-900 mt-2 font-serif relative z-10">
              {cert.courseTitle}
            </h4>


            {/* Issue Date & Grade */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs font-mono text-slate-700 relative z-10">
              <span>Issued on: <strong>{cert.issueDate}</strong></span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{cert.grade}</span>
            </div>

            {/* Bottom Signatures & Seal Grid matching screenshot */}
            <div className="mt-10 pt-6 border-t border-amber-300/80 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10">
              
              {/* Left Signature */}
              <div className="text-center sm:text-left">
                <p className="font-serif italic font-bold text-slate-800 text-sm">Dr. Amit Sharma</p>
                <div className="w-32 h-0.5 bg-slate-400 mx-auto sm:mx-0 my-1"></div>
                <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">
                  Lead AI & ML Instructor
                </p>
              </div>

              {/* Middle Official Golden Seal matching screenshot */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-1 shadow-lg flex items-center justify-center border-2 border-amber-200">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-800 flex flex-col items-center justify-center text-amber-950 font-bold text-[8px] uppercase tracking-tighter leading-tight">
                    <span>OFFICIAL</span>
                    <Award className="w-4 h-4 text-amber-900 my-0.5" />
                    <span>VERIFIED</span>
                  </div>
                </div>
                <p className="text-[9px] font-mono text-slate-500 mt-1">ID: {cert.verificationId}</p>
              </div>

              {/* Right Signature */}
              <div className="text-center sm:text-right">
                <p className="font-serif italic font-bold text-slate-800 text-sm">{cert.directorName}</p>
                <div className="w-32 h-0.5 bg-slate-400 mx-auto sm:ml-auto my-1"></div>
                <p className="text-[10px] text-slate-600 uppercase tracking-wider font-semibold">
                  Academic Director
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Action Controls matching screenshot: Download Certificate button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handlePrintCertificate}
            className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate (PDF / High-Res)</span>
          </button>

          <button
            onClick={handleShare}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#0d1628] hover:bg-[#13223f] text-slate-200 border border-[#1e335a] hover:border-blue-500/50 flex items-center gap-2 transition-all"
          >
            <Share2 className="w-4 h-4 text-blue-400" />
            <span>Share Credential</span>
          </button>
        </div>

        {/* Verification Card */}
        <div className="p-4 rounded-2xl bg-[#0d1628]/80 border border-[#1a2b4c] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Tamper-proof Cryptographic Verification Hash: <code>0x8f2...e491</code></span>
          </div>
          <a
            href="#verify"
            onClick={(e) => {
              e.preventDefault();
              alert(`Verified! Credential ${cert.verificationId} issued to ${user.name} on ${cert.issueDate}.`);
            }}
            className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Verify Online</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
