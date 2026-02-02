'use client';

import { TimelineEntry, EntryType } from '@/types/timeline';
import { Building2, GraduationCap, FileText, Award, Presentation } from 'lucide-react';

interface EntryCardProps {
  entry: TimelineEntry;
  onClick: () => void;
}

const highlightAuthorName = (text: string) => {
  // Match variations: "Patel RS", "Patel R", with optional comma/period after
  const parts = text.split(/(\bPatel\s+R[S]?\b[,.]?)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (/\bPatel\s+R[S]?\b/.test(part)) {
          return (
            <strong key={index} className="font-bold text-gray-900 dark:text-white">
              {part}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

const typeConfig: Record<EntryType, {
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
  icon: React.ReactNode;
}> = {
  career: {
    color: 'rgb(59 130 246)',
    bgColor: 'bg-blue-500',
    borderColor: 'border-blue-500',
    label: 'CAREER',
    icon: <Building2 className="w-4 h-4" />
  },
  education: {
    color: 'rgb(139 92 246)',
    bgColor: 'bg-purple-500',
    borderColor: 'border-purple-500',
    label: 'EDUCATION',
    icon: <GraduationCap className="w-4 h-4" />
  },
  publication: {
    color: 'rgb(16 185 129)',
    bgColor: 'bg-emerald-500',
    borderColor: 'border-emerald-500',
    label: 'PUBLICATION',
    icon: <FileText className="w-4 h-4" />
  },
  award: {
    color: 'rgb(245 158 11)',
    bgColor: 'bg-amber-500',
    borderColor: 'border-amber-500',
    label: 'AWARD',
    icon: <Award className="w-4 h-4" />
  },
  presentation: {
    color: 'rgb(20 184 166)',
    bgColor: 'bg-teal-500',
    borderColor: 'border-teal-500',
    label: 'PRESENTATION',
    icon: <Presentation className="w-4 h-4" />
  }
};

export default function EntryCard({ entry, onClick }: EntryCardProps) {
  const config = typeConfig[entry.type];

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-800 border-[3px] border-black dark:border-white cursor-pointer transition-all duration-200 hover:border-[4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${entry.title}`}
    >
      {/* Category badge - top right corner */}
      <div
        className={`absolute -top-[1px] -right-[1px] ${config.bgColor} px-3 py-1 border-[2px] border-black dark:border-white`}
      >
        <span className="font-mono text-[10px] font-bold tracking-widest text-white">
          {config.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 pt-10">
        {/* Title - bold condensed */}
        <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 leading-tight">
          {entry.title}
        </h3>

        {/* Organization & Location */}
        {entry.organization && (
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-shrink-0 mt-1">
              {config.icon}
            </div>
            <div>
              <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
                {entry.organization}
              </p>
              {entry.location && (
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {entry.location}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-4 space-y-2">
          {entry.summary.slice(0, 3).map((item, idx) => (
            <p
              key={idx}
              className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {entry.type === 'career' || entry.type === 'education' ? (
                <span className="inline-block mr-2">•</span>
              ) : null}
              {entry.type === 'publication' || entry.type === 'presentation' ? (
                highlightAuthorName(item)
              ) : (
                item
              )}
            </p>
          ))}
        </div>

        {/* Expand hint */}
        <div className="mt-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          <span>Click to expand</span>
          <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Accent bar on left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: config.color }}
      />
    </div>
  );
}
