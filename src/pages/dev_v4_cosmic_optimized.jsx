import React, { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import optimized v4 components
import SpaceCanvas from '../components/home/v4/SpaceCanvas';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import OptimizedHeroPortal from '../components/home/v4/OptimizedHeroPortal';
import AboutMission from '../components/home/v4/AboutMission';
import ServicesFloatLayer from '../components/home/ServicesFloatLayer';
import OptimizedServicesOrbital from '../components/home/v4/OptimizedServicesOrbital';
import ProjectsLogbook from '../components/home/v4/ProjectsLogbook';
import CommunityHub from '../components/home/v4/CommunityHub';
import AITestimonials from '../components/home/v4/AITestimonials';
import ContactTerminal from '../components/home/v4/ContactTerminal';
import CuriousBotEnhanced from '../components/home/v4/CuriousBotEnhanced';
import FooterExperience from '../components/home/v4/FooterExperience';
import ErrorBoundary from '../components/ui/ErrorBoundary';

// Import UI components
import SectionHeader from '../components/ui/SectionHeader.jsx';
import SectionAnchor from '../components/ui/SectionAnchor';
import ParticleField from '../components/ui/ParticleField';
import CosmicHUD from '../components/ui/CosmicHUD';
import ScrollToTop from '../components/ScrollToTop';
import LazyLoadWrapper from '../components/ui/LazyLoadWrapper';
import SkeletonLoader from '../components/ui/SkeletonLoader';

// Import performance monitoring
import { initializePerformance } from '../utils/initializePerformance';

// Lazy-loaded components for code splitting
const ProjectsSection = lazy(() => import('../components/home/ProjectsSection'));

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
 * Optimized Cosmic Page with performance optimizations
 * Features lazy loading, code splitting, and parallax effects
 * Enhanced with the new performance monitoring system
 */
const DevV4CosmicOptimizedPage = () => {
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
  
  // Initialize performance monitoring and smooth scrolling
  useEffect(() => {
    initializePerformance();
    registerSmoothScrolling();
    
    // Log page load time
    if (window.performance) {
      const pageLoadTime = window.performance.now();
      console.log(`Page load time: ${pageLoadTime.toFixed(2)}ms`);
    }
  }, []);
  
  return (
    <ErrorBoundary
      componentName="DevV4CosmicOptimizedPage"
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <h1 className="text-white text-2xl">Curious Labs - Error Recovery Mode</h1>
        </div>
      }
    >
      <div className="min-h-screen relative bg-black text-white overflow-hidden">
        {/* Enhanced SpaceCanvas with fade to darker color */}
        <SpaceCanvas />
        
        {/* Add ParticleField component for floating particles - Medium density for main areas */}
        <ParticleField density="medium" zIndex={2} />
        
        {/* Extended gradient overlay for smoother transition from stars to dark background */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {/* Start transparent at the top, gradually fade to dark at bottom */}
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0d0d12]" style={{ top: '150vh', height: '100vh' }}></div>
        </div>
        
        <div className="relative z-10 min-h-screen">
          {/* Fixed header with component navigation */}
          <header className="fixed top-0 left-0 w-full bg-transparent z-40">
            <MissionControlNavbar />
          </header>
          
          {/* Cosmic HUD for position tracking */}
          <CosmicHUD position="bottom-left" />
          
          {/* Main content with all components */}
          <main>
            {/* Hero Section - Transparent background to show stars */}
            <div className="bg-transparent">
              <SectionAnchor 
                id="hero"
                className="relative"
                scrollMargin={0}
              >
                <OptimizedHeroPortal />
              </SectionAnchor>
            </div>
            
            {/* About Section - Transparent to show stars */}
            <div className="bg-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-0"></div>
              <SectionAnchor 
                id="about"
                className="py-16 md:py-20 relative z-10"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="OUR MISSION" 
                    subtitle="Transforming development through AI innovation and community collaboration."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealVariants}
                    fallback={<SkeletonLoader type="text" lines={6} />}
                  >
                    <motion.div
                      ref={aboutRef}
                      initial="hidden"
                      animate={aboutVisible ? "visible" : "hidden"}
                      variants={revealVariants}
                    >
                      <AboutMission />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Agent-Powered Development - Very subtle gradient overlay on stars */}
            <div className="bg-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 z-0"></div>
              <SectionAnchor 
                id="agent-powered"
                className="py-16 md:py-20 relative z-10"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="WHY AI-POWERED DEV?" 
                    subtitle="Harnessing intelligent agents to solve complex coding challenges with speed and precision."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealVariants}
                    fallback={<SkeletonLoader type="text" lines={4} />}
                  >
                    <motion.div
                      ref={agentRef}
                      initial="hidden"
                      animate={agentVisible ? "visible" : "hidden"}
                      variants={revealVariants}
                    >
                      <ServicesFloatLayer />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Services Orbital - Subtle gradient overlay on stars with increasing opacity */}
            <div className="bg-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 z-0"></div>
              <SectionAnchor 
                id="services"
                className="py-16 md:py-20 relative z-10"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="OUR SERVICES" 
                    subtitle="A constellation of solutions to power your development workflow."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealVariants}
                    fallback={<SkeletonLoader type="orbital" height="500px" />}
                  >
                    <motion.div
                      ref={servicesRef}
                      initial="hidden"
                      animate={servicesVisible ? "visible" : "hidden"}
                      variants={revealVariants}
                    >
                      <OptimizedServicesOrbital />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Projects Section - Further transition to dark background */}
            <div className="bg-transparent relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0d0d12]/70 z-0"></div>
              <SectionAnchor 
                id="projects"
                className="py-16 md:py-20 relative z-10"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="FEATURED PROJECTS" 
                    subtitle="Discover our latest innovations and client success stories."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealVariants}
                    fallback={<SkeletonLoader type="card" height="400px" />}
                  >
                    <motion.div
                      ref={projectsRef}
                      initial="hidden"
                      animate={projectsVisible ? "visible" : "hidden"}
                      variants={revealVariants}
                    >
                      <Suspense fallback={<SkeletonLoader type="card" height="400px" />}>
                        <ProjectsSection />
                      </Suspense>
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Projects Logbook - Complete transition to solid dark background */}
            <div className="bg-[#0d0d12]">
              {/* Add downward-moving particles for the lower sections */}
              <ParticleField density="low" yDirection="down" zIndex={1} />
              
              <SectionAnchor 
                id="projects-logbook"
                className="py-16 md:py-20"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="MISSION LOGBOOK" 
                    subtitle="Documenting our journey through the code universe."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealWithChildrenVariants}
                    fallback={<SkeletonLoader type="card" height="300px" />}
                  >
                    <motion.div
                      ref={logbookRef}
                      initial="hidden"
                      animate={logbookVisible ? "visible" : "hidden"}
                      variants={revealWithChildrenVariants}
                    >
                      <ProjectsLogbook />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Community Hub - Gradient back to gray-900 */}
            <div className="bg-gradient-to-b from-[#0d0d12] to-gray-900">
              <SectionAnchor 
                id="community"
                className="py-16 md:py-20"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="JOIN OUR WORLD" 
                    subtitle="Be part of a growing community of developers, innovators, and creators."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealWithChildrenVariants}
                    fallback={<SkeletonLoader type="text" lines={5} />}
                  >
                    <motion.div
                      ref={communityRef}
                      initial="hidden"
                      animate={communityVisible ? "visible" : "hidden"}
                      variants={revealWithChildrenVariants}
                    >
                      <CommunityHub />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* AI Testimonials - Gray-900 background */}
            <div className="bg-gray-900">
              <SectionAnchor 
                id="testimonials"
                className="py-16 md:py-20"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="HEAR FROM OUR AI" 
                    subtitle="What our artificial teammates have to say about working with us."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealWithChildrenVariants}
                    fallback={<SkeletonLoader type="card" height="300px" />}
                  >
                    <motion.div
                      ref={testimonialsRef}
                      initial="hidden"
                      animate={testimonialsVisible ? "visible" : "hidden"}
                      variants={revealWithChildrenVariants}
                    >
                      <AITestimonials />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Contact Terminal - Gradient to black for footer */}
            <div className="bg-gradient-to-b from-gray-900 to-black">
              <SectionAnchor 
                id="contact"
                className="py-16 md:py-20 pb-32"
                scrollMargin={8}
              >
                <div className="container mx-auto px-4">
                  <SectionHeader 
                    title="REACH OUT" 
                    subtitle="Let's build something amazing together."
                  />
                  <LazyLoadWrapper
                    options={{ threshold: 0.1, rootMargin: '100px' }}
                    animate={true}
                    variants={revealVariants}
                    fallback={<SkeletonLoader type="text" lines={3} />}
                  >
                    <motion.div
                      ref={contactRef}
                      initial="hidden"
                      animate={contactVisible ? "visible" : "hidden"}
                      variants={revealVariants}
                    >
                      <ContactTerminal />
                    </motion.div>
                  </LazyLoadWrapper>
                </div>
              </SectionAnchor>
            </div>
            
            {/* Footer Section - Using the new enhanced FooterExperience */}
            <div className="bg-black">
              <section className="pt-0">
                <FooterExperience />
              </section>
            </div>
          </main>
          
          {/* ScrollToTop Button */}
          <ScrollToTop />
          
          {/* CuriousBot - stays fixed */}
          <CuriousBotEnhanced />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default DevV4CosmicOptimizedPage; 