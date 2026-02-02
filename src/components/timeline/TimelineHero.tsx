'use client';

import { ArrowDown } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function TimelineHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Theme toggle in corner */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Background grid pattern for depth */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Name - bold, condensed, massive */}
        <h1 className="font-headline text-[clamp(3rem,12vw,7rem)] leading-[0.9] font-black tracking-tighter text-gray-900 dark:text-white mb-8">
          ROOSHEEL
          <br />
          PATEL
        </h1>

        {/* Credentials - monospace detail */}
        <div className="font-mono text-sm tracking-wider text-gray-600 dark:text-gray-400 mb-10">
          PhD, MS
        </div>

        {/* Tagline - refined serif */}
        <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
          Computational Biologist | Translational Scientist | Genomics Researcher
        </p>

        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Translating complex genomic data into actionable insights for precision medicine
        </p>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-4 animate-bounce">
          <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
            Scroll to explore
          </span>
          <ArrowDown className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Decorative element - sharp line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900 dark:bg-white" />
    </section>
  );
}
