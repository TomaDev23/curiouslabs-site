import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Import critical components directly
import SpaceCanvas from '../components/home/v4/SpaceCanvas';
import NavBarCosmic from '../components/home/v4/NavBarCosmic';
import HeroPortal from '../components/home/v4/HeroPortal';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import SectionAnchor from '../components/ui/SectionAnchor';
import CosmicHUD from '../components/ui/CosmicHUD';
import ScrollToTop from '../components/ScrollToTop';

// Lazy load non-critical components for better initial load performance
const AboutMission = lazy(() => import('../components/home/v4/AboutMission'));
const ServicesFloatLayer = lazy(() => import('../components/home/ServicesFloatLayer'));
const ProjectsSection = lazy(() => import('../components/home/ProjectsSection'));
const ServicesOrbital = lazy(() => import('../components/home/v4/ServicesOrbital'));
const ProjectsLogbook = lazy(() => import('../components/home/v4/ProjectsLogbook'));
const CommunityHub = lazy(() => import('../components/home/v4/CommunityHub'));
const AITestimonials = lazy(() => import('../components/home/v4/AITestimonials'));
const ContactTerminal = lazy(() => import('../components/home/v4/ContactTerminal'));
const CuriousBotEnhanced = lazy(() => import('../components/home/v4/CuriousBotEnhanced'));
const FooterExperience = lazy(() => import('../components/home/v4/FooterExperience'));

// Lazy load ParticleField (heavy animation component)
const ParticleField = lazy(() => import('../components/ui/ParticleField'));

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

// Loading fallback for suspended components
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-16 min-h-[300px]">
    <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin"></div>
  </div>
);

/**
 * Dev page for testing all v4 components
 * Includes navigation to easily access different components
 * Merged with components from main homepage
 * Enhanced with cosmic theme elements and scroll synchronization
 * Optimized for performance with lazy loading
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
  
  // Register smooth scrolling for all hash links
  React.useEffect(() => {
    registerSmoothScrolling();
  }, []);
  
  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      {/* Enhanced SpaceCanvas with fade to darker color */}
      <SpaceCanvas />
      
      {/* Add ParticleField component for floating particles - Medium density for main areas */}
      <Suspense fallback={null}>
        <ParticleField density="medium" zIndex={2} />
      </Suspense>
      
      {/* Unified cosmic gradient background system */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {/* Top hero area - fully transparent to show stars */}
        <div className="absolute w-full h-screen bg-transparent"></div>
        
        {/* First transition layer - subtle cosmic purple glow */}
        <div className="absolute w-full h-[150vh] bg-gradient-to-b from-transparent via-purple-900/5 to-indigo-900/10" 
             style={{ top: '80vh' }}></div>
        
        {/* Middle transition - deep space feel */}
        <div className="absolute w-full h-[200vh] bg-gradient-to-b from-transparent via-indigo-950/20 to-[#0d0d12]/60" 
             style={{ top: '150vh' }}></div>
        
        {/* Bottom sections - full cosmic dark */}
        <div className="absolute w-full h-[300vh] bg-gradient-to-b from-[#0d0d12]/60 via-[#0a0a12]/80 to-[#080810]" 
             style={{ top: '300vh' }}></div>
        
        {/* Cosmic accent gradients - add ethereal glow */}
        <div className="absolute w-full h-[120vh] opacity-40 mix-blend-soft-light"
             style={{ 
               background: 'radial-gradient(circle at 75% 30%, rgba(124, 58, 237, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
               top: '100vh'
             }}></div>
        
        <div className="absolute w-full h-[150vh] opacity-30 mix-blend-soft-light"
             style={{ 
               background: 'radial-gradient(circle at 20% 70%, rgba(79, 70, 229, 0.2) 0%, rgba(67, 56, 202, 0.05) 50%, transparent 70%)',
               top: '180vh'
             }}></div>
      </div>
      
      <div className="relative z-10 min-h-screen">
        {/* Fixed header with component navigation - Hidden in Cosmic mode */}
        <header className="fixed top-0 left-0 w-full bg-transparent z-40">
          {/* Using NavBarCosmic component with scroll sync */}
          <NavBarCosmic />
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
              <HeroPortal />
            </SectionAnchor>
          </div>
          
          {/* About Section - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
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
                <motion.div
                  ref={aboutRef}
                  initial="hidden"
                  animate={aboutVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <AboutMission />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Agent-Powered Development - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
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
                <motion.div
                  ref={agentRef}
                  initial="hidden"
                  animate={agentVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <ServicesFloatLayer />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Services Orbital - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
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
                <motion.div
                  ref={servicesRef}
                  initial="hidden"
                  animate={servicesVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <ServicesOrbital />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Projects Section - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
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
                <motion.div
                  ref={projectsRef}
                  initial="hidden"
                  animate={projectsVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <ProjectsSection />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Project Logbook - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
            <SectionAnchor 
              id="project-logbook"
              className="py-16 md:py-20 relative z-10"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="PROJECT LOGBOOK" 
                  subtitle="Browse our mission logs and completed development expeditions."
                />
                <motion.div
                  ref={logbookRef}
                  initial="hidden"
                  animate={logbookVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <ProjectsLogbook />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Community Hub - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
            <SectionAnchor 
              id="community"
              className="py-16 md:py-20 relative z-10"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="JOIN OUR COMMUNITY" 
                  subtitle="Connect with fellow developers, share insights, and grow together."
                />
                <motion.div
                  ref={communityRef}
                  initial="hidden"
                  animate={communityVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <CommunityHub />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* AI Testimonials - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
            <SectionAnchor 
              id="testimonials"
              className="py-16 md:py-20 relative z-10"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="MISSION REPORTS" 
                  subtitle="Hear what our clients say about their development journeys with us."
                />
                <motion.div
                  ref={testimonialsRef}
                  initial="hidden"
                  animate={testimonialsVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <AITestimonials />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Contact Terminal - Now uses unified cosmic gradient */}
          <div className="bg-transparent relative">
            <SectionAnchor 
              id="contact"
              className="py-16 md:py-20 relative z-10"
              scrollMargin={8}
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="REACH OUT" 
                  subtitle="Launch a conversation with our team. We're ready to help your project take flight."
                />
                <motion.div
                  ref={contactRef}
                  initial="hidden"
                  animate={contactVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <Suspense fallback={<LoadingFallback />}>
                    <ContactTerminal />
                  </Suspense>
                </motion.div>
              </div>
            </SectionAnchor>
          </div>
          
          {/* Footer with mission stats and links */}
          <div className="bg-transparent relative">
            <Suspense fallback={<LoadingFallback />}>
              <FooterExperience />
            </Suspense>
          </div>
        </main>
        
        {/* Floating Assistant */}
        <Suspense fallback={null}>
          <CuriousBotEnhanced />
        </Suspense>
      </div>
      
      {/* ScrollToTop component */}
      <ScrollToTop />
    </div>
  );
};

// Helper component for wrapping development components for easy navigation
const ComponentWrapper = ({ title, id, children }) => {
  return (
    <section id={id} className="py-10 border-b border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">{title}</h2>
      <div className="relative">
        {children}
      </div>
    </section>
  );
};

export default DevV4CosmicPage; 