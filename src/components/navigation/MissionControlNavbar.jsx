import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../../utils/assets';

/**
 * MissionControlNavbar - Standalone Mission Control themed navigation bar
 * Extracted from HeroAtomic.jsx and made into a reusable component
 * 
 * Features:
 * - Hidden navbar with angled design
 * - Hover to expand functionality
 * - Black glassmorphism styling
 * - Mission control theme with status indicators
 * - Full routing support
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.alwaysExpanded - If true, navbar is always fully visible
 * @param {string} props.position - Position: 'fixed' (default) or 'relative'
 */
const MissionControlNavbar = ({ 
  className = '', 
  alwaysExpanded = false, 
  position = 'fixed' 
}) => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(alwaysExpanded);
  const [activeSection, setActiveSection] = useState(null);
  const [utcTime, setUtcTime] = useState('');
  const [systemStatus] = useState('OPERATIONAL');
  const [isCommandPanelOpen, setIsCommandPanelOpen] = useState(false);

  // Navigation sections with correct routing
  const navigationSections = [
    {
      id: 'command',
      label: 'Command Center',
      icon: '🎯',
      description: 'Primary mission control interface for all CuriousLabs operations and system oversight.',
      coordinates: 'CTRL-001',
      status: 'ACTIVE',
      original: 'Home',
      route: '/'
    },
    {
      id: 'engineering',
      label: 'Engineering Bay',
      icon: '⚡',
      description: 'Advanced development laboratories and experimental technology research facilities.',
      coordinates: 'ENG-002',
      status: 'ACTIVE',
      original: 'CodeLab',
      route: '/codelab'
    },
    {
      id: 'arsenal',
      label: 'Fleet Arsenal',
      icon: '🚀',
      description: 'Comprehensive catalog of deployed systems, tools, and technological solutions.',
      coordinates: 'ARS-003',
      status: 'ACTIVE',
      original: 'Products',
      route: '/products'
    },
    {
      id: 'instruments',
      label: 'Instruments',
      icon: '🔧',
      description: 'Specialized utility systems and diagnostic tools for mission support operations.',
      coordinates: 'INST-004',
      status: 'STANDBY',
      original: 'Tools',
      route: '/tools'
    },
    {
      id: 'transmissions',
      label: 'Transmissions',
      icon: '📡',
      description: 'Communication logs, mission reports, and knowledge base documentation.',
      coordinates: 'COMM-005',
      status: 'ACTIVE',
      original: 'Blog',
      route: '/blog'
    },
    {
      id: 'crew',
      label: 'Crew Manifest',
      icon: '👥',
      description: 'Personnel records, mission history, and organizational structure information.',
      coordinates: 'CREW-006',
      status: 'ACTIVE',
      original: 'About',
      route: '/about'
    },
    {
      id: 'deepspace',
      label: 'Deep Space Comm',
      icon: '🌌',
      description: 'External communication systems and mission coordination protocols.',
      coordinates: 'DSC-007',
      status: 'STANDBY',
      original: 'Contact',
      route: '/contact'
    }
  ];

  // UTC Time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Status indicator animation variants
  const statusIndicatorVariants = {
    operational: {
      backgroundColor: ['#84cc16', '#65a30d', '#84cc16'],
      transition: { duration: 2, repeat: Infinity }
    },
    warning: {
      backgroundColor: ['#eab308', '#ca8a04', '#eab308'],
      transition: { duration: 1.5, repeat: Infinity }
    },
    critical: {
      backgroundColor: ['#ef4444', '#dc2626', '#ef4444'],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  // Handle navbar expansion
  useEffect(() => {
    if (alwaysExpanded) {
      setIsNavbarExpanded(true);
    }
  }, [alwaysExpanded]);

  const navbarClasses = `${position} top-0 left-0 right-0 z-50 ${className}`;

  return (
    <nav className={navbarClasses}>
      {/* Hidden Navbar with Angled Design */}
      <motion.div 
        className="relative"
        onMouseEnter={() => !alwaysExpanded && setIsNavbarExpanded(true)}
        onMouseLeave={() => !alwaysExpanded && setIsNavbarExpanded(false)}
      >
        {/* Visible Left Section with Angled Line */}
        {!alwaysExpanded && (
          <div className="absolute top-0 left-0 z-10">
            <div 
              className="backdrop-blur-2xl bg-gradient-to-r from-black/70 via-black/80 to-transparent border-b border-lime-400/20 shadow-2xl shadow-black/50"
              style={{
                clipPath: 'polygon(0 0, 300px 0, 350px 100%, 0 100%)',
                width: '350px',
                height: '56px'
              }}
            >
              <div className="flex items-center h-14 px-6">
                {/* CuriousLabs Logo & Status */}
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* CuriousLabs Logo */}
                    <div className="flex items-center space-x-2">
                      <img 
                        src={IMAGES.LOGO} 
                        alt="CuriousLabs" 
                        className="h-6 w-auto object-contain"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))' }}
                      />
                      <div>
                        <div className="text-lime-400 font-bold text-sm tracking-wide">CuriousLabs</div>
                        <div className="text-xs font-mono text-white/60 tracking-wider">MISSION CONTROL</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* System Status Indicator */}
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40 backdrop-blur-sm">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full"
                      variants={statusIndicatorVariants}
                      animate="operational"
                    />
                    <span className="text-xs font-mono text-lime-400 tracking-wider font-semibold">
                      {systemStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Navbar - Revealed on Hover or Always Expanded */}
        <motion.div
          initial={{ opacity: alwaysExpanded ? 1 : 0, x: alwaysExpanded ? 0 : -100 }}
          animate={{ 
            opacity: isNavbarExpanded ? 1 : 0,
            x: isNavbarExpanded ? 0 : -100
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="backdrop-blur-2xl bg-gradient-to-r from-black/70 via-black/80 to-black/70 border-b border-lime-400/20 shadow-2xl shadow-black/50"
        >
          <div className="max-w-full mx-auto px-8">
            <div className="flex items-center justify-between h-14">
              
              {/* CuriousLabs Logo & Branding - Left Side */}
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* CuriousLabs Logo */}
                  <div className="flex items-center space-x-2">
                    <img 
                      src={IMAGES.LOGO} 
                      alt="CuriousLabs" 
                      className="h-6 w-auto object-contain"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(132, 204, 22, 0.4))' }}
                    />
                    <div>
                      <div className="text-lime-400 font-bold text-sm tracking-wide">CuriousLabs</div>
                      <div className="text-xs font-mono text-white/60 tracking-wider">MISSION CONTROL</div>
                    </div>
                  </div>
                </motion.div>

                {/* System Status Indicator */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40 backdrop-blur-sm">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    variants={statusIndicatorVariants}
                    animate="operational"
                  />
                  <span className="text-xs font-mono text-lime-400 tracking-wider font-semibold">
                    {systemStatus}
                  </span>
                </div>
              </div>

              {/* Navigation Sections - Full Width Distribution */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center space-x-8">
                  {navigationSections.map((section) => (
                    <motion.div
                      key={section.id}
                      className="relative group"
                      onMouseEnter={() => setActiveSection(section.id)}
                      onMouseLeave={() => setActiveSection(null)}
                      whileHover={{ y: -1 }}
                    >
                      <a
                        href={section.route}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 backdrop-blur-sm ${
                          activeSection === section.id
                            ? 'bg-lime-400/20 text-lime-400 border border-lime-400/50 shadow-lg shadow-lime-400/20'
                            : 'text-white/80 hover:text-white hover:bg-black/30 border border-transparent hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs">{section.icon}</span>
                          <span className="font-mono tracking-wide">{section.label}</span>
                        </div>
                      </a>

                      {/* Fixed Hover Panel - Black Glassmorphism */}
                      <AnimatePresence>
                        {activeSection === section.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-4 rounded-xl backdrop-blur-2xl bg-black/90 border border-lime-400/30 shadow-2xl shadow-black/60"
                            style={{ zIndex: 60 }}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-lime-400 font-bold text-sm">{section.label}</div>
                                <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-0.5 rounded">{section.coordinates}</div>
                              </div>
                              
                              <div className="text-white/90 text-xs leading-relaxed">{section.description}</div>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-white/15">
                                <div className="text-xs font-mono text-white/70">
                                  ORIG: <span className="text-lime-400">{section.original}</span>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                  <div 
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      section.status === 'ACTIVE' ? 'bg-lime-400 animate-pulse' : 
                                      section.status === 'STANDBY' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                                    }`}
                                  />
                                  <span className="text-xs font-mono text-white/70">{section.status}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* UTC Time & Command Panel - Right Side */}
              <div className="flex items-center space-x-3">
                {/* UTC Timer */}
                <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-black/60 border border-white/15 backdrop-blur-sm">
                  <div className="text-xs font-mono text-white/70">UTC</div>
                  <div className="font-mono text-xs text-lime-400 tracking-wider font-semibold">{utcTime}</div>
                </div>

                {/* Emergency Command Panel */}
                <motion.button
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 font-mono text-xs tracking-wider hover:bg-red-500/30 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-red-500/15"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCommandPanelOpen(!isCommandPanelOpen)}
                >
                  🚨 EMERGENCY
                </motion.button>

                {/* Mobile Menu Button */}
                <button className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-black/30 border border-transparent hover:border-white/15 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Emergency Command Panel Modal */}
      <AnimatePresence>
        {isCommandPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsCommandPanelOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/90 border border-red-500/50 rounded-xl p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-4">
                <div className="text-red-400 text-lg font-bold">🚨 EMERGENCY PROTOCOLS</div>
                <div className="text-white/80 text-sm">
                  Emergency command panel activated. All systems standing by for immediate response.
                </div>
                <button
                  onClick={() => setIsCommandPanelOpen(false)}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default MissionControlNavbar; 