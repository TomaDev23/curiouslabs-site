import React, { useEffect, useState } from "react";
import ServiceModal from "./ServiceModal.jsx";
import { services } from "../data/services.js";

export default function DynamicExpansion({ scrollProgress }) {
  console.log("[DEBUG] DynamicExpansion rendering with scrollProgress:", scrollProgress);
  console.log("[LOADED services.js]", services);
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeService, setActiveService] = useState(null);
  
  // Detect mobile devices for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initialize on component mount
    handleResize();
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Adjust scroll triggers based on mobile/desktop
  const getScrollTrigger = (baseValue) => {
    return isMobile ? Math.max(0.01, baseValue - 0.02) : baseValue;
  };
  
  // Calculate animation progress for different elements based on scroll position
  const calculateOpacity = (threshold) => {
    // Ensure smoother fade-in with a lower multiplier for more gradual appearance
    return scrollProgress > threshold ? Math.min(1, (scrollProgress - threshold) * 2) : 0;
  };
  
  // Calculate transform for titles based on scroll position
  const calculateTransform = (threshold) => {
    // Smoother translation with less dramatic movement
    return scrollProgress > threshold 
      ? `translateY(${Math.max(0, 15 - ((scrollProgress - threshold) * 2) * 15)}px)` 
      : 'translateY(15px)';
  };
  
  // Function to calculate card visibility and position
  const calculateCardStyle = (scrollTrigger, animationMultiplier = 7) => {
    // Determine when card should start appearing - use direct trigger values
    const startPoint = scrollTrigger;
    
    // Ensure cards stay visible once they appear
    const hasAppeared = scrollProgress > startPoint;
    
    // Calculate card opacity based on scroll progress with smoother curve
    const opacity = hasAppeared 
      ? Math.min(1, (scrollProgress - startPoint) * animationMultiplier) 
      : 0;
    
    // Calculate vertical offset - moving up as scroll increases with smoother motion
    const translateY = hasAppeared 
      ? Math.max(0, 30 - ((scrollProgress - startPoint) * animationMultiplier * 90)) 
      : 30;
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.6s ease-out, transform 0.7s ease-out',
      willChange: 'opacity, transform'
    };
  };

  // Card component with optimized styling
  const Card = ({ children, scrollTrigger, columnSpan = 1, onClick }) => {
    const style = calculateCardStyle(scrollTrigger);
    
    return (
      <div 
        className={`bg-[#312D4B] border border-[#473F7B]/60 rounded-xl shadow-xl overflow-hidden 
                   backdrop-blur-sm col-span-1 md:col-span-${columnSpan}
                   transition-all duration-500 ease-out ${onClick ? 'cursor-pointer hover:bg-[#3A3559]' : ''}`}
        style={style}
        onClick={onClick}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  };
  
  // Calculate title opacity and transform with persistence
  const calculateTitleStyle = (threshold) => {
    // Use lower threshold values for earlier appearance
    const adjustedThreshold = threshold * 0.5;
    
    const hasAppeared = scrollProgress > adjustedThreshold;
    const opacity = hasAppeared ? Math.min(1, (scrollProgress - adjustedThreshold) * 8) : 0;
    const transformY = hasAppeared 
      ? Math.max(0, 30 - ((scrollProgress - adjustedThreshold) * 15 * 10)) 
      : 30;
    
    return {
      opacity,
      transform: `translateY(${transformY}px)`,
      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
      willChange: 'opacity, transform'
    };
  };

  // Use title style calculations with earlier thresholds
  const title1Style = calculateTitleStyle(0.2);
  const title2Style = calculateTitleStyle(0.3);

  return (
    <section className={`pt-24 sm:pt-32 pb-32 relative transition-opacity duration-700 ease-out ${
      scrollProgress > 0.01 ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* We Fix Broken Code Section with delayed appearance */}
        <div className="text-center mb-32 mt-16">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ 
              opacity: calculateOpacity(0.2),
              transform: calculateTransform(0.2),
              willChange: 'opacity, transform',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }}
          >
            We Fix Broken Code
          </h2>
          <p 
            className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto"
            style={{ 
              opacity: calculateOpacity(0.25),
              transform: calculateTransform(0.25),
              willChange: 'opacity, transform',
              transition: 'opacity 1s ease-out, transform 1s ease-out'
            }}
          >
            Fast. Documented. Traceable.
          </p>
        </div>

        {/* Service cards grid - first row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-12">
          {services.slice(0, 2).map((service) => {
            const style = calculateCardStyle(0.04);
            
            return (
              <div
                key={service.id}
                onClick={() => setActiveService(service.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveService(service.id)}
                tabIndex={0}
                role="button"
                className="bg-[#312D4B] border border-[#473F7B]/60 rounded-xl shadow-xl overflow-hidden 
                         backdrop-blur-sm col-span-1
                         transition-all duration-500 ease-out cursor-pointer hover:bg-[#3A3559] outline-none"
                style={style}
              >
                <div className="p-6 space-y-3">
                  {/* Top Row Tags */}
                  <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wide">
                    {service.categoryTag && (
                      <span className="bg-indigo-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.categoryTag}
                      </span>
                    )}
                    {service.trustTag && (
                      <span className="bg-green-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.trustTag}
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-indigo-300">{service.title}</h3>
                  <p className="text-xs text-gray-400 leading-snug">{service.subtitle}</p>
                  
                  {/* CTA Nudge */}
                  <p className="text-[11px] text-purple-400 mt-3 font-medium">
                    → Click for service details
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Service cards grid - center card */}
        <div className="grid grid-cols-1 mb-6">
          {services.slice(2, 3).map((service) => {
            const style = calculateCardStyle(0.08);
            
            return (
              <div
                key={service.id}
                onClick={() => setActiveService(service.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveService(service.id)}
                tabIndex={0}
                role="button"
                className="bg-[#312D4B] border border-[#473F7B]/60 rounded-xl shadow-xl overflow-hidden 
                         backdrop-blur-sm col-span-1 md:col-span-2
                         transition-all duration-500 ease-out cursor-pointer hover:bg-[#3A3559] outline-none"
                style={style}
              >
                <div className="p-6 space-y-3">
                  {/* Top Row Tags */}
                  <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wide">
                    {service.categoryTag && (
                      <span className="bg-indigo-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.categoryTag}
                      </span>
                    )}
                    {service.trustTag && (
                      <span className="bg-green-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.trustTag}
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-blue-300">{service.title}</h3>
                  <p className="text-xs text-gray-400 leading-snug">{service.subtitle}</p>
                  
                  {/* CTA Nudge */}
                  <p className="text-[11px] text-purple-400 mt-3 font-medium">
                    → Click for service details
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Second Title - To Clarity */}
        <div 
          className="mb-16 mt-20 text-center"
          style={{ 
            opacity: scrollProgress > 0.12 ? Math.min(1, (scrollProgress - 0.12) * 8) : 0,
            transform: scrollProgress > 0.12 
              ? `translateY(${Math.max(0, 30 - ((scrollProgress - 0.12) * 15 * 10))}px)` 
              : 'translateY(30px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            willChange: 'opacity, transform'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 tracking-tight">
            Engineering Excellence Achieved
          </h2>
          <p className="mt-2 text-xl text-blue-200/80">
            The outcome of systematic transformation
          </p>
        </div>
        
        {/* Service cards grid - third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {services.slice(3, 5).map((service) => {
            const style = calculateCardStyle(0.16);
            
            return (
              <div
                key={service.id}
                onClick={() => setActiveService(service.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveService(service.id)}
                tabIndex={0}
                role="button"
                className="bg-[#312D4B] border border-[#473F7B]/60 rounded-xl shadow-xl overflow-hidden 
                         backdrop-blur-sm col-span-1
                         transition-all duration-500 ease-out cursor-pointer hover:bg-[#3A3559] outline-none"
                style={style}
              >
                <div className="p-6 space-y-3">
                  {/* Top Row Tags */}
                  <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wide">
                    {service.categoryTag && (
                      <span className="bg-indigo-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.categoryTag}
                      </span>
                    )}
                    {service.trustTag && (
                      <span className="bg-green-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.trustTag}
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-blue-300">{service.title}</h3>
                  <p className="text-xs text-gray-400 leading-snug">{service.subtitle}</p>
                  
                  {/* CTA Nudge */}
                  <p className="text-[11px] text-purple-400 mt-3 font-medium">
                    → Click for service details
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Service cards grid - last card */}
        <div className="grid grid-cols-1 mb-16">
          {services.slice(5, 6).map((service) => {
            const style = calculateCardStyle(0.19);
            
            return (
              <div
                key={service.id}
                onClick={() => setActiveService(service.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveService(service.id)}
                tabIndex={0}
                role="button"
                className="bg-[#312D4B] border border-[#473F7B]/60 rounded-xl shadow-xl overflow-hidden 
                         backdrop-blur-sm col-span-1 md:col-span-2
                         transition-all duration-500 ease-out cursor-pointer hover:bg-[#3A3559] outline-none"
                style={style}
              >
                <div className="p-6 space-y-3">
                  {/* Top Row Tags */}
                  <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wide">
                    {service.categoryTag && (
                      <span className="bg-indigo-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.categoryTag}
                      </span>
                    )}
                    {service.trustTag && (
                      <span className="bg-green-700/80 text-white px-2 py-[2px] rounded-md">
                        {service.trustTag}
                      </span>
                    )}
                  </div>
                  
                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-green-300">{service.title}</h3>
                  <p className="text-xs text-gray-400 leading-snug">{service.subtitle}</p>
                  
                  {/* CTA Nudge */}
                  <p className="text-[11px] text-purple-400 mt-3 font-medium">
                    → Click for service details
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Service Modals */}
      {services.map((service) => (
        <ServiceModal
          key={service.id}
          isOpen={activeService === service.id}
          onClose={() => setActiveService(null)}
          title={service.title}
          subtitle={service.subtitle}
          bullets={service.bullets}
          trustTag={service.trustTag}
          categoryTag={service.categoryTag}
          outcome={service.outcome}
          cta={service.cta}
          onCtaClick={() => console.log(`Requested from DynamicExpansion: ${service.id}`)}
        />
      ))}
    </section>
  );
} 