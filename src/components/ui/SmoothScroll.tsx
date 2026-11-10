'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Pada mobile / touch devices (iPhone, iPad, Android), matikan virtual scroll Lenis
    // agar memanfaatkan 120Hz native hardware kinetic scroll iOS/Android tanpa delay
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouch) {
      return;
    }

    // Inisialisasi Lenis hanya untuk Desktop / Mouse Wheels
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for page transitions / programmatic scrolls
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    // Sinkronisasi GSAP ScrollTrigger dengan Lenis scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Gunakan ticker bawaan GSAP untuk drive RAF loop Lenis agar 100% tersinkronisasi
    const updateGsap = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsap);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsap);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}