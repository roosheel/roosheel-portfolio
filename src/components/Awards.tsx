import { awards } from '@/data/awards';
import Section from './ui/Section';
import { Trophy } from 'lucide-react';

export default function Awards() {
  return (
    <Section id="awards" title="Awards & Honors">
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-surface-light transition-colors"
          >
            <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/30 p-2 flex-shrink-0">
              <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {award.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {award.organization}
                  </p>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {award.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
