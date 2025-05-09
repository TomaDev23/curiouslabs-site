import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IMAGES } from '../utils/assets';
import { useBreakpoint } from '../hooks/useBreakpoint.js';

// Simple environment check for development mode
const isDevelopment = process.env.NODE_ENV === 'development';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [autoScrolling, setAutoScrolling] = useState(false);
  const location = useLocation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  // Auto-scroll animation ref
  const autoScrollAnimationRef = useRef(null);
  const autoScrollStartTimeRef = useRef(0);
  
  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Add scroll event listener with performance optimization
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    // Check initial scroll position
    handleScroll();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close products dropdown when toggling menu
    setIsProductsDropdownOpen(false);
  };

  // Toggle products dropdown (for mobile)
  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [location.pathname]);
  
  // Determine if we're on the cosmic journey page - improved detection
  const isCosmicJourneyPage = location.pathname === '/home-v5' || location.pathname.includes('cosmic');
  
  // Auto-scroll functionality - fixed implementation
  const toggleAutoScroll = () => {
    console.log("[AUTO-SCROLL] Button clicked!", autoScrolling ? "Will stop" : "Will start");
    if (autoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };
  
  const startAutoScroll = () => {
    // Cancel any existing animation
    if (autoScrollAnimationRef.current) {
      cancelAnimationFrame(autoScrollAnimationRef.current);
    }
    
    console.log("[AUTO-SCROLL] Starting animation");
    setAutoScrolling(true);
    
    // Get scroll dimensions
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      console.log("[AUTO-SCROLL] Invalid scroll height");
      return;
    }
    
    console.log("[AUTO-SCROLL] Document height:", document.documentElement.scrollHeight, "Window height:", window.innerHeight);
    
    // Get current scroll position and save start time
    const startScrollY = window.scrollY;
    const startProgress = startScrollY / scrollHeight;
    
    console.log("[AUTO-SCROLL] Starting from:", startScrollY, "px, progress:", startProgress);
    
    autoScrollStartTimeRef.current = Date.now();
    
    // Animation duration - 45 seconds total
    const totalDuration = 45000;
    const duration = totalDuration * (1 - startProgress);
    
    let lastTimestamp = null;
    
    // Animation function - improved with timestamp
    const animateScroll = (timestamp) => {
      if (!autoScrolling) {
        console.log("[AUTO-SCROLL] Animation stopped by flag");
        return;
      }
      
      if (!lastTimestamp) lastTimestamp = timestamp;
      
      const elapsedTime = Date.now() - autoScrollStartTimeRef.current;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Calculate new scroll position - direct calculation
      const targetY = startScrollY + ((scrollHeight - startScrollY) * progress);
      
      // Log every second
      if (timestamp - lastTimestamp > 1000) {
        console.log(`[AUTO-SCROLL] Progress: ${(progress * 100).toFixed(1)}%, position: ${targetY.toFixed(0)}px`);
        lastTimestamp = timestamp;
      }
      
      // Perform the scroll - more direct method
      try {
        window.scrollTo(0, targetY);
      } catch (error) {
        console.error("[AUTO-SCROLL] Error scrolling:", error);
      }
      
      // If not complete, continue animation
      if (progress < 1) {
        autoScrollAnimationRef.current = requestAnimationFrame(animateScroll);
      } else {
        console.log("[AUTO-SCROLL] Animation complete");
        setAutoScrolling(false);
        autoScrollAnimationRef.current = null;
      }
    };
    
    // Start animation
    autoScrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };
  
  const stopAutoScroll = () => {
    console.log("Stopping auto-scroll");
    if (autoScrollAnimationRef.current) {
      cancelAnimationFrame(autoScrollAnimationRef.current);
      autoScrollAnimationRef.current = null;
    }
    setAutoScrolling(false);
  };
  
  // Clean up auto-scroll animation when component unmounts
  useEffect(() => {
    return () => {
      if (autoScrollAnimationRef.current) {
        cancelAnimationFrame(autoScrollAnimationRef.current);
      }
    };
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 bg-gradient-to-r from-[#28293D]/95 to-[#1F2040]/95 backdrop-blur-md z-50 ${isScrolled ? 'shadow-lg' : ''}`}>
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start relative group">
          <div className="flex items-center">
            <img 
              src={IMAGES.LOGO} 
              alt="CuriousLabs" 
              className="h-8 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 1px rgba(139, 92, 246, 0.3))' }}
            />
            <span className="ml-2 text-xl font-semibold text-white">CuriousLabs</span>
          </div>
          {/* Base gradient line (always visible) */}
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
          {/* Hover effect gradient line (animates on hover) */}
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/' ? 'text-purple-300' : ''}`}
          >
            Home
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/codelab" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/codelab' ? 'text-purple-300' : ''}`}
          >
            CodeLab
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          {/* Products dropdown */}
          <div className="relative group">
            <Link 
              to="/products" 
              className={`text-white hover:text-purple-300 transition flex items-center relative ${location.pathname.includes('/products') ? 'text-purple-300' : ''}`}
            >
              Products
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              {/* Base gradient line (always visible) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
              {/* Hover effect gradient line (animates on hover) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
            </Link>
            
            {/* Dropdown menu */}
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#28293D] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <Link to="/products/aegis" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">Aegis</Link>
                <Link to="/products/opspipe" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">OpsPipe</Link>
                <Link to="/products/moonsignal" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">MoonSignal</Link>
                <Link to="/products/curious" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">Curious</Link>
                <Link to="/products/guardian" className="block px-4 py-2 text-sm text-white hover:bg-[#383853]">Guardian</Link>
              </div>
            </div>
          </div>
          
          {/* Development mode only links */}
          {isDevelopment && (
            <Link 
              to="/background-sandbox" 
              className={`text-purple-300 hover:text-purple-200 transition relative group ${location.pathname === '/background-sandbox' ? 'text-purple-200' : ''}`}
            >
              BG Sandbox
              {/* Base gradient line (always visible) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
              {/* Hover effect gradient line (animates on hover) */}
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
            </Link>
          )}
          
          <Link 
            to="/tools" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/tools' ? 'text-purple-300' : ''}`}
          >
            Tools
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/blog" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/blog' ? 'text-purple-300' : ''}`}
          >
            Blog
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/docs" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname.includes('/docs') ? 'text-purple-300' : ''}`}
          >
            Docs
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/about" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/about' ? 'text-purple-300' : ''}`}
          >
            About
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          <Link 
            to="/contact" 
            className={`text-white hover:text-purple-300 transition relative group ${location.pathname === '/contact' ? 'text-purple-300' : ''}`}
          >
            Contact
            {/* Base gradient line (always visible) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            {/* Hover effect gradient line (animates on hover) */}
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-700 ease-in-out origin-left"></div>
          </Link>
          
          {/* Auto-scroll button - only visible on cosmic journey page */}
          {isCosmicJourneyPage && (
            <button
              className="flex items-center space-x-1 px-4 py-2 bg-blue-900/60 hover:bg-blue-700/70 text-white rounded-full transition-all"
              onClick={toggleAutoScroll}
              style={{ 
                boxShadow: autoScrolling ? '0 0 15px rgba(100, 200, 255, 0.6)' : 'none'
              }}
            >
              {autoScrolling ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  <span>Pause Journey</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Play Journey</span>
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1F2040] border-t border-[#383853]">
          <div className="px-4 py-2">
            <Link 
              to="/" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/' ? 'text-purple-300' : ''}`}
            >
              Home
            </Link>
            
            <Link 
              to="/codelab" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/codelab' ? 'text-purple-300' : ''}`}
            >
              CodeLab
            </Link>
            
            {/* Products dropdown (mobile) */}
            <div>
              <button 
                onClick={toggleProductsDropdown}
                className={`flex justify-between items-center w-full rounded-md px-3 py-2 text-left ${location.pathname.includes('/products') ? 'bg-[#383853] text-white' : 'text-gray-300 hover:bg-[#383853] hover:text-white'}`}
              >
                <span>Products</span>
                <svg 
                  className={`w-4 h-4 ml-1 transform transition-transform ${isProductsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`transition-all duration-300 ease-in-out ${isProductsDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <Link to="/products" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">All Products</Link>
                <Link to="/products/aegis" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">Aegis</Link>
                <Link to="/products/opspipe" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">OpsPipe</Link>
                <Link to="/products/moonsignal" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">MoonSignal</Link>
                <Link to="/products/curious" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">Curious</Link>
                <Link to="/products/guardian" className="block rounded-md pl-6 pr-3 py-2 text-gray-300 hover:bg-[#383853] hover:text-white">Guardian</Link>
              </div>
            </div>
            
            {/* Development mode only links (mobile) */}
            {isDevelopment && (
              <Link 
                to="/background-sandbox" 
                className={`block rounded-md px-3 py-2 ${location.pathname === '/background-sandbox' ? 'bg-purple-800 text-white' : 'text-purple-300 hover:bg-purple-800 hover:text-white'}`}
              >
                Background Sandbox
              </Link>
            )}
            
            <Link 
              to="/tools" 
              className={`block rounded-md px-3 py-2 ${location.pathname === '/tools' ? 'bg-[#383853] text-white' : 'text-gray-300 hover:bg-[#383853] hover:text-white'}`}
            >
              Tools
            </Link>
            
            <Link 
              to="/blog" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/blog' ? 'text-purple-300' : ''}`}
            >
              Blog
            </Link>
            
            <Link 
              to="/docs" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname.includes('/docs') ? 'text-purple-300' : ''}`}
            >
              Docs
            </Link>
            
            <Link 
              to="/about" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/about' ? 'text-purple-300' : ''}`}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`block py-2 text-white hover:text-purple-300 ${location.pathname === '/contact' ? 'text-purple-300' : ''}`}
            >
              Contact
            </Link>
            
            {/* Auto-scroll button in mobile menu - only visible on cosmic journey page */}
            {isCosmicJourneyPage && (
              <button
                onClick={toggleAutoScroll}
                className={`flex items-center justify-between w-full rounded-md px-3 py-4 mt-3 text-left ${
                  autoScrolling ? 'bg-blue-900/80 text-white' : 'bg-[#383853] text-white hover:bg-[#383880]'
                }`}
              >
                <span className="flex items-center">
                  {autoScrolling ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                      Pause Cosmic Journey
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play Cosmic Journey
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
} 