'use client';

import { useEffect, useRef, useState } from 'react';
import { TimelineEntry as TimelineEntryType, EntryType } from '@/types/timeline';
import EntryCard from './EntryCard';
import DateRange from './DateRange';

interface TimelineEntryProps {
  entry: TimelineEntryType;
  onOpenModal: () => void;
  showTimeline?: boolean;
  isSelected?: boolean;
}

const typeColors: Record<EntryType, string> = {
  career: 'rgb(59 130 246)',
  education: 'rgb(139 92 246)',
  publication: 'rgb(16 185 129)',
  award: 'rgb(245 158 11)',
  presentation: 'rgb(20 184 166)'
};

export default function TimelineEntry({ entry, onOpenModal, showTimeline = true, isSelected = false }: TimelineEntryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const entryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px'
      }
    );

    if (entryRef.current) {
      observer.observe(entryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const dotColor = typeColors[entry.type];

  return (
    <div
      ref={entryRef}
      className={`relative transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: '100ms' }}
    >
      <div className="flex gap-8 md:gap-12">
        {/* Timeline section (desktop only) */}
        {showTimeline && (
          <div className="hidden md:flex flex-col items-center w-[120px] flex-shrink-0">
            {/* Date label */}
            <div className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4 text-center">
              <DateRange dateString={entry.displayDate} />
            </div>

            {/* Timeline dot */}
            <div
              className={`relative rounded-full border-[3px] flex-shrink-0 transition-all duration-300 ${
                isVisible ? 'scale-100' : 'scale-80'
              } ${isSelected ? 'w-6 h-6' : 'w-4 h-4'}`}
              style={{
                backgroundColor: entry.type === 'education' ? 'transparent' : dotColor,
                borderColor: dotColor,
                boxShadow: isSelected ? `0 0 0 4px ${dotColor}40` : 'none'
              }}
            >
              {/* Pulse effect on visible or selected */}
              {(isVisible || isSelected) && (
                <div
                  className={`absolute inset-0 rounded-full opacity-75 ${isSelected ? 'animate-pulse' : 'animate-ping'}`}
                  style={{ backgroundColor: dotColor }}
                />
              )}
            </div>
          </div>
        )}

        {/* Card section */}
        <div className="flex-1 max-w-2xl pb-20 md:pb-24">
          {/* Date for mobile */}
          <div className="md:hidden mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
              <DateRange dateString={entry.displayDate} />
            </span>
          </div>

          <EntryCard entry={entry} onClick={onOpenModal} />
        </div>
      </div>
    </div>
  );
}
