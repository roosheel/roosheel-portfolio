export type EntryType = 'career' | 'education' | 'publication' | 'award' | 'presentation';

export interface TimelineEntry {
  id: string;
  type: EntryType;
  date: Date;
  displayDate: string;

  // Common fields
  title: string;
  organization?: string;
  location?: string;

  // Content
  summary: string[];
  fullContent?: string[];

  // Type-specific metadata
  metadata?: {
    // Publications
    journal?: string;
    authors?: string;
    abstract?: string;
    significance?: string;
    link?: string;
    doi?: string;
    pmid?: string;

    // Career/Education
    accomplishments?: string[];
    degree?: string;
    field?: string;
    gpa?: string;
    honors?: string;
    position?: string;

    // Awards
    description?: string;

    // Presentations
    conference?: string;
  };
}
