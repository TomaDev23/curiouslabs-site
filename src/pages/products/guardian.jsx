import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import MissionControlNavbar from '../../components/navigation/MissionControlNavbar';
import BackgroundLayerAtomic from '../../components/atomic/BackgroundLayerAtomic';
import { Link } from 'react-router-dom';
// import Footer from '../../components/Footer_legacy';
import { IMAGES } from '../../utils/assets';
import ScrollToTop from '../../components/ScrollToTop';
import { Helmet } from 'react-helmet-async';

const GuardianPage = () => {
  const [missionTime, setMissionTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'OPERATIONAL': 'text-green-400',
      'ACTIVE': 'text-lime-400', 
      'MONITORING': 'text-yellow-400',
      'STANDBY': 'text-orange-400',
      'RESEARCH': 'text-emerald-400'
    };
    return colors[status] || 'text-slate-400';
  };

  const guardianFeatures = [
    {
      id: 'GRD-001',
      name: 'Safe Learning Space',
      description: 'Kid-friendly conversations with built-in safety filters',
      status: 'OPERATIONAL',
      classification: 'TIER-1',
      icon: '🛡️'
    },
    {
      id: 'GRD-002', 
      name: 'Homework Helper',
      description: 'Guides learning without giving direct answers',
      status: 'ACTIVE',
      classification: 'TIER-1',
      icon: '📚'
    },
    {
      id: 'GRD-003',
      name: 'Creative Playground',
      description: 'Story creation, art ideas, and imagination games',
      status: 'OPERATIONAL',
      classification: 'TIER-2',
      icon: '🎨'
    },
    {
      id: 'GRD-004',
      name: 'Parent Dashboard',
      description: 'Monitor conversations and set learning goals',
      status: 'MONITORING',
      classification: 'TIER-2',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 'GRD-005',
      name: 'Emotional Support',
      description: 'Gentle guidance for feelings and social situations',
      status: 'ACTIVE',
      classification: 'TIER-3',
      icon: '💚'
    },
    {
      id: 'GRD-006',
      name: 'Learning Progress',
      description: 'Track growth and celebrate achievements',
      status: 'OPERATIONAL',
      classification: 'TIER-1',
      icon: '🌟'
    }
  ];

  const familyStats = [
    { 
      label: 'Safety Score', 
      value: '100', 
      unit: '%', 
      icon: '🛡️',
      description: 'protected'
    },
    { 
      label: 'Learning Fun', 
      value: '98', 
      unit: '%', 
      icon: '📚',
      description: 'engagement'
    },
    { 
      label: 'Parent Peace', 
      value: '96', 
      unit: '%', 
      icon: '💚',
      description: 'of mind'
    },
    { 
      label: 'Kid Smiles', 
      value: '∞', 
      unit: '', 
      icon: '😊',
      description: 'daily'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Helmet>
        <title>Guardian - Child Protection | CuriousLabs</title>
        <meta name="description" content="Guardian is an AI-powered protector designed to guide children toward healthy digital habits, filtering harmful content and promoting learning." />
        <meta property="og:title" content="Guardian - Child Protection | CuriousLabs" />
        <meta property="og:description" content="Guardian is an AI-powered protector designed to guide children toward healthy digital habits, filtering harmful content and promoting learning." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://curiouslabs.io/products/guardian" />
      </Helmet>
      
      <BackgroundLayerAtomic />
      {/* <MissionControlNavbar /> */}
      
      {/* Mission Status Panel */}
      <motion.div 
        className="fixed top-20 right-4 z-50 bg-black/80 backdrop-blur-md border border-green-400/30 rounded-lg p-3 text-xs font-mono"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-green-400 mb-1">GUARDIAN STATUS</div>
        <div className="text-white">{missionTime.toUTCString().slice(17, 25)} UTC</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400">PROTECTION ACTIVE</span>
              </div>
        <div className="text-xs text-slate-400 mt-1">COORD: FAMILY-SAFE</div>
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
            <motion.div
              className="inline-block mb-6"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="/assets/images/general/Page_Logos/Guardian_logo.webp" 
                alt="Guardian AI Station" 
                className="w-32 h-32 mx-auto"
              />
            </motion.div>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Guardian AI Station
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Your family's safe AI companion for learning, creativity, and growth. 
              Designed with kids in mind and parents in control.
            </p>
          </div>
          
          {/* Family Status Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-2">Safety Shield</h3>
              <p className="text-2xl font-bold text-white">ACTIVE</p>
              <p className="text-sm text-slate-400">All systems protected</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/30 rounded-lg p-6">
              <h3 className="text-lime-400 font-semibold mb-2">Learning Mode</h3>
              <p className="text-2xl font-bold text-white">FUN</p>
              <p className="text-sm text-slate-400">Discovery enabled</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-yellow-400 font-semibold mb-2">Family Time</h3>
              <p className="text-2xl font-bold text-white">{missionTime.toLocaleTimeString()}</p>
              <p className="text-sm text-slate-400">UTC Mission Time</p>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-orange-400 font-semibold mb-2">Parent Control</h3>
              <p className="text-2xl font-bold text-white">ENABLED</p>
              <p className="text-sm text-slate-400">Full oversight</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Guardian Features */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Family-Safe Features
          </h2>
          <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
            AI designed for curious kids and peace-of-mind parents
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guardianFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-lg p-6 hover:border-lime-400/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    {feature.id}
                  </span>
                  <span className={`text-xs font-mono ${getStatusColor(feature.status)}`}>
                    {feature.status}
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                </div>
                <p className="text-slate-300 mb-4">{feature.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">{feature.classification}</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Family Statistics */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Happy Family Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-black/40 backdrop-blur-md border border-lime-500/30 rounded-lg p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-lime-400 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-slate-400">{stat.unit}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Parent Controls */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-green-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Parent Control Center
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-semibold text-green-400 mb-4">Safety First</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">🛡️</span>
                    Advanced content filtering for age-appropriate responses
                  </li>
                  <li className="flex items-start">
                    <span className="text-lime-400 mr-2">👀</span>
                    Full conversation monitoring and review capabilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">⏰</span>
                    Customizable time limits and usage schedules
                  </li>
                </ul>
            </div>
              <div>
                <h3 className="text-xl font-semibold text-lime-400 mb-4">Learning Goals</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">📊</span>
                    Track learning progress and skill development
                  </li>
                  <li className="flex items-start">
                    <span className="text-lime-400 mr-2">🎯</span>
                    Set educational objectives and milestones
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">🏆</span>
                    Celebrate achievements with family rewards
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* LEGIT Protocol for Families */}
        <motion.section 
          className="container mx-auto px-6 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/40 backdrop-blur-md border border-yellow-500/30 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              LEGIT Family Protocol
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-green-400 mb-3">Learning</h3>
                <p className="text-slate-300">Encouraging curiosity while maintaining educational value</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-lime-400 mb-3">Ethics</h3>
                <p className="text-slate-300">Teaching good values and respectful communication</p>
              </div>
              <div className="text-center">
                <motion.div
                  className="mb-4"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="/assets/images/general/Page_Logos/Guardian_logo.webp" 
                    alt="Guardian" 
                    className="w-16 h-16 mx-auto"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-3">Guardian</h3>
                <p className="text-slate-300">Protecting childhood while fostering growth</p>
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

export default GuardianPage; 