export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  gpa: string;
  honors?: string;
  accomplishments?: string[];
}

export const education: Education[] = [
  {
    institution: 'Icahn School of Medicine at Mount Sinai',
    degree: 'PhD',
    field: 'Biomedical Sciences',
    location: 'New York, NY',
    period: '2019 - 2022',
    gpa: '3.9/4',
    accomplishments: [
      'Developed and validated a novel data-driven method, employing GWAS, single-cell RNA-seq, and bulk RNA-seq analyses, for prioritizing disease-associated cell types across 200+ complex traits and diseases (e.g., Alzheimer\'s, Schizophrenia, Obesity, Diabetes, etc.). This approach is now implemented as a widely-used open-source tool',
      'Secured $3M+ in extramural funding through effective grant proposals and pilot grant programs',
      'Performed large-scale integrative genomics analyses of diverse multi-modal datasets (e.g., single-cell/spatial transcriptomics, GWAS) consisting of >500K single cells from post-mortem brains to identify novel therapeutic targets for neuropsychiatric disorders',
      'Performed QC, normalization, batch correction, dimensionality reduction, clustering, feature selection, differential expression, functional enrichment, trajectory, and cell-cell communication analyses; interpreted results in disease-relevant context',
    ],
  },
  {
    institution: 'Icahn School of Medicine at Mount Sinai',
    degree: 'MS',
    field: 'Biomedical Sciences',
    location: 'New York, NY',
    period: '2017 - 2019',
    gpa: '3.9/4',
  },
  {
    institution: 'Texas A&M University',
    degree: 'BS',
    field: 'Biochemistry',
    location: 'College Station, TX',
    period: '2011 - 2015',
    gpa: '3.7/4',
    honors: 'Honors',
  },
];
