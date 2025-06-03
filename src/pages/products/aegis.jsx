import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import './aegis.css'; // Add CSS import for custom animations

export default function Aegis() {
  const [missionTime, setMissionTime] = useState(new Date());
  
  // Update mission time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Define the use cases array with enhanced data
  const useCases = [
    {
      title: "Food & Beverage Ops",
      description: "Run AI-driven kitchens with zero chaos. Aegis ingests operational files, recipes, and shift logs — turning them into structured cards, pricing metrics, and staff dashboards. Built for franchise scaling and lean food labs.\n\nBuilt to International F&B standards. State-synced. Trace-locked.",
      icon: "🍜",
      coordinates: "AEG-001",
      status: "OPERATIONAL",
      classification: "CRITICAL"
    },
    {
      title: "Corporate Ops",
      description: "Financial workflows you can trust. Aegis parses receipts, batches documents, applies schema validation, and syncs with tools like Xero. Rejects fuzzy results. Flags edge cases for review.\n\nEvery transaction traceable. Every sync verified.",
      icon: "📊",
      coordinates: "AEG-002",
      status: "ACTIVE",
      classification: "HIGH"
    },
    {
      title: "Entertainment Ops",
      description: "Curate thousands of guest uploads automatically. Used in weddings and corporate events, Aegis ranks images by quality, screens content, and renders a polished feed in real-time — all AI-managed.\n\nBeautiful results. No moderation stress.",
      icon: "📸",
      coordinates: "AEG-003",
      status: "MONITORING",
      classification: "MEDIUM"
    },
    {
      title: "Ops & Debug Automation",
      description: "See your pipeline like a control tower. Aegis runs internal tests before execution, simulates fallback chains, and reports visual traces of how phases flow. Useful in dev, ops, and AI workflows.\n\nFails safely. Replays clearly. Logs everything.",
      icon: "🛠",
      coordinates: "AEG-004",
      status: "OPERATIONAL",
      classification: "CRITICAL"
    },
    {
      title: "Internal Tooling / Microtools",
      description: "Build fast, clean internal workflows. Plug AI into HR forms, admin panels, or CLI jobs — without fragile scripts. Aegis handles routing, agents, state, and outputs.\n\nCleaner than RPA. Safer than code hacks.",
      icon: "💼",
      coordinates: "AEG-005",
      status: "STANDBY",
      classification: "MEDIUM"
    },
    {
      title: "Modular AI Infrastructure",
      description: "White-label your own agent system. Aegis can power your startup or SaaS backend. Use the same architecture: FSM, trace logs, config-driven agent slots.\n\nYour product. Our mission core.",
      icon: "🧱",
      coordinates: "AEG-006",
      status: "RESEARCH",
      classification: "HIGH"
    }
  ];

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-lime-400 bg-lime-400/20';
      case 'ACTIVE': return 'text-blue-400 bg-blue-400/20';
      case 'MONITORING': return 'text-yellow-400 bg-yellow-400/20';
      case 'STANDBY': return 'text-orange-400 bg-orange-400/20';
      case 'RESEARCH': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Space_Grotesk']">
      <Helmet>
        <title>AEGIS Command Center - Core Process Engine | CuriousLabs</title>
        <meta name="description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:title" content="AEGIS Command Center - Core Process Engine | CuriousLabs" />
        <meta property="og:description" content="The central intelligence unit that powers all CuriousLabs products with advanced algorithms and machine learning capabilities." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/aegis" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Atmospheric Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/5 to-transparent rounded-full blur-2xl" />
      </div>
      
      <MissionControlNavbar />
      
      {/* Mission Status Panel */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-yellow-400/30 rounded-lg p-3 text-xs"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-yellow-400 font-mono mb-1">AEGIS STATUS</div>
        <div className="text-white font-mono">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-yellow-400">COMMAND READY</span>
        </div>
      </motion.div>
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10">
        {/* Overview Section with anchor ID */}
        <section id="overview" className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            {/* New Aegis Logo */}
            <motion.div
              className="inline-block mb-8 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              {/* Main Logo Container */}
              <motion.div
                className="relative w-56 h-56 mx-auto"
                whileHover={{ 
                  scale: 1.05
                }}
              >
                {/* Logo Image */}
                <motion.img
                  src="/assets/images/general/Page_Logos/Aegis_logo.webp"
                  alt="Aegis Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-yellow-400 font-mono text-sm tracking-wider">AEG-CORE-001</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>
          
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-transparent bg-clip-text">
                AEGIS
              </span>
          </h1>
          
            <div className="text-xl sm:text-2xl text-yellow-400 font-mono mb-4 tracking-wide">
              COMMAND CENTER
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              The central intelligence unit powering all mission-critical operations with advanced algorithms, 
              machine learning capabilities, and autonomous decision-making protocols.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link 
              to="/contact" 
              className="group bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
            >
              <span className="flex items-center justify-center gap-2">
                REQUEST ACCESS
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/products" 
              className="group bg-black/40 backdrop-blur-md border border-yellow-500/50 text-white hover:bg-yellow-500/10 hover:border-yellow-400 font-medium py-4 px-8 rounded-lg transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                FLEET OVERVIEW
                <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* System Status Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "Core Systems", value: "100%", status: "OPERATIONAL" },
              { label: "Agent Network", value: "24/7", status: "ACTIVE" },
              { label: "Mission Time", value: missionTime.toUTCString().slice(17, 25), status: "SYNC" },
              { label: "Security Level", value: "LEGIT", status: "VERIFIED" }
            ].map((item, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-md border border-yellow-400/20 rounded-lg p-4 hover:border-yellow-400/50 transition-all duration-300">
                <div className="text-yellow-400 text-xs font-mono mb-1">{item.label}</div>
                <div className="text-white font-bold text-lg mb-1">{item.value}</div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="text-lime-400 text-xs font-mono">{item.status}</span>
                </div>
          </div>
            ))}
          </motion.div>
        </section>
        
        {/* Main content sections */}
        <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-400"></div>
                <span className="text-yellow-400 font-mono text-sm tracking-wider">MISSION BRIEF</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                The Heart of Our 
                <span className="block text-yellow-400">Ecosystem</span>
              </h2>
              
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Aegis is the central intelligence unit that powers all CuriousLabs products. Built with advanced algorithms 
                and machine learning capabilities, Aegis processes data, makes decisions, and orchestrates workflows across 
                our entire product ecosystem.
              </p>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Whether you're using OpsPipe for DevOps automation, MoonSignal for market intelligence, or any of our other 
                products, you're experiencing the power of Aegis working behind the scenes.
              </p>

              {/* Mission Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Uptime", value: "99.9%", icon: "⚡" },
                  { label: "Response", value: "<50ms", icon: "🚀" },
                  { label: "Accuracy", value: "99.7%", icon: "🎯" },
                  { label: "Scale", value: "∞", icon: "📈" }
                ].map((stat, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm border border-yellow-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-yellow-400 text-sm font-mono">{stat.label}</span>
                    </div>
                    <div className="text-white font-bold text-xl">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-black/40 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-8 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-yellow-400/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-orange-400/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-yellow-400/20 rounded-full"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  {/* New Aegis Logo - Smaller for card context */}
                  <motion.div
                    className="inline-block mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="relative w-24 h-24 mx-auto"
                      whileHover={{ 
                        scale: 1.05
                      }}
                    >
                      <motion.img
                        src="/assets/images/general/Page_Logos/Aegis_logo.webp"
                        alt="Aegis Logo"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Commented out old orbital rings logo for reference */}
                  {/*
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-4 border border-orange-400/40 rounded-full animate-spin-reverse"></div>
                    <div className="absolute inset-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50">
                      <span className="text-4xl">🌞</span>
                    </div>
                  </div>
                  */}
                  
                  <h3 className="text-2xl font-bold text-white mb-3">AEGIS Core Engine</h3>
                  <p className="text-yellow-400 font-mono text-sm mb-4">CENTRAL COMMAND PROCESSOR</p>
                  <p className="text-gray-300 text-sm">
                    Intelligent processing engine orchestrating all mission-critical operations
                  </p>
                  
                  {/* Status indicators */}
                  <div className="flex justify-center gap-4 mt-6">
                    {['ACTIVE', 'SECURE', 'READY'].map((status, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                        <span className="text-lime-400 text-xs font-mono">{status}</span>
            </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section with anchor ID */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-yellow-400 font-mono text-sm tracking-wider">SYSTEM CAPABILITIES</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Core Capabilities
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-3 rounded-full" />
            </h2>
            
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Advanced processing modules engineered for mission-critical operations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Decision Graph',
                description: 'Uses state graphs to model runtime decisions and fallback chains.',
                icon: '🧠',
                coordinates: 'CAP-001',
                status: 'OPERATIONAL'
              },
              {
                title: 'Agent Orchestration',
                description: 'Powers AI modules like GPT, Claude, Gemini, Grok in unified logic.',
                icon: '⚙️',
                coordinates: 'CAP-002',
                status: 'ACTIVE'
              },
              {
                title: 'Signal Integration',
                description: 'Accepts inbound data from tools like MoonSignal and OpsPipe.',
                icon: '📡',
                coordinates: 'CAP-003',
                status: 'MONITORING'
              },
              {
                title: 'Contract Enforcement',
                description: 'Validates transitions and actions with declarative schemas.',
                icon: '🔒',
                coordinates: 'CAP-004',
                status: 'OPERATIONAL'
              },
              {
                title: 'Memory & Telemetry',
                description: 'Tracks every state, transition, and variable at runtime.',
                icon: '🔄',
                coordinates: 'CAP-005',
                status: 'ACTIVE'
              },
              {
                title: 'Modular Output Hooks',
                description: 'Powers downstream rendering, sync, or routing to other tools.',
                icon: '🔌',
                coordinates: 'CAP-006',
                status: 'STANDBY'
              },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-black/30 backdrop-blur-md border border-yellow-400/20 rounded-2xl p-6 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group"
              >
                {/* Status Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="text-yellow-400">{feature.coordinates}</span>
                    <span className="text-gray-500">|</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
                </div>

                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{feature.description}</p>
                
                {/* Progress indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-yellow-400 text-xs font-mono">READY</span>
              </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Under the Hood Section - Enhanced */}
        <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-yellow-400 font-mono text-sm tracking-wider">SYSTEM ARCHITECTURE</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Under the Hood: How Aegis Works
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-3 rounded-full" />
            </h2>
          </motion.div>
          
          <motion.div 
            className="bg-black/30 backdrop-blur-md border border-yellow-400/20 rounded-2xl p-8 hover:border-yellow-400/40 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ul className="space-y-6">
              {[
                {
                  title: "StateMachine Core",
                  description:
                    "All logic is governed by a deterministic FSM (finite-state machine) that enforces valid transitions, prevents undefined behavior, and emits traceable state logs at every lifecycle step.",
                  icon: "🧠",
                  coordinates: "ARCH-001"
                },
                {
                  title: "Agent Control Layer",
                  description:
                    "A plug-and-play control bus for external AI agents (GPT, Claude, Gemini, Grok). Agents operate in validated slots with session-specific execution context and audit-compliant I/O.",
                  icon: "🎛️",
                  coordinates: "ARCH-002"
                },
                {
                  title: "Trace Telemetry Engine",
                  description:
                    "Every session emits granular telemetry: state transitions, agent calls, fallback reasons, and output timing. Built for postmortems, playback, and human validation.",
                  icon: "📊",
                  coordinates: "ARCH-003"
                },
                {
                  title: "Contract Enforcement",
                  description:
                    "All logic paths are bound by schema contracts. No runtime guesswork. Transitions and actions are declared, validated, and version-controlled.",
                  icon: "📜",
                  coordinates: "ARCH-004"
                },
                {
                  title: "Modular Output Bus",
                  description:
                    "Structured output flows — renderers, APIs, CLI, sync agents. Each downstream output is routed via config and trace-backed for reproducibility.",
                  icon: "🧩",
                  coordinates: "ARCH-005"
                },
                {
                  title: "Secure Runtime Surface",
                  description:
                    "Built with isolation, fallback control, and execution limits. No global state leakage. Sessions are atomic, trace-synced, and optionally sealed for audit logs.",
                  icon: "🔐",
                  coordinates: "ARCH-006"
                }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start p-4 bg-black/20 rounded-lg border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mr-4">
                    <span className="text-yellow-500 text-2xl">{item.icon}</span>
                    <span className="text-yellow-400 font-mono text-xs">{item.coordinates}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>
        
        {/* LEGIT Protocol Section - Enhanced */}
        <section className="max-w-6xl mx-auto px-4 py-16 mb-16">
          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-8 relative overflow-hidden shadow-2xl shadow-yellow-500/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced glow effects */}
            <div className="absolute -inset-1 bg-yellow-500/5 blur-md animate-pulse"></div>
            <div className="absolute inset-0 bg-yellow-400/5 blur-lg animate-pulse delay-1000"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
                  <span className="text-yellow-400 font-mono text-sm tracking-wider">PROTOCOL STANDARD</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6">
                  Built LEGIT from the Ground Up
                  <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-3 rounded-full" />
                </h2>
                
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Every decision in Aegis follows the <span className="font-bold text-yellow-300">LEGIT</span> standard — our internal protocol for secure, testable, and audit-compliant AI runtimes.
                </p>
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                {[
                  { icon: "📜", title: "Logged", desc: "All transitions, sessions, outputs, and agent calls are trace-logged.", coordinates: "LEG-001" },
                  { icon: "🧪", title: "Evaluated", desc: "Runtimes are validated against test specs and regression flows.", coordinates: "LEG-002" },
                  { icon: "🧠", title: "Grounded", desc: "No hallucinations. Every output is schema-bound and auditable.", coordinates: "LEG-003" },
                  { icon: "🛡️", title: "Isolated", desc: "Sessions are atomic and sandboxed — no global state bleed.", coordinates: "LEG-004" },
                  { icon: "✅", title: "Tested", desc: "Every agent, parser, and output route is test-driven and verifiable.", coordinates: "LEG-005" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/50 transition-all duration-300 text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-yellow-400 font-mono text-xs mb-2">{item.coordinates}</div>
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h3 className="font-bold text-yellow-300 mb-3 text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Technical LEGIT Meaning Section */}
              <motion.div 
                className="bg-black/20 rounded-xl p-6 border border-yellow-400/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-6">
                  What LEGIT Means in Code
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  The LEGIT protocol isn't branding — it's enforced by the Aegis runtime. Every part of the system maps to real contract logic, trace outputs, and test validation.
                </p>
                <ul className="space-y-4 border-l-2 border-yellow-500/30 pl-6">
                  {[
                    { letter: "L", title: "Lifecycle Simulation Tested", desc: "Every core phase is validated via state-machine simulations with full control replay." },
                    { letter: "E", title: "Enum & State Traceability Verified", desc: "All transitions use strongly-typed enums. State changes emit traceable artifacts like state.json." },
                    { letter: "G", title: "Guardrails Locked", desc: "Fallbacks, overrides, and failures are schema-validated and tracked in files like recovery.json." },
                    { letter: "I", title: "Interface Contracts Enforced", desc: "Parsers, agents, and sync layers must conform to spec. No schema = no ship." },
                    { letter: "T", title: "Trace Artifacts Written", desc: "All sessions output structured trace logs (trace/, logs/audit/) that show real execution paths and diagnostics." }
                  ].map((item, index) => (
                    <li key={index} className="group">
                      <span className="text-yellow-400 font-bold text-lg">{item.letter} – {item.title}:</span>
                      <br />
                      <span className="text-gray-300 leading-relaxed">{item.desc}</span>
                  </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* Use Cases Section - Enhanced */}
        <section className="max-w-7xl mx-auto px-4 py-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-yellow-400 font-mono text-sm tracking-wider">MISSION SCENARIOS</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Use Cases
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-3 rounded-full" />
            </h2>
            
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Real-world applications where AEGIS delivers mission-critical results
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div 
                key={index} 
                className="bg-black/30 backdrop-blur-md border border-yellow-400/20 rounded-2xl p-6 hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 min-h-[280px] flex flex-col group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Status Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="text-yellow-400">{useCase.coordinates}</span>
                    <span className="text-gray-500">|</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(useCase.status)}`}>
                      {useCase.status}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
                </div>

                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line flex-1">{useCase.description}</p>
                
                {/* Classification badge */}
                <div className="mt-4 pt-4 border-t border-yellow-400/20">
                  <span className="text-yellow-400 font-mono text-xs">
                    CLASSIFICATION: {useCase.classification}
                  </span>
              </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action Section - Enhanced */}
        <section id="cta" className="max-w-5xl mx-auto px-4 py-16 text-center">
          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-yellow-400/30 rounded-2xl p-10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
                <span className="text-yellow-400 font-mono text-sm tracking-wider">MISSION READY</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Build Smarter With AEGIS
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether you're launching a startup, building an internal tool, or managing chaotic ops — AEGIS is your AI-native command center.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="group bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
                >
                  <span className="flex items-center justify-center gap-2">
                    INITIATE CONTACT
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
              </Link>
                <Link 
                  to="/docs" 
                  className="group bg-black/40 backdrop-blur-md border border-yellow-500/50 text-white hover:bg-yellow-500/10 hover:border-yellow-400 font-medium py-4 px-8 rounded-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    ACCESS DOCUMENTATION
                    <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
              </Link>
            </div>
          </div>
          </motion.div>
        </section>
      </main>
      
      <ScrollToTop />
    </div>
  );
} 