'use client';

import { useState, useRef, useEffect } from 'react';
import { TimelineEntry, EntryType } from '@/types/timeline';

interface HorizontalTimelineProps {
  entries: TimelineEntry[];
  onEntryClick: (entry: TimelineEntry) => void;
}

const typeColors: Record<EntryType, { bg: string; border: string; label: string; rgb: string }> = {
  career: { bg: 'bg-blue-500', border: 'border-blue-500', label: 'Career', rgb: '59, 130, 246' },
  education: { bg: 'bg-purple-500', border: 'border-purple-500', label: 'Education', rgb: '139, 92, 246' },
  publication: { bg: 'bg-emerald-500', border: 'border-emerald-500', label: 'Publication', rgb: '16, 185, 129' },
  award: { bg: 'bg-amber-500', border: 'border-amber-500', label: 'Award', rgb: '245, 158, 11' },
  presentation: { bg: 'bg-teal-500', border: 'border-teal-500', label: 'Presentation', rgb: '20, 184, 166' }
};

export default function HorizontalTimeline({ entries, onEntryClick }: HorizontalTimelineProps) {
  const [hoveredEntry, setHoveredEntry] = useState<TimelineEntry | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Handle click with scroll position preservation
  const handleEntryClick = (entry: TimelineEntry) => {
    // Store current scroll position
    const currentScrollY = window.scrollY;

    // Call parent handler
    onEntryClick(entry);

    // Restore scroll position after a brief delay to let DOM settle
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'auto' });
    });
  };

  // Track mouse position for dock-style magnification
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  // Calculate magnification scale based on distance from mouse (dock-style)
  const getMagnificationScale = (dotX: number, dotY: number, isHovered: boolean): number => {
    // Hovered element always gets maximum zoom
    if (isHovered) return 2.0;

    if (!mousePosition) return 1;

    const distance = Math.sqrt(
      Math.pow(dotX - mousePosition.x, 2) +
      Math.pow(dotY - mousePosition.y, 2)
    );

    const maxScale = 1.4; // Proximity-based max (less than hover max)
    const influenceRadius = 220;

    // Smooth falloff using quadratic decay (like macOS dock)
    const influence = Math.max(0, 1 - Math.pow(distance / influenceRadius, 2));
    return 1 + (maxScale - 1) * influence;
  };

  // Parse end date from displayDate string for range entries
  const getEndDate = (entry: TimelineEntry): Date | null => {
    const displayDate = entry.displayDate;

    // Check if it's a range (contains " - ")
    if (!displayDate.includes(' - ')) return null;

    const endPart = displayDate.split(' - ')[1].trim();

    // Handle "Present"
    if (endPart.toLowerCase() === 'present') {
      return new Date();
    }

    // Try to parse "Jan 2022" format
    const monthYear = endPart.match(/([A-Za-z]+)\s+(\d{4})/);
    if (monthYear) {
      const [, month, year] = monthYear;
      const monthMap: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      return new Date(parseInt(year), monthMap[month] || 0);
    }

    // Try to parse just year
    const yearMatch = endPart.match(/(\d{4})/);
    if (yearMatch) {
      return new Date(parseInt(yearMatch[1]), 11); // End of year
    }

    return null;
  };

  useEffect(() => {
    // Intersection observer for entrance animations
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Get year range
  const years = entries.map(e => e.date.getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const yearRange = maxYear - minYear + 1;

  // Group entries by year and sort chronologically within each year
  const entriesByYear = entries.reduce((acc, entry) => {
    const year = entry.date.getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(entry);
    return acc;
  }, {} as Record<number, TimelineEntry[]>);

  // Sort each year's entries chronologically
  Object.keys(entriesByYear).forEach(year => {
    entriesByYear[parseInt(year)].sort((a, b) => a.date.getTime() - b.date.getTime());
  });

  // Calculate horizontal offset for overlapping entries (maintains chronological order)
  const getHorizontalOffset = (entry: TimelineEntry): number => {
    const year = entry.date.getFullYear();
    const sameYearEntries = entriesByYear[year];
    if (sameYearEntries.length === 1) return 0;

    const index = sameYearEntries.findIndex(e => e.id === entry.id);
    const totalEntries = sameYearEntries.length;

    // Spread entries left to right chronologically: earliest on left, latest on right
    const spread = 3; // Increased from 1.5 to 3 for better separation
    const offset = (index - (totalEntries - 1) / 2) * spread;
    return offset;
  };

  // Calculate vertical offset for overlapping range entries
  const getVerticalOffset = (entry: TimelineEntry, entries: TimelineEntry[]): number => {
    if (entry.type !== 'education' && entry.type !== 'career') return 0;

    const endDate = getEndDate(entry);
    if (!endDate) return 0;

    // Find all ranges of the same type that overlap with this entry
    const sameTypeRanges = entries.filter(e => {
      if (e.type !== entry.type) return false;
      if (e.id === entry.id) return false;

      const otherEnd = getEndDate(e);
      if (!otherEnd) return false;

      // Check for date overlap
      const thisStart = entry.date.getTime();
      const thisEnd = endDate.getTime();
      const otherStart = e.date.getTime();
      const otherEnd2 = otherEnd.getTime();

      return (thisStart <= otherEnd2 && thisEnd >= otherStart);
    });

    if (sameTypeRanges.length === 0) return 0;

    // Sort by start date to get consistent ordering
    const allOverlapping = [entry, ...sameTypeRanges].sort((a, b) =>
      a.date.getTime() - b.date.getTime()
    );

    const index = allOverlapping.findIndex(e => e.id === entry.id);
    const verticalSpacing = 18; // pixels between overlapping ranges

    return index * verticalSpacing;
  };

  return (
    <>
      {/* Backdrop overlay when hovering - more dramatic */}
      {hoveredEntry && (
        <div
          className="fixed inset-0 z-[90] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            animation: 'fadeIn 0.2s ease-out forwards'
          }}
        />
      )}

      {/* Hover card overlay - rendered at top level */}
      {hoveredEntry && (
        <div
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] max-w-[90vw] max-h-[85vh] overflow-y-auto p-10 bg-white dark:bg-gray-800 border-[4px] border-black dark:border-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] z-[100] pointer-events-none"
          style={{
            animation: 'fadeInScale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            opacity: 1
          }}
        >
          {(() => {
            const config = typeColors[hoveredEntry.type];
            return (
              <>
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-2"
                  style={{ backgroundColor: `rgb(${config.rgb})` }}
                />

                {/* Category badge */}
                <div className={`inline-block ${config.bg} px-3 py-1.5 border-[2px] border-black dark:border-white mb-4`}>
                  <span className="font-mono text-[11px] font-bold tracking-widest text-white">
                    {config.label.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {hoveredEntry.title}
                </h3>

                {/* Organization */}
                {hoveredEntry.organization && (
                  <p className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {hoveredEntry.organization}
                  </p>
                )}

                {/* Location & Date */}
                <div className="flex items-center gap-3 mb-4">
                  {hoveredEntry.location && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {hoveredEntry.location}
                    </span>
                  )}
                  <span className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                    {hoveredEntry.displayDate}
                  </span>
                </div>

                {/* Summary preview */}
                <div className="space-y-3 mb-4">
                  {hoveredEntry.summary.slice(0, 2).map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.length > 150 ? `${item.substring(0, 150)}...` : item}
                    </p>
                  ))}
                </div>

                {/* Click to view full */}
                <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-500">
                    Click to view full details →
                  </p>
                </div>
              </>
            );
          })()}
        </div>
      )}

      <section
        ref={sectionRef}
        className="relative py-20 px-6 md:px-12 lg:px-16 xl:px-24 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-y-4 border-black dark:border-white overflow-hidden"
      >
        {/* Noise texture overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Subtle gradient orbs for atmosphere */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full mx-auto relative z-10">
        {/* Header - animated entrance */}
        <div
          className="mb-8 text-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <h2 className="font-headline text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-4 relative inline-block">
            TIMELINE OVERVIEW
            {/* Decorative underline */}
            <div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 transition-all duration-1000 delay-300"
              style={{
                width: isVisible ? '100%' : '0%'
              }}
            />
          </h2>
          <p
            className="text-sm font-mono uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400 transition-all duration-700 delay-200"
            style={{
              opacity: isVisible ? 1 : 0
            }}
          >
            {minYear} — {maxYear} • {entries.length} Milestones
          </p>
        </div>

        {/* Timeline container - full width */}
        <div className="relative py-24 px-8 md:px-12">
          <div
            ref={timelineRef}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              height: '500px'
            }}
          >
              {/* Main horizontal line - enhanced with gradient and glow */}
              <div className="absolute top-1/2 left-0 right-0 transition-all duration-500 ease-out">
                {/* Glow layer */}
                <div
                  className="absolute inset-0 blur-sm"
                  style={{
                    height: hoveredEntry ? '6px' : '8px',
                    background: 'linear-gradient(90deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.3) 33%, rgba(16,185,129,0.3) 66%, rgba(245,158,11,0.3) 100%)',
                    transform: 'translateY(-50%)',
                    opacity: hoveredEntry ? 0.5 : 0.8
                  }}
                />
                {/* Main line */}
                <div
                  className="absolute inset-0"
                  style={{
                    height: hoveredEntry ? '2px' : '4px',
                    background: 'linear-gradient(90deg, rgb(139,92,246) 0%, rgb(59,130,246) 33%, rgb(16,185,129) 66%, rgb(245,158,11) 100%)',
                    transform: 'translateY(-50%)',
                    opacity: hoveredEntry ? 0.4 : 1,
                    boxShadow: hoveredEntry ? 'none' : '0 0 20px rgba(0,0,0,0.1)'
                  }}
                />
              </div>

              {/* Year markers */}
              {Array.from({ length: yearRange }, (_, i) => minYear + i).map((year) => {
                const isHoveredYear = hoveredEntry?.date.getFullYear() === year;
                return (
                  <div
                    key={year}
                    className={`absolute top-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                      hoveredEntry && !isHoveredYear ? 'opacity-30 scale-90' : 'opacity-100 scale-100'
                    }`}
                    style={{ left: `${((year - minYear) / (yearRange - 1)) * 100}%` }}
                  >
                    <div className={`absolute left-1/2 -translate-x-1/2 font-mono whitespace-nowrap transition-all duration-500 ${
                      isHoveredYear
                        ? 'top-3 text-base md:text-lg font-bold text-gray-900 dark:text-white scale-110'
                        : 'top-3 text-sm md:text-base font-semibold text-gray-500 dark:text-gray-500'
                    }`}>
                      {year}
                    </div>
                  </div>
                );
              })}

              {/* Entry dots and ranges */}
              {entries.map((entry, entryIndex) => {
                const animationDelay = isVisible ? `${entryIndex * 30}ms` : '0ms';
                const startYear = entry.date.getFullYear();
                const endDate = getEndDate(entry);
                const isRange = (entry.type === 'education' || entry.type === 'career') && endDate;

                const config = typeColors[entry.type];
                const isHovered = hoveredEntry?.id === entry.id;

                // Vertical offsets based on type
                // Top: education, career, awards | Bottom: publications, presentations
                const verticalOffsets: Record<EntryType, number> = {
                  education: -150,
                  career: -100,
                  award: -50,
                  publication: 50,
                  presentation: 100
                };

                const yOffset = verticalOffsets[entry.type];
                const timelineWidth = timelineRef.current?.offsetWidth || 1;

                if (isRange && endDate) {
                  // Render as a range bar for education and career
                  const endYear = endDate.getFullYear();
                  const startPosition = ((startYear - minYear) / (yearRange - 1)) * 100;
                  const endPosition = ((endYear - minYear) / (yearRange - 1)) * 100;

                  const barX = (startPosition / 100) * timelineWidth;
                  const barWidth = ((endPosition - startPosition) / 100) * timelineWidth;

                  // Apply vertical jitter for overlapping ranges
                  const verticalJitter = getVerticalOffset(entry, entries);
                  const adjustedYOffset = yOffset + verticalJitter;
                  const barY = 250 + adjustedYOffset;

                  // Calculate magnification based on mouse proximity to bar center
                  const barCenterX = barX + barWidth / 2;
                  const magnificationScale = getMagnificationScale(barCenterX, barY, isHovered);

                  return (
                    <div
                      key={entry.id}
                      className="absolute top-1/2"
                      style={{
                        left: `${startPosition}%`,
                        width: `${endPosition - startPosition}%`,
                        zIndex: isHovered ? 25 : 10,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                        transition: `opacity 0.6s ease-out ${animationDelay}, transform 0.6s ease-out ${animationDelay}`
                      }}
                    >
                      {/* Range bar */}
                      <div
                        className="absolute cursor-pointer"
                        style={{
                          top: adjustedYOffset,
                          left: 0,
                          right: 0,
                          height: `${6 * magnificationScale}px`,
                          backgroundColor: `rgba(${config.rgb}, ${isHovered ? 0.9 : 0.7})`,
                          border: `${Math.max(2, 3 * magnificationScale)}px solid`,
                          borderColor: isHovered ? 'rgb(0, 0, 0)' : `rgba(${config.rgb}, 1)`,
                          transform: `translateY(-50%)`,
                          transition: mousePosition ? 'all 0.15s ease-out' : 'all 0.3s ease-out',
                          boxShadow: isHovered
                            ? `0 0 30px rgba(${config.rgb}, 0.8), 0 0 60px rgba(${config.rgb}, 0.4)`
                            : `0 0 10px rgba(${config.rgb}, 0.2)`
                        }}
                        onMouseEnter={() => setHoveredEntry(entry)}
                        onMouseLeave={() => setHoveredEntry(null)}
                        onClick={() => handleEntryClick(entry)}
                      />

                      {/* Start marker */}
                      <div
                        className="absolute"
                        style={{
                          left: 0,
                          top: adjustedYOffset,
                          transform: `translate(-50%, -50%) scale(${magnificationScale})`,
                          transition: mousePosition ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out'
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full ${config.bg} border-[2px] border-black dark:border-white`} />
                      </div>

                      {/* End marker */}
                      <div
                        className="absolute"
                        style={{
                          right: 0,
                          top: adjustedYOffset,
                          transform: `translate(50%, -50%) scale(${magnificationScale})`,
                          transition: mousePosition ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out'
                        }}
                      >
                        <div className={`w-4 h-4 ${endDate.getTime() > Date.now() - 86400000 ? 'rounded-sm' : 'rounded-full'} ${config.bg} border-[2px] border-black dark:border-white`} />
                      </div>
                    </div>
                  );
                }

                // Render as a single point for awards, publications, presentations
                const basePosition = ((startYear - minYear) / (yearRange - 1)) * 100;
                const horizontalOffset = getHorizontalOffset(entry);
                const position = basePosition + horizontalOffset;
                const dotX = (position / 100) * timelineWidth;
                const dotY = 250 + yOffset;
                const magnificationScale = getMagnificationScale(dotX, dotY, isHovered);

                return (
                  <div
                    key={entry.id}
                    className="absolute top-1/2"
                    style={{
                      left: `${position}%`,
                      zIndex: isHovered ? 25 : 10,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.5s ease-out ${animationDelay}, transform 0.5s ease-out ${animationDelay}`
                    }}
                  >
                    {/* Connection line - NOT scaled, positioned at dot location */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out pointer-events-none"
                      style={{
                        width: isHovered ? '3px' : '2px',
                        height: `${Math.abs(yOffset)}px`,
                        top: yOffset > 0 ? '0' : yOffset,
                        opacity: isHovered ? 1 : 0.3,
                        background: `rgba(${config.rgb}, ${isHovered ? 1 : 0.4})`
                      }}
                    />

                    {/* Dot container - scales based on proximity (dock-style) */}
                    <div
                      className="absolute cursor-pointer group"
                      style={{
                        left: 0,
                        top: 0,
                        transform: `translate(-50%, ${yOffset}px) scale(${magnificationScale})`,
                        transition: mousePosition ? 'transform 0.15s ease-out' : 'transform 0.3s ease-out'
                      }}
                      onMouseEnter={() => setHoveredEntry(entry)}
                      onMouseLeave={() => setHoveredEntry(null)}
                      onClick={() => handleEntryClick(entry)}
                    >
                      {/* Main dot */}
                      <div
                        className={`relative w-6 h-6 rounded-full border-[3px] border-black dark:border-white ${config.bg} transition-all duration-300`}
                        style={{
                          boxShadow: isHovered
                            ? `0 0 30px rgba(${config.rgb}, 0.8), 0 0 60px rgba(${config.rgb}, 0.4)`
                            : `0 0 10px rgba(${config.rgb}, 0.3)`
                        }}
                      >
                        {/* Glow effect on hover - positioned relative to dot */}
                        {isHovered && (
                          <div
                            className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                            style={{
                              backgroundColor: `rgba(${config.rgb}, 0.4)`
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Legend - enhanced with better spacing */}
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-xs font-mono">
          {Object.entries(typeColors).map(([type, config]) => (
            <div key={type} className="flex items-center gap-2.5 group">
              <div
                className={`w-4 h-4 rounded-full ${config.bg} border-2 border-black dark:border-white transition-transform group-hover:scale-125`}
              />
              <span className="uppercase tracking-wider text-gray-700 dark:text-gray-300 font-semibold">
                {config.label}
              </span>
            </div>
          ))}
        </div>
      </div>

        {/* CSS animations */}
        <style jsx>{`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.85);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </section>
    </>
  );
}
