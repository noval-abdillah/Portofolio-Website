'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitHubIcon, LinkedInIcon, EmailIcon, InstagramIcon, CheckIcon, SpotlightCard, TextScramble, Magnetic } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

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
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
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
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold text-white mb-6">
              <TextScramble text={t.contact.title} speed={40} />
            </h1>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              {t.contact.subtitle}
            </p>

            <div className="space-y-4">
              <a
                href="mailto:noval.abdillah223@gmail.com"
                className="flex items-center gap-4 p-4 border border-zinc-800 rounded-lg hover:border-teal-500 transition-colors group"
              >
                <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-teal-500/10 transition-colors">
                  <EmailIcon className="w-6 h-6 text-zinc-400 group-hover:text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Email</p>
                  <p className="text-white font-medium">noval.abdillah223@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/noval-abdillah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-zinc-800 rounded-lg hover:border-teal-500 transition-colors group"
              >
                <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-teal-500/10 transition-colors">
                  <GitHubIcon className="w-6 h-6 text-zinc-400 group-hover:text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">GitHub</p>
                  <p className="text-white font-medium">github.com/noval-abdillah</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/noval-abdillah-415589316/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-zinc-800 rounded-lg hover:border-teal-500 transition-colors group"
              >
                <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-teal-500/10 transition-colors">
                  <LinkedInIcon className="w-6 h-6 text-zinc-400 group-hover:text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">LinkedIn</p>
                  <p className="text-white font-medium">linkedin.com/in/noval-abdillah-415589316/</p>
                </div>
              </a>

              <a
                href="https://instagram.com/novalnkw.__"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-zinc-800 rounded-lg hover:border-teal-500 transition-colors group"
              >
                <div className="p-3 bg-zinc-900 rounded-lg group-hover:bg-teal-500/10 transition-colors">
                  <InstagramIcon className="w-6 h-6 text-zinc-400 group-hover:text-teal-500" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Instagram</p>
                  <p className="text-white font-medium">@novalnkw.__</p>
                </div>
              </a>
            </div>
          </div>

          <SpotlightCard
            ref={contentRef as unknown as React.Ref<HTMLDivElement>}
            className="p-8 shadow-2xl shadow-teal-950/20"
            spotlightColor="rgba(20, 184, 166, 0.18)"
          >
            <h3 className="text-2xl font-bold text-white mb-6">{t.contact.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-300 mb-2">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-950/80 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              {sent ? (
                <div className="w-full px-6 py-3 bg-teal-500/20 border border-teal-500/30 text-teal-400 font-bold rounded-lg flex items-center justify-center gap-2">
                  <CheckIcon className="w-5 h-5" />
                  {t.contact.successTitle}
                </div>
              ) : (
                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] cursor-pointer"
                  >
                    {t.contact.sendMessage}
                  </button>
                </Magnetic>
              )}
            </form>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
