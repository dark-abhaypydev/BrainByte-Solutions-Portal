import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  CheckCircle2, 
  AlertCircle, 
  Code, 
  Database, 
  BrainCircuit, 
  Camera, 
  Sparkles,
  Copy,
  Download
} from 'lucide-react';
import { PRACTICE_CHALLENGES } from '../data/portalData';

export default function PracticeLab() {
  const [selectedTopic, setSelectedTopic] = useState('Python 3');
  const [activeChallenge, setActiveChallenge] = useState(PRACTICE_CHALLENGES[0]);
  const [code, setCode] = useState(PRACTICE_CHALLENGES[0].defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState({
    type: 'dataframe',
    columns: ['age', 'height', 'weight'],
    rows: [
      { age: 25, height: 175, weight: 70 },
      { age: 30, height: 180, weight: 80 },
      { age: 28, height: 168, weight: 65 },
      { age: 35, height: 172, weight: 75 },
      { age: 22, height: 178, weight: 72 }
    ],
    logs: "=== Dataset Head ===\nDataFrame initialized with 5 rows and 3 columns.\nAverage Height: 174.60 cm\nExecution took 12ms."
  });
  const [challengeStatus, setChallengeStatus] = useState(null); // 'success', 'error'

  const topics = [
    { id: 'Python 3', label: 'Python 3', icon: Terminal },
    { id: 'Machine Learning', label: 'Machine Learning', icon: BrainCircuit },
    { id: 'Deep Learning', label: 'Deep Learning', icon: Sparkles },
    { id: 'Computer Vision', label: 'Computer Vision', icon: Camera },
    { id: 'Data Science', label: 'Data Science', icon: Database }
  ];

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);

      if (code.includes('metrics') || code.includes('calculate_metrics')) {
        setExecutionOutput({
          type: 'text',
          logs: "Accuracy: 87.5%\nPrecision: 85.0%\nRecall: 89.5%\nF1-Score: 87.2%\n[Process finished with exit code 0]"
        });
      } else if (code.includes('W1') || code.includes('relu') || code.includes('sigmoid')) {
        setExecutionOutput({
          type: 'text',
          logs: "Layer 1 Hidden Activations shape: (2, 4)\nOutput Predictions: [0.5234 0.4891]\nNeural Network Forward Pass successfully executed on CPU."
        });
      } else {
        setExecutionOutput({
          type: 'dataframe',
          columns: ['age', 'height', 'weight'],
          rows: [
            { age: 25, height: 175, weight: 70 },
            { age: 30, height: 180, weight: 80 },
            { age: 28, height: 168, weight: 65 },
            { age: 35, height: 172, weight: 75 },
            { age: 22, height: 178, weight: 72 }
          ],
          logs: "=== Dataset Head ===\n   age  height  weight\n0   25     175      70\n1   30     180      80\n2   28     168      65\n3   35     172      75\n4   22     178      72\n\nAverage Height: 174.60 cm\n\nCandidates taller than 175cm:\n   age  height  weight\n1   30     180      80\n4   22     178      72"
        });
      }
    }, 400);
  };

  const handleSubmitSolution = () => {
    handleRunCode();
    setChallengeStatus('success');
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header Section matching screenshot */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5" />
            INTERACTIVE CLOUD LAB
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Practice Lab
        </h1>
        <p className="text-sm text-slate-400">
          Write code, solve problems and get real-time feedback.
        </p>
      </div>

      {/* Main Lab Grid: Topic Sidebar (Left) & Editor + Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Topic Selector Bar (Horizontal scroll on mobile, Vertical on desktop) */}
        <div className="lg:col-span-3 bg-[#0d1628]/95 border border-[#1a2b4c] rounded-2xl p-3 sm:p-4 space-y-2 h-fit">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Practice Tracks
          </h3>

          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
            {topics.map((t) => {
              const Icon = t.icon;
              const isSelected = selectedTopic === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTopic(t.id);
                    const matchingChallenge = PRACTICE_CHALLENGES.find(c => c.category === t.id) || PRACTICE_CHALLENGES[0];
                    setActiveChallenge(matchingChallenge);
                    setCode(matchingChallenge.defaultCode);
                    setChallengeStatus(null);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap lg:w-full transition-all shrink-0 ${
                    isSelected
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-neon-blue'
                      : 'text-slate-400 hover:text-white hover:bg-[#0f1b33]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1a2b4c]/60 px-1 hidden lg:block">
            <span className="text-[11px] text-slate-400 block font-semibold mb-1">Environment</span>
            <div className="space-y-1 text-[10px] font-mono text-slate-400">
              <p>• Python 3.12 (CPython)</p>
              <p>• Pandas 2.2.0 • NumPy 1.26</p>
              <p>• Scikit-Learn 1.4.0</p>
            </div>
          </div>
        </div>

        {/* Right Code Editor & Output Terminal matching screenshot */}
        <div className="lg:col-span-9 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Code Editor Panel (7 cols) */}
            <div className="md:col-span-7 bg-[#090f1d] border border-blue-500/40 rounded-2xl overflow-hidden shadow-neon-blue flex flex-col justify-between">
              
              {/* Editor Header */}
              <div className="px-4 py-2.5 bg-[#0d1628] border-b border-[#1a2b4c] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono font-bold text-blue-300 ml-2">solution.py</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCode(activeChallenge.defaultCode)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                    title="Reset to default code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Code Textarea with line numbers */}
              <div className="p-4 flex-1 relative flex">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={14}
                  spellCheck={false}
                  className="w-full bg-transparent text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-blue-600/40"
                />
              </div>

              {/* Editor Bottom Bar: Run Button matching screenshot */}
              <div className="p-3 bg-[#0d1628] border-t border-[#1a2b4c] flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Press 'Run' to execute code
                </span>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-neon-blue flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </button>
              </div>

            </div>

            {/* Output Panel (5 cols) matching screenshot */}
            <div className="md:col-span-5 bg-[#090f1d] border border-[#1a2b4c] rounded-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Output Header */}
              <div className="px-4 py-2.5 bg-[#0d1628] border-b border-[#1a2b4c] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Output
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Status: Success
                </span>
              </div>

              {/* Output Content: Formatted DataFrame Table matching screenshot! */}
              <div className="p-4 flex-1 overflow-auto space-y-3">
                {executionOutput.type === 'dataframe' && (
                  <div className="overflow-x-auto rounded-xl border border-[#1e335a] bg-[#070b16]">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#0f1b33] text-slate-300 border-b border-[#1e335a]">
                        <tr>
                          {executionOutput.columns.map((col) => (
                            <th key={col} className="px-3 py-2 text-cyan-300 font-bold">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        {executionOutput.rows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-blue-900/10">
                            <td className="px-3 py-1.5">{row.age}</td>
                            <td className="px-3 py-1.5 text-blue-300">{row.height}</td>
                            <td className="px-3 py-1.5">{row.weight}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Console Log Area */}
                <div className="p-3 rounded-xl bg-[#060a14] border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {executionOutput.logs}
                </div>
              </div>

              <div className="p-3 bg-[#0d1628] border-t border-[#1a2b4c] text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>Kernel: Idle</span>
                <span>RAM: 142 MB / 8 GB</span>
              </div>

            </div>

          </div>

          {/* Bottom Challenge Banner matching screenshot! */}
          <div className="p-5 rounded-2xl bg-[#0d1628] border border-blue-500/40 shadow-neon-blue flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Challenge: {activeChallenge.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  +50 XP
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {activeChallenge.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {challengeStatus === 'success' && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Challenge Passed!</span>
                </span>
              )}
              <button
                onClick={handleSubmitSolution}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-neon-blue transition-all"
              >
                Submit Solution
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
