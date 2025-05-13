import React from 'react';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import CTASection from '@/components/home/CTASection';
import CuriousBot from '@/components/home/CuriousBot';
import MissionStatus from '@/components/home/MissionStatus';
import MetricsAndLogsSection from '@/components/home/MetricsAndLogsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Link } from 'react-router-dom';

/**
 * Development page to test all atomic components
 * Each component is self-contained and rendered in isolation
 */
export default function DevPage() {
  return (
    <main className="bg-black text-white">
      {/* Parallax Test Links */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">Parallax Test Pages</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Link 
            to="/dev/parallax-test" 
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Scroll Parallax Test</h3>
              <p className="text-gray-300">Test implementation of scroll-based parallax effect for the Cosmic Flight scene</p>
            </div>
          </Link>
          <Link 
            to="/dev/mouse-parallax-test" 
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Mouse Parallax Test</h3>
              <p className="text-gray-300">Test implementation of mouse-based parallax effect for the Dormant scene</p>
            </div>
          </Link>
          <Link 
            to="/dev/combined-parallax-test" 
            className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Combined Parallax Test</h3>
              <p className="text-gray-300">Test implementation of combined scroll and mouse parallax effects</p>
            </div>
          </Link>
        </div>
      </div>

      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <MetricsAndLogsSection />
      <TestimonialsSection />
      <CTASection />
      <CuriousBot />
      <MissionStatus />
    </main>
  );
} 