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
    } else {
      // Unlock scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [selectedEntry]);

  return (
    <>
      <main
        className={`min-h-screen transition-all duration-500 ease-out ${
          selectedEntry
            ? 'md:mr-[45vw] lg:mr-[35vw] xl:mr-[30vw] scale-[0.85] origin-left'
            : 'mr-0 scale-100'
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
