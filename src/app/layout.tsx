import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Roosheel Patel, PhD, MS - Computational Biology & Data Science',
  description:
    'Senior Translational Scientist with 8+ years of experience in computational biology, machine learning, and precision medicine. 30+ publications, H-index 16.',
  keywords: [
    'Roosheel Patel',
    'computational biology',
    'bioinformatics',
    'data science',
    'genomics',
    'machine learning',
    'single-cell RNA-seq',
    'precision medicine',
  ],
  authors: [{ name: 'Roosheel Patel' }],
  openGraph: {
    title: 'Roosheel Patel, PhD, MS',
    description: 'Senior Translational Scientist | Computational Biology Expert',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
