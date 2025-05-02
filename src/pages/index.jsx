// DO NOT MODIFY THIS FILE WITHOUT COMMANDER APPROVAL — TILE 4.1
import React from 'react';
import HomeFloatflowLayout from '@/layouts/HomeFloatflowLayout';
import EnhancedSolarSystem from '@/components/home/EnhancedSolarSystem';
import StarfieldBackground from '@/components/home/StarfieldBackground';
import HeroFloatLayer from '@/components/home/HeroFloatLayer';
import AboutSection from '@/components/home/AboutSection';
import ServicesFloatLayer from '@/components/home/ServicesFloatLayer';
import ProjectsSection from '@/components/home/ProjectsSection';
import CTASection from '@/components/home/CTASection';
import CuriousBot from '@/components/home/CuriousBot';
import MissionStatus from '@/components/home/MissionStatus';
import useDeviceProfile from '@/hooks/useDeviceProfile';

/**
 * Enhanced Homepage with FLOATFLOW + SOLAR SYSTEM architecture
 * Phase 1: Basic structure with placeholder components
 * Phase 2: Adding Hero component from Tile 1
 */
export default function Home() {
  const { isMobile, isLowPerf } = useDeviceProfile();
  
  return (
    <HomeFloatflowLayout>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <StarfieldBackground isLowPerf={isLowPerf} />
      </div>
      
      {/* Hero Section with Enhanced Solar System */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Central Solar System */}
        <EnhancedSolarSystem isLowPerf={isLowPerf} />
        
        {/* Floating Title Layer */}
        <HeroFloatLayer isLowPerf={isLowPerf} />
      </section>
      
      {/* Content Sections */}
      <div className="relative z-20">
        {/* About Section */}
        <AboutSection />
        
        {/* Services Section */}
        <ServicesFloatLayer />
        
        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Contact/CTA Section */}
        <CTASection />
      </div>
      
      {/* Floating UI Elements - Only show on non-mobile */}
      {!isMobile && (
        <>
          <CuriousBot isLowPerf={isLowPerf} />
          <MissionStatus isLowPerf={isLowPerf} />
        </>
      )}
    </HomeFloatflowLayout>
  );
} 