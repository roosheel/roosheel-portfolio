export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  accomplishments: string[];
}

export const experiences: Experience[] = [
  {
    company: 'TempusAI',
    position: 'Senior Translational Scientist I',
    location: 'Chicago, IL (Remote)',
    period: 'Jan 2022 - Present',
    accomplishments: [
      'Designed & developed robust data pipelines for FDA submission-ready analyses, facilitating seamless processing of clinical and multi-modal multi-omic data across diverse cohorts (N~10K patients)',
      'Built and deployed ML models to predict clinical endpoints using multimodal genomics data (WGS, WES, RNA-seq, etc.) in multi-cancer cohorts, enabling precision medicine for clinicians and patients',
      'Collaborate with external partners (pharma/biotech) to identify biomarkers (dMMR, TMB, IHC) and define optimal cutoffs to stratify patients for targeted therapies based on multi-modal genomic profiling and clinical outcomes',
      'Conducted power analyses, translating into cohort enrichment of nearly $17M',
      'Led team of computational biologists (N=7) to conduct biomarker analyses across diverse cancers, providing insights to C-suite that informed strategy to increase company valuation',
      'Mentored junior scientists, created documentation for data analysis guidelines, leading to an 80% decrease in the scientific errors for the entire organization',
    ],
  },
  {
    company: 'Icahn School of Medicine at Mount Sinai',
    position: 'Doctoral student',
    location: 'New York, NY',
    period: 'Aug 2017 - Jul 2022',
    accomplishments: [
      'Developed and validated a novel data-driven method, employing GWAS, single-cell RNA-seq, and bulk RNA-seq analyses, for prioritizing disease-associated cell types across 200+ complex traits and diseases (e.g., Alzheimer\'s, Schizophrenia, Obesity, Diabetes, etc.). This approach is now implemented as a widely-used open-source tool',
      'Secured $3M+ in extramural funding through effective grant proposals and pilot grant programs',
      'Performed large-scale integrative genomics analyses of diverse multi-modal datasets (e.g., single-cell/spatial transcriptomics, GWAS) consisting of >500K single cells from post-mortem brains to identify novel therapeutic targets for neuropsychiatric disorders',
      'Performed QC, normalization, batch correction, dimensionality reduction, clustering, feature selection, differential expression, functional enrichment, trajectory, and cell-cell communication analyses; interpreted results in disease-relevant context',
    ],
  },
  {
    company: 'McGovern Medical School',
    position: 'Research Technician',
    location: 'Houston, TX',
    period: 'Apr 2015 - Jul 2017',
    accomplishments: [
      'Conducted comprehensive analyses of RNA-seq (bulk and single-cell) and DNA methylation datasets, uncovering novel biomarkers associated with cancer',
      'Improved RNA-seq statistical analysis methods, including quality control, mapping, and differential expression',
      'Implemented multi-omics integration pipeline to identify correlated genes across multiple data types',
      'Managed a team of undergraduate students to conduct molecular and computational biology experiments',
    ],
  },
];
