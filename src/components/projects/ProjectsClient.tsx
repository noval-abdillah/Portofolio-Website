'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '@/types';
import { GitHubIcon, ExternalLinkIcon, SpotlightCard, Magnetic, TextScramble } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/sound';

gsap.registerPlugin(ScrollTrigger);

type FilterCategory = 'ALL' | 'FULLSTACK' | 'SAAS' | 'AI & AUTOMATION' | 'FRONTEND 3D';

const CATEGORIES: FilterCategory[] = ['ALL', 'FULLSTACK', 'SAAS', 'AI & AUTOMATION', 'FRONTEND 3D'];

export default function ProjectsClient({ projects, limit }: { projects: Project[]; limit?: number }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const TitleTag = limit ? 'h2' : 'h1';

  // Smart categorization based on tech stack and text
  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeCategory !== 'ALL') {
      result = projects.filter((p) => {
        const hay = (p.title + ' ' + p.description + ' ' + (p.tech_stack || []).join(' ')).toLowerCase();
        if (activeCategory === 'FULLSTACK') {
          return hay.includes('next') || hay.includes('node') || hay.includes('postgres') || hay.includes('fullstack');
        }
        if (activeCategory === 'SAAS') {
          return hay.includes('saas') || hay.includes('stripe') || hay.includes('auth') || hay.includes('dashboard');
        }
        if (activeCategory === 'AI & AUTOMATION') {
          return hay.includes('ai') || hay.includes('copilot') || hay.includes('n8n') || hay.includes('llm') || hay.includes('openai');
        }
        if (activeCategory === 'FRONTEND 3D') {
          return hay.includes('three') || hay.includes('3d') || hay.includes('gsap') || hay.includes('canvas') || hay.includes('tailwind');
        }
        return true;
      });
    }
    return limit ? result.slice(0, limit) : result;
  }, [projects, activeCategory, limit]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
        }
      );

      // Cards stagger on scroll / filter
      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, stagger: 0.08, ease: 'power3.out',
          }
        );
      }
    });
    return () => ctx.revert();
  }, [filteredProjects.length, activeCategory]);

  const handleFilterClick = (cat: FilterCategory) => {
    sound.playClick();
    setActiveCategory(cat);
  };

  return (
    <section id="projects" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-12">
          <TitleTag className="text-4xl md:text-5xl font-bold text-white mb-4">
            <TextScramble text={t.projects.title} speed={40} />
          </TitleTag>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>

          {/* Category Filter Tabs */}
          {!limit && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterClick(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-teal-500 text-zinc-950 font-bold shadow-[0_0_20px_rgba(20,184,166,0.35)]'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 font-mono">{"// Tidak ada proyek pada kategori ini"}</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Skip tilt on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(card, { rotateY: dx * 8, rotateX: -dy * 8, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
    };
    const onLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <SpotlightCard
      ref={cardRef as unknown as React.Ref<HTMLDivElement>}
      style={{ willChange: 'transform' }}
      className="group"
      spotlightColor="rgba(20, 184, 166, 0.22)"
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="px-2.5 py-1 bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-xs rounded-md font-mono">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2 border-t border-zinc-800/80">
          {project.github_url && (
            <Magnetic strength={0.2}>
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-colors text-sm font-mono"
              >
                <GitHubIcon className="w-4 h-4" />
                {t.projects.viewCode}
              </a>
            </Magnetic>
          )}
          {project.live_url && (
            <Magnetic strength={0.2}>
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-colors text-sm font-mono"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                {t.projects.viewLive}
              </a>
            </Magnetic>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
