export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  gpa: string;
  honors?: string;
}

export const education: Education[] = [
  {
    institution: 'Icahn School of Medicine at Mount Sinai',
    degree: 'MS/PhD',
    field: 'Biomedical Sciences',
    location: 'New York, NY',
    period: '2017 - 2022',
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
