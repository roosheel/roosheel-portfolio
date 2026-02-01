'use client';

import { useState, useMemo } from 'react';
import { publications } from '@/data/publications';
import Section from './ui/Section';
import { Search, ExternalLink } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPublications = useMemo(() => {
    if (!searchQuery.trim()) return publications;

    const query = searchQuery.toLowerCase();
    return publications.filter(
      (pub) =>
        pub.title.toLowerCase().includes(query) ||
        pub.authors.toLowerCase().includes(query) ||
        pub.journal.toLowerCase().includes(query) ||
        pub.year.toString().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPublications = filteredPublications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <Section id="publications" title="Publications">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''}
        </p>
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search publications..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-surface-light pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="space-y-6">
        {paginatedPublications.map((pub, index) => (
          <div
            key={startIndex + index}
            className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-surface-light transition-colors rounded-r"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {pub.authors}
            </p>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
              {pub.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {pub.journal}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">{pub.year}</span>
              {pub.doi && (
                <>
                  <span className="text-gray-400">•</span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    DOI <ExternalLink className="h-3 w-3" />
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-dark-surface-light transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-dark-surface-light transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-4 text-sm">
        <a
          href="https://scholar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          Google Scholar <ExternalLink className="h-4 w-4" />
        </a>
        <span className="text-gray-400">•</span>
        <a
          href="https://orcid.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ORCiD <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}
