import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
// import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
// import Footer from '../../components/Footer_legacy';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';

export default function Curious() {
  const [missionTime, setMissionTime] = useState(new Date());
  
  // Update mission time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced features data with mission coordinates and status
  const features = [
    {
      title: 'Deep Conversation',
      description: 'Engage in meaningful dialogue on complex topics',
      icon: '💭',
      coordinates: 'CUR-001',
      status: 'OPERATIONAL',
      classification: 'TIER-1'
    },
    {
      title: 'Creative Collaboration',
      description: 'Co-create content, ideas, and solutions',
      icon: '✨',
      coordinates: 'CUR-002',
      status: 'ACTIVE',
      classification: 'TIER-1'
    },
    {
      title: 'Knowledge Synthesis',
      description: 'Connect disparate information into insights',
      icon: '📚',
      coordinates: 'CUR-003',
      status: 'OPERATIONAL',
      classification: 'TIER-2'
    },
    {
      title: 'Emotional Intelligence',
      description: 'Understand and respond to emotional context',
      icon: '🧠',
      coordinates: 'CUR-004',
      status: 'MONITORING',
      classification: 'TIER-2'
    },
    {
      title: 'Adaptive Learning',
      description: 'Evolve conversation style based on preferences',
      icon: '🔄',
      coordinates: 'CUR-005',
      status: 'RESEARCH',
      classification: 'TIER-3'
    },
    {
      title: 'Context Retention',
      description: 'Maintain conversation history and personal details',
      icon: '🛡️',
      coordinates: 'CUR-006',
      status: 'ACTIVE',
      classification: 'TIER-1'
    },
  ];

  // Status color mapping
  const getStatusColor = (status) => {
    const colors = {
      'OPERATIONAL': 'text-teal-400',
      'ACTIVE': 'text-cyan-400', 
      'MONITORING': 'text-blue-400',
      'STANDBY': 'text-slate-400',
      'RESEARCH': 'text-indigo-400'
    };
    return colors[status] || 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Space_Grotesk']">
      <Helmet>
        <title>Curious - AI Companion Station | CuriousLabs</title>
        <meta name="description" content="AI Companion for Thought and Discovery. A sophisticated AI presence built to stimulate imagination, reflection, and curiosity." />
        <meta property="og:title" content="Curious - AI Companion Station | CuriousLabs" />
        <meta property="og:description" content="AI Companion for Thought and Discovery. A sophisticated AI presence built to stimulate imagination, reflection, and curiosity." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/curious" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Atmospheric Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-teal-500/5 to-transparent rounded-full blur-2xl" />
      </div>
      
      {/* <MissionControlNavbar /> */}
      
      {/* Mission Status Panel */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-teal-400/30 rounded-lg p-3 text-xs"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-teal-400 font-mono mb-1">CURIOUS STATUS</div>
        <div className="text-white font-mono">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-teal-400">COMPANION READY</span>
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
            {/* New Curious Logo */}
            <motion.div
              className="inline-block mb-8 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              {/* Main Logo Container */}
              <motion.div
                className="relative w-56 h-56 mx-auto"
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Logo Image */}
                <motion.img
                  src="/assets/images/general/Page_Logos/Curious_logo.webp"
                  alt="Curious Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Commented out old logo for reference */}
            {/*
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8">
              <div className="absolute inset-0 border-2 border-teal-400/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border border-cyan-400/30 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-1 border border-teal-300/10 rounded-full animate-pulse"></div>
              
              <div className="absolute inset-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/50">
                <span className="text-3xl sm:text-4xl">🧠</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            */}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-400"></div>
              <span className="text-teal-400 font-mono text-sm tracking-wider">CUR-COMPANION-001</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-transparent bg-clip-text">
                CURIOUS
              </span>
            </h1>
            
            <div className="text-xl sm:text-2xl text-teal-400 font-mono mb-4 tracking-wide">
              AI COMPANION STATION
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Your sophisticated thinking partner for thought and discovery. An intelligent AI presence built to stimulate 
              imagination, reflection, and curiosity in every conversation.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link 
              to="/codelab" 
              className="group bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
            >
              <span className="flex items-center justify-center gap-2">
                INITIATE CONVERSATION
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/products" 
              className="group bg-black/40 backdrop-blur-md border border-teal-500/50 text-white hover:bg-teal-500/10 hover:border-teal-400 font-medium py-4 px-8 rounded-lg transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                EXPLORE COMPANIONS
                <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Companion Status Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "Thought Sync", value: "100%", status: "ACTIVE" },
              { label: "Creativity Mode", value: "ON", status: "ENGAGED" },
              { label: "Session Time", value: missionTime.toUTCString().slice(17, 25), status: "LIVE" },
              { label: "Empathy Level", value: "HIGH", status: "TUNED" }
            ].map((item, index) => (
              <div key={index} className="bg-black/30 backdrop-blur-md border border-teal-400/20 rounded-lg p-4 hover:border-teal-400/50 transition-all duration-300">
                <div className="text-teal-400 text-xs font-mono mb-1">{item.label}</div>
                <div className="text-white font-bold text-lg mb-1">{item.value}</div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 text-xs font-mono">{item.status}</span>
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
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400"></div>
                <span className="text-teal-400 font-mono text-sm tracking-wider">COMPANION PROFILE</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Your Sophisticated 
                <span className="block text-teal-400">Thinking Partner</span>
              </h2>
              
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Curious is an intelligent AI presence built to stimulate imagination, reflection, and curiosity. It acts as a personal idea partner — always present, never intrusive. From solo founders to creative professionals, Curious brings thinking to life.
              </p>
              
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Unlike conventional AI assistants, Curious is designed to accompany your thought process rather than simply answer questions. It asks the right questions, challenges assumptions, and helps you explore new creative territories.
              </p>

              {/* Companion Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Response Time", value: "<100ms", icon: "⚡" },
                  { label: "Empathy Score", value: "9.8/10", icon: "🧠" },
                  { label: "Creativity Boost", value: "+340%", icon: "✨" },
                  { label: "User Satisfaction", value: "98%", icon: "💡" }
                ].map((stat, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm border border-teal-400/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{stat.icon}</span>
                      <span className="text-teal-400 text-sm font-mono">{stat.label}</span>
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
              <div className="bg-black/40 backdrop-blur-md border border-teal-400/30 rounded-2xl p-8 relative overflow-hidden">
                {/* Background thought patterns */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-teal-400/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-cyan-400/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-teal-400/20 rounded-full"></div>
                </div>
                
                <div className="relative z-10 text-center">
                  {/* New Curious Logo - Smaller for card context */}
                  <motion.div
                    className="inline-block mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      className="relative w-32 h-32 mx-auto"
                      animate={{ 
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.img
                        src="/assets/images/general/Page_Logos/Curious_logo.webp"
                        alt="Curious Logo"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Commented out old thought bubble animation for reference */}
                  {/*
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 border-2 border-teal-400/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-4 border border-cyan-400/40 rounded-full animate-spin-reverse"></div>
                    <div className="absolute inset-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/50">
                      <span className="text-4xl">🧠</span>
                    </div>
                  </div>
                  */}
                  
                  <h3 className="text-2xl font-bold text-white mb-3">CuriousBot Companion</h3>
                  <p className="text-teal-400 font-mono text-sm mb-4">CREATIVE INTELLIGENCE UNIT</p>
                  <p className="text-gray-300 text-sm mb-6">
                    Your personal idea partner for enhanced creative thinking and discovery
                  </p>
                  
                  {/* Thought indicators */}
                  <div className="flex justify-center gap-4">
                    {['THINKING', 'CREATING', 'INSPIRING'].map((mode, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.3}s` }}></div>
                        <span className="text-cyan-400 text-xs font-mono">{mode}</span>
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
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-400"></div>
              <span className="text-teal-400 font-mono text-sm tracking-wider">COMPANION CAPABILITIES</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Core Capabilities
              <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto mt-3 rounded-full" />
            </h2>
            
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Advanced companion features designed to enhance your creative thinking process
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-black/30 backdrop-blur-md border border-teal-400/20 rounded-2xl p-6 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 group"
              >
                {/* Status Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="text-teal-400">{feature.coordinates}</span>
                    <span className="text-gray-500">|</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse opacity-60" />
                </div>

                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{feature.description}</p>
                
                {/* Engagement indicator */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-teal-400 text-xs font-mono">ENGAGED</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action Section with anchor ID */}
        <section id="cta" className="max-w-5xl mx-auto px-4 py-16 text-center">
          <motion.div 
            className="bg-black/40 backdrop-blur-md border border-teal-400/30 rounded-2xl p-10 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-teal-400"></div>
                <span className="text-teal-400 font-mono text-sm tracking-wider">COMPANION READY</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400"></div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Enhance Your Thinking?
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Start a conversation with Curious and discover how it can transform your creative process into an extraordinary journey of discovery.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/codelab" 
                  className="group bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
                >
                  <span className="flex items-center justify-center gap-2">
                    START CONVERSATION
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  to="/products" 
                  className="group bg-black/40 backdrop-blur-md border border-teal-500/50 text-white hover:bg-teal-500/10 hover:border-teal-400 font-medium py-4 px-8 rounded-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    EXPLORE COMPANIONS
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
      
      {/* <Footer /> */}
      <ScrollToTop />
    </div>
  );
} 
