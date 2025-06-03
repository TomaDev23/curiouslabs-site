/**
 * @component V6HomePage
 * @description Main home page for CuriousLabs V6
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - V6 Home Page passes LEGIT protocol
 */

import React, { useEffect, useState, useCallback, useRef, Suspense, lazy } from 'react';
import LayoutWrapper from '../components/home/v6/LayoutWrapper';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
// LEGACY: import NavBarCosmic from '../components/home/v6/NavBarCosmic';
const HeroSequenceV6 = lazy(() => import('../components/home/v6/HeroSequenceV6.jsx'));
import ServicesOrbital from '../components/home/v6/ServicesOrbital';
import ProcessCards from '../components/home/v6/ProcessCards';
import ContactTerminal from '../components/home/v6/ContactTerminal';
import { useMission, MissionTiles } from '../components/home/v6/MissionTracker';
import CosmicBackgroundSystemV6 from '../components/home/v6/CosmicBackgroundSystemV6';
import HorizontalProductScrollV6 from '../components/home/v6/HorizontalProductScrollV6';
import SceneControllerV6 from '../components/home/v6/SceneControllerV6';
import V6HUDSystem from '../components/home/v6/hud/V6HUDSystem';
import MissionStatementV6 from '../components/home/v6/MissionStatementV6';

// Define sections with position information for the V6HUDSystem
const V6_SECTIONS = [
  { id: 'hero', name: 'Hero Section', component: HeroSequenceV6, position: 0 },
  { id: 'cosmic-lore', name: 'Mission Statement', component: MissionStatementV6, position: 100 },
  { id: 'products', name: 'Product Showcase', component: HorizontalProductScrollV6, position: 200 },
  { id: 'services', name: 'Services Orbital', component: ServicesOrbital, position: 300 },
  { id: 'process', name: 'Process Cards', component: ProcessCards, position: 400 },
  { id: 'contact', name: 'Contact Terminal', component: ContactTerminal, position: 500 }
];

