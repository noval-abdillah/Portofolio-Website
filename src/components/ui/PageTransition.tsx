'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Reset scroll immediately via Lenis or native
    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, opts: { immediate: boolean }) => void } }).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Skip heavy animation on initial load for maximum First Contentful Paint
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const bar = progressBarRef.current;
    const content = contentRef.current;

    // Ultra-snappy top progress indicator (total < 250ms)
    if (bar) {
      gsap.killTweensOf(bar);
      gsap.fromTo(
        bar,
        { scaleX: 0, opacity: 1, transformOrigin: '0% 50%' },
        {
          scaleX: 1,
          duration: 0.22,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(bar, { opacity: 0, duration: 0.15, ease: 'power1.out' });
          },
        }
      );
    }

    // Micro-smooth content fade (180ms only - zero user-perceived delay)
    if (content) {
      gsap.killTweensOf(content);
      gsap.fromTo(
        content,
        { opacity: 0.85, y: 4 },
        { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }
      );
    }
  }, [pathname]);

  return (
    <>
      {/* Top Nano Loading Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500 via-teal-300 to-emerald-400 z-[10000] pointer-events-none opacity-0 shadow-[0_0_12px_rgba(20,184,166,0.8)]"
      />

      {/* Page Content */}
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </>
  );
}
