'use client';

import { TimelineEntry } from '@/types/timeline';
import TimelineEntryComponent from './TimelineEntry';
import { GraduationCap, Briefcase, FileText } from 'lucide-react';

interface ParallelTimelinesProps {
  educationEntries: TimelineEntry[];
  careerEntries: TimelineEntry[];
  publicationEntries: TimelineEntry[];
  onEntryClick: (entry: TimelineEntry) => void;
  selectedEntryId?: string;
}

export default function ParallelTimelines({
  educationEntries,
  careerEntries,
  publicationEntries,
  onEntryClick,
  selectedEntryId
}: ParallelTimelinesProps) {

  const timelineColumns = [
    {
      title: 'EDUCATION',
      entries: educationEntries,
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'rgb(139 92 246)'
    },
    {
      title: 'CAREER',
      entries: careerEntries,
      icon: <Briefcase className="w-8 h-8" />,
      color: 'rgb(59 130 246)'
    },
    {
      title: 'PUBLICATIONS',
      entries: publicationEntries,
      icon: <FileText className="w-8 h-8" />,
      color: 'rgb(16 185 129)'
    }
  ];

  return (
    <>
      <section className="relative py-20 px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Section number */}
        <div className="absolute right-0 top-8 opacity-5 dark:opacity-10 pointer-events-none">
          <span className="font-headline text-[16rem] md:text-[20rem] font-black leading-none text-gray-900 dark:text-white">
            04
          </span>
        </div>

        <div className="w-full mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
              THE JOURNEY
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-mono tracking-wide">
              Three parallel paths of growth and achievement
            </p>
          </div>

          {/* Parallel timelines - 3 columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {timelineColumns.map((column) => (
              <div key={column.title} className="relative">
                {/* Column header */}
                <div className="sticky top-4 z-20 bg-white dark:bg-gray-900 pb-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-3 border-[3px] border-black dark:border-white"
                      style={{ backgroundColor: column.color }}
                    >
                      <div className="text-white">
                        {column.icon}
                      </div>
                    </div>
                    <h3 className="font-headline text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                      {column.title}
                    </h3>
                  </div>

                  {/* Timeline line for desktop */}
                  <div
                    className="hidden lg:block absolute left-[25px] top-20 bottom-0 w-[3px] opacity-30"
                    style={{ backgroundColor: column.color }}
                  />
                </div>

                {/* Entries */}
                <div className="space-y-12 relative">
                  {column.entries.map((entry) => (
                    <div key={entry.id} className="relative">
                      {/* Custom timeline dot positioned on the left */}
                      <div className="hidden lg:block absolute -left-3 top-0">
                        <div
                          className="w-6 h-6 rounded-full border-[3px] border-black dark:border-white"
                          style={{
                            backgroundColor: entry.type === 'education' ? 'transparent' : column.color,
                            borderColor: column.color
                          }}
                        />
                      </div>

                      {/* Entry card */}
                      <div className="lg:pl-8">
                        <TimelineEntryComponent
                          entry={entry}
                          onOpenModal={() => onEntryClick(entry)}
                          showTimeline={false}
                          isSelected={selectedEntryId === entry.id}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Entry count badge */}
                <div className="mt-12 text-center">
                  <div className="inline-block px-4 py-2 border-[2px] border-black dark:border-white bg-gray-100 dark:bg-gray-800">
                    <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                      {column.entries.length} {column.entries.length === 1 ? 'Entry' : 'Entries'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 px-6 md:px-12 bg-gray-50 dark:bg-gray-950 border-t-4 border-black dark:border-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">
            LET&apos;S CONNECT
          </h2>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
            Interested in collaboration or have questions about my work?
            <br />
            I&apos;d love to hear from you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a
              href="mailto:roosheel.patel@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-[3px] border-black dark:border-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/roosheel-patel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-[3px] border-black dark:border-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="/RESUME_ROOSHEELPATEL_WIDE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-[3px] border-black dark:border-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Footer */}
          <div className="pt-12 border-t-2 border-gray-300 dark:border-gray-700">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Roosheel Patel. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
