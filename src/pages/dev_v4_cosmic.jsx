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
    <div className="min-h-screen relative bg-gray-900 text-white">
      {/* Space Canvas Background */}
      <SpaceCanvas />
      
      <div className="relative z-10 min-h-screen">
        {/* Fixed header with component navigation */}
        <header className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between py-4">
              <h1 className="text-xl font-bold mb-4 md:mb-0">
                <span className="text-purple-500">V4</span> Cosmic Components
              </h1>
              
              <nav className="flex flex-wrap justify-center gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="px-3 py-1 text-sm bg-gray-800 hover:bg-purple-700 rounded-full transition-colors"
                  >
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </header>
        
        {/* Main content with all components */}
        <main className="pt-28 pb-20">
          {/* NavBar Component from main homepage */}
          <div className="mb-16">
            <div className="container mx-auto px-4">
              <ComponentWrapper title="NavBar" id="navbar">
                <NavBar />
              </ComponentWrapper>
            </div>
          </div>
          
          {/* Render all sections */}
          {sections.map((section) => {
            const Component = section.component;
            return (
              <div key={section.id} id={section.id} className="mb-32 scroll-mt-28">
                <Component />
              </div>
            );
          })}
        </main>
        
        {/* Footer from main homepage */}
        <FooterMain />
        
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