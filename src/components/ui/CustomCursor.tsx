'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CustomCursorProps {
  children: React.ReactNode;
}

export default function CustomCursor({ children }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Hanya aktif di perangkat dengan mouse presisi (bukan touch/mobile/Android)
    const mq = window.matchMedia('(pointer: fine)');
    
    // Gunakan callback atau jalankan di frame berikutnya agar tidak menabrak status render sinkron
    const updateMedia = () => {
      setIsDesktop(mq.matches);
    };
    updateMedia();

    // Listen untuk perubahan (misal colok mouse ke tablet)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let active = false;
    let frameId: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (frameId) cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        if (!active) {
          gsap.set([dot, ring], { opacity: 1 });
          active = true;
        }
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' });
      });
    };

    const onEnter = () => {
      gsap.to(dot, { scale: 1.5, opacity: 0.4, duration: 0.25 });
      gsap.to(ring, { scale: 2.2, borderColor: '#14b8a6', duration: 0.25 });
    };

    const onLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.25 });
      gsap.to(ring, { scale: 1, borderColor: 'rgba(20,184,166,0.5)', duration: 0.25 });
    };

    // Hide cursor initially until first move
    gsap.set([dot, ring], { opacity: 0 });

    // Use passive listener where possible or normal mousemove
    window.addEventListener('mousemove', onMove, { passive: true });

    // Event delegation: satu listener global di window daripada ribuan di setiap elemen
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button, input, textarea, [data-cursor]');
      if (target) {
        onEnter();
      } else {
        onLeave();
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isDesktop]);

  // Tidak render elemen cursor di perangkat touch/mobile — langsung render children saja
  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{ willChange: 'transform' }}
        className="fixed top-0 left-0 w-2 h-2 bg-teal-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{ willChange: 'transform' }}
        className="fixed top-0 left-0 w-8 h-8 border border-teal-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      />
      {children}
    </>
  );
}