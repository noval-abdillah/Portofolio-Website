'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: React.ReactElement<{ className?: string; ref?: unknown }>;
  strength?: number;
}

export default function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

      gsap.to(el, { x, y, duration: 0.35, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={elRef} className="inline-block">
      {children}
    </div>
  );
}
