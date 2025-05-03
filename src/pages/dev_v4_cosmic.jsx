import React from 'react';
import { motion } from 'framer-motion';

// Import all v4 components
import SpaceCanvas from '../components/home/v4/SpaceCanvas';
import NavBar from '../components/NavBar';
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
import FooterMain from '../components/FooterMain';

// Import SectionHeader component
import SectionHeader from '../components/ui/SectionHeader.jsx';

/**
 * Dev page for testing all v4 components
 * Includes navigation to easily access different components
 * Merged with components from main homepage
 */
const DevV4CosmicPage = () => {
  const sections = [
    { id: 'hero', name: 'Hero Portal', component: HeroPortal },
    { id: 'about', name: 'About Mission', component: AboutMission },
    { id: 'agent-powered', name: 'Agent-Powered Development', component: ServicesFloatLayer },
    { id: 'services', name: 'Services Orbital', component: ServicesOrbital },
    { id: 'projects', name: 'Projects Section', component: ProjectsSection },
    { id: 'projects-logbook', name: 'Projects Logbook', component: ProjectsLogbook },
    { id: 'community', name: 'Community Hub', component: CommunityHub },
    { id: 'testimonials', name: 'AI Testimonials', component: AITestimonials },
    { id: 'contact', name: 'Contact Terminal', component: ContactTerminal }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      {/* Extended SpaceCanvas with fade to darker color */}
      <SpaceCanvas />
      
      {/* Extended gradient overlay for smoother transition from stars to dark background */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Start transparent at the top, gradually fade to dark at bottom */}
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-[#0d0d12]" style={{ top: '150vh', height: '100vh' }}></div>
      </div>
      
      <div className="relative z-10 min-h-screen">
        {/* Fixed header with component navigation - Hidden in Cosmic mode */}
        <header className="fixed top-0 left-0 w-full bg-transparent z-40">
          {/* Navbar without borders */}
          <NavBar />
        </header>
        
        {/* Main content with all components */}
        <main>
          {/* Hero Section - Transparent background to show stars */}
          <div className="bg-transparent">
            <section 
              id="hero"
              className="relative"
            >
              <HeroPortal />
            </section>
          </div>
          
          {/* About Section - Transparent to show stars */}
          <div className="bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-0"></div>
            <section 
              id="about"
              className="py-16 md:py-20 scroll-mt-20 relative z-10"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="OUR MISSION" 
                  subtitle="Transforming development through AI innovation and community collaboration."
                />
                <AboutMission />
              </div>
            </section>
          </div>
          
          {/* Agent-Powered Development - Very subtle gradient overlay on stars */}
          <div className="bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 z-0"></div>
            <section 
              id="agent-powered"
              className="scroll-mt-20 py-16 md:py-20 relative z-10"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="WHY AI-POWERED DEV?" 
                  subtitle="Harnessing intelligent agents to solve complex coding challenges with speed and precision."
                />
                <ServicesFloatLayer />
              </div>
            </section>
          </div>
          
          {/* Services Orbital - Subtle gradient overlay on stars with increasing opacity */}
          <div className="bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 z-0"></div>
            <section 
              id="services"
              className="py-16 md:py-20 scroll-mt-20 relative z-10"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="OUR SERVICES" 
                  subtitle="A constellation of solutions to power your development workflow."
                />
                <ServicesOrbital />
              </div>
            </section>
          </div>
          
          {/* Projects Section - Further transition to dark background */}
          <div className="bg-transparent relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#0d0d12]/70 z-0"></div>
            <section 
              id="projects"
              className="py-16 md:py-20 scroll-mt-20 relative z-10"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="FEATURED PROJECTS" 
                  subtitle="Discover our latest innovations and client success stories."
                />
                <ProjectsSection />
              </div>
            </section>
          </div>
          
          {/* Projects Logbook - Complete transition to solid dark background */}
          <div className="bg-[#0d0d12]">
            <section 
              id="projects-logbook"
              className="py-16 md:py-20 scroll-mt-20"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="MISSION LOGBOOK" 
                  subtitle="Documenting our journey through the code universe."
                />
                <ProjectsLogbook />
              </div>
            </section>
          </div>
          
          {/* Community Hub - Gradient back to gray-900 */}
          <div className="bg-gradient-to-b from-[#0d0d12] to-gray-900">
            <section 
              id="community"
              className="py-16 md:py-20 scroll-mt-20"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="JOIN OUR WORLD" 
                  subtitle="Be part of a growing community of developers, innovators, and creators."
                />
                <CommunityHub />
              </div>
            </section>
          </div>
          
          {/* AI Testimonials - Gray-900 background */}
          <div className="bg-gray-900">
            <section 
              id="testimonials"
              className="py-16 md:py-20 scroll-mt-20"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="HEAR FROM OUR AI" 
                  subtitle="What our artificial teammates have to say about working with us."
                />
                <AITestimonials />
              </div>
            </section>
          </div>
          
          {/* Contact Terminal - Gradient to black for footer */}
          <div className="bg-gradient-to-b from-gray-900 to-black">
            <section 
              id="contact"
              className="py-16 md:py-20 scroll-mt-20"
            >
              <div className="container mx-auto px-4">
                <SectionHeader 
                  title="REACH OUT" 
                  subtitle="Let's build something amazing together."
                />
                <ContactTerminal />
              </div>
            </section>
          </div>
          
          {/* Footer Section - Black background */}
          <div className="bg-black">
            <section className="pt-16 md:pt-20">
              <FooterMain />
            </section>
          </div>
        </main>
        
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