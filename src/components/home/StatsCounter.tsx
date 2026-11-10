'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpotlightCard } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    value: 15,
    suffix: '+',
    label: 'PROYEK SELESAI',
    description: 'SaaS, Fullstack Web, & Automation',
  },
  {
    value: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'SYSTEM RELIABILITY',
    description: 'Production uptime & optimal SLA',
  },
  {
    value: 4,
    suffix: ' VERIFIED',
    label: 'SERTIFIKASI RESMI',
    description: 'Google, Komdigi, Microsoft & HackerRank',
  },
  {
    value: 120,
    suffix: '+',
    label: 'AI WORKFLOWS',
    description: 'Copilot & n8n pipeline integration',
  },
];

export default function StatsCounter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const target = { val: 0 };
        gsap.to(target, {
          val: stat.value,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (el) {
              el.textContent = stat.decimals
                ? target.val.toFixed(stat.decimals)
                : Math.round(target.val).toString();
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 sm:py-20 bg-zinc-950 border-y border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <SpotlightCard
              key={stat.label}
              className="p-4 sm:p-6 md:p-8 text-center"
              spotlightColor="rgba(20, 184, 166, 0.15)"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold font-mono text-teal-400 mb-1.5 sm:mb-2 flex items-center justify-center tracking-tight">
                <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-[11px] sm:text-xs md:text-sm font-bold font-mono text-white tracking-wider mb-1 line-clamp-1">
                {stat.label}
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-sans line-clamp-2">
                {stat.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
