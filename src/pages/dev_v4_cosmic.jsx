import React from 'react';
import { motion } from 'framer-motion';

// Import all v4 components
import SpaceCanvas from '../components/home/v4/SpaceCanvas';
import NavBarCosmic from '../components/home/v4/NavBarCosmic';
import HeroPortal from '../components/home/v4/HeroPortal';
import AboutMission from '../components/home/v4/AboutMission';
import ServicesFloatLayer from '../components/home/ServicesFloatLayer';
import ProjectsSection from '../components/home/ProjectsSection';
import ServicesOrbital from '../components/home/v4/ServicesOrbital';
import ProjectsLogbook from '../components/home/v4/ProjectsLogbook';
import CommunityHub from '../components/home/v4/CommunityHub';
import AITestimonials from '../components/home/v4/AITestimonials';
import ContactTerminal from '../components/home/v4/ContactTerminal';
import CuriousBotEnhanced from '../components/home/v4/CuriousBotEnhanced';
import FooterExperience from '../components/home/v4/FooterExperience';

// Import SectionHeader component
import SectionHeader from '../components/ui/SectionHeader.jsx';

// Import SectionAnchor for section IDs and scroll margins
import SectionAnchor from '../components/ui/SectionAnchor';

// Import ParticleField for floating particles
import ParticleField from '../components/ui/ParticleField';

// Import CosmicHUD for scroll position and section tracking
import CosmicHUD from '../components/ui/CosmicHUD';

// Import ScrollToTop component
import ScrollToTop from '../components/ScrollToTop';

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
  
  // Register smooth scrolling for all hash links
  React.useEffect(() => {
    registerSmoothScrolling();
  }, []);
  
  return (
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
                <motion.div
                  ref={aboutRef}
                  initial="hidden"
                  animate={aboutVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <AboutMission />
                </motion.div>
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
                <motion.div
                  ref={agentRef}
                  initial="hidden"
                  animate={agentVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <ServicesFloatLayer />
                </motion.div>
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
                <motion.div
                  ref={servicesRef}
                  initial="hidden"
                  animate={servicesVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <ServicesOrbital />
                </motion.div>
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
                <motion.div
                  ref={projectsRef}
                  initial="hidden"
                  animate={projectsVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <ProjectsSection />
                </motion.div>
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
                <motion.div
                  ref={logbookRef}
                  initial="hidden"
                  animate={logbookVisible ? "visible" : "hidden"}
                  variants={revealWithChildrenVariants}
                >
                  <ProjectsLogbook />
                </motion.div>
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
                <motion.div
                  ref={communityRef}
                  initial="hidden"
                  animate={communityVisible ? "visible" : "hidden"}
                  variants={revealWithChildrenVariants}
                >
                  <CommunityHub />
                </motion.div>
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
                <motion.div
                  ref={testimonialsRef}
                  initial="hidden"
                  animate={testimonialsVisible ? "visible" : "hidden"}
                  variants={revealWithChildrenVariants}
                >
                  <AITestimonials />
                </motion.div>
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
                <motion.div
                  ref={contactRef}
                  initial="hidden"
                  animate={contactVisible ? "visible" : "hidden"}
                  variants={revealVariants}
                >
                  <ContactTerminal />
                </motion.div>
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