// Preload important images
const preloadImages = () => {
  const imagesToPreload = [
    '/assets/images/planets/4k/milkyway1.jpg'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

const V6HomePage = () => {
  const { markMissionComplete, markTaskComplete } = useMission();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
  const [hiddenSections, setHiddenSections] = useState([]);
  const [milkywayLoaded, setMilkywayLoaded] = useState(false);
  
  // Refs for smooth scroll implementation (LEGIT contract compliant)
  const targetScrollProgressRef = useRef(0);
  const smoothScrollProgressRef = useRef(0);
  const animationRef = useRef(null);
  const rafRef = useRef(null);
  const smallMovementAccumulator = useRef(0);
  
  // Preload critical images
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/images/planets/4k/milkyway1.jpg';
    img.onload = () => setMilkywayLoaded(true);
    
    // Also trigger general preload
    preloadImages();
  }, []);
  
  // LEGIT Contract Compliant Smooth Scroll Implementation
  useEffect(() => {
    let animationFrameId = null;
    let pendingUpdate = false;
    let isScrolling = false;
    let scrollTimeout = null;
    
    // Ultra-smooth Scroll Interpolation Settings
    const interpolationFactor = 0.04; // Much lower for ultra-smooth deceleration
    const animationStopThreshold = 0.0000001; // Ultra-sensitive threshold
    const wheelSensitivity = 0.3; // Reduce wheel sensitivity for smaller increments
    const maxScrollDelta = 15; // Maximum pixels per scroll event
    
    // Animation loop for smooth interpolation - Ultra-smooth "Boat in Water" effect
    const animateScroll = () => {
      const diff = targetScrollProgressRef.current - smoothScrollProgressRef.current;
      
      if (Math.abs(diff) > animationStopThreshold) {
        smoothScrollProgressRef.current += diff * interpolationFactor;
        setSmoothScrollProgress(smoothScrollProgressRef.current);
        setScrollProgress(smoothScrollProgressRef.current);
        
        // Continue the animation loop
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        // Snap to target and stop
        smoothScrollProgressRef.current = targetScrollProgressRef.current;
        setSmoothScrollProgress(smoothScrollProgressRef.current);
        setScrollProgress(smoothScrollProgressRef.current);
        animationRef.current = null;
        isScrolling = false;
      }
    };
    
    // Aggressive wheel event handling to control scroll increments
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent default browser scrolling
      
      // Clear any existing scroll timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Calculate smooth scroll delta with reduced sensitivity
      let deltaY = e.deltaY * wheelSensitivity;
      
      // Clamp the delta to prevent large jumps
      deltaY = Math.max(-maxScrollDelta, Math.min(maxScrollDelta, deltaY));
      
      // Apply the smooth scroll increment
      const currentScrollY = window.scrollY;
      const newScrollY = Math.max(0, currentScrollY + deltaY);
      
      // Smooth scroll to the new position
      window.scrollTo({
        top: newScrollY,
        behavior: 'auto' // Use auto to prevent browser smooth scrolling interference
      });
      
      isScrolling = true;
      
      // Set timeout to detect end of scrolling
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };
    
    // Handle scroll events (now triggered by our custom wheel handler)
    const handleScroll = () => {
      if (!pendingUpdate) {
        pendingUpdate = true;
        
        animationFrameId = requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollHeight <= 0) {
            pendingUpdate = false;
            return;
          }
          
          const rawProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
          targetScrollProgressRef.current = rawProgress;
          
          // Start smooth animation
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animateScroll);
          }
          
          pendingUpdate = false;
        });
      }
    };
    
    // Initial setup
    const setInitialScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const initialProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      targetScrollProgressRef.current = initialProgress;
      smoothScrollProgressRef.current = initialProgress;
      setSmoothScrollProgress(initialProgress);
      setScrollProgress(initialProgress);
    };
    
    // Setup event listeners with wheel interception
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false }); // Non-passive to prevent default
    
    // Initialize
    setInitialScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);
  
  // Load hiddenSections from localStorage in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const savedVisibility = localStorage.getItem('v6_section_visibility');
        if (savedVisibility) {
          setHiddenSections(JSON.parse(savedVisibility));
        }
      } catch (error) {
        console.error('Error loading section visibility:', error);
      }
    }
  }, []);
  
  // Mark completed missions for implemented components
  useEffect(() => {
    // All initial task statuses are now set in MissionProvider
    // This effect is only needed for dynamic updates when components change
    
    // For example, when a new component is implemented, we could add:
    // markMissionComplete('TILE_X', true);
    // markTaskComplete('TILE_X', Y, true);
    
  }, [markMissionComplete, markTaskComplete]);
  
  // Determine if a section should be visible
  const isSectionVisible = (sectionId) => {
    if (process.env.NODE_ENV !== 'development') return true;
    return !hiddenSections.includes(sectionId);
  };
  
  return (
    <SceneControllerV6>
      <LayoutWrapper>
        {/* Background System */}
        <CosmicBackgroundSystemV6 />
        
        {/* Navigation */}
        <MissionControlNavbar />
        
        {/* Render sections based on visibility status */}
        {isSectionVisible('hero') && (
          <Suspense fallback={
            <div className="relative min-h-screen flex items-center justify-center">
              <div className="text-curious-blue-400 text-lg">Loading Hero Section...</div>
            </div>
          }>
            <HeroSequenceV6 />
          </Suspense>
        )}
        
        {/* Cosmic Lore Panel */}
        <section className="relative overflow-hidden" style={{ marginTop: '-10vh', minHeight: 'calc(110vh + 10vh)' }}>
          {/* Background Image with mask for translucent edge */}
          <div 
            className={`absolute inset-0 z-0 transition-opacity duration-500 ${milkywayLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: 'url("/assets/images/planets/4k/milkyway1.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 5%, rgba(0,0,0,0.8) 10%, black 15%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 5%, rgba(0,0,0,0.8) 10%, black 15%)'
            }}
          ></div>
          
          {/* Placeholder while image loads */}
          {!milkywayLoaded && (
            <div className="absolute inset-0 bg-curious-dark-900 z-0"></div>
          )}
          
          {/* Mission Statement Component with conditional rendering based on image load */}
          <div className={`relative z-10 transition-opacity duration-500 ${milkywayLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <MissionStatementV6 />
          </div>
        </section>
        
        {isSectionVisible('products') && <HorizontalProductScrollV6 />}
        
        {isSectionVisible('services') && <ServicesOrbital />}
        
        {isSectionVisible('process') && <ProcessCards />}
        
        {isSectionVisible('contact') && <ContactTerminal />}
        
        {/* HUD System (development only) */}
        <V6HUDSystem 
          sections={V6_SECTIONS}
          scrollProgress={scrollProgress}
        />
      </LayoutWrapper>
    </SceneControllerV6>
  );
};

export default V6HomePage; 