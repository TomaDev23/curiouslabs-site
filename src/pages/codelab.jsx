import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer_legacy';
import ScrollToTop from '../components/ScrollToTop';
import Metrics from '../components/Metrics';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import ServiceModal from '../components/ServiceModal.jsx';
import { services } from '../data/services.js';
import { useReveal } from '../utils/useReveal.js';

export default function CodeLab() {
  const [activeService, setActiveService] = useState(null);

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
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">The CuriousLabs CodeLab</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Elite AI CodeOps missions, run by agents — not amateurs. Submit your bugs, and we return clean, test-passing, CLI-traced code.
          </p>
          <div className="text-xs text-purple-400 uppercase tracking-wide mt-4 mb-6 text-center">
            LEGIT Traced · Agent-Tested · Production-Proven
          </div>
        </section>
        
        {/* Description Block */}
        <section className="max-w-4xl mx-auto mb-16 px-4 text-purple-200/80 text-sm sm:text-base leading-relaxed text-center">
          <p>
            CuriousLabs doesn't just build interfaces — we build runtimes, FSMs, CLI pipelines, and composable agent wrappers.
          </p>
          <p className="mt-4">
            CodeLab is where these internal tools and patterns are stabilized and made public. Each one is traceable, testable, and tied to a real deployment case.
          </p>
        </section>
        
        {/* Section Divider */}
        <hr className="my-12 border-purple-900/30" />
        
        {/* Featured Tools Grid */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-left sm:text-center mb-6">Featured Lab Tools</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, idx) => {
              const [ref, visible] = useReveal();
              return (
                <div
                  key={service.id}
                  ref={ref}
                  onClick={() => setActiveService(service.id)}
                  onKeyDown={(e) => e.key === "Enter" && setActiveService(service.id)}
                  tabIndex={0}
                  role="button"
                  className={`transition-all duration-700 ease-out transform ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  } bg-[#121212] border border-purple-900/30 rounded-2xl shadow-sm hover:shadow-purple-800/40 hover:bg-[#1a1a1a] cursor-pointer p-5 space-y-2 outline-none focus:ring-2 focus:ring-purple-700`}
                  style={{ transitionDelay: `${idx * 75}ms` }}
                >
                  {/* Tags */}
                  <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wide mb-2">
                    {service.categoryTag && (
                      <span className="bg-indigo-700 text-white px-2 py-[2px] rounded-md">
                        {service.categoryTag}
                      </span>
                    )}
                    {service.trustTag && (
                      <span className="bg-green-700 text-white px-2 py-[2px] rounded-md">
                        {service.trustTag}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-bold text-white">{service.title}</h3>
                  <p className="text-xs text-gray-400 leading-snug">{service.subtitle}</p>

                  {/* CTA Nudge */}
                  <p className="text-[11px] text-purple-400 mt-4 font-medium">
                    → Click for service details
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Section Divider */}
        <hr className="my-12 border-purple-900/30" />
        
        {/* LEGIT Protocol Section (adapted from Aegis) */}
        <section className="max-w-6xl mx-auto px-4 py-6 sm:py-10 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-[#1C1C2C]/70 to-[#12121C]/70 border border-purple-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_25px_rgba(139,92,246,0.15)]">
            {/* Purple glow effect */}
            <div className="absolute -inset-1 bg-purple-500/5 blur-md animate-pulse-glow"></div>
            <div className="absolute inset-0 bg-purple-400/5 blur-lg" style={{ animation: 'secondary-glow 5s infinite ease-in-out 0.5s' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4 sm:mb-6 text-center">
                Built LEGIT for Technical Excellence
              </h2>
              <p className="text-sm sm:text-base text-gray-300 text-center max-w-3xl mx-auto mb-6 sm:mb-8">
                Every tool in CodeLab follows the <span className="font-semibold text-purple-300">LEGIT</span> standard — our framework for secure, testable, and audit-compliant development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm sm:text-base text-white text-center mb-12">
                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="text-xl mb-2">📜</div>
                  <h3 className="font-semibold text-purple-300 mb-1">Logged</h3>
                  <p className="text-gray-400">All transitions, operations, and executions are comprehensively trace-logged.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="text-xl mb-2">🧪</div>
                  <h3 className="font-semibold text-purple-300 mb-1">Evaluated</h3>
                  <p className="text-gray-400">Components are validated against test specs and regression patterns.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="text-xl mb-2">🧠</div>
                  <h3 className="font-semibold text-purple-300 mb-1">Grounded</h3>
                  <p className="text-gray-400">Every system output is schema-bound, type-safe, and verifiable.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="text-xl mb-2">🛡️</div>
                  <h3 className="font-semibold text-purple-300 mb-1">Isolated</h3>
                  <p className="text-gray-400">Operations run in isolated contexts with no shared state leakage.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-purple-500/10">
                  <div className="text-xl mb-2">✅</div>
                  <h3 className="font-semibold text-purple-300 mb-1">Tested</h3>
                  <p className="text-gray-400">Every component is tested thoroughly for reliability and edge cases.</p>
                </div>
              </div>
              
              {/* Technical LEGIT Meaning Section */}
              <div className="max-w-4xl mx-auto px-4 sm:px-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                <h3 className="text-lg sm:text-xl text-white font-semibold mb-4 sm:mb-6">
                  What LEGIT Means in Code
                </h3>
                <p className="mb-5">
                  The LEGIT protocol isn't branding — it's enforced by the Aegis runtime. Every part of the system maps to real contract logic, trace outputs, and test validation.
                </p>
                <ul className="space-y-4 border-l border-purple-500/20 pl-4">
                  <li>
                    <span className="text-purple-400 font-medium">L – Lifecycle Simulation Tested:</span><br />
                    Every core phase is validated via state-machine simulations with full control replay.
                  </li>
                  <li>
                    <span className="text-purple-400 font-medium">E – Enum & State Traceability Verified:</span><br />
                    All transitions use strongly-typed enums. State changes emit traceable artifacts like <code className="text-purple-300 bg-purple-900/20 px-1 rounded">state.json</code>.
                  </li>
                  <li>
                    <span className="text-purple-400 font-medium">G – Guardrails Locked:</span><br />
                    Fallbacks, overrides, and failures are schema-validated and tracked in files like <code className="text-purple-300 bg-purple-900/20 px-1 rounded">recovery.json</code>.
                  </li>
                  <li>
                    <span className="text-purple-400 font-medium">I – Interface Contracts Enforced:</span><br />
                    Parsers, agents, and sync layers must conform to spec. No schema = no ship.
                  </li>
                  <li>
                    <span className="text-purple-400 font-medium">T – Trace Artifacts Written:</span><br />
                    All sessions output structured trace logs (<code className="text-purple-300 bg-purple-900/20 px-1 rounded">trace/</code>, <code className="text-purple-300 bg-purple-900/20 px-1 rounded">logs/audit/</code>) that drive real-time dashboard panels and diagnostics.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Divider */}
        <hr className="my-12 border-purple-900/30" />
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-900/40 to-black py-16 px-6 rounded-2xl text-center max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Want to build like this?</h2>
          <p className="text-purple-200/80 mb-6">Get in touch for audits, rapid prototyping, or access to our private dev toolchain.</p>
          <Link to="/contact" className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300">
            Contact CuriousLabs
          </Link>
        </section>
        
        {/* Section Divider */}
        <hr className="my-12 border-purple-900/30" />
        
        {/* Metrics Section (from original page) */}
        <section className="max-w-7xl mx-auto mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-left sm:text-center mb-10">CodeLab Impact</h2>
          <div className="bg-gradient-to-br from-[#1C1C2C]/60 to-[#12121C]/60 border border-purple-300/10 p-6 rounded-xl shadow-md shadow-purple-900/20">
            <Metrics />
          </div>
        </section>
        
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