'use client';

import { useEffect } from 'react';
import { TimelineEntry, EntryType } from '@/types/timeline';
import { X, ExternalLink } from 'lucide-react';

interface DetailPanelProps {
  entry: TimelineEntry | null;
  onClose: () => void;
}

const typeConfig: Record<EntryType, {
  bgColor: string;
  label: string;
  rgb: string;
}> = {
  career: { bgColor: 'bg-blue-500', label: 'CAREER', rgb: '59, 130, 246' },
  education: { bgColor: 'bg-purple-500', label: 'EDUCATION', rgb: '139, 92, 246' },
  publication: { bgColor: 'bg-emerald-500', label: 'PUBLICATION', rgb: '16, 185, 129' },
  award: { bgColor: 'bg-amber-500', label: 'AWARD', rgb: '245, 158, 11' },
  presentation: { bgColor: 'bg-teal-500', label: 'PRESENTATION', rgb: '20, 184, 166' }
};

export default function DetailPanel({ entry, onClose }: DetailPanelProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && entry) onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [entry, onClose]);

  if (!entry) return null;

  const config = typeConfig[entry.type];

  return (
    <>
      {/* Backdrop overlay - semi-transparent */}
      <div
        className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        style={{
          animation: 'fadeIn 0.3s ease-out forwards'
        }}
      />

      {/* Side panel - slides in from right */}
      <div
        className="fixed right-0 top-0 bottom-0 w-full md:w-[45vw] lg:w-[35vw] xl:w-[30vw] bg-white dark:bg-gray-800 border-l-4 border-black dark:border-white z-50 overflow-y-auto shadow-[-20px_0_60px_0_rgba(0,0,0,0.3)] dark:shadow-[-20px_0_60px_0_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}
      >
        {/* Header with colored accent */}
        <div
          className="sticky top-0 z-10 border-b-4 border-black dark:border-white"
          style={{
            background: `linear-gradient(135deg, rgba(${config.rgb}, 0.15) 0%, rgba(${config.rgb}, 0.05) 100%)`
          }}
        >
          <div className="flex items-start justify-between p-6 md:p-8">
            <div className="flex-1 pr-4">
              {/* Category badge */}
              <div className={`inline-block ${config.bgColor} px-4 py-2 border-[3px] border-black dark:border-white mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]`}>
                <span className="font-mono text-xs font-bold tracking-widest text-white">
                  {config.label}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
                {entry.title}
              </h2>

              {/* Meta info */}
              <div className="space-y-2">
                {entry.organization && (
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {entry.organization}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-gray-600 dark:text-gray-400">
                  <span className="font-bold">{entry.displayDate}</span>
                  {entry.location && (
                    <>
                      <span>•</span>
                      <span>{entry.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Close button - elevated */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-[3px] border-black dark:border-white transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              aria-label="Close panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Decorative colored bar */}
          <div
            className="h-2"
            style={{ backgroundColor: `rgb(${config.rgb})` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Career/Education accomplishments */}
          {(entry.type === 'career' || entry.type === 'education') && entry.fullContent && (
            <div>
              <h3 className="font-headline text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <div
                  className="w-1.5 h-8"
                  style={{ backgroundColor: `rgb(${config.rgb})` }}
                />
                {entry.type === 'career' ? 'Key Accomplishments' : 'Highlights'}
              </h3>
              <ul className="space-y-4">
                {entry.fullContent.map((item, idx) => (
                  <li key={idx} className="flex gap-4 text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900 p-4 border-l-4" style={{ borderColor: `rgb(${config.rgb})` }}>
                    <span className="font-bold text-gray-400 flex-shrink-0 font-mono text-sm">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {entry.metadata?.gpa && (
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-[3px] border-black dark:border-white">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-mono font-bold">GPA:</span> {entry.metadata.gpa}
                    {entry.metadata.honors && ` • Graduated with ${entry.metadata.honors}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Publication details */}
          {entry.type === 'publication' && (
            <div className="space-y-8">
              {entry.metadata?.authors && (
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                    <div
                      className="w-1.5 h-8"
                      style={{ backgroundColor: `rgb(${config.rgb})` }}
                    />
                    Authors
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-900 p-4 border-l-4" style={{ borderColor: `rgb(${config.rgb})` }}>
                    {entry.metadata.authors}
                  </p>
                </div>
              )}

              {entry.metadata?.significance && (
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                    <div
                      className="w-1.5 h-8"
                      style={{ backgroundColor: `rgb(${config.rgb})` }}
                    />
                    Research Impact
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-6 border-[3px] border-black dark:border-white">
                    {entry.metadata.significance}
                  </p>
                </div>
              )}

              {(entry.metadata?.doi || entry.metadata?.pmid) && (
                <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                  {entry.metadata.link && (
                    <a
                      href={entry.metadata.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-[3px] border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    >
                      <span>View Publication</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {entry.metadata.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${entry.metadata.pmid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-black dark:border-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                    >
                      <span>PubMed</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Award/Presentation description */}
          {(entry.type === 'award' || entry.type === 'presentation') && entry.metadata?.description && (
            <div>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900 p-6 border-l-4" style={{ borderColor: `rgb(${config.rgb})` }}>
                {entry.metadata.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer with close hint */}
        <div className="sticky bottom-0 p-6 bg-gray-100 dark:bg-gray-950 border-t-4 border-black dark:border-white text-center">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-500">
            Press ESC or click outside to close
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
