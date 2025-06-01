import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
// LEGACY: import NavBar from '../components/NavBar';
import Footer from '../components/Footer_legacy';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import { IMAGES } from '../utils/assets';

export default function About() {
  const [activeSection, setActiveSection] = useState(null);
  const [missionTime, setMissionTime] = useState('');
  const [selectedCrewMember, setSelectedCrewMember] = useState(null);

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

  const missionStats = [
    { label: 'Mission Duration', value: '2+ Years', status: 'ACTIVE' },
    { label: 'Projects Deployed', value: '50+', status: 'OPERATIONAL' },
    { label: 'Technologies Mastered', value: '25+', status: 'EXPANDING' },
    { label: 'Client Satisfaction', value: '100%', status: 'OPTIMAL' }
  ];

  const crewMembers = [
    {
      id: 'commander',
      name: 'Mission Commander',
      role: 'Full-Stack Engineer',
      specialization: 'System Architecture & Strategy',
      status: 'ACTIVE',
      coordinates: 'CMD-001',
      bio: 'Leading the mission with expertise in modern web technologies, system design, and strategic project planning.',
      skills: ['React/Next.js', 'Node.js', 'System Design', 'DevOps', 'AI Integration'],
      avatar: '👨‍🚀'
    },
    {
      id: 'engineer',
      name: 'Chief Engineer',
      role: 'Frontend Specialist',
      specialization: 'UI/UX & Performance',
      status: 'OPERATIONAL',
      coordinates: 'ENG-002',
      bio: 'Crafting exceptional user experiences with cutting-edge frontend technologies and performance optimization.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Performance Optimization'],
      avatar: '👩‍💻'
    },
    {
      id: 'analyst',
      name: 'Data Analyst',
      role: 'Backend Specialist',
      specialization: 'Data & Infrastructure',
      status: 'MONITORING',
      coordinates: 'ANA-003',
      bio: 'Ensuring robust backend systems and data integrity for mission-critical applications.',
      skills: ['Python', 'PostgreSQL', 'API Design', 'Cloud Infrastructure', 'Data Analytics'],
      avatar: '👨‍🔬'
    }
  ];

  const missionValues = [
    {
      title: 'Innovation First',
      description: 'Pushing boundaries with cutting-edge technologies and creative solutions.',
      icon: '🚀',
      status: 'CORE'
    },
    {
      title: 'Quality Assurance',
      description: 'Delivering excellence through rigorous testing and attention to detail.',
      icon: '🎯',
      status: 'PRIORITY'
    },
    {
      title: 'Client Partnership',
      description: 'Building lasting relationships through transparent communication and collaboration.',
      icon: '🤝',
      status: 'ESSENTIAL'
    },
    {
      title: 'Continuous Learning',
      description: 'Staying ahead of the curve with ongoing skill development and adaptation.',
      icon: '📚',
      status: 'ONGOING'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'text-lime-400';
      case 'OPERATIONAL': return 'text-blue-400';
      case 'MONITORING': return 'text-yellow-400';
      case 'EXPANDING': return 'text-purple-400';
      case 'OPTIMAL': return 'text-emerald-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Crew Manifest - About CuriousLabs</title>
        <meta name="description" content="Meet the CuriousLabs crew - a dedicated team of engineers and innovators building the future of web technology." />
        <meta property="og:title" content="CuriousLabs Crew Manifest" />
        <meta property="og:description" content="Meet the CuriousLabs crew - a dedicated team of engineers and innovators building the future of web technology." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/about" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '30%',
          left: '10%',
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
                Crew <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">Manifest</span>
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 w-32 mx-auto"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-space text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
            >
              Meet the dedicated crew behind CuriousLabs - engineers and innovators building the future of web technology.
            </motion.p>
          </div>

          {/* Mission Status Panel */}
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
                  <span className="font-mono text-lime-400 text-sm tracking-wider font-semibold">MISSION STATUS</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">MISSION TIME:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">{missionTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                    <span className="text-xs font-mono text-white/70">STATUS:</span>
                    <span className="text-xs font-mono text-lime-400 font-semibold">OPERATIONAL</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {missionStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="group cursor-pointer p-4 rounded-lg bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/70 mb-2">{stat.label}</div>
                      <div className="flex items-center justify-center space-x-1">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          stat.status === 'ACTIVE' ? 'bg-lime-400' :
                          stat.status === 'OPERATIONAL' ? 'bg-blue-400' :
                          stat.status === 'EXPANDING' ? 'bg-purple-400' : 'bg-emerald-400'
                        }`}></div>
                        <span className={`text-xs font-mono tracking-wider ${getStatusColor(stat.status)}`}>
                          {stat.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Crew Members Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-space text-3xl font-bold text-white mb-4">
                Mission <span className="text-lime-400">Crew</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our specialized team brings together diverse expertise to deliver exceptional results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {crewMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setSelectedCrewMember(member.id)}
                  onMouseLeave={() => setSelectedCrewMember(null)}
                >
                  <div className={`backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl p-6 transition-all duration-500 h-full ${
                    selectedCrewMember === member.id ? 'border-lime-400/50 bg-black/50' : 'hover:border-lime-400/30 hover:bg-black/40'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{member.avatar}</div>
                      <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                        {member.coordinates}
                      </div>
                    </div>
                    
                    <h3 className="font-space text-xl font-semibold text-white mb-1 group-hover:text-lime-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    
                    <div className="text-white/80 font-medium mb-2">{member.role}</div>
                    <div className="text-white/60 text-sm mb-3">{member.specialization}</div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        member.status === 'ACTIVE' ? 'bg-lime-400' :
                        member.status === 'OPERATIONAL' ? 'bg-blue-400' : 'bg-yellow-400'
                      }`}></div>
                      <span className={`text-xs font-mono tracking-wider ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-white/50 uppercase tracking-wider">Specializations</div>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs bg-lime-400/10 text-lime-400 rounded border border-lime-400/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="font-space text-3xl font-bold text-white mb-4">
                Mission <span className="text-lime-400">Values</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                The core principles that guide our mission and define our approach to every project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {missionValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveSection(value.title)}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div className={`backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl p-6 transition-all duration-500 h-full ${
                    activeSection === value.title ? 'border-lime-400/50 bg-black/50' : 'hover:border-lime-400/30 hover:bg-black/40'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl flex-shrink-0">{value.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-space text-lg font-semibold text-white group-hover:text-lime-400 transition-colors duration-300">
                            {value.title}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-mono text-lime-400 tracking-wider">
                              {value.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/70 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-8 shadow-2xl shadow-black/60">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-lime-400/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h2 className="font-space text-2xl font-bold text-white mb-6">
                  Mission <span className="text-lime-400">Statement</span>
                </h2>
                
                <p className="text-white/85 text-lg leading-relaxed mb-6">
                  At CuriousLabs, we're on a mission to push the boundaries of web technology. 
                  We combine cutting-edge innovation with meticulous craftsmanship to deliver 
                  digital experiences that not only meet today's needs but anticipate tomorrow's possibilities.
                </p>
                
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                    <span className="text-white/70">Est. 2022</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white/70">Phnom Penh, Cambodia</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-white/70">Global Reach</span>
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