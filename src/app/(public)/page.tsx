import { Hero, StatsCounter, InteractiveTerminal } from '@/components/home';
import { Projects } from '@/components/projects';
import BlogSection from '@/components/blog/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsCounter />
      <div className="relative">
        <Projects limit={3} />
        <div className="flex justify-center pb-24 bg-zinc-950">
          <Link 
            href="/projects"
            className="px-8 py-3 border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-zinc-950 font-mono rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
          >
            SEE ALL PROJECTS
          </Link>
        </div>
      </div>
      <InteractiveTerminal />
      <BlogSection />
      <FAQSection />
    </div>
  );
}
