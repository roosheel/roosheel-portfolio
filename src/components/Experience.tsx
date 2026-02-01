'use client';

import { useState } from 'react';
import { experiences } from '@/data/experience';
import Section from './ui/Section';
import Card from './ui/Card';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <Section id="experience" title="Experience">
      <div className="space-y-6">
        {experiences.map((exp, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <Card key={index} className="transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exp.location} • {exp.period}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      {isExpanded ? (
                        <>
                          Hide details <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show details <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                      {exp.accomplishments.map((accomplishment, i) => (
                        <li key={i} className="leading-relaxed">
                          {accomplishment}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
