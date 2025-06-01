import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import Footer from '../components/Footer_legacy';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import { IMAGES } from '../utils/assets';

export default function Contact() {
  const [activeSection, setActiveSection] = useState(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [utcTime, setUtcTime] = useState('');

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

  const contactMethods = [
    {
      id: 'email',
      title: 'Direct Communication',
      icon: '📡',
      primary: 'contact@curiouslabs.kh',
      secondary: 'Primary communication channel',
      status: 'ACTIVE',
      coordinates: 'COMM-001',
      description: 'Secure email communication for mission briefings and project coordination.'
    },
    {
      id: 'location',
      title: 'Mission Control HQ',
      icon: '🌍',
      primary: 'Phnom Penh, Cambodia',
      secondary: 'Southeast Asia Operations',
      status: 'OPERATIONAL',
      coordinates: 'LOC-002',
      description: 'Our primary command center located in the heart of Southeast Asia.'
    },
    {
      id: 'hours',
      title: 'Operational Window',
      icon: '⏰',
      primary: 'Monday - Friday: 9AM - 6PM',
      secondary: 'ICT (UTC+7)',
      status: 'ACTIVE',
      coordinates: 'TIME-003',
      description: 'Standard operational hours for real-time communication and support.'
    }
  ];

  const emergencyChannels = [
    { name: 'Priority Support', icon: '🚨', status: 'STANDBY' },
    { name: 'Technical Emergency', icon: '⚡', status: 'ACTIVE' },
    { name: 'Security Incident', icon: '🛡️', status: 'MONITORING' }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Deep Space Comm - Contact CuriousLabs</title>
        <meta name="description" content="Establish communication with CuriousLabs mission control. Reach out for project coordination and technical support." />
        <meta property="og:title" content="CuriousLabs Deep Space Communication" />
        <meta property="og:description" content="Establish communication with CuriousLabs mission control. Reach out for project coordination and technical support." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/contact" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '40%',
          right: '20%',
          transform: 'translate(50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(132,204,22,0.03) 0%, transparent 70%)'
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
                Deep Space <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">Communication</span>
          </h1>
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 w-32 mx-auto"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-space text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
            >
              Establish communication with CuriousLabs mission control for project coordination and technical support.
            </motion.p>
          </div>

          {/* Communication Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-lime-400 text-sm tracking-wider font-semibold">COMMUNICATION STATUS</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">UTC:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">{utcTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">CHANNELS:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">OPEN</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {emergencyChannels.map((channel, index) => (
                  <motion.div
                    key={channel.name}
                    className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{channel.icon}</span>
                        <span className="font-space text-sm text-white font-medium">{channel.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          channel.status === 'ACTIVE' ? 'bg-lime-400' :
                          channel.status === 'STANDBY' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}></div>
                        <span className={`text-xs font-mono tracking-wider ${
                          channel.status === 'ACTIVE' ? 'text-lime-400' :
                          channel.status === 'STANDBY' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {channel.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group cursor-pointer"
                onMouseEnter={() => setActiveSection(method.id)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div className={`backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl p-6 transition-all duration-500 h-full ${
                  activeSection === method.id ? 'border-lime-400/50 bg-black/50' : 'hover:border-lime-400/30 hover:bg-black/40'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{method.icon}</div>
                    <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                      {method.coordinates}
                    </div>
                  </div>
                  
                  <h3 className="font-space text-xl font-semibold text-white mb-2 group-hover:text-lime-400 transition-colors duration-300">
                    {method.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      method.status === 'ACTIVE' ? 'bg-lime-400' : 'bg-yellow-400'
                    }`}></div>
                    <span className={`text-xs font-mono tracking-wider ${
                      method.status === 'ACTIVE' ? 'text-lime-400' : 'text-yellow-400'
                    }`}>
                      {method.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-white font-medium mb-1">{method.primary}</div>
                    <div className="text-white/60 text-sm">{method.secondary}</div>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Communication Form Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
              <div className="text-center mb-8">
                <h2 className="font-space text-2xl font-bold text-white mb-4">
                  Transmission <span className="text-lime-400">Interface</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                  Our secure communication interface is currently being calibrated. 
                  For immediate contact, please use direct email communication.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-medium text-white mb-1">Primary Channel</h3>
                      <p className="text-lime-400 font-mono">contact@curiouslabs.kh</p>
                      <p className="text-white/60 text-sm mt-1">Secure email communication</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-medium text-white mb-1">Command Center</h3>
                      <p className="text-white/70">Phnom Penh, Cambodia</p>
                      <p className="text-white/60 text-sm mt-1">Southeast Asia Operations</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                      <h3 className="text-lg font-medium text-white mb-1">Response Time</h3>
                      <p className="text-white/70">24-48 hours</p>
                      <p className="text-white/60 text-sm mt-1">Standard mission response window</p>
                    </div>
                  </div>
                </div>
                
                {/* Form Status */}
                <div className="flex items-center justify-center">
                  <div className="text-center p-8 rounded-xl bg-black/30 border border-lime-400/20">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-lime-400/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
            </div>
            
                    <h3 className="font-space text-lg font-bold text-white mb-2">
                      Interface <span className="text-yellow-400">Calibrating</span>
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4">
                      Secure transmission form is being initialized. 
                      Please use email for immediate contact.
                    </p>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-yellow-400 tracking-wider">INITIALIZING</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 