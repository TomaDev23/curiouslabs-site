import React, { useEffect, useState, useRef } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollProgress, setLastScrollProgress] = useState(0);
  const metricsRef = useRef(null);
  
  // Track scroll position and viewport height for scroll-based effects
  useEffect(() => {
    // Handler to update scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Handler to update viewport height on resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialize viewport height and mobile check
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
  
  // Calculate scroll progress for DynamicExpansion (0 to 1 range)
  // Adjusted to start only after scrolling significantly past the Hero
  const calculateDynamicExpansionProgress = () => {
    // Start showing cards only after 75% of the viewport height is scrolled
    const triggerPoint = viewportHeight * 0.75;
    
    // Use a smaller divisor for more gradual transition
    const progress = Math.max(0, (scrollY - triggerPoint) / (viewportHeight * 0.8));
    
    // Return current progress, capped at 1
    return Math.min(1, progress);
  };

  // Calculate current progress
  const currentProgress = calculateDynamicExpansionProgress();
  
  // Update lastScrollProgress if current progress is greater
  useEffect(() => {
    if (currentProgress > lastScrollProgress) {
      setLastScrollProgress(currentProgress);
    }
  }, [currentProgress, lastScrollProgress]);
  
  // Use the greater of current or last progress to ensure elements stay visible
  const dynamicExpansionProgress = Math.max(currentProgress, lastScrollProgress);
  
  // Calculate parallax scroll positions for SVG layers
  const chaoticLayerTransform = `translateY(${scrollY * 0.15}px)`;
  const transitionLayerTransform = `translateY(${scrollY * 0.25}px)`;
  const legitLayerTransform = `translateY(${scrollY * 0.35}px)`;
  
  // Calculate transformation beam progress
  const beamStartTrigger = viewportHeight * 1.2; // Start after hero section
  const beamEndTrigger = viewportHeight * 2.2; // Complete at end of DynamicExpansion
  const beamProgress = Math.min(1, Math.max(0, 
    (scrollY - beamStartTrigger) / (beamEndTrigger - beamStartTrigger)
  ));
  
  // Calculate beam height and text opacity based on progress
  const beamHeight = `${beamProgress * 100}%`;
  const transformationTextOpacity = beamProgress > 0.9 ? (beamProgress - 0.9) * 10 : 0;
  
  // Calculate LogoStrip opacity based on metrics section position
  const [logoStripOpacity, setLogoStripOpacity] = useState(1);
  
  useEffect(() => {
    const calculateLogoStripOpacity = () => {
      if (metricsRef.current) {
        const metricsPosition = metricsRef.current.getBoundingClientRect().top;
        // Start fading when metrics section is 150% of viewport height away
        const fadeStartDistance = viewportHeight * 1.5;
        // Complete fade when metrics section is 75% of viewport height away
        const fadeEndDistance = viewportHeight * 0.75;
        
        if (metricsPosition <= fadeStartDistance) {
          const fadeProgress = Math.max(0, Math.min(1, 
            (metricsPosition - fadeEndDistance) / (fadeStartDistance - fadeEndDistance)
          ));
          setLogoStripOpacity(fadeProgress);
        } else {
          setLogoStripOpacity(1);
        }
      }
    };
    
    calculateLogoStripOpacity();
    window.addEventListener('scroll', calculateLogoStripOpacity);
    return () => window.removeEventListener('scroll', calculateLogoStripOpacity);
  }, [viewportHeight]);
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#5D45B8] via-[#403962] to-[#28293D] text-white antialiased relative overflow-hidden">
      {/* SVG Background Layers with Parallax Effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5D45B8]/15 via-[#383053]/10 to-transparent opacity-[0.2]"></div>
        
        {/* Chaotic code pattern - starts visible at top */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ 
            transform: chaoticLayerTransform,
            willChange: 'transform',
            opacity: isMobile ? 0.15 : 0.25
          }}
        >
          <div className="absolute top-0 left-0 w-full h-[150vh] bg-[url('/images/chaotic-code-pattern.svg')] bg-repeat bg-[length:500px_500px]"></div>
        </div>
        
        {/* Transition pattern - middle layer */}
        <div 
          className="absolute inset-0 w-full h-full z-1"
          style={{ 
            transform: transitionLayerTransform,
            willChange: 'transform',
            opacity: isMobile ? 0.12 : 0.2
          }}
        >
          <div className="absolute top-[80vh] left-0 w-full h-[150vh] bg-[url('/images/transition-code-pattern.svg')] bg-repeat bg-[length:500px_500px]"></div>
        </div>
        
        {/* Legit code pattern - bottom layer */}
        <div 
          className="absolute inset-0 w-full h-full z-2"
          style={{ 
            transform: legitLayerTransform,
            willChange: 'transform',
            opacity: isMobile ? 0.1 : 0.18
          }}
        >
          <div className="absolute top-[160vh] left-0 w-full h-[150vh] bg-[url('/images/legit-code-pattern.svg')] bg-repeat bg-[length:500px_500px]"></div>
        </div>
        
        {/* Transformation beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col items-center z-3">
          {/* Vertical line that grows from top to bottom */}
          <div 
            className="w-[2px] bg-gradient-to-b from-purple-300 to-blue-300"
            style={{ 
              height: beamHeight, 
              maxHeight: '100%',
              width: isMobile ? '1px' : '2px',
              opacity: 0.6,
              boxShadow: '0 0 8px rgba(147, 112, 219, 0.7)',
              willChange: 'height'
            }}
          ></div>
          
          {/* Transformation complete text */}
          <div 
            className="absolute bottom-[20%] bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-2 rounded-full text-white font-bold tracking-wider"
            style={{ 
              opacity: transformationTextOpacity,
              transform: 'translateY(-50%)',
              fontSize: isMobile ? '0.8rem' : '1rem'
            }}
          >
            Transformation Complete
          </div>
        </div>
        
        {/* Single elegant blob for depth */}
        <div 
          className="absolute top-[5%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-[#5D45B8]/8 to-transparent rounded-full blur-3xl opacity-[0.15]"
          style={{ willChange: 'transform' }}
        ></div>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <NavBar />
        
        {/* LogoStrip - Fixed at bottom from page load */}
        <div 
          className="fixed bottom-0 left-0 right-0 w-full z-30 transition-opacity duration-700"
          style={{ 
            opacity: logoStripOpacity,
            willChange: 'opacity'
          }}
        >
          <LogoStrip />
        </div>
        
        {/* Unified container for all main content */}
        <div className="relative">
          {/* Hero Section */}
          <div className="relative pt-16 pb-0 min-h-[85vh] z-20">
            <Hero />
          </div>
          
          {/* Dynamic expansion section with no negative margin */}
          <div className="relative z-20">
            <DynamicExpansion scrollProgress={dynamicExpansionProgress} />
          </div>
          
          {/* Services section - reduced spacing for better flow */}
          <div className="relative z-20">
            <ScrollReveal animation="fade-in-up" delay="0.1s" id="services">
              <Services />
            </ScrollReveal>
          </div>
        </div>
        
        {/* Sections that come after the unified container */}
        <div className="relative z-40">
          <div ref={metricsRef} id="metrics">
            <ScrollReveal animation="fade-in-up" delay="0.2s">
              <Metrics />
            </ScrollReveal>
          </div>
          
          <ScrollReveal animation="fade-in-up" delay="0.3s" id="case-studies">
            <CaseStudies />
          </ScrollReveal>
          
          <ScrollReveal animation="fade-in-up" delay="0.4s">
            <Testimonials />
          </ScrollReveal>
        </div>
        
        <footer className="py-12 bg-gradient-to-b from-transparent to-[#28293D]/90 border-t border-[#3D3A63]/20 backdrop-blur-sm">
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
