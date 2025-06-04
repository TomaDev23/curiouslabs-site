import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';

export default function Museum() {
  const museumPieces = [
    {
      title: "Home V5 - Atomic Legacy",
      route: "/home-v5",
      description: "The most important museum piece - atomic design system foundation",
      importance: "CRITICAL",
      date: "v5.0 Era",
      status: "PRESERVED",
      coordinates: "MSM-001",
      icon: "⚛️"
    },
    {
      title: "Dev V4 Cosmic Experience", 
      route: "/dev-v4-cosmic",
      description: "Original cosmic homepage - evolved into current production site",
      importance: "HIGH",
      date: "v4.0 Era",
      status: "PRESERVED", 
      coordinates: "MSM-002",
      icon: "🌌"
    },
    {
      title: "Legacy 3D Solar System",
      route: "/legacy",
      description: "Original Three.js solar system - where it all began",
      importance: "HISTORICAL",
      date: "v1.0 Era", 
      status: "PRESERVED",
      coordinates: "MSM-003",
      icon: "🪐"
    }
  ];

  const devArchives = [
    {
      title: "V6 Homepage Evolution",
      route: "/v6",
      description: "V6 development iteration",
      type: "VERSION_TEST"
    },
    {
      title: "V6 Products Development",
      route: "/v6-products",
      description: "Product page development iterations",
      type: "VERSION_TEST"
    },
    {
      title: "V6 Products V2",
      route: "/v6-products2", 
      description: "Second iteration of product pages",
      type: "VERSION_TEST"
    },
    {
      title: "Background Systems Sandbox",
      route: "/background-sandbox",
      description: "Background rendering system development",
      type: "DEVELOPMENT"
    },
    {
      title: "Background Final Version",
      route: "/background-final",
      description: "Final background system implementation",
      type: "DEVELOPMENT"
    },
    {
      title: "Process Comparison Study",
      route: "/process-comparison",
      description: "Development methodology comparison",
      type: "RESEARCH"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-['Space_Grotesk']">
      <Helmet>
        <title>Code Museum - Development History | CuriousLabs</title>
        <meta name="description" content="Explore the evolution of CuriousLabs through preserved versions of our website - a living museum of web development." />
        <meta property="og:title" content="CuriousLabs Code Museum - Development Journey" />
        <meta property="og:description" content="Explore the evolution of CuriousLabs through preserved versions of our website - a living museum of web development." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/museum" />
      </Helmet>
      
      <BackgroundLayerAtomic />
      
      {/* Atmospheric Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <MissionControlNavbar />
      
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative z-10">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400"></div>
              <span className="text-purple-400 font-mono text-sm tracking-wider">MSM-ARCHIVE-001</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                CODE MUSEUM
              </span>
            </h1>
            
            <div className="text-xl sm:text-2xl text-purple-400 font-mono mb-4 tracking-wide">
              DEVELOPMENT ARCHIVE
            </div>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Explore the evolution of CuriousLabs through preserved versions of our website. 
              Each piece represents a significant milestone in our development journey.
            </p>
          </motion.div>
        </section>

        {/* Museum Pieces Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              🏛️ Museum Collection
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
              Important historical versions preserved for posterity and learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {museumPieces.map((piece, index) => (
              <motion.div
                key={piece.coordinates}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <Link to={piece.route}>
                  <div className="bg-black/40 backdrop-blur-md border border-purple-400/20 rounded-2xl p-8 
                                 transition-all duration-300 hover:border-purple-400/50 hover:shadow-purple-400/20 
                                 shadow-2xl hover:scale-105 h-full flex flex-col">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-3xl">{piece.icon}</div>
                      <div className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                        {piece.coordinates}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-purple-400 transition-colors">
                      {piece.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                      {piece.description}
                    </p>

                    {/* Metadata */}
                    <div className="space-y-2 pt-4 border-t border-purple-400/20">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Era:</span>
                        <span className="text-purple-400 font-mono">{piece.date}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400 font-mono">{piece.status}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Importance:</span>
                        <span className={`font-mono ${
                          piece.importance === 'CRITICAL' ? 'text-red-400' :
                          piece.importance === 'HIGH' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {piece.importance}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Development Archives */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              🔬 Development Archives
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
              Development iterations and experimental features still accessible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devArchives.map((archive, index) => (
              <motion.div
                key={archive.route}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + 0.1 * index }}
                className="group"
              >
                <Link to={archive.route}>
                  <div className="bg-black/30 backdrop-blur-md border border-blue-400/20 rounded-lg p-6 
                                 transition-all duration-300 hover:border-blue-400/50 hover:bg-black/50 
                                 h-full flex flex-col">
                    
                    <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                      {archive.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                      {archive.description}
                    </p>

                    <div className="pt-3 border-t border-blue-400/20">
                      <span className={`text-xs font-mono px-2 py-1 rounded ${
                        archive.type === 'VERSION_TEST' ? 'bg-blue-400/10 text-blue-400' :
                        archive.type === 'DEVELOPMENT' ? 'bg-green-400/10 text-green-400' :
                        'bg-purple-400/10 text-purple-400'
                      }`}>
                        {archive.type}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Navigation Back */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 px-6 
                         rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Mission Control
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
} 