import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import ScrollReveal from '../components/ScrollReveal';
import LogoStrip from '../components/LogoStrip';
import CodeTestResults from '../components/CodeTestResults';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position for scroll-based effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <main className="min-h-screen bg-deep-black text-white antialiased relative overflow-hidden">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Base Circuit Pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-[0.07] mix-blend-luminosity"></div>
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-noise-texture opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Blob 1 - Top Left */}
        <div 
          className="absolute top-[5%] -left-[10%] w-[700px] h-[700px] bg-gradient-to-br from-curious-purple-700/20 via-curious-purple-800/15 to-transparent rounded-full blur-3xl opacity-40 animate-float-slow"
          style={{ animationDelay: '0.5s', willChange: 'transform' }}
        ></div>
        
        {/* Blob 2 - Top Right */}
        <div 
          className="absolute top-[10%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-bl from-curious-blue-700/20 via-curious-blue-800/15 to-transparent rounded-full blur-3xl opacity-40 animate-float-slow animate-rotate-slow"
          style={{ animationDelay: '1.7s', willChange: 'transform' }}
        ></div>
        
        {/* Blob 3 - Middle Left */}
        <div 
          className="absolute top-[40%] -left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-curious-purple-600/25 to-curious-blue-700/10 rounded-full blur-3xl opacity-40 animate-float-slow"
          style={{ animationDelay: '0.9s', willChange: 'transform' }}
        ></div>
        
        {/* Blob 4 - Bottom Right */}
        <div 
          className="absolute bottom-[10%] -right-[10%] w-[650px] h-[650px] bg-gradient-to-tl from-curious-blue-600/30 via-curious-purple-800/10 to-transparent rounded-full blur-3xl opacity-40 animate-float-slow animate-rotate-slow"
          style={{ animationDelay: '0.2s', animationDirection: 'reverse', willChange: 'transform' }}
        ></div>
        
        {/* Blob 5 - Bottom Center */}
        <div 
          className="absolute bottom-[0%] left-[20%] w-[800px] h-[800px] bg-gradient-to-r from-curious-purple-700/20 via-curious-blue-900/10 to-transparent rounded-full blur-3xl opacity-30 animate-float"
          style={{ animationDelay: '1.2s', willChange: 'transform' }}
        ></div>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <NavBar />

        {/* First screen: Hero and Logo Strip at bottom */}
        <div className="min-h-screen flex flex-col">
          {/* Hero Section - No animation for immediate visibility */}
          <div className="pt-16 flex-grow">
            <Hero />
          </div>
          
          {/* Logo Strip positioned at bottom of first viewport */}
          <div 
            className="transition-opacity duration-500" 
            style={{ 
              opacity: Math.max(0, 1 - scrollY / 300),
              transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)`
            }}
          >
            <LogoStrip />
          </div>
        </div>
        
        {/* Dynamic Code Test Results section - appears as user scrolls */}
        <ScrollReveal animation="fade-in-up" delay="0.1s">
          <CodeTestResults />
        </ScrollReveal>
        
        {/* Rest of content */}
        <ScrollReveal animation="fade-in-up" delay="0.2s" id="services">
          <Services />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in-up" delay="0.3s" id="metrics">
          <Metrics />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in-up" delay="0.4s">
          <CaseStudies />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in-up" delay="0.5s">
          <Testimonials />
        </ScrollReveal>
        
        <footer className="py-12 bg-curious-dark-900/80 border-t border-curious-dark-700/50 backdrop-blur-sm">
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
