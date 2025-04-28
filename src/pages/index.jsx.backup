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
  
  // Calculate scroll progress for DynamicExpansion (0 to 1 range)
  // Adjusted to start immediately after the navbar is passed
  const dynamicExpansionProgress = Math.min(1, Math.max(0, 
    // Start showing content as soon as user begins scrolling past the hero section
    (scrollY - (viewportHeight * 0.1)) / (viewportHeight * 2)
  ));
  
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
      {/* Refined Background Layer - minimal and sophisticated */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Subtle color infusion for visual interest */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5D45B8]/15 via-[#383053]/10 to-transparent opacity-[0.2]"></div>
        
        {/* Single elegant blob for depth - positioned strategically */}
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
        <div className="relative" style={{ minHeight: '450vh' }}>
          {/* Hero Section */}
          <div className="relative pt-16 pb-12 min-h-screen z-20">
            <Hero />
          </div>
          
          {/* Dynamic expansion section - positioned to appear immediately after scrolling */}
          <div className="relative z-20">
            <DynamicExpansion scrollProgress={dynamicExpansionProgress} />
          </div>
          
          {/* Services section */}
          <div className="relative z-20 pt-8 md:pt-12">
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
