# Timeline Portfolio Design

**Date:** 2026-02-01
**Type:** Complete redesign
**Goal:** Transform traditional portfolio into an immersive, scroll-driven timeline experience

## Overview

This design transforms the existing portfolio website into a beautiful, interactive timeline that weaves together academic and professional achievements in a unified narrative. The experience prioritizes elegant minimalism enhanced with Oatly-inspired bold typography and strong visual accents, creating a professional yet distinctive portfolio that balances academic credibility with personality.

## Design Principles

1. **Holistic narrative** - Blend professional milestones and academic achievements to show how they intersect
2. **Scroll-driven storytelling** - Create an immersive experience that reveals content progressively as users scroll
3. **Minimalist elegance with bold accents** - Clean layout with Oatly-inspired strong typography, borders, and category badges
4. **High contrast & clarity** - Bold headlines, strong borders, clear visual hierarchy
5. **Content-first** - Let achievements speak for themselves, enhanced by purposeful design
6. **Accessible & performant** - Support all devices, respect reduced motion preferences, optimize performance

## Visual Inspiration: Oatly Elements

Selective incorporation of Oatly's distinctive aesthetic:
- **Bold condensed typography** - Impactful headlines that demand attention
- **Strong borders** - 2-3px solid borders on cards for definition and structure
- **Category badges** - Colored labels identifying entry types (Career, Publication, Award, etc.)
- **High contrast** - Black borders and bold text against clean backgrounds
- **Utilitarian clarity** - Straightforward, functional design without unnecessary decoration

These elements add personality while maintaining professional credibility appropriate for an academic/research portfolio.

## User Experience Flow

### 1. Hero Introduction
Users land on a full-viewport hero section featuring:
- Name in large, elegant typography (48-72px)
- Professional tagline: "Computational Biologist | Translational Scientist | Genomics Researcher"
- Professional photo positioned elegantly (left or right third)
- Subtle scroll indicator: "Scroll to explore my journey"
- Dark/light theme toggle in top corner

### 2. Timeline Beginning - "Present"
Immediately below hero, timeline begins with current position:
- Visual indicator: "Today" or "Present"
- First entry: Current role at TempusAI
- Recent publications/awards from current period
- Establishes immediate context of "where they are now"

### 3. Narrative Reversal Point
After current role, a visual transition appears:
- Section break with text: "How I got here" or "The Journey"
- Slightly larger gap in timeline
- Subtle decorative element (gradient or rewind icon)
- Signals chronological shift

### 4. Complete Journey - Past to Present
Timeline reverses to earliest experiences:
- Starts with first education/job
- Flows chronologically forward (oldest → newest)
- All entry types integrated: experience, education, publications, awards, presentations
- Ends back at current position

### 5. Contact & Footer
Clean conclusion with:
- "Let's connect" heading
- Professional profile links (LinkedIn, GitHub, email)
- Minimal footer with copyright

## Visual Design

### Layout Structure

**Desktop (1024px+)**
- Vertical timeline line positioned 100-120px from left edge
- Timeline entries extend to the right
- Cards max-width ~700px for optimal readability
- Generous whitespace throughout

**Timeline Components**
- Thin vertical line (2px) running down left side
- Circular nodes/dots on timeline (12-16px diameter)
- Date labels positioned directly on timeline
- Content cards floating to the right with subtle shadows

**Entry Types - Visual Distinction**
Each entry type has unique visual markers:

1. **Career Positions**
   - Solid circle, primary accent color (blue)
   - Card includes company logo space
   - Title, organization, location, date range
   - 2-3 key accomplishments in summary

2. **Education**
   - Outlined circle, secondary color (purple/indigo)
   - Graduation cap icon
   - Degree, institution, location, date range
   - Key achievements or focus areas

3. **Publications**
   - Smaller filled dot, tertiary color (green)
   - Document icon
   - Title, journal/venue, year, co-authors
   - One-sentence impact statement
   - Expandable to full abstract + significance summary

4. **Awards/Recognition**
   - Star-shaped marker, gold/amber color
   - Award name, granting organization
   - Brief description (one line)

5. **Presentations**
   - Diamond shape, teal color
   - Title, conference/venue, location, date

### Typography System

**Hierarchy** (Oatly-inspired bold headlines)
- Hero name: 48-72px, bold condensed sans-serif for impact
- Entry titles: 24-28px bold/black weight, condensed for punch
- Timeline dates: 12-14px, small caps or uppercase, monospace feel
- Organizations: 16-18px medium weight, secondary color
- Body text: 15-16px regular, line-height 1.6-1.7, clean sans-serif
- Modal content: Similar hierarchy, optimized for reading

**Font Choices**
- Headlines: Condensed bold sans-serif (e.g., Archivo Narrow, Barlow Condensed, or Inter Tight at 700+ weight)
- Body: Inter or existing font for readability
- Dates/labels: Monospace or tight condensed (e.g., JetBrains Mono, Space Mono)
- Balance bold headlines for impact with clean body for professionalism

