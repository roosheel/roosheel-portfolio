'use client';

import { Download, Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import Button from './ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-surface">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Roosheel Patel, PhD, MS
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 sm:text-2xl">
          Senior Translational Scientist | Computational Biology Expert
        </p>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Translating complex genomic data into actionable insights for precision medicine
          with 8+ years of experience in data science and computational biology
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Chicago, IL</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:roosheel.patel@gmail.com"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              roosheel.patel@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <a
              href="tel:+18324591879"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              (832) 459-1879
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            <a
              href="https://linkedin.com/in/roosheel-patel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            onClick={() => window.open('/RESUME_ROOSHEELPATEL_WIDE.pdf', '_blank')}
          >
            <Download className="mr-2 h-5 w-5" />
            View Resume
          </Button>
          <Button
            variant="secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
}
