'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    // Reset scroll position immediately
    const lenis = (window as unknown as { lenis: { scrollTo: (x: number, options: { immediate: boolean }) => void } }).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Create timeline for page transition
    const tl = gsap.timeline();

    // Phase 1: Exit - Overlay slides up from bottom
    tl.set(overlay, {
      yPercent: 100,
      display: 'block',
    })
    .to(overlay, {
      yPercent: 0,
      duration: 0.6,
      ease: 'power3.inOut',
    })
    // Phase 2: Content fade out during overlay
    .to(content, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, '-=0.4')
    // Phase 3: Enter - Overlay slides up and out, content fades in
    .to(content, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.in',
    }, '+=0.1')
    .to(overlay, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
    }, '-=0.3')
    .set(overlay, {
      display: 'none',
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      {/* Page Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f1419 100%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-4">
            {/* Animated Logo/Monogram */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-teal-500/40 shadow-[0_0_40px_rgba(20,184,166,0.4)] animate-pulse">
              <Image
                src="/icon.png"
                alt="NA Monogram"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-4xl font-bold font-mono text-white tracking-widest">
              NOVAL<span className="text-teal-400">.</span>
            </div>
            {/* Neon glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-40 bg-teal-500/40 pointer-events-none" />
          </div>
        </div>
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Page Content */}
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}
