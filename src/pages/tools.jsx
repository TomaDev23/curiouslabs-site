import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import Footer from '../components/Footer_legacy';
import ScrollToTop from '../components/ScrollToTop';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';

export default function Tools() {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const tools = [
    {
      name: "SweepHammer",
      description: "Command-line utility for batch processing and automation tasks with advanced AI-powered optimization.",
      icon: "🔨",
      isAvailable: true,
      downloadLink: "#",
      category: "CLI Tools",
      version: "v1.2.0",
      status: "OPERATIONAL",
      coordinates: "TOOL-001"
    },
    {
      name: "Neural Debugger",
      description: "AI-assisted debugging tool that identifies and suggests fixes for complex code issues.",
      icon: "🧠",
      isAvailable: false,
      category: "AI Tools",
      version: "v0.8.0",
      status: "DEVELOPMENT",
      coordinates: "TOOL-002"
    },
    {
      name: "Quantum Profiler",
      description: "Advanced performance profiling suite with real-time optimization recommendations.",
      icon: "⚡",
      isAvailable: false,
      category: "Performance",
      version: "v0.5.0",
      status: "TESTING",
      coordinates: "TOOL-003"
    },
    {
      name: "Code Synthesizer",
      description: "Generate production-ready code from natural language descriptions using advanced AI models.",
      icon: "🎯",
      isAvailable: false,
      category: "AI Tools",
      version: "v0.3.0",
      status: "RESEARCH",
      coordinates: "TOOL-004"
    },
    {
      name: "Mission Deployer",
      description: "Automated deployment pipeline with zero-downtime strategies and rollback capabilities.",
      icon: "🚀",
      isAvailable: false,
      category: "DevOps",
      version: "v0.9.0",
      status: "BETA",
      coordinates: "TOOL-005"
    },
    {
      name: "Security Scanner",
      description: "Comprehensive security analysis tool with real-time threat detection and mitigation.",
      icon: "🛡️",
      isAvailable: false,
      category: "Security",
      version: "v0.7.0",
      status: "DEVELOPMENT",
      coordinates: "TOOL-006"
    }
  ];

  const categories = [
    { name: "All", icon: "🔧", count: tools.length },
    { name: "CLI Tools", icon: "💻", count: tools.filter(t => t.category === "CLI Tools").length },
    { name: "AI Tools", icon: "🤖", count: tools.filter(t => t.category === "AI Tools").length },
    { name: "Performance", icon: "⚡", count: tools.filter(t => t.category === "Performance").length },
    { name: "DevOps", icon: "🚀", count: tools.filter(t => t.category === "DevOps").length },
    { name: "Security", icon: "🛡️", count: tools.filter(t => t.category === "Security").length }
  ];

  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'lime-400';
      case 'BETA': return 'yellow-400';
      case 'TESTING': return 'blue-400';
      case 'DEVELOPMENT': return 'orange-400';
      case 'RESEARCH': return 'purple-400';
      default: return 'gray-400';
    }
  };
  
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Instruments - Developer Tools | CuriousLabs</title>
        <meta name="description" content="Advanced CLI tools and utilities from CuriousLabs mission control to enhance your development workflow." />
        <meta property="og:title" content="CuriousLabs Instruments - Developer Tools" />
        <meta property="og:description" content="Advanced CLI tools and utilities from CuriousLabs mission control to enhance your development workflow." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/tools" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '30%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(132,204,22,0.04) 0%, transparent 70%)'
        }}
      />
      
      <main className="relative z-20 pt-20 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="font-space text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                Mission <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">Instruments</span>
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 w-32 mx-auto"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-space text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
            >
              Advanced CLI tools and utilities from mission control to enhance your development workflow.
            </motion.p>
          </div>

          {/* Tool Categories Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-lime-400 text-sm tracking-wider font-semibold">INSTRUMENT CATEGORIES</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                  <span className="text-xs font-mono text-white/70">ACTIVE:</span>
                  <span className="text-xs font-mono text-lime-400 font-semibold">{filteredTools.length}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    className={`group cursor-pointer p-3 rounded-lg border transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                        : 'bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border-lime-400/10 hover:border-lime-400/30 text-white'
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-space text-xs font-medium">{category.name}</span>
                      <div className="text-xs font-mono bg-black/30 px-2 py-0.5 rounded">
                        {category.count}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence mode="wait">
              {filteredTools.map((tool, index) => (
                <ToolCard 
                  key={`${selectedCategory}-${tool.name}`} 
                  tool={tool} 
                  index={index}
                  getStatusColor={getStatusColor}
                  setActiveSection={setActiveSection}
                  activeSection={activeSection}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Development Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
              <div className="text-center mb-6">
                <h2 className="font-space text-2xl font-bold text-white mb-4">
                  Development <span className="text-lime-400">Pipeline</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Our instrument development follows a rigorous mission-critical process. 
                  Track the progress of upcoming tools and utilities.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { status: 'OPERATIONAL', count: tools.filter(t => t.status === 'OPERATIONAL').length, color: 'lime-400' },
                  { status: 'BETA', count: tools.filter(t => t.status === 'BETA').length, color: 'yellow-400' },
                  { status: 'DEVELOPMENT', count: tools.filter(t => t.status === 'DEVELOPMENT').length, color: 'orange-400' },
                  { status: 'RESEARCH', count: tools.filter(t => t.status === 'RESEARCH').length, color: 'purple-400' }
                ].map((item, index) => (
                  <div key={item.status} className="text-center p-4 rounded-lg bg-black/30 border border-white/10">
                    <div className={`w-3 h-3 bg-${item.color} rounded-full mx-auto mb-2 animate-pulse`}></div>
                    <div className={`text-2xl font-bold text-${item.color} mb-1`}>{item.count}</div>
                    <div className="text-xs font-mono text-white/60">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}

// Enhanced Tool Card Component
function ToolCard({ tool, index, getStatusColor, setActiveSection, activeSection }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group cursor-pointer h-full"
      onMouseEnter={() => setActiveSection(tool.name)}
      onMouseLeave={() => setActiveSection(null)}
    >
      <div className={`backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl p-6 transition-all duration-500 h-full flex flex-col ${
        activeSection === tool.name ? 'border-lime-400/50 bg-black/50' : 'hover:border-lime-400/30 hover:bg-black/40'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">{tool.icon}</div>
          <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
            {tool.coordinates}
          </div>
        </div>
        
        <h3 className="font-space text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors duration-300">
          {tool.name}
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className={`w-2 h-2 bg-${getStatusColor(tool.status)} rounded-full animate-pulse`}></div>
          <span className={`text-xs font-mono text-${getStatusColor(tool.status)} tracking-wider`}>
            {tool.status}
          </span>
          <span className="text-xs font-mono text-white/50">
            {tool.version}
          </span>
        </div>
        
        <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">
          {tool.description}
        </p>
        
        <div className="mt-auto">
          {tool.isAvailable ? (
            <motion.a 
              href={tool.downloadLink} 
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Tool
            </motion.a>
          ) : (
            <div className="w-full bg-black/50 border border-white/20 text-white/60 font-medium py-3 px-4 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-2 h-2 bg-${getStatusColor(tool.status)} rounded-full animate-pulse`}></div>
                <span>In Development</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 