import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import LogoStrip from '../components/LogoStrip';
import Services from '../components/Services';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import DynamicExpansion from '../components/DynamicExpansion';
import useParallax from '../hooks/useParallax';
import useBreakpoint from '../hooks/useBreakpoint';
import { IMAGES } from '../utils/assets';

export default function Home() {
  // HOME-SPECIFIC: Scroll state for parallax effects and animations
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Reference for DOM elements
  const metricsRef = useRef(null);
  
  // HOME-SPECIFIC: Dynamic progress for animations based on scroll position
  const dynamicExpansionProgress = Math.min(1, Math.max(0, (scrollPosition - viewportHeight * 0.8) / (viewportHeight * 0.5)));
  
  // HOME-SPECIFIC: Calculate LogoStrip opacity based on metrics section position
  const logoStripOpacity = metricsRef.current 
    ? Math.max(0, 1 - Math.max(0, (scrollPosition - metricsRef.current.offsetTop + 300) / 300))
    : 1;

  // HOME-SPECIFIC: Update scroll position with requestAnimationFrame for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial values
    handleResize();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E] relative overflow-hidden">
      <Helmet>
        <title>CuriousLabs Cambodia – AI CodeOps Hub</title>
        <meta name="description" content="Elite AI CodeOps missions, backburners and dev systems — powered by CuriousLabs." />
        <meta property="og:title" content="CuriousLabs Cambodia" />
        <meta property="og:description" content="Elite AI CodeOps missions, backburners and dev systems — powered by CuriousLabs." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/" />
      </Helmet>
      
      {/* HOME-SPECIFIC: SVG Background Layers with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          opacity: isMobile ? 0.15 : 0.25,
          transform: `translateY(${scrollPosition * 0.15}px)` 
        }}
      >
        <img 
          src={IMAGES.SVG.CHAOTIC_CODE}
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* HOME-SPECIFIC: Second parallax layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          opacity: isMobile ? 0.15 : 0.25,
          transform: `translateY(${scrollPosition * 0.25}px)` 
        }}
      >
        <img 
          src={IMAGES.SVG.LEGIT_CODE}
          alt="" 
          className="w-full h-full object-cover opacity-0 transition-opacity duration-1000"
          style={{
            opacity: dynamicExpansionProgress
          }}
        />
      </div>
      
      {/* HOME-SPECIFIC: Transformation Beam */}
      <div 
        className="absolute left-1/2 top-[100vh] z-1 pointer-events-none" 
        style={{ 
          width: isMobile ? '1px' : '2px',
          height: `${dynamicExpansionProgress * viewportHeight * 1.2}px`,
          background: 'linear-gradient(to bottom, rgba(147, 51, 234, 0.7), rgba(59, 130, 246, 0.7))',
          opacity: dynamicExpansionProgress < 0.1 ? 0 : dynamicExpansionProgress,
          transform: 'translateX(-50%)',
        }}
      >
        {/* HOME-SPECIFIC: Transformation Complete Text */}
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded whitespace-nowrap"
          style={{ 
            opacity: dynamicExpansionProgress > 0.8 ? 1 : 0,
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}
        >
          Transformation Complete
        </div>
      </div>
      
      <NavBar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />
        
        {/* HOME-SPECIFIC: Dynamic Expansion Section */}
        <DynamicExpansion scrollProgress={dynamicExpansionProgress} />
        
        {/* HOME-SPECIFIC: Logo Strip with fading effect */}
        <LogoStrip style={{ opacity: logoStripOpacity }} />
        
        {/* Services Section */}
        <Services />
        
        {/* Metrics Section */}
        <div ref={metricsRef}>
          <Metrics />
        </div>
        
        {/* Case Studies Section */}
        <CaseStudies />
        
        {/* Testimonials Section */}
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
}
