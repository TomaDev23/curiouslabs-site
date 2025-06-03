"use client";
import React, { useState } from "react";
import { HorizontalScroll } from "../ui/horizontal-scroll-animation";
import Image from "next/image";

export function HorizontalScrollDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Define your pages here
  const pages = [
    // AEGIS page
    <div key="aegis" className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col">
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
    </div>,
    
    // Products page
    <div key="products" className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col">
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 flex-1">
        {[
          {
            title: "Guardian",
            desc: "A digital companion for your child — built to care, not capture.",
            color: "amber",
          },
          {
            title: "Nexus",
            desc: "Connect your data sources and build intelligent workflows.",
            color: "blue",
          },
          {
            title: "Sentinel",
            desc: "Enterprise-grade AI safety and security monitoring.",
            color: "emerald",
          },
        ].map((product, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border border-${product.color}-500/30 h-full flex flex-col bg-gradient-to-br from-black/40 to-${product.color}-900/10`}
          >
            <h3 className={`text-2xl font-bold text-${product.color}-400 mb-3`}>{product.title}</h3>
            <p className="text-white/70 mb-6">{product.desc}</p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-xs text-white/40 uppercase tracking-wider">Learn more</span>
              <div className={`w-8 h-8 rounded-full border border-${product.color}-500/50 flex items-center justify-center`}>
                <span className="text-white">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>,
    
    // Services page
    <div key="services" className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full flex flex-col">
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
    </div>,
  ];

  return (
    <div className="flex flex-col overflow-hidden pb-[200px] pt-[200px]">
      <HorizontalScroll
        titleComponent={
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white/80 mb-2">
              Explore Our Solutions
            </h2>
            <div className="flex justify-center space-x-4 text-xs text-white/50">
              <span className={currentPage === 0 ? "text-lime-400" : ""}>AEGIS</span>
              <span className={currentPage === 1 ? "text-blue-400" : ""}>Products</span>
              <span className={currentPage === 2 ? "text-purple-400" : ""}>Services</span>
            </div>
          </div>
        }
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
} 