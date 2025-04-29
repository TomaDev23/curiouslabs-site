import React from 'react';

export default function CaseStudyCard({ title, problem, solution, link }) {
  return (
    <div className="relative group">
      {/* Card background with subtle animation on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-curious-dark-700 to-curious-dark-800 rounded-lg transition-transform duration-700 group-hover:scale-[1.02] will-change-transform"></div>
      
      {/* Card border glow effect */}
      <div className="absolute inset-0 rounded-lg border border-curious-blue-900/40 group-hover:border-curious-blue-700/40 transition-colors duration-300"></div>
      
      {/* Content container */}
      <div className="relative p-8 md:p-10 rounded-lg overflow-hidden">
        {/* Top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-curious-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Subtle corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-curious-blue-800/10 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex items-center mb-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-curious-blue-500 to-curious-blue-600 mr-4 flex items-center justify-center shadow-md shadow-curious-blue-800/20 group-hover:shadow-curious-blue-800/40 transition-shadow duration-300">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-curious-blue-300 group-hover:from-curious-blue-200 group-hover:to-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        
        <div className="space-y-4 mb-8 pl-14">
          <div>
            <div className="text-curious-blue-400 text-xs font-medium uppercase tracking-wider mb-1">Problem:</div>
            <p className="text-gray-300 text-sm">{problem}</p>
          </div>
          
          <div>
            <div className="text-curious-blue-400 text-xs font-medium uppercase tracking-wider mb-1">Solution:</div>
            <p className="text-gray-300 text-sm">{solution}</p>
          </div>
        </div>
        
        <div className="pl-14">
          <a 
            href={link} 
            className="inline-block relative overflow-hidden group/btn bg-gradient-to-r from-curious-blue-600 to-curious-blue-700 text-white px-5 py-2 rounded-md group-hover:shadow-md group-hover:shadow-curious-blue-800/20 transition-all text-sm font-medium"
          >
            {/* Button glow overlay */}
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></div>
            
            {/* Button hover effect */}
            <div className="relative z-10 group-hover/btn:-translate-y-1 transform transition-transform duration-300">
              View Full Case
            </div>
            
            {/* Button bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
    </div>
  );
} 