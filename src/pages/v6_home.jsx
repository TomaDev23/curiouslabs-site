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
  const [hiddenSections, setHiddenSections] = useState([]);
  const [milkywayLoaded, setMilkywayLoaded] = useState(false);
  const rafRef = useRef(null);
  
  // Preload critical images
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/images/planets/4k/milkyway1.jpg';
    img.onload = () => setMilkywayLoaded(true);
    
    // Also trigger general preload
    preloadImages();
  }, []);
  
  // Effect to track scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1, scrollY / scrollHeight));
      
      setScrollProgress(progress);
    };
    
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateScrollProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
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