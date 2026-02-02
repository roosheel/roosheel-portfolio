'use client';

import { useState, useEffect, useRef } from 'react';
import TimelineHero from '@/components/timeline/TimelineHero';
import HorizontalTimeline from '@/components/timeline/HorizontalTimeline';
import ParallelTimelines from '@/components/timeline/ParallelTimelines';
import DetailPanel from '@/components/timeline/DetailPanel';
import { allTimelineEntries, educationTimeline, careerTimeline, publicationTimeline } from '@/data/timelineData';
import { TimelineEntry } from '@/types/timeline';

export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const scrollPositionRef = useRef(0);

  // Proper scroll lock when detail panel opens
  useEffect(() => {
    if (selectedEntry) {
      // Lock scroll
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else if (scrollPositionRef.current !== null) {
      // Unlock scroll - restore after body position is reset
      const scrollPosition = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      // Restore scroll after DOM updates
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant' as ScrollBehavior
        });
      });
    }

    return () => {
      // Cleanup on unmount
      if (document.body.style.position === 'fixed') {
        const scrollPosition = scrollPositionRef.current;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollPosition);
      }
    };
  }, [selectedEntry]);

  return (
    <>
      <main
        className={`min-h-screen transition-all duration-500 ease-out ${
          selectedEntry
            ? 'md:mr-[45vw] lg:mr-[35vw] xl:mr-[30vw]'
            : 'mr-0'
        }`}
        style={{
          willChange: selectedEntry ? 'transform, margin' : 'auto',
          contain: 'layout'
        }}
      >
        <TimelineHero />
        <HorizontalTimeline
          entries={allTimelineEntries}
          onEntryClick={setSelectedEntry}
        />
        <ParallelTimelines
          educationEntries={educationTimeline}
          careerEntries={careerTimeline}
          publicationEntries={publicationTimeline}
          onEntryClick={setSelectedEntry}
        />
      </main>
      <DetailPanel entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
