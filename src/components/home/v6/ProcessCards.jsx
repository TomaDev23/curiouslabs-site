/**
 * @component ProcessCards
 * @description Process/Approach section with numbered steps and orbital connections
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - ProcessCards passes LEGIT protocol
 */

import React from 'react';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

const ProcessCards = () => {
  const { isMobile } = useBreakpoint();
  
  // Process steps data
  const steps = [
    {
      id: 'discover',
      number: '1,034',
      title: 'Discover',
      description: 'Brainwaves about space design—usually on the bus or in the shower.',
      color: 'lime'
    },
    {
      id: 'create',
      number: '2',
      title: 'Create',
      description: 'Hours playing around with wireframes, until I realized it was more efficient to ideate on canvas.',
      color: 'yellow'
    },
    {
      id: 'build',
      number: '3',
      title: 'Build',
      description: 'Crafting elegant code that brings the vision to life with precision and performance.',
      color: 'blue'
    },
    {
      id: 'launch',
      number: '4',
      title: 'Launch',
      description: 'Mission control for deployment, ensuring a flawless journey from development to production.',
      color: 'purple'
    }
  ];
  
  // Get color class based on color name
  const getColorClass = (color, element) => {
    const colorMap = {
      lime: {
        bg: 'bg-lime-400',
        text: 'text-lime-400',
        border: 'border-lime-400',
        gradient: 'from-lime-400 to-green-600'
      },
      yellow: {
        bg: 'bg-yellow-400',
        text: 'text-yellow-400',
        border: 'border-yellow-400',
        gradient: 'from-yellow-400 to-amber-600'
      },
      blue: {
        bg: 'bg-blue-400',
        text: 'text-blue-400',
        border: 'border-blue-400',
        gradient: 'from-blue-400 to-indigo-600'
      },
      purple: {
        bg: 'bg-purple-400',
        text: 'text-purple-400',
        border: 'border-purple-400',
        gradient: 'from-purple-400 to-violet-600'
      }
    };
    
    return colorMap[color]?.[element] || '';
  };
  
  return (
    <section
      id="process"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 opacity-100"
    >
      {/* Section Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Our <span className="text-lime-400">Process</span>
        </h2>
        <p className="text-lg text-gray-300">
          A thoughtful approach to bringing your vision to life.
          Each step in our journey is designed for clarity, efficiency, and excellence.
        </p>
      </div>
      
      {/* Process Timeline */}
      <div className={`relative ${isMobile ? 'space-y-16' : 'flex flex-wrap justify-center'}`}>
        {/* Connect the dots with orbital path (desktop only) */}
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100,100 C250,20 550,180 700,100"
                stroke="url(#processGradient)"
                strokeWidth="2"
                strokeDasharray="6,6"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="33%" stopColor="#facc15" />
                  <stop offset="66%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
        
        {/* Step Cards */}
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`process-card opacity-100 ${
              isMobile 
                ? 'w-full' 
                : 'w-56 mx-8 transform'
            }`}
          >
            {/* Number with accent color */}
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${getColorClass(step.color, 'border')} relative`}>
                <span className={`font-serif text-xl font-bold ${getColorClass(step.color, 'text')}`}>{step.number}</span>
                
                {/* Star accent */}
                <div className={`absolute -top-1 -right-1 w-4 h-4 ${getColorClass(step.color, 'text')}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L15 9H23L17 15L19 23L12 19L5 23L7 15L1 9H9L12 1Z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="text-center">
              <h3 className={`text-xl font-medium mb-2 ${getColorClass(step.color, 'text')}`}>
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm">
                {step.description}
              </p>
            </div>
            
            {/* Orbital dot connector (mobile only) */}
            {isMobile && index < steps.length - 1 && (
              <div className="flex justify-center mt-6 opacity-70">
                <div className="h-12 border-l border-dashed border-gray-600"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-20">
        <a
          href="#contact"
          className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-full text-base font-medium text-white hover:bg-black hover:bg-opacity-50 transition-colors duration-150"
        >
          Ready to start your journey?
          <svg className="ml-2 h-5 w-5 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default ProcessCards; 