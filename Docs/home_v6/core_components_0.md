// src/components/home/v6/LayoutWrapper.jsx

import React, { useEffect } from 'react';
import NavBarCosmic from './NavBarCosmic';
import PillNav from './PillNav';
import { useScrollTrigger } from '../../../hooks/useScrollTrigger';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

/**
 * @component LayoutWrapper
 * @description Main layout container for V6 home page sections
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - Layout Wrapper passes LEGIT protocol
 */
const LayoutWrapper = ({ children }) => {
  // Breakpoint detection for responsive adjustments
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  // Setup scroll behavior for fixed elements
  const { scrollY } = useScrollTrigger({
    threshold: 100,
    throttleMs: 30,
  });

  // Setup prefers-reduced-motion listener
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
    
    return () => {
      document.documentElement.classList.remove('reduced-motion');
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Fixed background with subtle grid overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-100 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" aria-hidden="true"></div>
        {/* We'll add the starfield background here using the provided images */}
        <div className="absolute inset-0 bg-cover bg-center z-[-1]" aria-hidden="true"></div>
      </div>

      {/* Fixed navigation */}
      <NavBarCosmic isScrolled={scrollY > 100} />
      
      {/* Main content container */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Fixed pill navigation (desktop only) */}
      {!isMobile && <PillNav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50" />}
      
      {/* Mobile-only bottom navigation */}
      {isMobile && <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 py-3">
        <PillNav compact />
      </div>}
    </div>
  );
};

export default LayoutWrapper;

// src/components/home/v6/NavBarCosmic.jsx

import React, { useState } from 'react';
import { useScrollTrigger } from '../../../hooks/useScrollTrigger';

/**
 * @component NavBarCosmic
 * @description Main navigation for V6 site with cosmic styling
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - NavBar passes LEGIT protocol
 */
const NavBarCosmic = ({ isScrolled = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-white font-serif text-xl tracking-wider">
              <span className="font-bold">Curious</span>Labs
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-lime-400 transition-colors px-1 py-2 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            
            {/* Contact Button - Pill shaped with accent color */}
            <a
              href="#contact"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-black bg-lime-400 hover:bg-lime-300 transition-colors duration-150"
            >
              <span>Contact</span>
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-lime-400 focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-black/90 backdrop-blur-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-lime-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block px-3 py-2 mt-4 rounded-full text-center text-black bg-lime-400 hover:bg-lime-300 transition-colors duration-150"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBarCosmic;

// src/components/home/v6/PillNav.jsx

import React, { useState, useEffect } from 'react';

/**
 * @component PillNav
 * @description Pill-shaped navigation for section scrolling
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - PillNav passes LEGIT protocol
 */
const PillNav = ({ className = '', compact = false }) => {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Navigation pill data
  const navPills = [
    { id: 'hero', label: 'Home', color: 'bg-lime-400' },
    { id: 'services', label: 'Services', color: 'bg-yellow-400' },
    { id: 'process', label: 'Process', color: 'bg-blue-400' },
    { id: 'contact', label: 'Contact', color: 'bg-purple-400' }
  ];
  
  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth scroll to element
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
    }
  };
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Find the current section based on scroll position
      const sections = navPills.map(pill => pill.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offset = 100; // Offset to trigger section change slightly earlier
          
          if (top - offset <= 0 && bottom - offset > 0) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navPills]);
  
  return (
    <nav className={`flex ${compact ? 'justify-around' : 'space-x-4'} ${className}`}>
      {navPills.map((pill) => (
        <button
          key={pill.id}
          onClick={() => scrollToSection(pill.id)}
          className={`group transition-all duration-300 ease-in-out ${
            compact ? 'text-xs' : 'text-sm'
          } ${
            activeSection === pill.id 
              ? 'text-black font-medium' 
              : 'text-white hover:text-gray-200'
          }`}
        >
          <div 
            className={`flex items-center ${
              compact 
                ? 'flex-col space-y-1' 
                : 'px-4 py-2 rounded-full border border-opacity-50 space-x-2'
            }`}
          >
            {!compact && (
              <div 
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSection === pill.id ? pill.color : 'bg-gray-600'
                }`}
              />
            )}
            
            {compact ? (
              <>
                <div 
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeSection === pill.id ? pill.color : 'bg-gray-600'
                  }`}
                />
                <span>{pill.label}</span>
              </>
            ) : (
              <span>{pill.label}</span>
            )}
            
            {!compact && activeSection === pill.id && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </div>
          
          <div 
            className={`${
              compact ? 'hidden' : 'block'
            } mt-1 h-0.5 transition-all duration-300 ease-in-out ${
              activeSection === pill.id ? `${pill.color} w-full` : 'w-0'
            }`}
          />
        </button>
      ))}
    </nav>
  );
};

export default PillNav;

// src/hooks/useScrollTrigger.js

import { useState, useEffect } from 'react';

/**
 * @hook useScrollTrigger
 * @description Hook to track scroll position with throttling
 */
export const useScrollTrigger = ({ threshold = 0, throttleMs = 100 } = {}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateScrollPosition = () => {
      setScrollY(window.scrollY);
      setIsTriggered(window.scrollY > threshold);
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  
  return { scrollY, isTriggered };
};

// src/hooks/useBreakpoint.js

import { useState, useEffect } from 'react';

/**
 * @hook useBreakpoint
 * @description Hook to detect responsive breakpoints
 */
export const useBreakpoint = () => {
  // Define breakpoints (matching Tailwind's defaults)
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };
  
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine current breakpoint values
  return {
    windowWidth,
    isMobile: windowWidth < breakpoints.md,
    isTablet: windowWidth >= breakpoints.md && windowWidth < breakpoints.lg,
    isDesktop: windowWidth >= breakpoints.lg,
    breakpoints,
  };
};