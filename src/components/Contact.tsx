import Section from './ui/Section';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'roosheel.patel@gmail.com',
      href: 'mailto:roosheel.patel@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(832) 459-1879',
      href: 'tel:+18324591879',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/roosheel-patel',
      href: 'https://linkedin.com/in/roosheel-patel',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chicago, IL',
      href: null,
    },
  ];

  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          I'm always open to discussing new opportunities, collaborations, or research projects.
          Feel free to reach out!
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const content = (
              <div className="flex items-start gap-4 p-6 rounded-lg bg-gray-50 dark:bg-dark-surface-light transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {info.label}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100 mt-1 break-words">
                    {info.value}
                  </div>
                </div>
              </div>
            );

            if (info.href) {
              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block hover:scale-105 transition-transform"
                >
                  {content}
                </a>
              );
            }

            return <div key={index}>{content}</div>;
          })}
        </div>
      </div>
    </Section>
  );
}
