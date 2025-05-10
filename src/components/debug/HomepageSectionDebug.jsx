import React, { useState, useEffect } from 'react';

/**
 * Debug component to visualize homepage section boundaries with vh measurements
 * Only visible in development mode
 */
export default function HomepageSectionDebug() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Only show in development environment
  if (process.env.NODE_ENV !== 'development' && 
      window.location.hostname !== 'localhost' && 
      window.location.hostname !== '127.0.0.1') {
    return null;
  }
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Define homepage sections with their vh ranges
  const HOME_SECTIONS = [
    { name: 'HeroPortal', range: [0, 100] },
    { name: 'LogoStrip', range: [80, 120] },
    { name: 'AboutMission', range: [120, 200] },
    { name: 'WhyAIDevCards', range: [180, 260] },
    { name: 'ServicesOrbital', range: [240, 320] },
    { name: 'FeaturedProjects', range: [300, 380] },
    { name: 'ProjectsLogbook', range: [360, 440] },
    { name: 'CommunityHub', range: [420, 500] },
    { name: 'HearFromAI', range: [480, 560] },
    { name: 'ContactTerminal', range: [540, 600] },
    { name: 'FooterExperience', range: [580, 600] },
  ];
  
  // Total height in vh
  const TOTAL_HEIGHT_VH = 600;
  
  // Calculate current section based on vh
  const currentScrollVh = scrollProgress * TOTAL_HEIGHT_VH;
  const currentSectionIndex = HOME_SECTIONS.findIndex(
    ({ range }) => currentScrollVh >= range[0] && currentScrollVh <= range[1]
  );
  
  return (
    <div className="fixed right-0 h-screen w-1 z-50 pointer-events-none">
      {/* Section boundaries */}
      {HOME_SECTIONS.map(({ name, range }, index) => {
        const startPercent = (range[0] / TOTAL_HEIGHT_VH) * 100;
        const endPercent = (range[1] / TOTAL_HEIGHT_VH) * 100;
        const heightPercent = endPercent - startPercent;
        
        // Determine if this section is active based on current scroll position
        const isActive = currentScrollVh >= range[0] && currentScrollVh <= range[1];
        
        return (
          <React.Fragment key={name}>
            {/* Start boundary */}
            <div 
              className={`absolute w-6 h-1 ${isActive ? 'bg-blue-500' : 'bg-white/50'} rounded-sm`}
              style={{ 
                top: `${startPercent}%`, 
                right: 0, 
                transform: 'translateY(-50%)',
              }}
            />
            
            {/* End boundary */}
            <div 
              className={`absolute w-6 h-1 ${isActive ? 'bg-blue-500' : 'bg-white/50'} rounded-sm`}
              style={{ 
                top: `${endPercent}%`, 
                right: 0,
                transform: 'translateY(-50%)',
              }}
            />
            
            {/* Section name with vh values */}
            <div 
              className="absolute right-8 bg-black/50 text-white text-xs px-2 py-1 rounded-sm whitespace-nowrap"
              style={{ 
                top: `${startPercent + (heightPercent / 2)}%`, 
                transform: 'translateY(-50%)',
                opacity: isActive ? 1 : 0.7
              }}
            >
              {name} <br />
              <span className="text-blue-300">[{range[0]}vh-{range[1]}vh]</span>
            </div>
            
            {/* Section area indicator */}
            <div 
              className="absolute right-0 w-1 opacity-30"
              style={{ 
                top: `${startPercent}%`,
                height: `${heightPercent}%`,
                backgroundColor: isActive ? '#3b82f6' : '#9ca3af',
              }}
            />
          </React.Fragment>
        );
      })}
      
      {/* Current scroll progress indicator */}
      <div
        className="absolute right-0 w-10 h-1.5 bg-red-500 rounded-sm"
        style={{
          top: `${scrollProgress * 100}%`,
          transform: 'translateY(-50%)',
        }}
      />
      <div
        className="absolute right-12 bg-red-500 text-white text-xs px-2 py-1 rounded-sm"
        style={{
          top: `${scrollProgress * 100}%`,
          transform: 'translateY(-50%)',
          textAlign: 'right'
        }}
      >
        {Math.round(scrollProgress * 100)}% <br />
        <span className="text-yellow-300">{Math.round(scrollProgress * TOTAL_HEIGHT_VH)}vh</span>
      </div>
      
      {/* Scene alignment guides */}
      <div className="fixed left-0 top-4 bg-black/70 text-xs text-white p-2 rounded z-50">
        <div className="font-bold mb-1">Homepage Sections</div>
        <div className="text-blue-300">Sections: {HOME_SECTIONS.length}</div>
        <div className="text-blue-300">Total Height: {TOTAL_HEIGHT_VH}vh</div>
        <div className="text-yellow-300 mt-1">
          Current: {Math.round(scrollProgress * TOTAL_HEIGHT_VH)}vh
        </div>
        {currentSectionIndex >= 0 && (
          <div className="text-green-300">
            {HOME_SECTIONS[currentSectionIndex].name}
          </div>
        )}
      </div>
    </div>
  );
} 