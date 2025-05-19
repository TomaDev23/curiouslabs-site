/**
 * @component PillNav
 * @description Pill-shaped navigation for section scrolling
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - PillNav passes LEGIT protocol
 */

import React, { useState } from 'react';

const PillNav = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Navigation pill data
  const navPills = [
    { id: 'hero', label: 'Home', color: 'bg-lime-400' },
    { id: 'services', label: 'Services', color: 'bg-yellow-400' },
    { id: 'process', label: 'Process', color: 'bg-blue-400' },
    { id: 'contact', label: 'Contact', color: 'bg-purple-400' }
  ];
  
  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <nav className={`flex space-x-4 ${className}`}>
      {navPills.map((pill) => (
        <button
          key={pill.id}
          onClick={() => scrollToSection(pill.id)}
          className={`group transition-all duration-300 ${
            activeSection === pill.id 
              ? 'text-black' 
              : 'text-white hover:text-gray-200'
          }`}
        >
          <div className="flex items-center px-4 py-2 rounded-full border space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              activeSection === pill.id ? pill.color : 'bg-gray-600'
            }`} />
            <span>{pill.label}</span>
          </div>
        </button>
      ))}
    </nav>
  );
};

export default PillNav; 