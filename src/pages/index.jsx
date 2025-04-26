import React, { useEffect, useState } from "react";
import Head from 'next/head';
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
    // Set initial viewport height
    setViewportHeight(window.innerHeight);

    // Handler to update scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Handler to update viewport height on resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Calculate opacity for LogoStrip based on scroll position
  // Now fades out after the DynamicExpansion section (around 2.5x viewportHeight)
  const logoStripOpacity = Math.max(0, 1 - ((scrollY - viewportHeight * 2.5) / (viewportHeight * 0.3)));
  
  // Calculate scroll progress for DynamicExpansion (0 to 1 range)
  const dynamicExpansionProgress = Math.min(1, Math.max(0, 
    (scrollY - viewportHeight * 0.8) / (viewportHeight * 1.2)
  ));
  
  // Calculate opacity values for different elements based on scroll position
  const heroOpacity = Math.max(0, 1 - scrollY / viewportHeight);
  
  return (
    <div className="min-h-screen bg-deep-black text-white overflow-hidden">
      <Head>
        <title>CuriousLabs - Elite Code Operations</title>
        <meta name="description" content="Elite Code Operations for Mission Critical Applications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {/* Base Background */}
        <div className="absolute inset-0 bg-deep-black"></div>
        
        {/* Base Circuit Pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.07] mix-blend-luminosity"></div>
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-noise-texture opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Animated Gradient Blobs */}
        {/* Blob 1 - Top Left */}
        <div 
          className="absolute -top-[30%] -left-[20%] w-[80%] h-[60%] bg-gradient-radial from-curious-purple-900/20 to-transparent rounded-full animate-float will-change-transform"
          style={{ animationDelay: '0s' }}
        ></div>
        
        {/* Blob 2 - Top Right */}
        <div 
          className="absolute -top-[20%] -right-[30%] w-[70%] h-[50%] bg-gradient-radial from-curious-blue-900/15 to-transparent rounded-full animate-float will-change-transform"
          style={{ animationDelay: '-2s' }}
        ></div>
        
        {/* Blob 3 - Middle Left */}
        <div 
          className="absolute top-[40%] -left-[30%] w-[60%] h-[40%] bg-gradient-radial from-curious-purple-800/10 to-transparent rounded-full animate-float will-change-transform"
          style={{ animationDelay: '-4s' }}
        ></div>
        
        {/* Blob 4 - Bottom Right */}
        <div 
          className="absolute bottom-[10%] -right-[20%] w-[50%] h-[40%] bg-gradient-radial from-curious-blue-800/10 to-transparent rounded-full animate-float will-change-transform"
          style={{ animationDelay: '-6s' }}
        ></div>
        
        {/* Blob 5 - Bottom Center */}
        <div 
          className="absolute -bottom-[10%] left-[30%] w-[40%] h-[30%] bg-gradient-radial from-curious-purple-900/10 to-transparent rounded-full animate-float will-change-transform"
          style={{ animationDelay: '-8s' }}
        ></div>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Navbar - always visible, fixed at top */}
        <NavBar />
        
        {/* First Screen - Hero Section */}
        <div className="relative" style={{ height: `${viewportHeight}px` }}>
          <div className="h-full" style={{ opacity: heroOpacity }}>
            <Hero />
          </div>
        </div>
        
        {/* LogoStrip - Initially below Hero, sticks to top while scrolling through DynamicExpansion */}
        <div 
          className={`sticky top-16 z-40 transition-opacity duration-300`} 
          style={{ 
            opacity: logoStripOpacity, 
            willChange: 'opacity'
          }}
        >
          <div className="relative">
            {/* Gradient background for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/95 to-deep-black/80 backdrop-blur-sm"></div>
            <LogoStrip />
          </div>
        </div>
        
        {/* DynamicExpansion - Code Transformation Section */}
        <DynamicExpansion scrollProgress={dynamicExpansionProgress} />
        
        {/* Metrics Section */}
        <ScrollReveal>
          <Metrics />
        </ScrollReveal>
        
        {/* Case Studies */}
        <ScrollReveal>
          <CaseStudies />
        </ScrollReveal>
        
        {/* Testimonials */}
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        
        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-sm text-gray-400 backdrop-blur-sm bg-deep-black/70">
          <div className="max-w-7xl mx-auto px-4">
            <p>© 2023 CuriousLabs. Elite Code Operations.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
