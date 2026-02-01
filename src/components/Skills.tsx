import { skillCategories } from '@/data/skills';
import Section from './ui/Section';
import Badge from './ui/Badge';

export default function Skills() {
  return (
    <Section id="skills" title="Skills & Expertise">
      <div className="space-y-8">
        {skillCategories.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <Badge key={skillIndex}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
