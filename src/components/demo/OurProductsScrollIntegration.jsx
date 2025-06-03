"use client";
import React, { useState, useEffect } from "react";
import { HorizontalScroll } from "../ui/horizontal-scroll-animation";

// This is an example of how you could integrate the HorizontalScroll component
// with your existing OurProducts_newV6 content
export function OurProductsScrollIntegration() {
  const [currentPage, setCurrentPage] = useState(0);

  // In a real implementation, you would import these components from your existing codebase
  // and customize them to work with the scroll animation
  const AegisPage = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full w-full max-w-6xl">
        <div className="grid grid-cols-12 gap-8 h-full">
          {/* Left Column - Content */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <div>
              <span className="inline-flex items-center space-x-2 text-lime-400/80 text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                <span>Core Runtime</span>
              </span>
              <h2 className="text-5xl lg:text-7xl font-bold mt-4 text-gradient-lime">
                AEGIS<br />
                <span className="text-white/90 text-4xl lg:text-5xl normal-case">Runtime</span>
              </h2>
              <p className="text-xl text-white/80 mt-4">
                The smart core powering everything we build.
              </p>
            </div>

            <div className="relative border-l-2 border-cyan-400/30 pl-6">
              <h3 className="text-3xl lg:text-4xl font-semibold text-cyan-400">
                Adaptive. Auditable. Alive.
              </h3>
              <p className="text-lg text-white/70 mt-3">
                AEGIS is the thinking engine behind CuriousLabs — a precision
                system built to orchestrate AI, logic, and control across all products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
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

          {/* Right Column - Visualization/Image */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
            <div className="w-full flex items-center justify-center relative">
              <img
                src="/assets/images/general/run_time.svg"
                alt="AEGIS Runtime"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full w-full max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-bold text-gradient-blue mb-8">
          Our Products
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-8rem)]">
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
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-3xl p-8 md:p-12 h-full w-full max-w-6xl">
        <div className="grid grid-cols-12 gap-8 h-full">
          {/* Left Column - Content */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <div>
              <span className="inline-flex items-center space-x-2 text-purple-400/80 text-sm font-mono uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>Our Services</span>
              </span>
              <h2 className="text-5xl lg:text-7xl font-bold mt-4 text-gradient-purple">
                AI Consulting
              </h2>
              <p className="text-xl text-white/80 mt-4">
                Expert guidance for your AI journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
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

          {/* Right Column - Visualization/Image */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
            <div className="w-full flex items-center justify-center relative">
              <div className="flex flex-col items-center">
                <div className="text-6xl text-purple-400 mb-6">🚀</div>
                <div className="text-center max-w-sm">
                  <h3 className="text-2xl font-bold mb-4">From concept to deployment</h3>
                  <p className="text-white/70">
                    Our team of experts will guide you through every step of your AI journey,
                    from initial strategy to full-scale implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Define your pages here - in a real implementation you would use
  // the actual components from your existing codebase
  const pages = [
    <AegisPage key="aegis" />,
    <ProductsPage key="products" />,
    <ServicesPage key="services" />,
  ];

  // Initialize any background effects that would typically be in your existing components
  useEffect(() => {
    // Example effect that might be needed
    const handlePageTransition = () => {
      console.log(`Transitioned to page ${currentPage}`);
      // You would typically dispatch custom events to your background effects here
    };
    
    handlePageTransition();
  }, [currentPage]);

  return (
    <div className="flex flex-col overflow-hidden min-h-screen">
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