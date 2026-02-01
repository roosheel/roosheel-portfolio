import { education } from '@/data/education';
import Section from './ui/Section';
import Card from './ui/Card';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, index) => (
          <Card key={index}>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 flex-shrink-0">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {edu.degree} {edu.honors && `- ${edu.honors}`}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                  {edu.field}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {edu.institution}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{edu.location}</span>
                  <span>•</span>
                  <span>{edu.period}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                  GPA: {edu.gpa}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
