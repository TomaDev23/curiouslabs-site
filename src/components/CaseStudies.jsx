import React from 'react';
import CaseStudyGrid from './CaseStudies/CaseStudyGrid';

const caseStudies = [
  {
    title: "CLI Parser Repair",
    problem: "Broken OCR pipelines with async edge cases.",
    solution: "Dynamic agent fallback tree rebuilt with 100% test pass.",
  },
  {
    title: "Security Config Recovery",
    problem: "Leaking token through public headers.",
    solution: "Token rotation and HMAC guards implemented.",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 bg-gradient-to-b from-curious-dark-800 to-curious-dark-900 overflow-hidden">
      {/* Circuit pattern background - subtle */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-0 mix-blend-luminosity"></div>
      
      {/* Subtle accent glow - keeping this as it's not the beam artifact */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gradient-to-r from-transparent via-curious-blue-600/15 to-transparent rounded-full blur-[80px] opacity-60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-white">Mission </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-blue-400 to-curious-purple-400">
            Logs
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Real-world code operations performed by our elite AI tactical teams.
        </p>
        
        <CaseStudyGrid />
      </div>
    </section>
  );
}
