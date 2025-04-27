import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import LogoStrip from '../components/LogoStrip';
import Services from '../components/Services';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import ScrollReveal from '../components/ScrollReveal';
import DynamicExpansion from '../components/DynamicExpansion';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Track scroll position and viewport height for scroll-based effects
  useEffect(() => {
    // Handler to update scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Handler to update viewport height on resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Initialize viewport height
    handleResize();
    
    // Optimize scroll performance with requestAnimationFrame
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate opacity for LogoStrip - updated for controlled fade after DynamicExpansion begins
  const logoStripOpacity = Math.max(0, 1 - ((scrollY - viewportHeight * 1.2) / (viewportHeight * 1.5)));
  
  // Calculate scroll progress for DynamicExpansion (0 to 1 range)
  const dynamicExpansionProgress = Math.min(1, Math.max(0, 
    (scrollY - viewportHeight) / (viewportHeight * 2)
  ));
  
  return (
    <main className="min-h-screen bg-deep-black text-white antialiased relative overflow-hidden">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Base Circuit Pattern - slightly reduced opacity */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.06] mix-blend-luminosity"></div>
        
        {/* Noise Texture Overlay - reduced opacity */}
        <div className="absolute inset-0 bg-noise-texture opacity-[0.02] mix-blend-overlay"></div>
        
        {/* Blob 1 - Top Left - enhanced purple */}
        <div 
          className="absolute top-[5%] -left-[10%] w-[700px] h-[700px] bg-gradient-to-br from-curious-purple-700/25 via-curious-purple-800/20 to-transparent rounded-full blur-3xl opacity-45 animate-float-slow"
          style={{ animationDelay: '0.5s', willChange: 'transform' }}
        ></div>
        
        {/* Blob 2 - Top Right */}
        <div 
          className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-bl from-curious-blue-700/20 via-curious-blue-800/15 to-transparent rounded-full blur-3xl opacity-40 animate-float-slow animate-rotate-slow"
          style={{ animationDelay: '1.7s', willChange: 'transform' }}
        ></div>
        
        {/* Blob 3 - Middle Left - enhanced purple */}
        <div 
          className="absolute top-[40%] -left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-curious-purple-600/30 to-curious-blue-700/15 rounded-full blur-3xl opacity-45 animate-float-slow"
          style={{ animationDelay: '0.9s', willChange: 'transform' }}
        ></div>
        
        {/* Blob 4 - Bottom Right - more purple tint */}
        <div 
          className="absolute bottom-[10%] -right-[10%] w-[650px] h-[650px] bg-gradient-to-tl from-curious-blue-600/30 via-curious-purple-800/20 to-transparent rounded-full blur-3xl opacity-45 animate-float-slow animate-rotate-slow"
          style={{ animationDelay: '0.2s', animationDirection: 'reverse', willChange: 'transform' }}
        ></div>
        
        {/* Blob 5 - Bottom Center - enhanced purple */}
        <div 
          className="absolute bottom-[0%] left-[20%] w-[800px] h-[800px] bg-gradient-to-r from-curious-purple-700/25 via-curious-blue-900/15 to-transparent rounded-full blur-3xl opacity-35 animate-float"
          style={{ animationDelay: '1.2s', willChange: 'transform' }}
        ></div>
        
        {/* Unified glow effect through the page */}
        <div className="absolute inset-x-0 top-1/3 bottom-0 bg-gradient-to-b from-curious-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <NavBar />

        {/* Hero Section with LogoStrip inside */}
        <div className="relative min-h-screen overflow-hidden">
          <div className="pt-16 pb-24">
            <Hero />
          </div>
          
          {/* LogoStrip pinned to bottom of Hero */}
          <div 
            className="sticky bottom-0 w-full z-30 transition-all duration-700"
            style={{ 
              opacity: logoStripOpacity,
              transform: `translateY(${Math.min(20, scrollY * 0.05)}px)`,
              willChange: 'opacity, transform'
            }}
          >
            <LogoStrip />
          </div>
        </div>
        
        {/* Dynamic expansion section */}
        <DynamicExpansion scrollProgress={dynamicExpansionProgress} />
        
        <div className="relative z-10 mt-16">
          <ScrollReveal animation="fade-in-up" delay="0.1s" id="services">
            <Services />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-in-up" delay="0.2s" id="metrics">
            <Metrics />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-in-up" delay="0.3s" id="case-studies">
            <CaseStudies />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-in-up" delay="0.4s">
            <Testimonials />
          </ScrollReveal>
        </div>
        
        <footer className="py-12 bg-gradient-to-b from-deep-black to-curious-dark-900/90 border-t border-curious-dark-700/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CuriousLabs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
