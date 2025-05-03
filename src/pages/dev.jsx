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

/**
 * Development page to test all atomic components
 * Each component is self-contained and rendered in isolation
 */
export default function DevPage() {
  return (
    <main className="bg-black text-white">
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