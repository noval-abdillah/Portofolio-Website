'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckIcon, SpotlightCard, TextScramble } from '@/components/ui';
import { ProfileImage } from '@/components/about';
import { useLanguage } from '@/context/LanguageContext';
import { getCertificates, getSkills, FALLBACK_CERTIFICATES, FALLBACK_TECH_SKILLS, FALLBACK_OFFICE_SKILLS } from '@/lib/cms';
import { Certificate } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<{title: string; img: string} | null>(null);

  const [certificates, setCertificates] = useState<Certificate[]>(FALLBACK_CERTIFICATES);
  const [techSkills, setTechSkills] = useState<string[]>(FALLBACK_TECH_SKILLS);
  const [officeSkills, setOfficeSkills] = useState<string[]>(FALLBACK_OFFICE_SKILLS);

  useEffect(() => {
    getCertificates().then(setCertificates);
    getSkills().then((s) => {
      setTechSkills(s.tech);
      setOfficeSkills(s.office);
    });
  }, []);

  // Close certificate modal on Escape key press
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%', once: true },
        }
      );

      if (contentRef.current) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          <TextScramble text={t.about.title} speed={40} />
        </h1>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: 3D Profile Picture */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
            <ProfileImage />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h3 className="text-2xl font-semibold text-teal-500">{t.about.role}</h3>
            <p className="text-zinc-300 leading-relaxed text-lg">
              {t.about.p1}
            </p>
            <p className="text-zinc-300 leading-relaxed text-lg">
              {t.about.p2}
            </p>

            <SpotlightCard className="p-6 mt-8" spotlightColor="rgba(20, 184, 166, 0.12)">
              <h4 className="text-lg font-semibold text-white mb-4">{t.about.techStack}</h4>
              <div className="flex flex-wrap gap-2">
                {techSkills.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 text-sm rounded-full font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </SpotlightCard>
            
            <SpotlightCard className="p-6" spotlightColor="rgba(20, 184, 166, 0.12)">
              <h4 className="text-lg font-semibold text-white mb-4">{t.about.officeTools}</h4>
              <div className="flex flex-wrap gap-2">
                {officeSkills.map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-zinc-800/80 border border-zinc-700/50 text-zinc-100 text-sm rounded-full font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6" spotlightColor="rgba(20, 184, 166, 0.12)">
              <h4 className="text-lg font-semibold text-white mb-4">{t.about.certifications}</h4>
              <ul className="space-y-4">
                {certificates.map((cert) => (
                  <li key={cert.id} className="flex items-start justify-between gap-3">
                    <div className="flex gap-3 items-start">
                      <div className="mt-1 text-teal-500">
                        <CheckIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-white font-medium">{cert.title}</span>
                        <span className="text-zinc-300 text-sm">{cert.issuer}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cert.credential_url && (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors whitespace-nowrap"
                        >
                          Verify
                        </a>
                      )}
                      <button 
                        onClick={() => setSelectedCert({ title: cert.title, img: cert.image_url })}
                        className="px-3 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors whitespace-nowrap cursor-pointer"
                        aria-label={`Preview ${cert.title} certificate`}
                      >
                        {t.about.previewCert}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <h3 className="text-lg font-semibold text-white">{selectedCert.title}</h3>
              <button 
                onClick={() => setSelectedCert(null)}
                className="text-zinc-400 hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-zinc-950 min-h-[300px] sm:min-h-[400px] relative">
              <div className="relative w-full aspect-[4/3] bg-zinc-800 flex items-center justify-center rounded border border-zinc-700 overflow-hidden">
                <Image 
                  src={selectedCert.img} 
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
