'use client';

import { useState, useRef, useEffect } from 'react';
import { TimelineEntry, EntryType } from '@/types/timeline';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalTimelineProps {
  entries: TimelineEntry[];
  onEntryClick: (entry: TimelineEntry) => void;
}

const typeColors: Record<EntryType, { bg: string; border: string; label: string }> = {
  career: { bg: 'bg-blue-500', border: 'border-blue-500', label: 'Career' },
  education: { bg: 'bg-purple-500', border: 'border-purple-500', label: 'Education' },
  publication: { bg: 'bg-emerald-500', border: 'border-emerald-500', label: 'Publication' },
  award: { bg: 'bg-amber-500', border: 'border-amber-500', label: 'Award' },
  presentation: { bg: 'bg-teal-500', border: 'border-teal-500', label: 'Presentation' }
};

export default function HorizontalTimeline({ entries, onEntryClick }: HorizontalTimelineProps) {
  const [hoveredEntry, setHoveredEntry] = useState<TimelineEntry | null>(null);
  const [scrollX, setScrollX] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScroll = direction === 'left'
        ? Math.max(0, scrollX - scrollAmount)
        : scrollX + scrollAmount;

      scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
      setScrollX(newScroll);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollX(scrollRef.current.scrollLeft);
      }
    };

    const ref = scrollRef.current;
    ref?.addEventListener('scroll', handleScroll);
    return () => ref?.removeEventListener('scroll', handleScroll);
  }, []);

  // Get year range
  const years = entries.map(e => e.date.getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = maxYear - minYear + 1;

  return (
    <section className="relative py-16 px-6 md:px-12 bg-gray-50 dark:bg-gray-950 border-y-4 border-black dark:border-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
            TIMELINE OVERVIEW
          </h2>
          <p className="text-sm font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400">
            {minYear} — {maxYear}
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable timeline */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide py-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="relative" style={{ minWidth: `${yearRange * 200}px`, height: '200px' }}>
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-gray-900 dark:bg-white" />

              {/* Year markers */}
              {Array.from({ length: yearRange }, (_, i) => minYear + i).map((year) => (
                <div
                  key={year}
                  className="absolute top-1/2 transform -translate-x-1/2"
                  style={{ left: `${((year - minYear) / (yearRange - 1)) * 100}%` }}
                >
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                    {year}
                  </div>
                </div>
              ))}

              {/* Entry dots */}
              {entries.map((entry) => {
                const year = entry.date.getFullYear();
                const position = ((year - minYear) / (yearRange - 1)) * 100;
                const config = typeColors[entry.type];

                // Offset vertically based on type to avoid overlap
                const verticalOffsets: Record<EntryType, number> = {
                  education: -60,
                  career: -30,
                  award: 0,
                  presentation: 30,
                  publication: 60
                };

                const yOffset = verticalOffsets[entry.type];

                return (
                  <div
                    key={entry.id}
                    className="absolute top-1/2 transform -translate-x-1/2 cursor-pointer group"
                    style={{ left: `${position}%`, transform: `translate(-50%, ${yOffset}px)` }}
                    onMouseEnter={() => setHoveredEntry(entry)}
                    onMouseLeave={() => setHoveredEntry(null)}
                    onClick={() => onEntryClick(entry)}
                  >
                    {/* Connector line to main timeline */}
                    <div
                      className="absolute left-1/2 w-[2px] bg-gray-400 dark:bg-gray-600"
                      style={{
                        height: `${Math.abs(yOffset)}px`,
                        top: yOffset > 0 ? '-100%' : 0,
                        transform: 'translateX(-50%)'
                      }}
                    />

                    {/* Dot */}
                    <div
                      className={`relative w-5 h-5 rounded-full ${config.bg} border-[3px] border-black dark:border-white transition-transform group-hover:scale-150 z-10`}
                    >
                      {/* Pulse effect */}
                      <div className={`absolute inset-0 rounded-full ${config.bg} animate-ping opacity-75 group-hover:opacity-100`} />
                    </div>

                    {/* Hover preview */}
                    {hoveredEntry?.id === entry.id && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-64 p-4 bg-white dark:bg-gray-800 border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-50 animate-in fade-in zoom-in-95 duration-150">
                        {/* Category badge */}
                        <div className={`inline-block ${config.bg} px-2 py-0.5 border-[2px] border-black dark:border-white mb-2`}>
                          <span className="font-mono text-[9px] font-bold tracking-widest text-white">
                            {config.label.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="font-headline text-sm font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                          {entry.title}
                        </h3>
                        {entry.organization && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {entry.organization}
                          </p>
                        )}
                        <p className="text-[10px] font-mono text-gray-500 dark:text-gray-500">
                          {entry.displayDate}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 italic">
                          Click to view details
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-mono">
          {Object.entries(typeColors).map(([type, config]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.bg} border-2 border-black dark:border-white`} />
              <span className="uppercase tracking-wider text-gray-600 dark:text-gray-400">
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
