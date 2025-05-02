import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import FooterMain from '../components/FooterMain';
import useDeviceProfile from '../hooks/useDeviceProfile';

const HomeFloatflowLayout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mainContainerRef = useRef(null);
  const { isLowPerf, prefersReducedMotion } = useDeviceProfile();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set loaded after initial render
    setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="relative w-full overflow-x-hidden bg-black" ref={mainContainerRef}>
      <NavBar />
      
      {/* Main content container with scrollY, isLoaded, and device profile state passed down */}
      <main className="min-h-screen">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
              scrollY, 
              isLoaded,
              isLowPerf,
              isReducedMotion: prefersReducedMotion 
            });
          }
          return child;
        })}
      </main>
      
      <FooterMain />
    </div>
  );
};

export default HomeFloatflowLayout; 