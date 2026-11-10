'use client';

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
}

export default function Marquee({ items, speed = 25, reverse = false }: MarqueeProps) {
  const content = items.join(' • ') + ' • ';

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-zinc-800/80 bg-zinc-950/40 backdrop-blur-sm select-none">
      {/* Gradient masks on sides for cinematic fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

      <div
        className={`flex whitespace-nowrap text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-400 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="mx-4">{content}</span>
        <span className="mx-4">{content}</span>
        <span className="mx-4">{content}</span>
        <span className="mx-4">{content}</span>
      </div>
    </div>
  );
}
