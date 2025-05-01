import React, { useState, useEffect } from 'react';

export default function UniverseScrollController({ children }) {
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  
  useEffect(() => {
    // Handler to detect initial scroll
    const handleScroll = () => {
      if (window.scrollY > 30 && !hasScrolledOnce) {
        setHasScrolledOnce(true);
      }
    };
    
    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolledOnce]);
  
  // Pass the hasScrolledOnce state to all children
  return React.Children.map(children, child => 
    React.cloneElement(child, { hasScrolledOnce })
  );
} 