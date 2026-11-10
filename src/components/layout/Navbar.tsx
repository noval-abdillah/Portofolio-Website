'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { MenuIcon, CloseIcon, GitHubIcon, LinkedInIcon, EmailIcon } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { sound } from '@/lib/sound';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const pathname = usePathname();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.projects, href: '/projects' },
    { name: t.nav.blog, href: '/blog' },
    { name: t.nav.contact, href: '/contact' },
  ];

  // Animate active indicator on pathname change
  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.href === pathname);
    const activeLink = navLinksRef.current[activeIndex];
    const indicator = indicatorRef.current;

    if (activeLink && indicator) {
      const linkRect = activeLink.getBoundingClientRect();
      const parentRect = activeLink.parentElement?.getBoundingClientRect();
      
      if (parentRect) {
        gsap.to(indicator, {
          width: linkRect.width,
          x: linkRect.left - parentRect.left,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    }
  }, [pathname, language]); // also depend on language so it recalcs width when text changes

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-800 group-hover:border-teal-500/50 transition-colors shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              <Image
                src="/icon.png"
                alt="NA Monogram Logo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-xl font-bold font-mono text-white group-hover:text-teal-400 transition-colors tracking-tight">
              NOVAL<span className="text-teal-400">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href} // Use href as key instead of name because name changes with lang
                  href={link.href}
                  ref={(el) => { navLinksRef.current[index] = el; }}
                  className={`text-sm font-mono transition-colors uppercase tracking-wider ${
                    pathname === link.href 
                      ? 'text-teal-500' 
                      : 'text-zinc-300 hover:text-teal-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Animated Active Indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                style={{ transform: 'translateY(8px)' }}
              />
            </div>
            
            {/* Social & Language Links */}
            <div className="flex items-center space-x-4 ml-8">
              <a
                href="https://github.com/noval-abdillah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-teal-500 transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/noval-abdillah-415589316/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-teal-500 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:noval.abdillah223@gmail.com"
                className="text-zinc-300 hover:text-teal-500 transition-colors"
                aria-label="Email"
              >
                <EmailIcon className="w-5 h-5" />
              </a>
              
            {/* Language Switcher */}
            <div className="ml-4 pl-4 border-l border-zinc-800 flex items-center space-x-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`text-xs font-mono font-bold transition-colors ${language === 'en' ? 'text-teal-400' : 'text-zinc-400 hover:text-zinc-200'}`}
                aria-label="Switch language to English"
              >
                EN
              </button>
              <span className="text-zinc-600">/</span>
              <button 
                onClick={() => setLanguage('id')}
                className={`text-xs font-mono font-bold transition-colors ${language === 'id' ? 'text-teal-400' : 'text-zinc-400 hover:text-zinc-200'}`}
                aria-label="Ganti bahasa ke Indonesia"
              >
                ID
              </button>
            </div>

            {/* Futuristic Sound FX Toggle */}
            <button
              onClick={() => setAudioActive(sound.toggle())}
              className={`p-1.5 rounded-lg border transition-all text-xs font-mono flex items-center gap-1 cursor-pointer ${
                audioActive
                  ? 'border-teal-500/60 bg-teal-500/10 text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                  : 'border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:text-zinc-300'
              }`}
              title={audioActive ? 'Matikan Suara SFX' : 'Nyalakan Suara SFX'}
              aria-label="Toggle Sound FX"
            >
              {audioActive ? '🔊 SFX' : '🔇 SFX'}
            </button>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-teal-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-mono transition-colors uppercase tracking-wider ${
                  pathname === link.href 
                    ? 'text-teal-500' 
                    : 'text-zinc-300 hover:text-teal-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <a
                href="https://github.com/noval-abdillah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-zinc-300 hover:text-teal-500 transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/noval-abdillah-415589316/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-zinc-300 hover:text-teal-500 transition-colors"
              >
                <LinkedInIcon className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-4 pt-2">
                <span className="text-sm font-mono text-zinc-300">Language:</span>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-mono font-bold transition-colors ${language === 'en' ? 'text-teal-500' : 'text-zinc-400'}`}
                  aria-label="Switch mobile language to English"
                >
                  EN
                </button>
                <span className="text-zinc-700">|</span>
                <button 
                  onClick={() => setLanguage('id')}
                  className={`text-sm font-mono font-bold transition-colors ${language === 'id' ? 'text-teal-500' : 'text-zinc-400'}`}
                  aria-label="Ganti bahasa mobile ke Indonesia"
                >
                  ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
