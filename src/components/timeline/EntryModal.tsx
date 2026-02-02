'use client';

import { useEffect } from 'react';
import { TimelineEntry, EntryType } from '@/types/timeline';
import { X, ExternalLink } from 'lucide-react';

interface EntryModalProps {
  entry: TimelineEntry | null;
  onClose: () => void;
}

const typeConfig: Record<EntryType, {
  bgColor: string;
  label: string;
}> = {
  career: { bgColor: 'bg-blue-500', label: 'CAREER' },
  education: { bgColor: 'bg-purple-500', label: 'EDUCATION' },
  publication: { bgColor: 'bg-emerald-500', label: 'PUBLICATION' },
  award: { bgColor: 'bg-amber-500', label: 'AWARD' },
  presentation: { bgColor: 'bg-teal-500', label: 'PRESENTATION' }
};

export default function EntryModal({ entry, onClose }: EntryModalProps) {
  useEffect(() => {
    if (entry) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [entry, onClose]);

  if (!entry) return null;

  const config = typeConfig[entry.type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-gray-800 border-[4px] border-black dark:border-white max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b-[3px] border-black dark:border-white z-10">
          <div className="flex items-start justify-between p-6 md:p-8">
            <div className="flex-1 pr-4">
              {/* Category badge */}
              <div className={`inline-block ${config.bgColor} px-3 py-1 border-[2px] border-black dark:border-white mb-4`}>
                <span className="font-mono text-[10px] font-bold tracking-widest text-white">
                  {config.label}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                {entry.title}
              </h2>

              {/* Meta info */}
              <div className="mt-3 space-y-1">
                {entry.organization && (
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    {entry.organization}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  <span>{entry.displayDate}</span>
                  {entry.location && <span>• {entry.location}</span>}
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-black dark:border-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Career/Education accomplishments */}
          {(entry.type === 'career' || entry.type === 'education') && entry.fullContent && (
            <div>
              <h3 className="font-headline text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {entry.type === 'career' ? 'Key Accomplishments' : 'Highlights'}
              </h3>
              <ul className="space-y-3">
                {entry.fullContent.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {entry.metadata?.gpa && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-mono font-semibold">GPA:</span> {entry.metadata.gpa}
                    {entry.metadata.honors && ` • ${entry.metadata.honors}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Publication details */}
          {entry.type === 'publication' && (
            <div className="space-y-6">
              {entry.metadata?.authors && (
                <div>
                  <h3 className="font-headline text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Authors
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {entry.metadata.authors}
                  </p>
                </div>
              )}

              {entry.metadata?.significance && (
                <div>
                  <h3 className="font-headline text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Research Impact
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {entry.metadata.significance}
                  </p>
                </div>
              )}

              {(entry.metadata?.doi || entry.metadata?.pmid) && (
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {entry.metadata.link && (
                    <a
                      href={entry.metadata.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                      <span>View Publication</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {entry.metadata.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${entry.metadata.pmid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span>PubMed</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Award description */}
          {entry.type === 'award' && entry.metadata?.description && (
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {entry.metadata.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
