// 🛡️ STAR_LOCKED: Do not remove or alter – see STAR_LOCK_V1.md
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import ScrollToTop from '../../components/ScrollToTop';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import SolarSystemLayout from '../../components/SolarSystemLayout';

// Product data for mobile view
const productData = [
  { 
    icon: "/assets/images/general/Page_Logos/Aegis_logo.webp", 
    title: "Aegis", 
    path: "/products/aegis", 
    description: "Core Runtime Engine",
    status: "OPERATIONAL",
    coordinates: "CORE-001",
    classification: "CENTRAL_COMMAND"
  },
  { 
    icon: "/assets/images/general/Page_Logos/OpsPipe_logo.webp", 
    title: "OpsPipe", 
    path: "/products/opspipe", 
    description: "Operational Automation",
    status: "ACTIVE",
    coordinates: "OPS-002",
    classification: "AUTOMATION_SUITE"
  },
  { 
    icon: "/assets/images/general/Page_Logos/MoonSignal_logo.webp", 
    title: "MoonSignal", 
    path: "/products/moonsignal", 
    description: "Analytics & Insights",
    status: "MONITORING",
    coordinates: "ANA-003",
    classification: "INTELLIGENCE_HUB"
  },
  { 
    icon: "/assets/images/general/Page_Logos/Guardian_logo.webp", 
    title: "Guardian", 
    path: "/products/guardian", 
    description: "Security & Monitoring",
    status: "STANDBY",
    coordinates: "SEC-004",
    classification: "DEFENSE_GRID"
  },
  { 
    icon: "/assets/images/general/Page_Logos/Curious_logo.webp", 
    title: "Curious", 
    path: "/products/curious", 
    description: "Intelligent Exploration",
    status: "RESEARCH",
    coordinates: "EXP-005",
    classification: "DISCOVERY_ENGINE"
  }
];