### Color System

**Timeline & Markers**
- Timeline line: Light gray (#E5E7EB) in light mode, subtle gray (#374151) in dark mode
- Career: Blue accent (#3B82F6)
- Education: Purple/indigo (#8B5CF6)
- Publications: Green (#10B981)
- Awards: Amber/gold (#F59E0B)
- Presentations: Teal (#14B8A6)

**Cards & Surfaces** (Oatly-inspired borders)
- Light mode: White cards (#FFFFFF) with strong 2-3px black border (#000000)
- Dark mode: Dark surface (#1F2937) with strong 2-3px light border (#E5E7EB)
- Border style: Solid, clean lines (not rounded corners - keep sharp for Oatly feel)
- Subtle inner shadow for depth (optional, keep minimal)
- High contrast text for accessibility (WCAG AA minimum)

**Category Badges** (Oatly-inspired)
- Small colored rectangles in top-right corner of each card
- Solid background color matching entry type
- White or black text (depending on contrast)
- Uppercase, bold, condensed font at 10-12px
- Examples: "CAREER" (blue), "PUBLICATION" (green), "AWARD" (gold)
- Border: 1-2px black outline for definition

**Interactive States**
- Hover: Border thickens slightly (2px → 3px) or color intensifies
- Focus: Strong focus ring for keyboard navigation
- Active: Slight border color shift to entry type color

### Spacing & Rhythm

**Vertical Spacing**
- Between entries: 80-120px (varies by content density)
- Section transitions: 160-200px
- Hero to timeline: 80px

**Card Padding**
- Desktop: 24-32px
- Mobile: 16-20px

**Visual Rhythm**
- Consistent spacing creates natural reading pace
- Larger gaps at narrative transitions
- Entry density varies (publications denser than career entries)

## Interaction Design

### Scroll-Driven Animations

**Entry Reveal**
When entry reaches ~70% viewport height:
1. Fade in: opacity 0 → 1 (300ms ease-out)
2. Slide in: translate X 30px → 0 (300ms ease-out)
3. Timeline dot: simultaneous scale animation (0.8 → 1)

**Timeline Line Drawing**
- Line "draws" smoothly as user scrolls
- Uses CSS mask or clip-path for performance
- Synced with entry reveals

**Animation Sequence**
- One entry at a time to maintain focus
- Stagger delay between multiple simultaneous elements (50ms)
- Respects prefers-reduced-motion (instant appearance instead)

### Entry Interactions

**Summary View (Default)**
- Shows concise preview of entry
- Subtle visual affordance for expansion (light border on hover, small icon)
- Cursor changes to pointer on hover

**Expanded View (Modal)**
Clicking any entry opens modal with:
- Full content beautifully formatted
- Publications: complete abstract + significance summary (2-3 sentences explaining research impact in accessible language)
- Career: all accomplishments listed
- Smooth entry animation (fade + slight scale)
- Easy dismiss: click outside, ESC key, or close button
- Backdrop blur for depth
- Prevents body scroll while open

**Keyboard Navigation**
- Tab through timeline entries
- Enter/Space to expand
- ESC to close modal
- Arrow keys to navigate between entries (optional enhancement)

### Pure Scroll Experience

**No Filtering**
- Continuous chronological journey
- No filter buttons or category toggles
- Maintains immersive storytelling flow

**No Jump Navigation**
- No year markers or quick links
- Encourages complete narrative experience
- Scroll position indicates progress naturally

## Mobile Responsive Design

### Breakpoints
- Desktop: 1024px+
- Tablet: 768-1023px
- Mobile: <768px

### Mobile Adaptations (<768px)

**Layout Changes**
- Timeline line removed (reduces clutter)
- Single-column, center-aligned stack
- Full-width cards with 16-20px margins
- Entry type indicated by color bar or badge at top of card

**Card Structure**
- Category badge/color at top
- Date prominent in header
- Same content hierarchy, optimized spacing
- Reduced padding (16-20px)

**Interactions**
- Tap to expand (full-screen modal)
- Swipe down to dismiss
- Larger touch targets (44px minimum)
- Optimized scroll performance

**Hero Adaptation**
- Name scales to 32-40px
- Photo smaller or repositions above text
- Tagline readable at 16-18px
- Maintains visual hierarchy

**Performance Optimizations**
- Lazy load entries below fold
- Reduce animation complexity on low-end devices
- Optimize images for mobile bandwidth
- Use Intersection Observer for efficient scroll detection

## Technical Implementation

### Component Architecture

**Main Components**
```
TimelineHero - Hero intro section
Timeline - Main container with scroll detection
TimelineEntry - Individual timeline entries with animation
EntryCard - Card component with type-based variants
EntryModal - Expandable detail view
ThemeToggle - Existing component (reuse)
```

**Component Responsibilities**
- `TimelineHero`: Renders hero section, handles theme toggle
- `Timeline`: Manages scroll position, triggers animations, renders all entries
- `TimelineEntry`: Wraps EntryCard, handles Intersection Observer, applies animations
- `EntryCard`: Renders summary view, handles click to expand, type-specific styling
- `EntryModal`: Full-screen overlay, renders complete content, handles dismiss

### Data Structure

**Unified Timeline Data**
Merge existing data files into single timeline structure:

```typescript
interface TimelineEntry {
  id: string;
  type: 'career' | 'education' | 'publication' | 'award' | 'presentation';
  date: Date; // For sorting
  displayDate: string; // For display (e.g., "Jan 2022 - Present")

  // Common fields
  title: string;
  organization?: string;
  location?: string;

  // Content
  summary: string[]; // 2-3 key points for card view
  fullContent?: string[]; // Complete list for modal

  // Type-specific fields
  metadata?: {
    // Publications
    journal?: string;
    authors?: string[];
    abstract?: string;
    significance?: string; // Plain-language research impact
    link?: string;

    // Career/Education
    accomplishments?: string[];

    // Awards
    description?: string;

    // Presentations
    conference?: string;
  };
}
```

**Data Sorting**
1. Create unified array from all data sources
2. Sort by date
3. Split into "present" (current role + recent items) and "journey" (all items chronologically)
4. Render present section, then transition, then journey section

### Animation Implementation

**Recommended Libraries**
- **Framer Motion**: Rich animation features, excellent React integration
- **React Intersection Observer**: Efficient scroll detection
- Alternative: CSS-only with Intersection Observer API

**Performance Considerations**
- Use CSS transforms (GPU-accelerated)
- Avoid layout thrashing
- Debounce scroll events if needed
- Virtual scrolling if timeline exceeds ~100 entries (unlikely)
- Lazy load images below fold

**Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Dark Mode Implementation

**Theme System**
- Reuse existing next-themes setup
- Add timeline-specific color variables
- Ensure all entry type colors work in both modes
- Test contrast ratios for accessibility

**Color Variables**
```css
:root {
  --timeline-line: #E5E7EB;
  --timeline-career: #3B82F6;
  --timeline-education: #8B5CF6;
  /* etc. */
}

.dark {
  --timeline-line: #374151;
  /* Adjust all colors for dark mode */
}
```

## Implementation Phases

### Phase 1: Data & Structure
- Create unified timeline data structure
- Merge existing data files
- Add publication significance summaries
- Set up new component architecture

### Phase 2: Core Timeline Layout
- Build TimelineHero component
- Build Timeline container with basic layout
- Implement vertical timeline line
- Create TimelineEntry wrapper with entry type styling
- Desktop layout (left-aligned timeline with cards)

### Phase 3: Animations & Interactions
- Implement Intersection Observer for scroll detection
- Add fade/slide animations to entries
- Build EntryModal for expanded view
- Add hover states and transitions
- Timeline line drawing effect

### Phase 4: Mobile Responsive
- Adapt layout for tablet/mobile breakpoints
- Remove timeline line on mobile
- Optimize touch interactions
- Test performance on various devices

### Phase 5: Polish & Performance
- Optimize animations and performance
- Add reduced motion support
- Accessibility audit (keyboard nav, screen readers)
- Cross-browser testing
- Final visual polish

## Success Criteria

**User Experience**
- ✅ Smooth, performant scroll experience (60fps)
- ✅ Intuitive navigation without instructions
- ✅ Content is easy to read and understand
- ✅ Animations enhance rather than distract
- ✅ Works seamlessly on all devices

**Visual Design**
- ✅ Achieves minimalist, elegant aesthetic
- ✅ Typography hierarchy is clear
- ✅ Color system is cohesive and accessible
- ✅ Spacing creates comfortable rhythm
- ✅ Visual distinction between entry types is clear

**Technical**
- ✅ Lighthouse score 90+ (performance, accessibility, SEO)
- ✅ No layout shift or jank during scroll
- ✅ Fast initial load (<3s on 3G)
- ✅ Accessible (WCAG AA minimum)
- ✅ SEO optimized

**Content**
- ✅ All existing content preserved and integrated
- ✅ Publications include significance summaries
- ✅ Story flows naturally from present to past to present
- ✅ Entry summaries are concise yet meaningful

## Future Enhancements (Post-MVP)

- Search functionality for finding specific entries
- Print-friendly resume view
- Share specific timeline entries via URL anchors
- Add project portfolio entries with images/demos
- Integration with Google Scholar for auto-updating publications
- Analytics to track which entries get most attention

---

**Next Steps:**
1. Set up isolated git worktree for development
2. Create detailed implementation plan
3. Begin Phase 1: Data & Structure
