// DO NOT MODIFY THIS FILE WITHOUT COMMANDER APPROVAL — TILE 4.1
import React, { lazy, Suspense, useEffect, useState } from 'react';
import HomeFloatflowLayout from '@/layouts/HomeFloatflowLayout';
import EnhancedSolarSystem from '@/components/home/EnhancedSolarSystem';
import StarfieldBackground from '@/components/home/StarfieldBackground';
import HeroFloatLayer from '@/components/home/HeroFloatLayer';
import AboutSection from '@/components/home/AboutSection';
import useDeviceProfile from '@/hooks/useDeviceProfile';

// Lazy load below-the-fold components for better performance
const ServicesFloatLayer = lazy(() => import('@/components/home/ServicesFloatLayer'));
const ProjectsSection = lazy(() => import('@/components/home/ProjectsSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));
const CuriousBot = lazy(() => import('@/components/home/CuriousBot'));
const MissionStatus = lazy(() => import('@/components/home/MissionStatus'));

// Loading placeholder
const LazyLoadPlaceholder = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Intersection Observer component for lazy loading
const IntersectionComponent = ({ children, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return (
    <div ref={setRef} className="w-full">
      {isVisible ? children : <LazyLoadPlaceholder />}
    </div>
  );
};

/**
 * Enhanced Homepage with FLOATFLOW + SOLAR SYSTEM architecture
 * Phase 1: Basic structure with placeholder components
 * Phase 2: Adding Hero component from Tile 1
 * Optimized: Lazy loading below-the-fold components
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
        
        {/* Services Section - Lazy loaded */}
        <IntersectionComponent>
          <Suspense fallback={<LazyLoadPlaceholder />}>
            <ServicesFloatLayer />
          </Suspense>
        </IntersectionComponent>
        
        {/* Projects Section - Lazy loaded */}
        <IntersectionComponent>
          <Suspense fallback={<LazyLoadPlaceholder />}>
            <ProjectsSection />
          </Suspense>
        </IntersectionComponent>
        
        {/* Contact/CTA Section - Lazy loaded */}
        <IntersectionComponent>
          <Suspense fallback={<LazyLoadPlaceholder />}>
            <CTASection />
          </Suspense>
        </IntersectionComponent>
      </div>
      
      {/* Floating UI Elements - Only show on non-mobile */}
      {!isMobile && (
        <Suspense fallback={null}>
          <CuriousBot isLowPerf={isLowPerf} />
          <MissionStatus isLowPerf={isLowPerf} />
        </Suspense>
      )}
    </HomeFloatflowLayout>
  );
} 