import React, { useState, useRef, useEffect } from 'react';

export default function CodeTestResults() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeBlob, setActiveBlob] = useState(null);
  const containerRef = useRef(null);
  
  // Handle mouse move to track cursor position
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  // Code test result data
  const testResults = [
    { id: 1, type: "Test Pass", value: "100%", color: "from-curious-blue-500/30 to-curious-blue-600/20" },
    { id: 2, type: "Code Coverage", value: "98.2%", color: "from-curious-purple-500/30 to-curious-purple-600/20" },
    { id: 3, type: "Security Scan", value: "Pass", color: "from-green-500/30 to-emerald-600/20" },
    { id: 4, type: "Performance", value: "A+", color: "from-amber-500/30 to-amber-600/20" },
  ];
  
  return (
    <section 
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-transparent"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveBlob(null)}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-curious-dark-900/10 to-transparent"></div>
      
      {/* Circuit pattern background - enhanced for this section */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.04] mix-blend-luminosity"></div>
      
      {/* Dynamic blobs that respond to cursor position */}
      <div className="absolute inset-0 overflow-hidden">
        {testResults.map((result, index) => {
          // Calculate dynamic positions for blobs
          const offsetX = 150 + (index * 50) % 300;
          const offsetY = 100 + (index * 80) % 200;
          const delay = index * 0.2;
          
          // Determine if this blob should respond to cursor
          const isActive = activeBlob === result.id;
          const distance = cursorPosition.x && cursorPosition.y ? 
            Math.sqrt(
              Math.pow((offsetX + 50) - cursorPosition.x, 2) + 
              Math.pow((offsetY + 50) - cursorPosition.y, 2)
            ) : 1000;
          
          // Blob should glow when cursor is nearby
          const shouldGlow = distance < 150;
          
          return (
            <div 
              key={result.id}
              className={`absolute bg-gradient-to-br ${result.color} rounded-full blur-xl opacity-80 animate-float-blob will-change-transform transition-opacity duration-300 ${shouldGlow ? 'opacity-100' : ''}`}
              style={{ 
                left: `${offsetX}px`,
                top: `${offsetY}px`,
                width: '100px',
                height: '100px',
                animationDelay: `${delay}s`,
                transform: shouldGlow ? 'scale(1.2)' : 'scale(1)'
              }}
              onMouseEnter={() => setActiveBlob(result.id)}
            >
              {/* Cursor glow effect */}
              {shouldGlow && (
                <div className="absolute inset-0 bg-white/20 rounded-full animate-cursor-glow"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-blue-400 to-curious-purple-400">
            Code Quality
          </span>{" "}
          <span className="text-white">Assurance</span>
        </h2>
        
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Our AI-powered code operations ensure the highest standards through continuous testing and quality control.
        </p>
        
        {/* Test results grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {testResults.map(result => (
            <div 
              key={result.id}
              className="relative bg-gradient-to-br from-curious-dark-800 to-curious-dark-900 rounded-lg p-6 border border-curious-dark-700/30 group hover:border-curious-purple-700/40 transition-colors duration-300"
              onMouseEnter={() => setActiveBlob(result.id)}
            >
              {/* Top edge accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-gray-300 transition-colors duration-300">
                {result.value}
              </div>
              <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                {result.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 