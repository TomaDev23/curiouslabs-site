import React from 'react';
import CaseStudyCard from './CaseStudyCard';

const caseStudyData = [
  {
    title: "Parser Agent Revival",
    problem: "Broken parser for a production CLI tool.",
    solution: "Debugged and refactored agents, validated against live inputs.",
    link: "/case/cli-parser-repair"
  },
  {
    title: "Security Config: Live Patch",
    problem: "Client failed cloud security audit.",
    solution: "Diagnosed misconfig, patched critical routes, and passed verification in 36 hours.",
    link: "/case/security-config-recovery"
  }
];

export default function CaseStudyGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      {caseStudyData.map((caseItem, idx) => (
        <CaseStudyCard 
          key={idx} 
          title={caseItem.title} 
          problem={caseItem.problem} 
          solution={caseItem.solution} 
          link={caseItem.link} 
        />
      ))}
    </div>
  );
} 