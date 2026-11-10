'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number; // ms per step
  trigger?: boolean;
}

export default function TextScramble({
  text,
  className = '',
  speed = 30,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runScramble();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  const runScramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);
  };

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}
