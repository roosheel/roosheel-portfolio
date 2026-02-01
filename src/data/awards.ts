export interface Award {
  year: number;
  title: string;
  organization: string;
}

export const awards: Award[] = [
  {
    year: 2022,
    title: 'Terry Krulwich Thesis Dissertation Award',
    organization: 'Icahn School of Medicine at Mount Sinai',
  },
  {
    year: 2021,
    title: 'EVIW Best Talk',
    organization: 'Evolution and Variation in the Human Genome Workshop',
  },
  {
    year: 2016,
    title: 'McGovern Retreat Best Talk',
    organization: 'McGovern Medical School',
  },
  {
    year: 2014,
    title: 'Nelson Scholarship',
    organization: 'Texas A&M University',
  },
  {
    year: 2014,
    title: 'Texas A&M Research Week Best Talk',
    organization: 'Texas A&M University',
  },
];
