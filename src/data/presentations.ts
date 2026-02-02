export interface Presentation {
  title: string;
  event: string;
  location: string;
  year: number;
  type: 'talk' | 'poster';
}

export const presentations: Presentation[] = [
  {
    title: 'PRAME expression as a prognostic biomarker in NSCLC patients treated with immunotherapy',
    event: 'AACR Annual Meeting',
    location: 'Chicago, IL',
    year: 2025,
    type: 'poster',
  },
  {
    title: 'Cell type-specific genetic architecture of complex traits',
    event: 'Evolution and Variation in the Human Genome Workshop',
    location: 'Cold Spring Harbor, NY',
    year: 2021,
    type: 'talk',
  },
  {
    title: 'Identifying disease-relevant cell types using genomics',
    event: 'American Society of Human Genetics Annual Meeting',
    location: 'Virtual',
    year: 2020,
    type: 'poster',
  },
  {
    title: 'Single-cell genomics approaches to understanding brain disorders',
    event: 'Society for Neuroscience Annual Meeting',
    location: 'Chicago, IL',
    year: 2019,
    type: 'poster',
  },
  {
    title: 'Integrative genomics analysis of neuropsychiatric disorders',
    event: 'Icahn School of Medicine Research Symposium',
    location: 'New York, NY',
    year: 2019,
    type: 'talk',
  },
  {
    title: 'Novel computational methods for analyzing single-cell RNA-seq data',
    event: 'McGovern Medical School Research Retreat',
    location: 'Houston, TX',
    year: 2016,
    type: 'talk',
  },
  {
    title: 'Multi-omics integration in cancer research',
    event: 'Texas A&M University Research Week',
    location: 'College Station, TX',
    year: 2014,
    type: 'talk',
  },
  {
    title: 'Bioinformatics approaches to understanding gene regulation',
    event: 'Undergraduate Research Symposium',
    location: 'College Station, TX',
    year: 2014,
    type: 'poster',
  },
];
