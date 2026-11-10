'use client';

import { useState, useRef, useEffect } from 'react';
import { sound } from '@/lib/sound';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const COMMAND_HINTS = ['help', 'about', 'skills', 'projects', 'contact', 'clear'];

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-teal-400 font-bold">Noval Abdillah Portfolio OS [Version 2.4.0-prod]</p>
          <p className="text-zinc-400">Ketik <span className="text-teal-300 underline font-semibold">help</span> atau klik tombol pintas di bawah untuk menjalankan perintah.</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    sound.playClick();
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let output: React.ReactNode;

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-zinc-300 font-mono text-xs sm:text-sm">
            <p className="text-zinc-400">Available commands:</p>
            <p><span className="text-teal-400 font-bold w-24 inline-block">about</span> : Ringkasan profil dan latar belakang</p>
            <p><span className="text-teal-400 font-bold w-24 inline-block">skills</span> : Tech stack dan sertifikasi resmi</p>
            <p><span className="text-teal-400 font-bold w-24 inline-block">projects</span> : Highlight proyek SaaS & Web</p>
            <p><span className="text-teal-400 font-bold w-24 inline-block">contact</span> : Email dan link sosial media</p>
            <p><span className="text-teal-400 font-bold w-24 inline-block">clear</span> : Bersihkan layar terminal</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-1 text-zinc-300 text-xs sm:text-sm font-mono">
            <p className="text-white font-bold">Noval Abdillah — Fullstack Developer & AI Engineer</p>
            <p className="text-zinc-400">Fokus pada arsitektur SaaS berskala produksi dengan Next.js 15, PostgreSQL, dan otomatisasi AI menggunakan Copilot & n8n.</p>
            <p className="text-teal-400">📍 Bekasi, Indonesia • Status: Siap bekerja sama</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <div>
              <span className="text-zinc-400 block mb-1">Frontend / Creative:</span>
              <span className="text-teal-300">Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, GSAP</span>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Backend / Database:</span>
              <span className="text-teal-300">Node.js, PostgreSQL, Supabase SSR, RESTful API</span>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">AI & Tooling:</span>
              <span className="text-teal-300">GitHub Copilot, Cursor AI, n8n Automation, Docker</span>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 text-xs sm:text-sm font-mono">
            <p className="text-white font-semibold">Portofolio Highlight:</p>
            <p className="text-zinc-300">1. SaaS Production Platform (Next.js + Supabase + Stripe)</p>
            <p className="text-zinc-300">2. Interactive 3D Web Experience (Three.js + R3F + GSAP)</p>
            <p className="text-zinc-300">3. AI Agent Workflow Automation (n8n + OpenAI API)</p>
            <a href="/projects" className="text-teal-400 underline block mt-1">Kunjungi halaman /projects untuk melihat daftar lengkap ↗</a>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs sm:text-sm font-mono">
            <p className="text-zinc-300">Email: <a href="mailto:noval.abdillah223@gmail.com" className="text-teal-400 underline">noval.abdillah223@gmail.com</a></p>
            <p className="text-zinc-300">LinkedIn: <a href="https://www.linkedin.com/in/noval-abdillah-415589316/" target="_blank" rel="noreferrer" className="text-teal-400 underline">linkedin.com/in/noval-abdillah</a></p>
            <p className="text-zinc-300">GitHub: <a href="https://github.com/noval-abdillah" target="_blank" rel="noreferrer" className="text-teal-400 underline">github.com/noval-abdillah</a></p>
          </div>
        );
        break;

      default:
        output = (
          <p className="text-red-400 text-xs sm:text-sm font-mono">
            bash: {cleanCmd}: perintah tidak dikenali. Ketik <span className="underline">help</span> untuk daftar perintah.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdText, output }]);
    setInput('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-mono mb-3">
            <span>TERMINAL INTERAKTIF</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono">DEV TERMINAL</h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 font-mono">Uji kapabilitas & eksplorasi profil via antarmuka command line</p>
        </div>

        {/* Terminal Window */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-teal-950/20 cursor-text"
        >
          {/* Title Bar */}
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-[11px] sm:text-xs font-mono text-zinc-400 ml-2">noval@portfolio:~</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500">bash</span>
          </div>

          {/* Terminal Screen */}
          <div className="p-3.5 sm:p-5 font-mono text-xs sm:text-sm max-h-[300px] sm:max-h-[360px] overflow-y-auto space-y-3 sm:space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-teal-400 font-bold">➜</span>
                  <span className="text-teal-300">~</span>
                  <span className="text-zinc-100">{item.command}</span>
                </div>
                <div className="pl-3 sm:pl-5">{item.output}</div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 text-zinc-400">
              <span className="text-teal-400 font-bold">➜</span>
              <span className="text-teal-300">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ketik perintah... (cth: help)"
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm caret-teal-400"
              />
            </form>
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Command Pills */}
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900/50 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs text-zinc-500 font-mono mr-1">Pintas:</span>
            {COMMAND_HINTS.map((hint) => (
              <button
                key={hint}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(hint);
                }}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-mono bg-zinc-800/80 hover:bg-teal-500/20 hover:text-teal-300 text-zinc-300 rounded border border-zinc-700/50 transition-colors cursor-pointer"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
