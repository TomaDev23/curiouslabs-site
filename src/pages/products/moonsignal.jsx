import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
// import Footer from '../../components/Footer_legacy';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import { motion } from 'framer-motion';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';

const MoonSignalPage = () => {
  const [missionTime, setMissionTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'OPERATIONAL': 'text-blue-400',
      'ACTIVE': 'text-cyan-400', 
      'MONITORING': 'text-slate-400',
      'STANDBY': 'text-indigo-400',
      'RESEARCH': 'text-purple-400'
    };
    return colors[status] || 'text-slate-400';
  };

  const signalCapabilities = [
    {
      id: 'MSL-001',
      name: 'Signal Clustering',
      description: 'Group input patterns into meaningful signal families',
      status: 'OPERATIONAL',
      classification: 'TIER-1',
      icon: '📡'
    },
    {
      id: 'MSL-002', 
      name: 'Real-time Visualization',
      description: 'Render signal maps as live dashboards and charts',
      status: 'ACTIVE',
      classification: 'TIER-1',
      icon: '📊'
    },
    {
      id: 'MSL-003',
      name: 'AEGIS Integration',
      description: 'Send parsed signal data into the decision engine',
      status: 'OPERATIONAL',
      classification: 'TIER-2',
      icon: '🔗'
    },
    {
      id: 'MSL-004',
      name: 'Multi-Platform Feeds',
      description: 'Discord, X, Wallet data with Web3 compatibility',
      status: 'MONITORING',
      classification: 'TIER-2',
      icon: '🌐'
    },
    {
      id: 'MSL-005',
      name: 'Signal Classification',
      description: 'Tag clusters with confidence, volatility, and risk',
      status: 'ACTIVE',
      classification: 'TIER-3',
      icon: '🏷️'
    },
    {
      id: 'MSL-006',
      name: 'Adaptive Thresholds',
      description: 'Learn which signal types matter to your stack',
      status: 'RESEARCH',
      classification: 'TIER-1',
      icon: '🎯'
    }
  ];

  const marketMetrics = [
    { 
      id: 'MSL-M001',
      label: 'Signal Accuracy', 
      value: '94.7', 
      unit: '%', 
      icon: '🎯',
      status: 'OPERATIONAL',
      trend: '↗ +2.3%'
    },
    { 
      id: 'MSL-M002',
      label: 'Processing Speed', 
      value: '0.12', 
      unit: 's', 
      icon: '⚡',
      status: 'ACTIVE',
      trend: '↘ -15ms'
    },
    { 
      id: 'MSL-M003',
      label: 'Data Sources', 
      value: '847', 
      unit: 'active', 
      icon: '📡',
      status: 'OPERATIONAL',
      trend: '↗ +23'
    },
    { 
      id: 'MSL-M004',
      label: 'Market Coverage', 
      value: '24', 
      unit: '/7', 
      icon: '🌐',
      status: 'ACTIVE',
      trend: '● GLOBAL'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundLayerAtomic />
      <Helmet>
        <title>MoonSignal - Market Intelligence | CuriousLabs</title>
        <meta name="description" content="Market Intelligence from the Edge. MoonSignal captures social, behavioral, and transactional signals to generate real-time market insights." />
        <meta property="og:title" content="MoonSignal - Market Intelligence | CuriousLabs" />
        <meta property="og:description" content="Market Intelligence from the Edge. MoonSignal captures social, behavioral, and transactional signals to generate real-time market insights." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/moonsignal" />
      </Helmet>
      
      <MissionControlNavbar />
      
      {/* Mission Status Panel */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-blue-400/30 rounded-lg p-3 text-xs font-mono"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-blue-400 mb-1">MOONSIGNAL STATUS</div>
        <div className="text-white">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-blue-400">SIGNALS ACTIVE</span>
        </div>
        <div className="text-xs text-slate-400 mt-1">COORD: LUNAR-ALPHA</div>
      </motion.div>
      
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <motion.div 
          className="container mx-auto px-6 py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            {/* Mission Identifier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
                <span className="text-blue-400 font-mono text-sm tracking-wider">MSL-INTELLIGENCE-001</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
            </motion.div>

            {/* New MoonSignal Logo */}
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
                  src="/assets/images/general/Page_Logos/MoonSignal_logo.webp"
                  alt="MoonSignal Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-slate-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              MOONSIGNAL
            </motion.h1>
            
            <motion.div 
              className="text-xl sm:text-2xl text-blue-400 font-mono mb-6 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              MARKET INTELLIGENCE STATION
            </motion.div>
            
            <motion.p 
              className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Market intelligence from the edge of the internet. Capturing social, behavioral, and transactional signals 
              to generate real-time market insights and algorithmic trading opportunities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <Link 
                to="/codelab" 
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  ACCESS SIGNAL FEED
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link 
                to="/products" 
                className="group bg-black/40 backdrop-blur-md border border-blue-500/50 text-white hover:bg-blue-500/10 hover:border-blue-400 font-medium py-4 px-8 rounded-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  EXPLORE FLEET
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
          
          {/* Signal Status Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-blue-400 font-semibold mb-2">Signal Array</h3>
              <p className="text-2xl font-bold text-white">ACTIVE</p>
              <p className="text-sm text-slate-400">All receivers online</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-cyan-400 font-semibold mb-2">Data Stream</h3>
              <p className="text-2xl font-bold text-white">FLOWING</p>
              <p className="text-sm text-slate-400">Real-time processing</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-slate-500/30 rounded-lg p-6">
              <h3 className="text-slate-400 font-semibold mb-2">Mission Time</h3>
              <p className="text-2xl font-bold text-white">{missionTime.toLocaleTimeString()}</p>
              <p className="text-sm text-slate-400">UTC Signal Time</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-lg p-6">
              <h3 className="text-indigo-400 font-semibold mb-2">Market Pulse</h3>
              <p className="text-2xl font-bold text-white">STRONG</p>
              <p className="text-sm text-slate-400">High signal clarity</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Signal Capabilities */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Signal Intelligence Capabilities
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            Advanced market intelligence from hidden patterns and edge signals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signalCapabilities.map((capability, index) => (
              <motion.div
                key={capability.id}
                className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                    {capability.id}
                  </span>
                  <span className={`text-xs font-mono ${getStatusColor(capability.status)}`}>
                    {capability.status}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{capability.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{capability.name}</h3>
                </div>
                <p className="text-slate-300 mb-4">{capability.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{capability.classification}</span>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Market Intelligence Metrics */}
        <motion.div 
          className="container mx-auto px-6 py-20 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400"></div>
                <span className="text-blue-400 font-mono text-sm tracking-wider">INTEL-METRICS-BETA</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Market Intelligence Metrics
            </motion.h2>
            
            <motion.p 
              className="text-lg text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Real-time performance indicators and market sentiment analysis from our signal processing network
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                className="group bg-black/60 backdrop-blur-md border border-blue-400/20 hover:border-blue-400/50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Metric Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>

                {/* Metric Value */}
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {metric.value}
                  </span>
                  <span className="text-blue-400 ml-1">{metric.unit}</span>
            </div>

                {/* Metric Label */}
                <h3 className="text-lg font-semibold text-slate-300 mb-2 group-hover:text-white transition-colors duration-300">
                  {metric.label}
                </h3>

                {/* Status Indicator */}
                <div className="flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)} animate-pulse`} />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {metric.status}
                  </span>
                  </div>

                {/* Trend Indicator */}
                <div className="mt-3 text-xs font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                  {metric.trend}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Real-time Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 bg-black/40 backdrop-blur-md border border-blue-400/30 rounded-lg p-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-400 font-mono text-sm">LIVE SIGNAL PROCESSING</span>
              </div>
              <div className="text-slate-300 font-mono text-sm">
                Last Update: {missionTime.toUTCString().slice(17, 25)} UTC
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Network Status:</span>
                <span className="text-green-400 font-mono text-xs">OPTIMAL</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Signal Sources */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Multi-Platform Signal Sources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Social Signals</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">📱</span>
                    Discord community sentiment analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">🐦</span>
                    X (Twitter) trend detection and influence mapping
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">💬</span>
                    Real-time conversation pattern recognition
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Behavioral Signals</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">👥</span>
                    User engagement pattern analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">📈</span>
                    Activity spike detection and correlation
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">🔄</span>
                    Cross-platform behavior synthesis
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-400 mb-4">Transactional Signals</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">💰</span>
                    Wallet activity and transaction patterns
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">🔗</span>
                    Web3 protocol interaction tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">📊</span>
                    Market movement correlation analysis
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* LEGIT Protocol Integration */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-indigo-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              LEGIT Signal Protocol
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">Ethical Data Collection</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🛡️</span>
                    Privacy-preserving signal aggregation
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">🔒</span>
                    Anonymized pattern recognition
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">⚖️</span>
                    Transparent data usage policies
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Intelligent Processing</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">🧠</span>
                    AI-powered signal validation and filtering
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">📡</span>
                    Real-time noise reduction algorithms
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 mr-2">🎯</span>
                    Confidence scoring for all predictions
                  </li>
                </ul>
          </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* <Footer /> */}
      <ScrollToTop />
    </div>
  );
};

export default MoonSignalPage; 