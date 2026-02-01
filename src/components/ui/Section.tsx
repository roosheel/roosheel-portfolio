import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, title, children, id, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn('py-16 px-4 sm:px-6 lg:px-8', className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl">
          {title && (
            <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              {title}
            </h2>
          )}
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
