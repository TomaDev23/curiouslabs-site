import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer_legacy';
import ScrollToTop from '../components/ScrollToTop';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import ServiceModal from '../components/ServiceModal.jsx';
import { services } from '../../data/services.js';
import { useReveal } from '../utils/useReveal.js';
import CodelabFloatflowLayout from '../layouts/CodelabFloatflowLayout.jsx';
import HeroSection from '../components/codelab/HeroSection';
import FeaturesSection from '../components/codelab/FeaturesSection';
import ProcessSection from '../components/codelab/ProcessSection';
import CTASection from '../components/codelab/CTASection';
import LegitSection from '../components/codelab/LegitSection';
import MetricsLogsSection from '../components/codelab/MetricsLogsSection';

export default function CodeLab() {
  const [activeService, setActiveService] = useState(null);
  
  // Animation variants for staggered row animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  // Divide services into tiers
  const tier1 = services.slice(0, 2); // Trace Agent, Security Harden Agent
  const tier2 = services.slice(2, 4); // CI/CD Pipeline, Trace & Audit Pack
  const tier3 = services.slice(4, 6); // LEGIT Compliance, AI Agent Wrapper

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F172A] text-white flex flex-col">
      <Helmet>
        <title>CodeLab - Developer Tools & Resources | CuriousLabs</title>
        <meta name="description" content="Explore our collection of LEGIT-compliant developer tools, patterns, and AI logic built for production-grade systems." />
        <meta property="og:title" content="CodeLab - Developer Tools & Resources | CuriousLabs" />
        <meta property="og:description" content="Explore our collection of LEGIT-compliant developer tools, patterns, and AI logic built for production-grade systems." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/codelab" />
      </Helmet>
      
      <NavBar />
      
      <main className="flex-grow">
        {/* New FloatflowLayout wrapper for the whole page */}
        <CodelabFloatflowLayout>
          <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-10 max-w-7xl">
            {/* New HeroSection component */}
            <HeroSection />
            
            {/* New FeaturesSection component */}
            <FeaturesSection />
            
            {/* Featured Tools Grid */}
            <section className="py-16 relative">
              <h2 className="text-3xl font-bold text-white tracking-tight mb-16 text-center">Featured Lab Tools</h2>
              
              {/* Tier 1: Center alignment with slightly larger cards */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {tier1.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    className="bg-black/90 border border-purple-900/30 rounded-2xl p-6 shadow-xl 
                               transition-all hover:shadow-2xl hover:border-purple-500 hover:shadow-purple-500/20
                               w-full sm:w-[47%] md:w-[45%] z-20 relative"
                    onClick={() => setActiveService(service.id)}
                    onKeyDown={(e) => e.key === "Enter" && setActiveService(service.id)}
                    tabIndex={0}
                    role="button"
                    style={{ 
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)"
                    }}
                  >
                    {/* tag section */}
                    <div className="flex gap-2 text-xs mb-3 font-semibold tracking-wide">
                      {service.categoryTag && (
                        <span className="bg-indigo-800/80 text-indigo-200 px-3 py-1 rounded-full">{service.categoryTag}</span>
                      )}
                      {service.trustTag && (
                        <span className="bg-green-800/80 text-green-300 px-3 py-1 rounded-full">{service.trustTag}</span>
                      )}
                    </div>

                    {/* title + subtitle */}
                    <h3 className="text-white font-bold text-xl mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{service.subtitle}</p>

                    {/* CTA nudge */}
                    <p className="mt-6 text-sm text-purple-400 underline">→ Click for service details</p>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Tier 2: Left alignment with medium cards */}
              <motion.div 
                className="flex flex-wrap justify-start gap-6 mb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {tier2.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    className="bg-black/80 border border-purple-900/30 rounded-2xl p-5 shadow-lg 
                               transition-all hover:shadow-xl hover:border-purple-500/80
                               w-full sm:w-[45%] md:w-[40%] z-10 relative"
                    onClick={() => setActiveService(service.id)}
                    onKeyDown={(e) => e.key === "Enter" && setActiveService(service.id)}
                    tabIndex={0}
                    role="button"
                  >
                    {/* tag section */}
                    <div className="flex gap-2 text-xs mb-2 font-semibold tracking-wide">
                      {service.categoryTag && (
                        <span className="bg-indigo-800/70 text-indigo-200 px-2 py-1 rounded">{service.categoryTag}</span>
                      )}
                      {service.trustTag && (
                        <span className="bg-green-800/70 text-green-300 px-2 py-1 rounded">{service.trustTag}</span>
                      )}
                    </div>

                    {/* title + subtitle */}
                    <h3 className="text-white font-bold text-lg">{service.title}</h3>
                    <p className="text-gray-400 text-sm pt-1">{service.subtitle}</p>

                    {/* CTA nudge */}
                    <p className="mt-4 text-xs text-purple-400 underline">→ Click for service details</p>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Tier 3: Right alignment with smaller cards */}
              <motion.div 
                className="flex flex-wrap justify-end gap-6 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
              >
                {tier3.map((service, idx) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, zIndex: 30 }}
                    className="bg-black/70 border border-purple-900/30 rounded-2xl p-5 shadow-md 
                               transition-all hover:shadow-lg hover:border-purple-500/70
                               w-full sm:w-[43%] md:w-[38%] z-0 relative"
                    onClick={() => setActiveService(service.id)}
                    onKeyDown={(e) => e.key === "Enter" && setActiveService(service.id)}
                    tabIndex={0}
                    role="button"
                  >
                    {/* tag section */}
                    <div className="flex gap-2 text-xs mb-2 font-semibold tracking-wide">
                      {service.categoryTag && (
                        <span className="bg-indigo-800/60 text-indigo-200 px-2 py-1 rounded">{service.categoryTag}</span>
                      )}
                      {service.trustTag && (
                        <span className="bg-green-800/60 text-green-300 px-2 py-1 rounded">{service.trustTag}</span>
                      )}
                    </div>

                    {/* title + subtitle */}
                    <h3 className="text-white font-bold text-lg">{service.title}</h3>
                    <p className="text-gray-400 text-sm pt-1">{service.subtitle}</p>

                    {/* CTA nudge */}
                    <p className="mt-4 text-xs text-purple-400 underline">→ Click for service details</p>
                  </motion.div>
                ))}
              </motion.div>
            </section>
            
            {/* New ProcessSection component */}
            <ProcessSection />
            
            {/* New CTASection component */}
            <CTASection />
            
            {/* New LegitSection component */}
            <LegitSection />
          </div>
          
          {/* Section Divider */}
          <hr className="my-12 border-purple-900/30" />
          
          {/* New MetricsLogsSection component */}
          <MetricsLogsSection />
          
          {/* Section Divider */}
          <hr className="my-12 border-purple-900/30" />
          
          {/* Case Studies Section (from original page) */}
          <section className="max-w-7xl mx-auto mb-24" id="case-studies">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-left sm:text-center mb-10">Featured Projects</h2>
            <div className="bg-gradient-to-br from-[#1C1C2C]/60 to-[#12121C]/60 border border-purple-300/10 p-6 rounded-xl shadow-md shadow-purple-900/20">
              <CaseStudies />
            </div>
          </section>
          
          {/* Section Divider */}
          <hr className="my-12 border-purple-900/30" />
          
          {/* Testimonials Section (from original page) */}
          <section className="max-w-7xl mx-auto mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-left sm:text-center mb-10">Developer Feedback</h2>
            <div className="bg-gradient-to-br from-[#1C1C2C]/60 to-[#12121C]/60 border border-purple-300/10 p-6 rounded-xl shadow-md shadow-purple-900/20">
              <Testimonials />
            </div>
          </section>
        </CodelabFloatflowLayout>
      </main>
      
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
          onCtaClick={() => console.log(`Requested: ${service.id}`)}
        />
      ))}
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 