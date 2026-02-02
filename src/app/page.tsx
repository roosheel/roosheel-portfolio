'use client';

import { useState } from 'react';
import TimelineHero from '@/components/timeline/TimelineHero';
import HorizontalTimeline from '@/components/timeline/HorizontalTimeline';
import ParallelTimelines from '@/components/timeline/ParallelTimelines';
import EntryModal from '@/components/timeline/EntryModal';
import { allTimelineEntries, educationTimeline, careerTimeline, publicationTimeline } from '@/data/timelineData';
import { TimelineEntry } from '@/types/timeline';

export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);

  return (
    <main className="min-h-screen">
      <TimelineHero />
      <HorizontalTimeline
        entries={allTimelineEntries}
        onEntryClick={setSelectedEntry}
      />
      <ParallelTimelines
        educationEntries={educationTimeline}
        careerEntries={careerTimeline}
        publicationEntries={publicationTimeline}
      />
      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </main>
  );
}
