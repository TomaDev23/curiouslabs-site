import React from 'react';

const SectionNav = ({ sections }) => {
  return (
    <nav className="sticky top-16 z-40 bg-black/80 backdrop-blur-sm border-b border-purple-900/50 px-4 py-2 hidden sm:flex justify-center space-x-8 text-purple-300 text-sm font-medium">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="hover:text-purple-400 hover:underline transition-colors duration-200"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
};

export default SectionNav; 