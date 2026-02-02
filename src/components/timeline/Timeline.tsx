'use client';

import { useState } from 'react';
import { TimelineEntry as TimelineEntryType } from '@/types/timeline';
import TimelineEntry from './TimelineEntry';
import EntryModal from './EntryModal';
import { RefreshCcw } from 'lucide-react';

interface TimelineProps {
  presentEntries: TimelineEntryType[];
  journeyEntries: TimelineEntryType[];
}

export default function Timeline({ presentEntries, journeyEntries }: TimelineProps) {
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntryType | null>(null);

  return (
    <>
      <section className="relative py-20 px-6 md:px-12">
        {/* Timeline line (desktop only) */}
        <div className="hidden md:block absolute left-[12%] top-0 bottom-0 w-[2px] bg-gray-300 dark:bg-gray-700" />

        <div className="max-w-6xl mx-auto">
          {/* Present Section */}
          <div className="mb-32">
            <div className="flex items-center gap-6 mb-16">
              <div className="font-headline text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
                PRESENT
              </div>
              <div className="h-1 flex-1 bg-gray-900 dark:bg-white" />
            </div>

            <div className="space-y-0">
              {presentEntries.map((entry) => (
                <TimelineEntry
                  key={entry.id}
                  entry={entry}
                  onOpenModal={() => setSelectedEntry(entry)}
                />
              ))}
            </div>
          </div>

          {/* Narrative Reversal Point */}
          <div className="relative py-24 mb-32">
            <div className="max-w-2xl mx-auto text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-black dark:border-white bg-white dark:bg-gray-800 mb-8">
                <RefreshCcw className="w-10 h-10 text-gray-900 dark:text-white" />
              </div>

              {/* Text */}
              <h2 className="font-headline text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
                THE JOURNEY
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 font-mono tracking-wide">
                How it all began
              </p>
            </div>

            {/* Decorative lines */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent -z-10" />
          </div>

          {/* Journey Section (chronological from oldest to newest) */}
          <div>
            <div className="space-y-0">
              {journeyEntries.map((entry) => (
                <TimelineEntry
                  key={entry.id}
                  entry={entry}
                  onOpenModal={() => setSelectedEntry(entry)}
                />
              ))}
            </div>
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

      {/* Modal */}
      <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
    </>
  );
}
