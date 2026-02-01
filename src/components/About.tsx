import Section from './ui/Section';
import { Award, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: TrendingUp,
      label: '8+ years',
      description: 'Data science & computational biology experience',
    },
    {
      icon: BookOpen,
      label: '30+ publications',
      description: 'H-index 16',
    },
    {
      icon: DollarSign,
      label: '$20M+',
      description: 'Research funding contributed',
    },
    {
      icon: Award,
      label: 'Tier 1',
      description: 'Institutions & Fortune 500 companies',
    },
  ];

  return (
    <Section id="about" title="About">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a Senior Translational Scientist at TempusAI with expertise in translating
          complex multi-modal genomic data into actionable insights for precision medicine.
          My work spans computational biology, machine learning, and clinical data analysis,
          with a focus on developing robust pipelines for FDA submission-ready analyses and
          building predictive models for patient stratification.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          During my doctoral training at the Icahn School of Medicine at Mount Sinai, I
          developed novel data-driven methods for prioritizing disease-associated cell types
          across 200+ complex traits and diseases. My research integrates large-scale genomic
          datasets including single-cell RNA-seq, GWAS, and spatial transcriptomics to identify
          therapeutic targets for neuropsychiatric disorders.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <div
              key={highlight.label}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-dark-surface-light transition-transform hover:scale-105"
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 mb-3">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {highlight.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {highlight.description}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
