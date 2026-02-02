'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import TimelineHero from '@/components/timeline/TimelineHero';
import About from '@/components/About';
import FeaturedProjects from '@/components/FeaturedProjects';
import HorizontalTimeline from '@/components/timeline/HorizontalTimeline';
import ParallelTimelines from '@/components/timeline/ParallelTimelines';
import GitHubActivity from '@/components/GitHubActivity';
import ScholarMetrics from '@/components/ScholarMetrics';
import DetailPanel from '@/components/timeline/DetailPanel';
import { allTimelineEntries, educationTimeline, careerTimeline, publicationTimeline } from '@/data/timelineData';
import { TimelineEntry } from '@/types/timeline';

export default function Home() {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);
  const scrollPositionRef = useRef(0);
  const previousEntryRef = useRef<TimelineEntry | null>(null);
  const isTransitioningRef = useRef(false);

  // Proper scroll lock when detail panel opens/closes (not on navigation between entries)
  useEffect(() => {
    const isPanelOpen = selectedEntry !== null;
    const wasPanelOpen = previousEntryRef.current !== null;

    // Determine if this is an open/close transition vs navigation
    const isOpeningOrClosing = isPanelOpen !== wasPanelOpen;
    isTransitioningRef.current = isOpeningOrClosing;

    // Only run scroll lock/unlock on open/close transitions, not on entry changes
    if (isPanelOpen && !wasPanelOpen) {
      // Panel just opened - lock scroll
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else if (!isPanelOpen && wasPanelOpen) {
      // Panel just closed - unlock scroll
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

    // Update the ref for next render
    previousEntryRef.current = selectedEntry;

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

  // Keyboard navigation for timeline entries
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedEntry) return;

      // Find current entry index in the chronological timeline
      const currentIndex = allTimelineEntries.findIndex(
        entry => entry.id === selectedEntry.id
      );

      if (currentIndex === -1) return;

      let newIndex = currentIndex;

      // Navigate with arrow keys
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        // Move to next (more recent) entry
        newIndex = Math.min(currentIndex + 1, allTimelineEntries.length - 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        // Move to previous (older) entry
        newIndex = Math.max(currentIndex - 1, 0);
      }

      if (newIndex !== currentIndex) {
        setSelectedEntry(allTimelineEntries[newIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEntry]);

  return (
    <>
      <Navigation />
      <main
        className={`min-h-screen ${
          selectedEntry
            ? 'md:mr-[45vw] lg:mr-[35vw] xl:mr-[30vw]'
            : 'mr-0'
        }`}
      >
        <TimelineHero />
        <About />
        <FeaturedProjects />
        <div id="timeline">
          <HorizontalTimeline
            entries={allTimelineEntries}
            onEntryClick={setSelectedEntry}
            selectedEntryId={selectedEntry?.id}
          />
          <ParallelTimelines
            educationEntries={educationTimeline}
            careerEntries={careerTimeline}
            publicationEntries={publicationTimeline}
            onEntryClick={setSelectedEntry}
            selectedEntryId={selectedEntry?.id}
          />
        </div>
        <GitHubActivity />
        <ScholarMetrics />
      </main>
      <DetailPanel entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
