export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Data Science',
    skills: ['R', 'Python', 'Bash/Linux', 'Git', 'LaTeX', 'SQL', 'SLURM', 'AWS', 'GCP'],
  },
  {
    category: 'Multimodal Genomics',
    skills: [
      'WGS',
      'WES',
      'RNA-seq',
      'scRNA-seq',
      'snRNA-seq',
      'spatial transcriptomics',
      'TCR-seq',
      'ATAC-seq',
      'ChIP-seq',
      'DNA methylation',
      'ChIA-PET',
      'Hi-C',
      'GWAS',
    ],
  },
  {
    category: 'Clinico-epidemiological Data Analysis',
    skills: [
      'survival analysis',
      'power analysis',
      'hypothesis testing',
      'linear/logistic regression',
      'mixed-effects models',
      'multivariate statistics',
    ],
  },
  {
    category: 'ML/AI',
    skills: [
      'scikit-learn',
      'TensorFlow',
      'PyTorch',
      'xgboost',
      'random forest',
      'SVM',
      'neural networks',
      'feature engineering',
      'hyperparameter tuning',
    ],
  },
  {
    category: 'Pipelines and Workflow Management',
    skills: ['Nextflow', 'Snakemake', 'Docker', 'Singularity', 'Conda'],
  },
  {
    category: 'Image Analysis',
    skills: ['QuPath', 'ImageJ', 'CellProfiler', 'ilastik'],
  },
  {
    category: 'Databases',
    skills: [
      'UCSC Genome Browser',
      'Ensembl',
      'NCBI GEO',
      'GTEx',
      'TCGA',
      'gnomAD',
      'ClinVar',
      'OncoKB',
      'cBioPortal',
    ],
  },
];
