import { TimelineEntry } from '@/types/timeline';
import { experiences } from './experience';
import { education } from './education';
import { publications } from './publications';
import { awards } from './awards';
import { presentations } from './presentations';

// Helper to parse date strings
function parseDate(dateStr: string): Date {
  // Handle "Jan 2022 - Present" or "2017 - 2022" formats
  const startPart = dateStr.split(' - ')[0].trim();

  // Try to parse "Jan 2022" format
  const monthYear = startPart.match(/([A-Za-z]+)\s+(\d{4})/);
  if (monthYear) {
    const [, month, year] = monthYear;
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    return new Date(parseInt(year), monthMap[month] || 0);
  }

  // Try to parse just year
  const yearMatch = startPart.match(/(\d{4})/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0);
  }

  return new Date();
}

// Convert experience data
const careerEntries: TimelineEntry[] = experiences.map((exp, idx) => ({
  id: `career-${idx}`,
  type: 'career' as const,
  date: parseDate(exp.period),
  displayDate: exp.period,
  title: exp.position,
  organization: exp.company,
  location: exp.location,
  summary: exp.accomplishments.slice(0, 3),
  fullContent: exp.accomplishments,
  metadata: {
    position: exp.position,
    accomplishments: exp.accomplishments
  }
}));

// Convert education data
const educationEntries: TimelineEntry[] = education.map((edu, idx) => ({
  id: `education-${idx}`,
  type: 'education' as const,
  date: parseDate(edu.period),
  displayDate: edu.period,
  title: `${edu.degree} in ${edu.field}`,
  organization: edu.institution,
  location: edu.location,
  summary: [
    `GPA: ${edu.gpa}`,
    ...(edu.honors ? [`Graduated with ${edu.honors}`] : [])
  ],
  metadata: {
    degree: edu.degree,
    field: edu.field,
    gpa: edu.gpa,
    honors: edu.honors
  }
}));

// Convert publications data
const publicationEntries: TimelineEntry[] = publications.map((pub, idx) => {
  // Generate significance summary based on journal and topic
  let significance = '';
  const title = pub.title.toLowerCase();

  if (title.includes('sars-cov-2') || title.includes('covid')) {
    significance = 'Advanced understanding of SARS-CoV-2 viral mechanisms and potential therapeutic targets during the COVID-19 pandemic.';
  } else if (title.includes('autoimmun') || title.includes('down\'s syndrome')) {
    significance = 'Revealed novel mechanisms underlying autoimmune disorders, with implications for therapeutic interventions.';
  } else if (title.includes('single-cell') || title.includes('genomic')) {
    significance = 'Developed innovative computational methods for analyzing complex genomic data at single-cell resolution.';
  } else if (pub.journal.includes('Nature') || pub.journal.includes('Cell') || pub.journal.includes('Science')) {
    significance = 'Published in top-tier journal, contributing high-impact findings to the field of biomedical sciences.';
  } else {
    significance = 'Contributed novel insights to computational biology and genomics research.';
  }

  return {
    id: `publication-${idx}`,
    type: 'publication' as const,
    date: new Date(pub.year, 0),
    displayDate: pub.year.toString(),
    title: pub.title,
    organization: pub.journal,
    summary: [significance],
    fullContent: [pub.authors, significance],
    metadata: {
      journal: pub.journal,
      authors: pub.authors,
      significance,
      doi: pub.doi,
      pmid: pub.pmid,
      link: pub.doi ? `https://doi.org/${pub.doi}` : undefined
    }
  };
});

// Convert awards data
const awardEntries: TimelineEntry[] = awards.map((award, idx) => ({
  id: `award-${idx}`,
  type: 'award' as const,
  date: new Date(award.year, 0),
  displayDate: award.year.toString(),
  title: award.title,
  organization: award.organization,
  summary: [`Awarded by ${award.organization}`],
  metadata: {
    description: `Awarded by ${award.organization}`
  }
}));

// Convert presentations data
const presentationEntries: TimelineEntry[] = presentations.map((pres, idx) => ({
  id: `presentation-${idx}`,
  type: 'presentation' as const,
  date: new Date(pres.year, 0),
  displayDate: pres.year.toString(),
  title: pres.title,
  organization: pres.event,
  location: pres.location,
  summary: [`${pres.type === 'talk' ? 'Oral presentation' : 'Poster presentation'} at ${pres.event}`],
  metadata: {
    conference: pres.event,
    description: `${pres.type === 'talk' ? 'Talk' : 'Poster'} presented at ${pres.event}, ${pres.location}`
  }
}));

// Combine and sort all entries
export const allTimelineEntries: TimelineEntry[] = [
  ...careerEntries,
  ...educationEntries,
  ...publicationEntries,
  ...awardEntries,
  ...presentationEntries
].sort((a, b) => b.date.getTime() - a.date.getTime());

// Separate entries by category for parallel timelines
export const educationTimeline = educationEntries.sort((a, b) => a.date.getTime() - b.date.getTime());
export const careerTimeline = [...careerEntries, ...awardEntries, ...presentationEntries].sort((a, b) => a.date.getTime() - b.date.getTime());
export const publicationTimeline = publicationEntries.sort((a, b) => a.date.getTime() - b.date.getTime());

// Get current entries (most recent career + recent publications/awards)
export const presentEntries = allTimelineEntries.filter(entry => {
  if (entry.type === 'career' && entry.displayDate.includes('Present')) {
    return true;
  }
  if ((entry.type === 'publication' || entry.type === 'award') && entry.date.getFullYear() >= 2024) {
    return true;
  }
  return false;
});

// Get historical entries (sorted chronologically from oldest to newest)
export const journeyEntries = allTimelineEntries
  .filter(entry => !presentEntries.includes(entry))
  .sort((a, b) => a.date.getTime() - b.date.getTime());
