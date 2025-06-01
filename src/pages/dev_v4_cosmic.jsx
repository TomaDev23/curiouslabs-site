import React, { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';

// UPDATED: Using new MissionControlNavbar instead of legacy NavBar
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
// LEGACY: import NavBar from '../components/NavBar';

// Eagerly load HeroPortal for immediate visible content
import HeroPortal from '../components/home/v4/HeroPortal';
// Eagerly load UI components essential for layout
import SectionHeader from '../components/ui/SectionHeader.jsx';
import SectionAnchor from '../components/ui/SectionAnchor';
import ParticleField from '../components/ui/ParticleField';
import CosmicHUD from '../components/ui/CosmicHUD';
import ScrollToTop from '../components/ScrollToTop';

// Import background zone hook
import useBackgroundZone from '../hooks/useBackgroundZone';

// Lazy load all other components which aren't needed for initial paint
const LogoStrip = lazy(() => import('../components/LogoStrip'));
const MissionStatement = lazy(() => import('../components/home/v4/MissionStatement'));
const WhyAIDevCards = lazy(() => import('../components/home/v4/WhyAIDevCards'));
const ServicesFloatLayer = lazy(() => import('../components/home/ServicesFloatLayer'));
const FeaturedProjects = lazy(() => import('../components/home/v4/FeaturedProjects'));
const ServicesOrbital = lazy(() => import('../components/home/v4/ServicesOrbital'));
const ProjectsLogbook = lazy(() => import('../components/home/v4/ProjectsLogbook'));
const CommunityHub = lazy(() => import('../components/home/v4/CommunityHub'));
const HearFromAI = lazy(() => import('../components/home/v4/HearFromAI'));
const ContactTerminal = lazy(() => import('../components/home/v4/ContactTerminal'));
const BotFunZone = lazy(() => import('../components/home/v4/BotFunZone'));
const FooterExperience = lazy(() => import('../components/home/v4/FooterExperience'));

// Import scroll utilities
import { registerSmoothScrolling } from '../utils/scrollUtils';
import { useScroll } from '../context/ScrollContext';

// Import section reveal hook and animation variants
import { useSectionReveal } from '../hooks/useSectionReveal';
import { 
  revealVariants, 
  revealWithChildrenVariants, 
  childVariants 
} from '../utils/animation';

/**
 * Dev page for testing all v4 components
 * Includes navigation to easily access different components
 * Merged with components from main homepage
 * Enhanced with cosmic theme elements and scroll synchronization
 */
const DevV4CosmicPage = () => {
  const { activeSection } = useScroll();
  
  // Section reveal hooks for each section
  const { ref: aboutRef, isVisible: aboutVisible } = useSectionReveal();
  const { ref: agentRef, isVisible: agentVisible } = useSectionReveal();
  const { ref: servicesRef, isVisible: servicesVisible } = useSectionReveal();
  const { ref: projectsRef, isVisible: projectsVisible } = useSectionReveal();
  const { ref: logbookRef, isVisible: logbookVisible } = useSectionReveal();
  const { ref: communityRef, isVisible: communityVisible } = useSectionReveal();
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useSectionReveal();
  const { ref: contactRef, isVisible: contactVisible } = useSectionReveal();
  
  // Background zone hooks for each major section
  const { ref: heroZoneRef } = useBackgroundZone('hero');
  const { ref: missionZoneRef } = useBackgroundZone('mission');
  const { ref: servicesZoneRef } = useBackgroundZone('services');
  const { ref: projectsZoneRef } = useBackgroundZone('projects');
  const { ref: testimonialsZoneRef } = useBackgroundZone('testimonials');
  const { ref: footerZoneRef } = useBackgroundZone('footer');
  
  // Register smooth scrolling for all hash links
  useEffect(() => {
    registerSmoothScrolling();
    
    // Add diagnostic logging
    console.log('DevV4CosmicPage mounted');
    console.log('Background zones initialized');
    
    return () => {
      console.log('DevV4CosmicPage unmounted');
    };
  }, []);
  
  // Helper to combine refs
  const combineRefs = (...refs) => {
    return (node) => {
      refs.forEach(ref => {
        if (!ref) return;
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      });
    };
  };
  
  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      {/* We no longer need SpaceCanvas here as it's handled by BackgroundManager */}
      
      {/* Add ParticleField component for floating particles - Medium density for main areas */}
      <ParticleField density="medium" zIndex={2} />
      
      {/* Extended gradient overlay for smoother transition from stars to dark background */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Start transparent at the top, gradually fade to dark at bottom */}
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0d0d12]" style={{ top: '150vh', height: '100vh' }}></div>
      </div>
      
      <div className="relative z-10 min-h-screen">
        {/* Fixed header with site-wide navigation */}
        <MissionControlNavbar />
        
        {/* Cosmic HUD for position tracking */}
        <CosmicHUD position="bottom-left" />
        
        {/* Main content with all components */}
        <main>
          {/* 180vh spacer for cosmic scene alignment - positioned ABOVE hero */}
          <div className="h-[180vh] bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-0"></div>
            
            {/* Optional debug label - only visible in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm font-mono">
                180vh cosmic spacer
              </div>
            )}
          </div>
          
          {/* Hero Section - Transparent background to show stars */}
          <div 
            className="bg-transparent"
            ref={heroZoneRef}
          >
            <SectionAnchor 
              id="hero"
              className="relative pt-16 md:pt-18"
              scrollMargin={60}
            >
              <HeroPortal />
            </SectionAnchor>
          </div>
          
          {/* About Section - Transparent to show stars */}
          <div 
            className="bg-transparent relative"
            ref={missionZoneRef}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-0"></div>
            <SectionAnchor 
              id="about"
              className="py-16 md:py-20 relative z-10 min-h-[400px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <Suspense fallback={<div className="h-[300px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={aboutRef}
                    initial="hidden"
                    animate={aboutVisible ? "visible" : "hidden"}
                    variants={revealVariants}
                  >
                    <MissionStatement />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Agent-Powered Development - Now part of services zone */}
          <div 
            className="bg-transparent relative"
            ref={servicesZoneRef}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 z-0"></div>
            <SectionAnchor 
              id="agent-powered"
              className="py-16 md:py-20 relative z-10 min-h-[500px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <Suspense fallback={<div className="h-[400px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={agentRef}
                    initial="hidden"
                    animate={agentVisible ? "visible" : "hidden"}
                    variants={revealVariants}
                  >
                    <WhyAIDevCards />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Services Orbital - Part of services zone */}
          <div className="bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 z-0"></div>
            <SectionAnchor 
              id="services"
              className="py-16 md:py-20 relative z-10 min-h-[600px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <Suspense fallback={<div className="h-[500px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={servicesRef}
                    initial="hidden"
                    animate={servicesVisible ? "visible" : "hidden"}
                    variants={revealVariants}
                  >
                    <ServicesOrbital />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Projects Section - Projects zone */}
          <div 
            className="bg-transparent relative"
            ref={projectsZoneRef}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#0d0d12]/40 to-[#0d0d12]/90 z-0"></div>
            <SectionAnchor 
              id="projects"
              className="py-16 md:py-20 relative z-10 min-h-[700px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <Suspense fallback={<div className="h-[600px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={projectsRef}
                    initial="hidden"
                    animate={projectsVisible ? "visible" : "hidden"}
                    variants={revealVariants}
                  >
                    <FeaturedProjects />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Projects Logbook - Part of projects zone */}
          <div className="bg-transparent relative">
            <div className="absolute inset-0 bg-[#0d0d12] z-0"></div>
            {/* Add downward-moving particles for the lower sections with reduced opacity */}
            <ParticleField density="low" yDirection="down" zIndex={1} opacity={0.3} />
            
            <SectionAnchor 
              id="projects-logbook"
              className="py-16 md:py-20 relative z-10 min-h-[500px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="MISSION LOGBOOK" 
                  subtitle="Documenting our journey through the code universe."
                />
                <Suspense fallback={<div className="h-[400px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={logbookRef}
                    initial="hidden"
                    animate={logbookVisible ? "visible" : "hidden"}
                    variants={revealWithChildrenVariants}
                  >
                    <ProjectsLogbook />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Community Hub - Part of testimonials zone */}
          <div 
            className="bg-gradient-to-b from-[#0d0d12] to-gray-900"
            ref={testimonialsZoneRef}
          >
            <SectionAnchor 
              id="community"
              className="py-16 md:py-20 min-h-[450px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="JOIN OUR WORLD" 
                  subtitle="Be part of a growing community of developers, innovators, and creators."
                />
                <Suspense fallback={<div className="h-[350px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={communityRef}
                    initial="hidden"
                    animate={communityVisible ? "visible" : "hidden"}
                    variants={revealWithChildrenVariants}
                  >
                    <CommunityHub />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* AI Testimonials - Part of testimonials zone */}
          <div className="bg-gray-900">
            <SectionAnchor 
              id="testimonials"
              className="py-16 md:py-20 min-h-[450px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <Suspense fallback={<div className="h-[350px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={testimonialsRef}
                    initial="hidden"
                    animate={testimonialsVisible ? "visible" : "hidden"}
                    variants={revealWithChildrenVariants}
                  >
                    <HearFromAI />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Contact Terminal - Part of footer zone */}
          <div 
            className="bg-gradient-to-b from-gray-900 to-black"
            ref={footerZoneRef}
          >
            <SectionAnchor 
              id="contact"
              className="py-16 md:py-20 pb-32 min-h-[400px]"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="REACH OUT" 
                  subtitle="Let's build something amazing together."
                />
                <Suspense fallback={<div className="h-[300px] w-full bg-transparent"></div>}>
                  <motion.div
                    ref={contactRef}
                    initial="hidden"
                    animate={contactVisible ? "visible" : "hidden"}
                    variants={revealVariants}
                  >
                    <ContactTerminal />
                  </motion.div>
                </Suspense>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Footer Section - Part of footer zone */}
          <div className="bg-black">
            <section className="pt-0">
              <Suspense fallback={<div className="h-[100px] w-full bg-transparent"></div>}>
                <FooterExperience />
              </Suspense>
            </section>
          </div>
        </main>
        
        {/* ScrollToTop Button */}
        <ScrollToTop />
        
        {/* CuriousBot - stays fixed */}
        <Suspense fallback={<div className="fixed bottom-4 right-4 h-16 w-16 bg-transparent"></div>}>
          <BotFunZone />
        </Suspense>
      </div>
    </div>
  );
};

// Helper component to display component name and info
const ComponentWrapper = ({ title, id, children }) => {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden border border-dashed border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id={id}
    >
      <div className="absolute top-2 left-2 z-10 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-mono flex items-center">
        <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
        {title}
      </div>
      {children}
    </motion.div>
  );
};

export default DevV4CosmicPage; 