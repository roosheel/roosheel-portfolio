'use client';

import { useState } from 'react';
import TimelineHero from '@/components/timeline/TimelineHero';
import HorizontalTimeline from '@/components/timeline/HorizontalTimeline';
import ParallelTimelines from '@/components/timeline/ParallelTimelines';
import DetailPanel from '@/components/timeline/DetailPanel';
import { allTimelineEntries, educationTimeline, careerTimeline, publicationTimeline } from '@/data/timelineData';
import { TimelineEntry } from '@/types/timeline';

export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);

  return (
    <>
      <main
        className={`min-h-screen transition-all duration-500 ease-out ${
          selectedEntry
            ? 'md:mr-[45vw] lg:mr-[35vw] xl:mr-[30vw] scale-[0.85] origin-left'
            : 'mr-0 scale-100'
        }`}
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
