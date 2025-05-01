import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer_legacy';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import './aegis.css'; // Add CSS import for custom animations

export default function Aegis() {
  // Define the use cases array
  const useCases = [
    {
      title: "Food & Beverage Ops",
      description: "Run AI-driven kitchens with zero chaos. Aegis ingests operational files, recipes, and shift logs — turning them into structured cards, pricing metrics, and staff dashboards. Built for franchise scaling and lean food labs.\n\nBuilt to International F&B standards. State-synced. Trace-locked.",
      icon: "🍜"
    },
    {
      title: "Corporate Ops",
      description: "Financial workflows you can trust. Aegis parses receipts, batches documents, applies schema validation, and syncs with tools like Xero. Rejects fuzzy results. Flags edge cases for review.\n\nEvery transaction traceable. Every sync verified.",
      icon: "📊"
    },
    {
      title: "Entertainment Ops",
      description: "Curate thousands of guest uploads automatically. Used in weddings and corporate events, Aegis ranks images by quality, screens content, and renders a polished feed in real-time — all AI-managed.\n\nBeautiful results. No moderation stress.",
      icon: "📸"
    },
    {
      title: "Ops & Debug Automation",
      description: "See your pipeline like a control tower. Aegis runs internal tests before execution, simulates fallback chains, and reports visual traces of how phases flow. Useful in dev, ops, and AI workflows.\n\nFails safely. Replays clearly. Logs everything.",
      icon: "🛠"
    },
    {
      title: "Internal Tooling / Microtools",
      description: "Build fast, clean internal workflows. Plug AI into HR forms, admin panels, or CLI jobs — without fragile scripts. Aegis handles routing, agents, state, and outputs.\n\nCleaner than RPA. Safer than code hacks.",
      icon: "💼"
    },
    {
      title: "Modular AI Infrastructure",
      description: "White-label your own agent system. Aegis can power your startup or SaaS backend. Use the same architecture: FSM, trace logs, config-driven agent slots.\n\nYour product. Our mission core.",
      icon: "🧱"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] via-[#272750] to-[#1A1A2E] overflow-hidden">
      <Helmet>
        <title>Aegis - Core Process Engine | CuriousLabs</title>
        <meta name="description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:title" content="Aegis - Core Process Engine | CuriousLabs" />
        <meta property="og:description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/aegis" />
      </Helmet>
      
      <NavBar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Overview Section with anchor ID */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 h-full w-full rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">🌞</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">AEGIS</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            The core process engine powering all our products
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link to="/contact" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              Request Demo
            </Link>
            <Link to="/products" className="bg-transparent border border-yellow-500 text-white hover:bg-yellow-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
              View All Products
            </Link>
          </div>
        </section>
        
        {/* Main content sections */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">The Heart of Our Ecosystem</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                Aegis is the central intelligence unit that powers all CuriousLabs products. Built with advanced algorithms 
                and machine learning capabilities, Aegis processes data, makes decisions, and orchestrates workflows across 
                our entire product ecosystem.
              </p>
              <p className="text-sm sm:text-base text-gray-300">
                Whether you're using OpsPipe for DevOps automation, MoonSignal for market intelligence, or any of our other 
                products, you're experiencing the power of Aegis working behind the scenes.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#2A2A45] to-[#1A1A30] p-6 sm:p-8 rounded-lg border border-yellow-500/20">
              <div className="aspect-square relative rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 animate-pulse"></div>
                <div className="relative z-10 text-center p-6 sm:p-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🌞</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Aegis Core</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Intelligent processing engine</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section with anchor ID */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center">Core Capabilities</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Decision Graph',
                description: 'Uses state graphs to model runtime decisions and fallback chains.',
                icon: '🧠'
              },
              {
                title: 'Agent Orchestration',
                description: 'Powers AI modules like GPT, Claude, Gemini, Grok in unified logic.',
                icon: '⚙️'
              },
              {
                title: 'Signal Integration',
                description: 'Accepts inbound data from tools like MoonSignal and OpsPipe.',
                icon: '📡'
              },
              {
                title: 'Contract Enforcement',
                description: 'Validates transitions and actions with declarative schemas.',
                icon: '🔒'
              },
              {
                title: 'Memory & Telemetry',
                description: 'Tracks every state, transition, and variable at runtime.',
                icon: '🔄'
              },
              {
                title: 'Modular Output Hooks',
                description: 'Powers downstream rendering, sync, or routing to other tools.',
                icon: '🔌'
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-yellow-500/10 hover:border-yellow-500/30 transition duration-300">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Under the Hood Section - NEW */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center">Under the Hood: How Aegis Works</h2>
          
          <div className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
            <ul className="space-y-4">
              {[
                {
                  title: "StateMachine Core",
                  description:
                    "All logic is governed by a deterministic FSM (finite-state machine) that enforces valid transitions, prevents undefined behavior, and emits traceable state logs at every lifecycle step.",
                  icon: "🧠"
                },
                {
                  title: "Agent Control Layer",
                  description:
                    "A plug-and-play control bus for external AI agents (GPT, Claude, Gemini, Grok). Agents operate in validated slots with session-specific execution context and audit-compliant I/O.",
                  icon: "🎛️"
                },
                {
                  title: "Trace Telemetry Engine",
                  description:
                    "Every session emits granular telemetry: state transitions, agent calls, fallback reasons, and output timing. Built for postmortems, playback, and human validation.",
                  icon: "📊"
                },
                {
                  title: "Contract Enforcement",
                  description:
                    "All logic paths are bound by schema contracts. No runtime guesswork. Transitions and actions are declared, validated, and version-controlled.",
                  icon: "📜"
                },
                {
                  title: "Modular Output Bus",
                  description:
                    "Structured output flows — renderers, APIs, CLI, sync agents. Each downstream output is routed via config and trace-backed for reproducibility.",
                  icon: "🧩"
                },
                {
                  title: "Secure Runtime Surface",
                  description:
                    "Built with isolation, fallback control, and execution limits. No global state leakage. Sessions are atomic, trace-synced, and optionally sealed for audit logs.",
                  icon: "🔐"
                }
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-3 text-lg">{item.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        {/* LEGIT Protocol Section - NEW */}
        <section className="max-w-6xl mx-auto px-4 py-6 sm:py-10 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-[#252542]/60 to-[#1A1A30]/60 border border-yellow-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_25px_rgba(234,179,8,0.15)]">
            {/* Light yellow glow effects with animation */}
            <div className="absolute -inset-1 bg-yellow-500/5 blur-md animate-pulse-glow"></div>
            <div className="absolute inset-0 bg-yellow-400/5 blur-lg" style={{ animation: 'secondary-glow 5s infinite ease-in-out 0.5s' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center">
                Built LEGIT from the Ground Up
              </h2>
              <p className="text-sm sm:text-base text-gray-300 text-center max-w-3xl mx-auto mb-6 sm:mb-8">
                Every decision in Aegis follows the <span className="font-semibold text-yellow-300">LEGIT</span> standard — our internal protocol for secure, testable, and audit-compliant AI runtimes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm sm:text-base text-white text-center mb-12">
                <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/10">
                  <div className="text-xl mb-2">📜</div>
                  <h3 className="font-semibold text-yellow-300 mb-1">Logged</h3>
                  <p className="text-gray-400">All transitions, sessions, outputs, and agent calls are trace-logged.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/10">
                  <div className="text-xl mb-2">🧪</div>
                  <h3 className="font-semibold text-yellow-300 mb-1">Evaluated</h3>
                  <p className="text-gray-400">Runtimes are validated against test specs and regression flows.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/10">
                  <div className="text-xl mb-2">🧠</div>
                  <h3 className="font-semibold text-yellow-300 mb-1">Grounded</h3>
                  <p className="text-gray-400">No hallucinations. Every output is schema-bound and auditable.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/10">
                  <div className="text-xl mb-2">🛡️</div>
                  <h3 className="font-semibold text-yellow-300 mb-1">Isolated</h3>
                  <p className="text-gray-400">Sessions are atomic and sandboxed — no global state bleed.</p>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/10">
                  <div className="text-xl mb-2">✅</div>
                  <h3 className="font-semibold text-yellow-300 mb-1">Tested</h3>
                  <p className="text-gray-400">Every agent, parser, and output route is test-driven and verifiable.</p>
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
                <ul className="space-y-4 border-l border-yellow-500/20 pl-4">
                  <li>
                    <span className="text-yellow-400 font-medium">L – Lifecycle Simulation Tested:</span><br />
                    Every core phase is validated via state-machine simulations with full control replay.
                  </li>
                  <li>
                    <span className="text-yellow-400 font-medium">E – Enum & State Traceability Verified:</span><br />
                    All transitions use strongly-typed enums. State changes emit traceable artifacts like <code>state.json</code>.
                  </li>
                  <li>
                    <span className="text-yellow-400 font-medium">G – Guardrails Locked:</span><br />
                    Fallbacks, overrides, and failures are schema-validated and tracked in files like <code>recovery.json</code>.
                  </li>
                  <li>
                    <span className="text-yellow-400 font-medium">I – Interface Contracts Enforced:</span><br />
                    Parsers, agents, and sync layers must conform to spec. No schema = no ship.
                  </li>
                  <li>
                    <span className="text-yellow-400 font-medium">T – Trace Artifacts Written:</span><br />
                    All sessions output structured trace logs (<code>trace/</code>, <code>logs/audit/</code>) that show real execution paths and diagnostics.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section - NEW */}
        <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 sm:mb-12 text-center">Use Cases</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50 p-5 sm:p-6 rounded-xl border border-yellow-500/10 hover:border-yellow-500/30 transition duration-300 min-h-[220px] flex flex-col">
                <div className="text-2xl mb-3">{useCase.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{useCase.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 whitespace-pre-line">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Call to Action Section with anchor ID - UPDATED */}
        <section id="cta" className="max-w-5xl mx-auto px-4 py-10 sm:py-16 text-center">
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/20 rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Build Smarter With Aegis</h2>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8">
              Whether you're launching a startup, building an internal tool, or managing chaotic ops — Aegis is your AI-native engine.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link to="/contact" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
                Talk to Us
              </Link>
              <Link to="/docs" className="bg-transparent border border-yellow-500 text-white hover:bg-yellow-500/10 font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-md transition-all duration-300">
                Explore Docs
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 