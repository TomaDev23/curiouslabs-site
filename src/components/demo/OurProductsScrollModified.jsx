/**
 * @metadata
 * @component OurProductsScrollModified
 * @description Enhanced product showcase with combined vertical and horizontal scroll animations
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_horizontal_product_scroll_v6.md
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CombinedScrollAnimation } from '../ui/combined-scroll-animation';

// Define product items locally instead of importing
const LOCAL_PRODUCT_ITEMS = [
  {
    id: 1,
    title: 'OpsPipe',
    summary: 'From paper mess to structured insight',
    tagline: 'Originally built inside our ghost kitchen',
    theme: 'lime',
    bgGradient: 'from-lime-900/50 to-lime-700/30',
  },
  {
    id: 2,
    title: 'Curious',
    summary: 'Relational AI Presence',
    tagline: 'AI that "knows you." Finally.',
    theme: 'magenta',
    bgGradient: 'from-purple-900/50 to-pink-700/30',
  },
  {
    id: 3,
    title: 'Guardian',
    summary: 'Creative AI for kids',
    tagline: 'A digital companion for your child — built to care, not capture.',
    theme: 'amber',
    bgGradient: 'from-amber-900/50 to-orange-700/30',
  },
  {
    id: 4,
    title: 'MoonSignal',
    summary: 'AI Trading Intelligence',
    tagline: 'Trade like you\'ve got a team.',
    theme: 'cyan',
    bgGradient: 'from-cyan-900/50 to-teal-700/30',
  },
];

export const OurProductsScrollModified = ({ className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Define the vertical content title (shown first)
  const verticalTitle = (
    <>
      <h1 className="text-4xl font-semibold text-white dark:text-white mb-2">
        Discover
      </h1>
      <span className="text-4xl md:text-[6rem] font-bold leading-none text-gradient-lime">
        AEGIS Runtime
      </span>
      <p className="text-xl text-white/70 mt-6 max-w-2xl mx-auto">
        The core system powering all of our intelligent solutions
      </p>
    </>
  );

  // Define the content for the vertical card
  const verticalContent = (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-zinc-900 text-white">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-lime-500/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-2xl font-bold text-lime-400">AEGIS Runtime</h3>
            <p className="text-white/60">The foundation of our AI ecosystem</p>
          </div>
        </div>
        
        <p className="text-lg text-white/80 mb-6">
          Our revolutionary AEGIS runtime powers all of our AI solutions, providing unmatched
          performance, security, and flexibility for enterprise applications.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white">Multi-Agent Architecture</h4>
            <p className="text-sm text-white/60 mt-1">Parallel processing with specialized AI agents</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h4 className="font-semibold text-white">State Machine Control</h4>
            <p className="text-sm text-white/60 mt-1">Precise execution of complex workflows</p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-white/50 text-sm animate-pulse">
            Scroll down to explore our products and services
          </p>
        </div>
      </div>
    </div>
  );

  // Title for the horizontal scroll section
  const horizontalTitle = (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-white/80 mb-2">
        Our Ecosystem
      </h2>
      <div className="flex justify-center space-x-6 text-xs text-white/50">
        <span className={currentPage === 0 ? "text-lime-400" : ""}>AEGIS</span>
        <span className={currentPage === 1 ? "text-blue-400" : ""}>Products</span>
        <span className={currentPage === 2 ? "text-purple-400" : ""}>Services</span>
      </div>
    </div>
  );

  // Simplified page components for the horizontal scroll
  const ModifiedAegisPage = () => (
    <div className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col">
      <div className="mb-6">
        <span className="inline-flex items-center space-x-2 text-lime-400/80 text-sm font-mono uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          <span>Core Runtime</span>
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 text-gradient-lime">
          AEGIS Runtime
        </h2>
        <p className="text-xl text-white/80 mt-4 max-w-2xl">
          The smart core powering everything we build.
        </p>
      </div>
      
      <div className="relative mt-6 border-l-2 border-cyan-400/30 pl-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-cyan-400">
          Adaptive. Auditable. Alive.
        </h3>
        <p className="text-white/70 mt-3">
          AEGIS is the thinking engine behind CuriousLabs — a precision
          system built to orchestrate AI, logic, and control across all products.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {[
          {
            title: "Multi-Agent Architecture",
            desc: "Real AI agents in parallel with roles, memory, and autonomy",
          },
          {
            title: "State Machine Control",
            desc: "Central mission engine governing every command",
          },
          {
            title: "Audit-First Protocol",
            desc: "Complete logs, metrics, and traces for every execution",
          },
          {
            title: "Modular & Scalable",
            desc: "Inject only what you need, scale sideways not up",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-lime-400/30 transition-all duration-300"
          >
            <h4 className="text-white font-semibold">{feature.title}</h4>
            <p className="text-white/60 text-sm mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ModifiedProductsPage = () => (
    <div className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col">
      <div className="mb-6">
        <span className="inline-flex items-center space-x-2 text-blue-400/80 text-sm font-mono uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          <span>Our Products</span>
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 text-gradient-blue">
          AI Solutions
        </h2>
        <p className="text-xl text-white/80 mt-4 max-w-2xl">
          Cutting-edge products built on our AEGIS runtime.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 flex-1">
        {LOCAL_PRODUCT_ITEMS.map((product, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border border-${product.theme}-500/30 h-full flex flex-col bg-gradient-to-br ${product.bgGradient}`}
          >
            <h3 className={`text-2xl font-bold text-${product.theme}-400 mb-3`}>{product.title}</h3>
            <p className="text-white/70 mb-3">{product.summary}</p>
            <p className="text-white/60 text-sm mb-4">{product.tagline}</p>
            <div className="mt-auto">
              <span className="text-xs text-white/40 uppercase tracking-wider">Learn more</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ModifiedServicesPage = () => (
    <div className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col">
      <div className="mb-6">
        <span className="inline-flex items-center space-x-2 text-purple-400/80 text-sm font-mono uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          <span>Our Services</span>
        </span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 text-gradient-purple">
          AI Consulting
        </h2>
        <p className="text-xl text-white/80 mt-4 max-w-2xl">
          Expert guidance to implement AI in your organization.
        </p>
      </div>
      
      <div className="relative mt-6 border-l-2 border-purple-400/30 pl-6">
        <h3 className="text-2xl md:text-3xl font-semibold text-purple-400">
          From concept to deployment
        </h3>
        <p className="text-white/70 mt-3">
          Our team of experts will guide you through every step of your AI journey,
          from initial strategy to full-scale implementation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {[
          {
            title: "AI Strategy",
            desc: "Comprehensive planning for AI integration in your organization",
          },
          {
            title: "Custom Development",
            desc: "Tailored AI solutions built on our AEGIS runtime",
          },
          {
            title: "Training & Workshops",
            desc: "Hands-on education for your team to maximize AI benefits",
          },
          {
            title: "Ongoing Support",
            desc: "Continuous optimization and maintenance of your AI systems",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
          >
            <h4 className="text-white font-semibold">{service.title}</h4>
            <p className="text-white/60 text-sm mt-2">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Simplified horizontal pages
  const pages = [
    <ModifiedAegisPage key="aegis" />,
    <ModifiedProductsPage key="products" />,
    <ModifiedServicesPage key="services" />,
  ];

  // Update the current page for navigation
  useEffect(() => {
    // You can add additional effects when page changes
    console.log(`Current page: ${currentPage}`);
    
    // This would be where you'd sync with any external systems or state
  }, [currentPage]);

  return (
    <div className={`flex flex-col overflow-hidden ${className}`}>
      <CombinedScrollAnimation
        verticalTitle={verticalTitle}
        verticalContent={verticalContent}
        horizontalTitle={horizontalTitle}
        pages={pages}
      />
    </div>
  );
}; 