# Roosheel Patel - Portfolio Website

A modern, professional portfolio website showcasing computational biology expertise, publications, experience, and skills.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: Dark/Light mode with next-themes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
roosheel_website/
├── public/               # Static files including resume PDF
├── src/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   │   └── ui/         # Reusable UI components
│   ├── data/           # Content data files
│   └── lib/            # Utility functions
└── ...config files
```

## Updating Content

All content is stored in TypeScript files in the `src/data/` directory:

- `experience.ts` - Work experience
- `education.ts` - Education history
- `skills.ts` - Technical skills by category
- `publications.ts` - Publication list
- `awards.ts` - Awards and honors
- `presentations.ts` - Conference presentations

To update content, simply edit the relevant data file and rebuild.

## Deployment

This project is optimized for deployment on Vercel:

1. Push to GitHub
2. Import repository in Vercel
3. Deploy automatically

Alternatively, deploy to any platform that supports Next.js.

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle
- ✅ Smooth scroll navigation
- ✅ Searchable publications
- ✅ SEO optimized
- ✅ Fast performance
- ✅ Accessible (keyboard navigation, screen readers)

## License

All rights reserved © 2026 Roosheel Patel