export default function ProductsPortal() {
  // Reference to track mounting
  const mountedRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [missionTime, setMissionTime] = useState('');
  
  // Mission time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMissionTime(now.toUTCString().slice(17, 25));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Add listener for changes
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Ensure page always starts at the top when mounted
  useEffect(() => {
    if (!mountedRef.current) {
      // First render - ensure we're at the top
      window.scrollTo(0, 0);
      mountedRef.current = true;
    }
    
    return () => {
      // Clean up when unmounting
      mountedRef.current = false;
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'text-lime-400';
      case 'ACTIVE': return 'text-blue-400';
      case 'MONITORING': return 'text-yellow-400';
      case 'STANDBY': return 'text-orange-400';
      case 'RESEARCH': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'OPERATIONAL': return 'bg-lime-400';
      case 'ACTIVE': return 'bg-blue-400';
      case 'MONITORING': return 'bg-yellow-400';
      case 'STANDBY': return 'bg-orange-400';
      case 'RESEARCH': return 'bg-purple-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Fleet Arsenal - Product Portfolio | CuriousLabs</title>
        <meta name="description" content="Explore the CuriousLabs product ecosystem - a constellation of integrated solutions orbiting around our Aegis core runtime engine." />
        <meta property="og:title" content="CuriousLabs Fleet Arsenal - Product Portfolio" />
        <meta property="og:description" content="Explore the CuriousLabs product ecosystem - a constellation of integrated solutions orbiting around our Aegis core runtime engine." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/products" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[1000px] h-[1000px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(132,204,22,0.03) 0%, transparent 70%)'
        }}
      />
      
      {/* Main Content */}
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
                Fleet <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">Arsenal</span>
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 w-32 mx-auto"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-space text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
            >
              A constellation of integrated solutions orbiting around our Aegis core runtime engine.
            </motion.p>
          </div>

          {/* Fleet Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-lime-400 text-sm tracking-wider font-semibold">FLEET STATUS</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">MISSION TIME:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">{missionTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">SYSTEMS:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">ONLINE</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {productData.map((product, index) => (
                  <motion.div
                    key={product.title}
                    className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setActiveProduct(product.title)}
                    onMouseLeave={() => setActiveProduct(null)}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                        <img 
                          src={product.icon} 
                          alt={`${product.title} Logo`} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-sm font-medium text-white mb-1">{product.title}</div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusBg(product.status)}`}></div>
                        <span className={`text-xs font-mono tracking-wider ${getStatusColor(product.status)}`}>
                          {product.status}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-0.5 rounded">
                        {product.coordinates}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Solar System Section - Desktop */}
        <section id="solar-system" className="relative py-16 px-4 sm:px-8 hidden lg:block">
          {/* Enhanced star background with atomic styling */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: "radial-gradient(2px 2px at 20px 30px, rgba(132,204,22,0.3), transparent), radial-gradient(2px 2px at 40px 70px, rgba(132,204,22,0.2), transparent), radial-gradient(1px 1px at 90px 40px, rgba(132,204,22,0.4), transparent), radial-gradient(1px 1px at 130px 80px, rgba(132,204,22,0.2), transparent), radial-gradient(2px 2px at 160px 30px, rgba(132,204,22,0.3), transparent)",
              backgroundRepeat: "repeat",
              backgroundSize: "200px 100px"
            }}
          />
          
          {/* Title overlay with atomic styling */}
          <motion.div 
            className="absolute top-24 left-10 z-20 max-w-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="font-mono text-lime-400 text-sm tracking-wider font-semibold">SYSTEM OVERVIEW</span>
              </div>
              
            <div className="flex flex-col text-left">
                <span className="font-space text-2xl sm:text-3xl font-bold text-white tracking-wider mb-1">
                  Product
              </span>
                <span className="font-space text-3xl sm:text-4xl font-bold tracking-wider uppercase bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">
                  Constellation
              </span>
              </div>
              
              <p className="text-white/70 mt-4 leading-relaxed">
                Every CuriousLabs solution orbits around <span className="text-lime-400 font-medium">Aegis</span> — our mission-critical runtime core.
              </p>
              
              {activeProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-lg bg-lime-400/10 border border-lime-400/20"
                >
                  <div className="text-sm font-medium text-lime-400">Active Scan:</div>
                  <div className="text-sm text-white/80">{activeProduct}</div>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Solar System visualization with enhanced styling */}
          <div className="relative">
          <SolarSystemLayout />
          </div>
        </section>
        
        {/* Mobile Fallback - Enhanced with atomic styling */}
        <section className="lg:hidden block py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="font-space text-3xl font-bold text-white mb-4">
              Product <span className="text-lime-400">Constellation</span>
            </h2>
            <p className="text-white/70 max-w-md mx-auto leading-relaxed">
              Discover our suite of integrated solutions powered by the Aegis runtime core.
            </p>
          </div>
          
          {/* Aegis Feature Card - Enhanced */}
          <motion.div
            className="mx-auto max-w-sm mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/30 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img 
                    src="/assets/images/general/Page_Logos/Aegis_logo.webp" 
                    alt="Aegis Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                  CORE-001
                </div>
              </div>
              
              <h3 className="font-space text-xl font-bold text-white mb-2">Aegis</h3>
              <p className="text-white/70 text-sm mb-3">Core Runtime Engine</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-lime-400 tracking-wider">OPERATIONAL</span>
              </div>
              
              <div className="text-xs text-white/60 mb-4">CENTRAL_COMMAND</div>
              
              <Link 
                to="/products/aegis" 
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/20"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Access Core
              </Link>
            </div>
          </motion.div>
          
          {/* Other Products Grid - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {productData.slice(1).map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="group"
              >
                <Link 
                  to={product.path} 
                  className="block backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl p-5 transition-all duration-500 hover:border-lime-400/30 hover:bg-black/40 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img 
                        src={product.icon} 
                        alt={`${product.title} Logo`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                      {product.coordinates}
                    </div>
                  </div>
                  
                  <h3 className="font-space text-lg font-semibold text-white mb-1 group-hover:text-lime-400 transition-colors duration-300">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusBg(product.status)}`}></div>
                    <span className={`text-xs font-mono tracking-wider ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                  
                  <p className="text-white/60 text-sm mb-3">{product.description}</p>
                  <div className="text-xs text-white/50 mb-3">{product.classification}</div>
                  
                  <div className="flex items-center text-lime-400 text-sm font-medium">
                    <span>Explore System</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        <div className="pt-16 pb-32">
          <motion.div 
            className="max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-lime-400/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                
                <h2 className="font-space text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to <span className="text-lime-400">Deploy</span>?
                </h2>
                
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                  Our integrated product constellation makes engineering excellence accessible to teams of all sizes. 
                  Start your mission with CuriousLabs today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/20"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Mission Control
                  </Link>
                  
                  <Link 
                    to="/about" 
                    className="inline-flex items-center bg-black/50 border border-lime-400/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:border-lime-400/50 hover:bg-black/70"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                    Meet the Crew
              </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <ScrollToTop />
    </div>
  );
} 