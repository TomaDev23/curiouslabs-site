import React from 'react';
import CaseStudyCard from './CaseStudyCard';

const caseStudyData = [
  {
    title: "CLI Parser Repair",
    problem: "Broken OCR pipelines with async edge cases.",
    solution: "Dynamic agent fallback tree rebuilt with 100% test pass.",
    link: "/case/cli-parser-repair"
  },
  {
    title: "Security Config Recovery",
    problem: "Leaking token through public headers.",
    solution: "Token rotation and HMAC guards implemented.",
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