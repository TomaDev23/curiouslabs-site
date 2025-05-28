/**
 * @metadata
 * @component HorizontalProductScrollV6
 * @description Unified horizontal scroll section with AEGIS intro, Products carousel, and Services outro
 * @legit true
 * @version 2.0.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_horizontal_product_scroll_v6.md
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StellarMessageComponent } from '../StellarMessageGrok';

// Global animation delays - generated once and never change
const PERSISTENT_ANIMATION_DELAYS = {
  comet1: Math.random() * 3,
  comet2: Math.random() * 3 + 1.5,
  comet3: Math.random() * 3 + 2.8,
  dust1: Math.random() * 3 + 0.8,
  dust2: Math.random() * 3 + 1.2,
  dust3: Math.random() * 3 + 2.2,
  dust4: Math.random() * 3 + 3.5
};

/**
 * @component OurProducts_newV6
 * @description Enhanced product showcase with native Canvas ThoughtTrails
 * @version 6.1.0
 * @legit true
 */

const generateRandomDelay = () => Math.random() * 6 + 2.5;

// Product data for the carousel
const OPS_BENTO_ITEMS = [
  {
    id: 1,
    title: 'OpsPipe',
    summary: 'From paper mess to structured insight',
    features: [
      'Inventory tracking, financial logs, recipes',
      'Export-ready JSON, Markdown, and CLI pipelines', 
      'Validated by dual-agent parsing + audit system'
    ],
    tagline: 'Originally built inside our ghost kitchen',
    backContent: 'OpsPipe parses messy documents (like receipts, notes, PDFs) into structured data, metrics, and reports — delivered via Telegram, CLI, or API. Used in real kitchens. Ready for any ops mess.',
    fullDescription: {
      whatItIs: 'A battle-tested document parsing system with memory, fallback logic, agent routing, and full trace visibility.',
      howItWorks: [
        'Inventory tracking, financial logs, recipes',
        'Export-ready JSON, Markdown, and CLI pipelines',
        'Validated by dual-agent parsing + audit system'
      ],
      whyItMatters: 'Forget babysitting chatbots. OpsPipe turns messy operational data into a reliable work system — with repeatable results, auditable flows, and minimal chaos.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    accentColor: '#84cc16', // Lime
    theme: 'lime',
    bgGradient: 'from-lime-900/50 to-lime-700/30',
  },
  {
    id: 2,
    title: 'Curious',
    summary: 'Relational AI Presence',
    features: [
      'Synthetic memory that builds over time',
      'Personality tuning and tone presets',
      'Emotional mirroring + presence ("I\'m still here…")'
    ],
    tagline: 'AI that "knows you." Finally.',
    backContent: 'A responsive, emotionally aware AI designed for reflection, companionship, and creative thought. Think: memory-backed journaling, quiet presence, and personalized rituals — all in one living interface.',
    fullDescription: {
      whatItIs: 'A responsive, emotionally aware AI designed for reflection, companionship, and creative thought. Think: memory-backed journaling, quiet presence, and personalized rituals — all in one living interface.',
      howItWorks: [
        'Synthetic memory that builds over time',
        'Personality tuning and tone presets',
        'Emotional mirroring + presence ("I\'m still here…")',
        'Multimodal rituals: journaling, thought prompts, gratitude',
        'Session replay, mood history, and life event recall',
        'User voice, mood, and behavior adapted to context'
      ],
      whyItMatters: 'Most AI tools are transactional. Curious is relational. It doesn\'t just respond — it remembers, reflects, and returns. This is AI that sticks with you.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    accentColor: '#d946ef', // Magenta
    theme: 'magenta',
    bgGradient: 'from-purple-900/50 to-pink-700/30',
  },
  {
    id: 3,
    title: 'Guardian',
    summary: 'Creative AI for kids',
    features: [
      'Emotional presence with voice + micro-expressions',
      'Adaptive personas (playmate → study buddy → teen mentor)',
      'Curiosity quests, drawing games, music exploration'
    ],
    tagline: 'A digital companion for your child — built to care, not capture.',
    backContent: 'Guardian is a screen-based emotional companion designed for kids. It keeps them engaged with curiosity, creativity, and protection from toxic content — proving AEGIS can drive high-trust, emotionally nuanced, safety-critical AI.',
    fullDescription: {
      whatItIs: 'A screen-based emotional companion designed for kids — Guardian keeps them engaged with curiosity, creativity, and protection from toxic content.',
      howItWorks: [
        'Emotional presence with voice + micro-expressions',
        'Adaptive personas (playmate → study buddy → teen mentor)',
        'Curiosity quests, drawing games, music exploration',
        'Built-in content filters to steer away from junk media',
        'Parent dashboard for controls + insight',
        'Memory that grows with the child'
      ],
      whyItMatters: 'Today\'s screens are addictive — not supportive. Guardian offers an alternative: a digital friend that cares, guides, and encourages healthy screen time — not just grabs attention. Built on the AEGIS runtime with a specialized safe-mode persona engine.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    accentColor: '#f59e0b', // Amber
    theme: 'amber',
    bgGradient: 'from-amber-900/50 to-orange-700/30',
  },
  {
    id: 4,
    title: 'MoonSignal',
    summary: 'AI Trading Intelligence',
    features: [
      'Custom parser agents trained on market formats',
      'Trading state machine: setup → signal → fallback',
      'Daily summary reports with regime detection'
    ],
    tagline: 'Trade like you\'ve got a team.',
    backContent: 'A GPT-fused quant stack that analyzes price action, sentiment, and macro data — delivering signals to traders through CLI or Telegram. Think: a hedge fund brain in a small terminal.',
    fullDescription: {
      whatItIs: 'A GPT-fused quant stack that analyzes price action, sentiment, and macro data — delivering signals to traders through CLI or Telegram. Think: a hedge fund brain in a small terminal.',
      howItWorks: [
        'Custom parser agents trained on market formats',
        'Trading state machine: setup → signal → fallback',
        'Daily summary reports with regime detection',
        'Real-time alerts for scalping, swing, and momentum',
        'Backtestable YAML logic & test validation',
        'API + manual oversight fallback chain'
      ],
      whyItMatters: 'Most bots spit random indicators. MoonSignal outputs structured, state-driven signals backed by testable logic. No more black box — just raw edge.'
    },
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    accentColor: '#22d3ee', // Cyan
    theme: 'cyan',
    bgGradient: 'from-cyan-900/50 to-teal-700/30',
  },
];

// Animation variants for page transitions
const pageVariants = {
  initial: { x: '100vw', opacity: 0, scale: 0.9 },
  animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { x: '-100vw', opacity: 0, scale: 0.9, transition: { duration: 0.8, ease: 'easeIn' } },
};

// Text reveal animations
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.3, ease: 'easeOut' },
  }),
};

// Particle animation
const particleVariants = {
  animate: {
    y: [0, -10, 0],
    opacity: [0, 1, 0],
    transition: { duration: 2, repeat: Infinity, repeatDelay: Math.random() * 3 },
  },
};

// Shooting star animation
const shootingStarVariants = {
  animate: {
    x: ['100vw', '-100vw'],
    y: ['-10vh', '110vh'],
    opacity: [0, 1, 0],
    transition: { duration: 3, repeat: Infinity, repeatDelay: Math.random() * 10 + 5 },
  },
};

// Nebula animation
const nebulaVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' },
  active: { scale: 1.1, boxShadow: '0 0 30px rgba(255,255,255,0.5)' },
};

// Flip animation for cards
const flipVariants = {
  front: { rotateY: 0, transition: { duration: 0.4 } },
  back: { rotateY: 180, transition: { duration: 0.4 } },
};

// Reduced motion hook
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// AEGIS Page
const AegisPage = () => {
  // Add AegisCore component for the AEGIS visualization
  const AegisCore = () => {
    // Add state for data flow particles
    const [particles, setParticles] = useState([]);
    // Add state for orbital rotations
    const [rotations, setRotations] = useState([0, 0, 0]);
    // Add state for hover effects
    const [hoveredNode, setHoveredNode] = useState(null);
    // Add state for core pulse
    const [pulseWaves, setPulseWaves] = useState([]);
    
    // Generate new particles periodically
    useEffect(() => {
      // Generate initial particles
      const initialParticles = Array.from({ length: 12 }).map(() => createParticle());
      setParticles(initialParticles);
      
      // Add new particles periodically
      const interval = setInterval(() => {
        setParticles(prev => {
          // Remove old particles and add new ones
          const filtered = prev.filter(p => p.lifeTime > 0);
          return [
            ...filtered.map(p => ({
              ...p,
              progress: p.progress + p.speed,
              lifeTime: p.lifeTime - 1
            })),
            createParticle()
          ];
        });
      }, 200);
      
      return () => clearInterval(interval);
    }, []);
    
    // Animate orbital rings
    useEffect(() => {
      const interval = setInterval(() => {
        setRotations(prev => prev.map((r, i) => r + (i + 1) * 0.01));
      }, 10);
      
      return () => clearInterval(interval);
    }, []);
    
    // Generate pulse waves
    useEffect(() => {
      // Generate initial pulse waves
      const initialWaves = Array.from({ length: 3 }).map((_, i) => ({
        id: `initial-${i}`,
        scale: 0.1 + (i * 0.3),
        opacity: 0.8 - (i * 0.2),
      }));
      
      setPulseWaves(initialWaves);
      
      // Add new pulse waves periodically
      const interval = setInterval(() => {
        setPulseWaves(prev => {
          // Remove waves that have expanded beyond visibility
          const filtered = prev.filter(wave => wave.scale < 2.0);
          
          // Add a new wave if needed
          const needNewWave = filtered.every(wave => wave.scale > 0.5);
          
          return [
            ...filtered.map(wave => ({
              ...wave,
              scale: wave.scale + 0.01,
              opacity: Math.max(0, 0.8 - wave.scale * 0.4)
            })),
            ...(needNewWave ? [{ 
              id: `wave-${Date.now()}`, 
              scale: 0.1, 
              opacity: 0.8 
            }] : [])
          ];
        });
      }, 50);
      
      return () => clearInterval(interval);
    }, []);
    
    // Helper function to create a new particle
    function createParticle() {
      const orbitalRing = Math.floor(Math.random() * 3);
      const scale = [1.2, 1.4, 1.6][orbitalRing];
      const startAngle = Math.random() * 360;
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        ring: orbitalRing,
        scale,
        startAngle,
        progress: 0,
        speed: 0.01 + Math.random() * 0.02,
        color: Math.random() > 0.7 ? '#84cc16' : '#22d3ee',
        size: 1 + Math.random() * 2,
        lifeTime: 100 + Math.floor(Math.random() * 150)
      };
    }

    // Define product nodes with more detailed information
    const productNodes = [
      { angle: 0, color: '#84cc16', label: 'Core', description: 'The heart of the system, managing all operations.' },
      { angle: 90, color: '#2563eb', label: 'Ops', description: 'Handles document parsing, approval, and telemetry.' },
      { angle: 180, color: '#d946ef', label: 'Signal', description: 'Provides strategy modular blocks and chart-driven automation.' },
      { angle: 270, color: '#22d3ee', label: 'Guard', description: 'Emotional AI for children, promoting creativity and growth.' }
    ];

    return (
      <div className="relative w-80 h-80">
        {/* Core Planet with Enhanced Effects */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #84cc16, #65a30d, #166534)',
            boxShadow: '0 0 50px rgba(132, 204, 22, 0.4), inset 0 0 50px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Surface Details */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0%, transparent 30%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.4) 0%, transparent 25%)',
            }}
          />
          
          {/* Core Glow Effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(132, 204, 22, 0.8) 0%, transparent 70%)',
              filter: 'blur(8px)',
              animation: 'pulse 4s infinite ease-in-out'
            }}
          />
          
          {/* Core Pulse Rings */}
          <div className="absolute inset-8 rounded-full border-2 border-lime-200/50 animate-pulse" />
          
          {/* Energy Hotspots */}
          {[30, 150, 270].map((angle, i) => (
            <div
              key={`hotspot-${i}`}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(132, 204, 22, 0.6) 50%, transparent 100%)',
                left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 20}px)`,
                top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 20}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse ${1 + i * 0.5}s infinite alternate ease-in-out`
              }}
            />
          ))}
        </div>
        
        {/* Pulse Waves Emanating from Core */}
        {pulseWaves.map(wave => (
          <div
            key={wave.id}
            className="absolute inset-0 rounded-full border border-lime-400"
            style={{ 
              transform: `scale(${wave.scale})`,
              opacity: wave.opacity,
              transition: 'transform 0.1s linear, opacity 0.1s linear'
            }}
          />
        ))}

        {/* Animated Orbital Rings */}
        {[1.2, 1.4, 1.6].map((scale, index) => (
          <div
            key={index}
            className="absolute inset-0 rounded-full border border-lime-400/20"
            style={{ 
              transform: `scale(${scale}) rotate(${rotations[index]}turn)`,
              borderStyle: 'dashed',
              borderWidth: '1px'
            }}
          />
        ))}

        {/* Orbiting Nodes (representing products) with hover effects */}
        {productNodes.map((node, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full border-2 border-white/50"
            style={{
              backgroundColor: node.color,
              boxShadow: `0 0 10px ${node.color}`,
              left: `calc(50% + ${Math.cos((node.angle * Math.PI) / 180) * 120}px)`,
              top: `calc(50% + ${Math.sin((node.angle * Math.PI) / 180) * 120}px)`,
              marginLeft: '-8px',
              marginTop: '-8px',
            }}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Node label */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <span className="text-xs text-white/60 font-mono">{node.label}</span>
            </div>
          </div>
        ))}

        {/* Connection lines between core and hovered node */}
        {hoveredNode && (
          <div
            className="absolute w-px h-20 bg-gradient-to-b from-lime-400 to-transparent z-[2]"
            style={{
              top: 'calc(50% - 10px)',
              left: `calc(50% + ${Math.cos((hoveredNode.angle * Math.PI) / 180) * 60}px)`,
              transform: `rotate(${hoveredNode.angle}deg)`,
              transformOrigin: 'top'
            }}
          />
        )}

        {/* Dynamic Data Flow Particles */}
        {particles.map(particle => {
          const currentAngle = particle.startAngle + (particle.progress * 360);
          const radius = particle.scale * 40;
          
          return (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `calc(50% + ${Math.cos((currentAngle * Math.PI) / 180) * radius}px)`,
                top: `calc(50% + ${Math.sin((currentAngle * Math.PI) / 180) * radius}px)`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                opacity: Math.min(1, particle.lifeTime / 50),
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}

        {/* Static Data Flow Particles (fallback) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <div
            key={`data-${i}`}
            className="absolute w-1 h-1 bg-lime-300 rounded-full"
            style={{
              left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 60}px)`,
              top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 60}px)`,
              opacity: 0.7
            }}
          />
        ))}
        
        {/* Add global keyframes for animations */}
        <style jsx="true">{`
          @keyframes pulse {
            0% { opacity: 0.5; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.5; transform: scale(0.95); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-start px-8 lg:px-16 overflow-hidden">
      {/* Enhanced Cosmic Background with Grid */}
      <div className="absolute inset-0 z-[5]">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.15) 100%)',
          }}
        />
        
        {/* Perspective Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute inset-0">
            {/* Horizontal grid lines with perspective */}
            {Array.from({ length: 20 }).map((_, i) => (
              <path 
                key={`h-${i}`} 
                d={`M 0,${500 + (i - 10) * 50} Q 500,${480 + (i - 10) * 55} 1000,${500 + (i - 10) * 50}`} 
                stroke="#84cc16" 
                strokeOpacity="0.3" 
                strokeWidth="0.5" 
                fill="none" 
              />
            ))}
            
            {/* Vertical grid lines with perspective */}
            {Array.from({ length: 20 }).map((_, i) => (
              <path 
                key={`v-${i}`} 
                d={`M ${(i) * 50},0 Q ${(i) * 50 + Math.sin(i) * 10},500 ${(i) * 50},1000`} 
                stroke="#84cc16" 
                strokeOpacity="0.2" 
                strokeWidth="0.5" 
                fill="none" 
              />
            ))}
          </svg>
        </div>
        
        {/* Dynamic noise texture */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Enhanced Nebula Effect with Multiple Layers */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.25) 0%, rgba(98, 153, 16, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Enhanced Content Layout */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-8 lg:px-16 h-full flex items-center">
        <div className="grid grid-cols-12 gap-8 w-full">
          
          {/* Left Column - Main Content */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            
            {/* Header Section with Enhanced Typography */}
            <div className="space-y-4">
              <div
                className="inline-flex items-center space-x-3 mb-4"
              >
                <div className="w-3 h-3 rounded-full bg-lime-400" />
                <span className="text-lime-400/80 text-sm font-mono uppercase tracking-wider">Core Runtime</span>
              </div>
              
              <h2
                className="text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-none"
                style={{ 
                  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(132, 204, 22, 0.5)'
                }}
              >
                AEGIS<br />
                <span className="text-white/90 text-4xl lg:text-5xl normal-case">Runtime</span>
              </h2>
              
              <p
                className="text-xl lg:text-2xl font-medium text-white/80 max-w-lg leading-relaxed"
              >
                The smart core powering everything we build.
              </p>
            </div>

            {/* Tagline with Enhanced Styling */}
            <div
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-lime-400 rounded-full" />
              <h3 className="text-3xl lg:text-4xl font-semibold text-cyan-400 leading-tight">
                Adaptive. Auditable. Alive.
              </h3>
              <p className="text-lg text-white/70 mt-3 max-w-lg leading-relaxed">
                AEGIS is the thinking engine behind CuriousLabs — a precision system built to orchestrate AI, logic, and control across all products.
              </p>
            </div>

            {/* Enhanced Feature Cards */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            >
              {[
                { 
                  title: 'Multi-Agent Architecture', 
                  desc: 'Real AI agents in parallel with roles, memory, and autonomy',
                  icon: '🤖'
                },
                { 
                  title: 'State Machine Control', 
                  desc: 'Central mission engine governing every command',
                  icon: '⚙️'
                },
                { 
                  title: 'Audit-First Protocol', 
                  desc: 'Complete logs, metrics, and traces for every execution',
                  icon: '📊'
                },
                { 
                  title: 'Modular & Scalable', 
                  desc: 'Inject only what you need, scale sideways not up',
                  icon: '🔧'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-xl backdrop-blur-sm border border-white/10 hover:border-lime-400/30 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.4))',
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-white/60 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - AEGIS Core Visualization */}
          <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
            <AegisCore />
          </div>
        </div>
      </div>
      
      {/* Enhanced Particle System */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full z-[2]"
          style={{ 
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            backgroundColor: i % 3 === 0 ? '#84cc16' : i % 3 === 1 ? '#22d3ee' : '#ffffff',
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`
          }}
        />
      ))}

      {/* Animated Data Stream Effects - Moving from bottom to top */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px h-20 bg-gradient-to-t from-lime-400 to-transparent z-[2]"
          style={{
            bottom: `-20px`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            bottom: ['0%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Products Page (Simple Static Version)
const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Dispatch events to native ThoughtTrails system
  useEffect(() => {
    const activeProduct = OPS_BENTO_ITEMS[currentPage];
    
    // Small delay to ensure DOM has updated
    const timeoutId = setTimeout(() => {
      // Find the featured card element and get its bounds
      const featuredCard = document.querySelector('[data-featured-card="true"]');
      const cardBounds = featuredCard ? featuredCard.getBoundingClientRect() : null;
      
      console.log('🌟 Dispatching color update:', activeProduct.accentColor);
      
      // Dispatch event to native JS system
      window.dispatchEvent(new CustomEvent('updateAccentColor', {
        detail: {
          color: activeProduct.accentColor,
          cardBounds: cardBounds
        }
      }));
    }, 50); // Small delay to ensure DOM update
    
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  // Enhanced product card component with NEW ThoughtTrails
  const EnhancedProductCard = ({ item, isActive, isFeatured, onHover, onLeave }) => {
    // Memoize dynamic styles to prevent unnecessary recalculations
    const cardStyles = useMemo(() => ({
      background: isFeatured 
        ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7), ${item.accentColor}20)`
        : 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
      borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.2)',
      boxShadow: isActive
        ? `0 0 30px ${item.accentColor}40, inset 0 0 20px rgba(255,255,255,0.1)`
        : 'inset 0 0 5px rgba(255,255,255,0.05)',
    }), [item.accentColor, isActive, isFeatured]);

    return (
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border cursor-pointer group"
        style={cardStyles}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        whileHover={{ 
          filter: "brightness(1.1)" // Only use filter - no scale to prevent layout recalc
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        layout={false} // Prevent layout animations from interfering
        data-featured-card={isFeatured ? "true" : "false"} // Add data attribute for positioning
      >
        {/* ThoughtTrails are now handled by the native Canvas system */}
        {/* No React component needed - trails are positioned automatically */}

        {/* Simplified background - no animations */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Content - no background animations */}
        <div className="relative z-[10] p-6 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-3">
            {/* Simplified icon - no complex animations */}
            <div className={`relative ${isFeatured ? 'w-16 h-16' : 'w-10 h-10'} mx-auto mb-4`}>
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 20px ${item.accentColor}60`,
                  background: `radial-gradient(circle at 30% 30%, ${item.accentColor}, ${item.accentColor}90)`
                }}
              />
              <img
                src={item.illustrationSrc}
                alt={`${item.title} illustration`}
                className="w-full h-full object-cover rounded-full relative z-[10]"
                onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
              />
            </div>
            
            <div>
              <h3
                className={`font-bold uppercase tracking-wide mb-2 ${isFeatured ? 'text-2xl' : 'text-lg'}`}
                style={{ color: item.accentColor, textShadow: `0 0 10px ${item.accentColor}60` }}
              >
                {item.title}
              </h3>
              <p className={`font-medium text-white/80 ${isFeatured ? 'text-base' : 'text-sm'}`}>
                {item.summary}
              </p>
            </div>
          </div>

          {/* Features - NO animations to prevent text jumping */}
          {isFeatured && (
            <div className="space-y-4 my-4 transition-opacity duration-300">
              {/* What It Is */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-white/50">What It Is</h5>
                <p className="text-sm text-white/80 leading-relaxed">{item.fullDescription.whatItIs}</p>
              </div>

              {/* How It Works */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-white/50">How It Works</h5>
                <div className="space-y-1">
                  {item.fullDescription.howItWorks.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <span className="text-sm text-white/75">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-white/50">Why It Matters</h5>
                <p className="text-sm text-white/80 leading-relaxed italic">{item.fullDescription.whyItMatters}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="space-y-3">
            {isFeatured && (
              <p className="text-sm italic text-white/60">{item.tagline}</p>
            )}
            
            <div className="flex items-center justify-between">
              <span className="font-mono uppercase tracking-wider text-white/40 text-xs">
                {isFeatured ? 'Featured' : 'View'}
              </span>
              <motion.div
                className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center"
                whileHover={{ scale: 1.1, borderColor: item.accentColor }}
              >
                <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l-7 7 7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Product Info Panel - STATIC AEGIS Component (No re-renders, no prop changes)
const ProductInfoPanel = React.memo(() => {
  return (
  <div className="h-full relative">
      {/* Main AEGIS command card */}
    <div 
      className="backdrop-blur-xl bg-slate-900/40 rounded-2xl border border-white/20 p-8 h-full relative overflow-hidden"
      style={{
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="relative z-[10] h-full flex flex-col">
          {/* AEGIS Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <motion.div 
                  className="w-3 h-3 rounded-full bg-lime-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-mono uppercase tracking-wider text-white/60">
                  Core Runtime
              </span>
            </div>
            
            <h3
              className="text-4xl font-bold"
              style={{ 
                  background: 'linear-gradient(135deg, #84cc16 0%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#84cc16', // Fallback
              }}
            >
                AEGIS<br />Command
            </h3>
        </div>

          {/* Core Mission Statement */}
        <div className="space-y-4 flex-1">
            <p className="text-white/80 text-sm leading-relaxed font-medium">
              Your AI team, led by you. Mission-based AI orchestration with human oversight at every decision point.
            </p>
            
            {/* AEGIS Architecture Highlights */}
            <div className="p-4 rounded-xl backdrop-blur-sm border border-lime-400/20 bg-lime-400/5">
              <h4 className="font-semibold text-lg mb-3 text-lime-400">
                Adaptive. Auditable. Alive.
            </h4>
              <p className="text-white/70 text-sm mb-3">
                The thinking engine behind CuriousLabs — orchestrating AI, logic, and control across all products.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-lime-400" />
                <span className="text-white/60 text-xs italic">Multi-agent architecture with state machine control</span>
              </div>
          </div>

          {/* Core Principles */}
          <div className="space-y-3 mt-6">
            {[
                'Real AI agents in parallel with roles, memory, and autonomy',
                'Central mission engine governing every command',
                'Complete logs, metrics, and traces for every execution'
            ].map((principle, index) => (
              <div
                key={`principle-${index}`}
                className="flex items-start space-x-3"
              >
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-lime-400" />
                <span className="text-white/80 text-sm leading-relaxed">{principle}</span>
              </div>
            ))}
          </div>

          {/* AEGIS SDK Section */}
          <div className="mt-6 p-4 rounded-xl backdrop-blur-sm border border-cyan-400/20 bg-cyan-400/5">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <h4 className="font-semibold text-base text-cyan-400">
                  AEGIS SDK
                </h4>
      </div>
              <p className="text-white/70 text-sm mb-3">
                Developer toolkit for integrating AEGIS into any application or workflow.
              </p>
              
              {/* SDK Features */}
              <div className="space-y-2">
                {[
                  'Python & JavaScript client libraries',
                  'REST API with WebSocket streaming',
                  'Mission templates & agent blueprints'
                ].map((feature, index) => (
              <div
                    key={`sdk-${index}`}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0 bg-cyan-400/60" />
                    <span className="text-white/60 text-xs leading-relaxed">{feature}</span>
                  </div>
            ))}
          </div>

                {/* Code snippet preview */}
              <div className="mt-3 p-2 rounded bg-slate-800/50 border border-cyan-400/10">
                  <code className="text-xs font-mono text-cyan-300/80">
                    from aegis import Mission<br />
                    mission = Mission("analyze_docs")<br />
                    result = mission.execute()
                  </code>
                </div>
              </div>
            </div>

            {/* AEGIS Status */}
            <div className="mt-8 p-4 rounded-xl bg-slate-800/50 border border-lime-400/30">
            <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-mono text-lime-400 uppercase tracking-wider">System Status</div>
                  <div className="text-white/80 text-xs">All agents operational</div>
                </div>
                <div className="flex items-center space-x-2">
              <motion.div
                    className="w-2 h-2 rounded-full bg-lime-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-white/60">ACTIVE</span>
            </div>
          </div>
            </div>
        </div>
      </div>
      </div>
    );
  });

  // Product metrics panel component - STATIC VERSION (No re-renders)
  const ProductMetrics = React.memo(() => {
    // Static metrics for OpsPipe - no dynamic data to prevent re-renders
    const staticMetrics = [
      { label: 'Automation Rate', value: '94%', trend: '+12%' },
      { label: 'Processing Speed', value: '2.3s', trend: '-0.4s' },
      { label: 'Accuracy', value: '99.7%', trend: '+0.3%' }
    ];

    return (
      <div className="backdrop-blur-sm bg-slate-900/30 rounded-xl border border-white/10 p-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-lime-400" />
            <span className="text-sm font-mono text-white/60 uppercase tracking-wider">
              Live Metrics
            </span>
          </div>
          
          <div className="flex space-x-8">
            {staticMetrics.map((metric, index) => (
              <div 
                key={`static-metric-${index}`}
                className="text-center"
              >
                <div className="text-lg font-bold text-lime-400">
                  {metric.value}
                </div>
                <div className="text-xs text-white/60">{metric.label}</div>
                <div className="text-xs text-green-400">{metric.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  });

  // Product grid component with EXTERNAL ThoughtTrails
  const ProductGrid = ({ currentPage, setCurrentPage }) => {
    return (
      <div className="relative h-full w-full" data-page="products">
        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-6 grid-rows-4 gap-4 h-full">
          
          {/* Featured Card (Large) with EXTERNAL ThoughtTrails */}
          <motion.div 
            className="col-span-4 row-span-3 relative"
          >
            <EnhancedProductCard 
              item={OPS_BENTO_ITEMS[currentPage]} 
              isActive={true}
              isFeatured={true}
              onHover={() => {}} // Empty hover handler to prevent re-renders
              onLeave={() => {}} // Empty leave handler to prevent re-renders
            />
          </motion.div>
          
          {/* Supporting Cards (Small) */}
          <div className="col-span-2 row-span-4 flex flex-col gap-4">
            {OPS_BENTO_ITEMS.filter((_, i) => i !== currentPage).slice(0, 3).map((item, index) => {
              const originalIndex = OPS_BENTO_ITEMS.findIndex(p => p.id === item.id);
              return (
                <motion.div 
                  key={item.id}
                  className="flex-1"
                  onClick={() => setCurrentPage(originalIndex)}
                >
                  {/* Enhanced Supporting Card - Clean Arrow Style */}
                  <motion.div
                    className="relative w-full h-full rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 cursor-pointer group hover:border-white/20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.5))',
                    }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {/* Simplified background */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.4\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                        mixBlendMode: 'overlay',
                      }}
                    />
                    
                    {/* Content - Clean & Minimal */}
                    <div className="relative z-[10] p-4 h-full flex items-center justify-between">
                      {/* Left: Product Info */}
                      <div className="flex-1">
                        <h4
                          className="text-lg font-bold uppercase tracking-wide mb-1"
                          style={{ color: item.accentColor, textShadow: `0 0 8px ${item.accentColor}40` }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-sm font-medium text-white/70 mb-2">
                          {item.summary}
                        </p>
                        
                        {/* Quick Bullets */}
                        <div className="space-y-1">
                          {item.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div 
                                className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: item.accentColor }}
                              />
                              <span className="text-xs text-white/60 leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Arrow Pointing Left */}
                      <div className="flex flex-col items-center space-y-2 ml-4">
                        <motion.div
                          className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20"
                          style={{ borderColor: `${item.accentColor}40` }}
                          whileHover={{ 
                            scale: 1.1, 
                            borderColor: item.accentColor,
                            backgroundColor: `${item.accentColor}20`
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-4 h-4 text-white/50 group-hover:text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                        </motion.div>
                        
                        {/* Hint Text */}
                        <span className="text-xs font-mono text-white/30 uppercase tracking-wider">
                          View
                        </span>
                      </div>
                    </div>

                    {/* Subtle glow on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}10, transparent)`,
                        boxShadow: `inset 0 0 20px ${item.accentColor}20`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Stats/Metrics Panel */}
          <div className="col-span-4 row-span-1">
            <ProductMetrics />
        </div>
      </div>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden z-[3]" data-page="products">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 z-[-1]">
        {/* Base gradient with more depth */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #2d1b4f 50%, rgba(162, 52, 179, 0.4) 75%, rgba(186, 86, 16, 0.3) 100%)',
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'] 
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000">
            {/* Hexagonal grid pattern */}
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 12 }).map((_, col) => {
                const x = col * 80 + (row % 2) * 40;
                const y = row * 70;
                return (
                  <motion.polygon
                    key={`hex-${row}-${col}`}
                    points={`${x},${y+20} ${x+20},${y} ${x+40},${y} ${x+60},${y+20} ${x+40},${y+40} ${x+20},${y+40}`}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="0.5"
                    strokeOpacity="0.3"
                    animate={{
                      strokeOpacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                );
              })
            )}
          </svg>
        </div>
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute w-16 h-16 border border-purple-400/20 rotate-45"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced Nebula Effects */}
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.25) 0%, rgba(98, 153, 16, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* ThoughtTrails Layer - positioned between background and content */}
      <div className="absolute inset-0 z-[5]" data-thought-trails-layer="true"></div>
      
      {/* Enhanced Content Layout */}
      <div className="relative z-[10] w-full max-w-8xl mx-auto px-6 h-full flex items-center">
        <div className="w-full grid grid-cols-12 gap-8 h-5/6">
          
          {/* Left Panel - Enhanced Info Section */}
          <div className="col-span-4 flex flex-col justify-center space-y-6">
            <ProductInfoPanel />
          </div>
          
          {/* Right Panel - Enhanced Product Grid */}
          <div className="col-span-8 relative">
            <ProductGrid 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Services Page
const ServicesPage = ({ onScrollRelease }) => {
  const [text, setText] = useState('');
  const [isStellarActive, setIsStellarActive] = useState(false);
  const [stellarPhase, setStellarPhase] = useState('materialization');
  const [stellarProgress, setStellarProgress] = useState(0);
  const [showFloatingWords, setShowFloatingWords] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [showStellarHint, setShowStellarHint] = useState(false);
  const fullText = 'We Care, We Create: Ethical, responsible products with humans at the core.';

  // Listen for stellar message activation and phase updates
  useEffect(() => {
    const handleStellarActivation = (e) => {
      if (e.detail.pageIndex === 2) {
        setIsStellarActive(true);
        setText(''); // Clear the text when stellar is active
        setShowFloatingWords(true);
        setShowStellarHint(false);
      } else {
        setIsStellarActive(false);
        setShowFloatingWords(false);
      }
    };

    // Listen for stellar phase updates
    const handleStellarPhase = (e) => {
      if (e.detail.phase) {
        setStellarPhase(e.detail.phase);
        setStellarProgress(e.detail.progress || 0);
      }
    };

    // Listen for stellar sequence completion
    const handleStellarComplete = () => {
      if (isStellarActive) {
        console.log('🌌 Stellar sequence completed in ServicesPage');
        setTimeout(() => {
          onScrollRelease();
        }, 1000); // Brief delay before releasing scroll
      }
    };

    // Simple pause control for StellarMessage
    const handleKeyPress = (e) => {
      if (isStellarActive && e.key === 'p') {
        e.preventDefault();
        // Find and pause the stellar message
        const stellarButtons = document.querySelectorAll('button');
        const pauseButton = Array.from(stellarButtons).find(btn => 
          btn.textContent.includes('Pause') || btn.textContent.includes('Resume')
        );
        if (pauseButton) {
          pauseButton.click();
          console.log('🎬 Stellar message paused/resumed');
        }
      }
    };

    window.addEventListener('horizontalPageChange', handleStellarActivation);
    window.addEventListener('stellarPhaseUpdate', handleStellarPhase);
    window.addEventListener('stellarSequenceComplete', handleStellarComplete);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('horizontalPageChange', handleStellarActivation);
      window.removeEventListener('stellarPhaseUpdate', handleStellarPhase);
      window.removeEventListener('stellarSequenceComplete', handleStellarComplete);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isStellarActive, onScrollRelease]);

  // Enhanced typewriter effect with skip functionality
  useEffect(() => {
    // Only run typewriter if stellar is not active
    if (isStellarActive) return;
    
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      
      // Enable skip after 25% of text is shown
      if (index >= Math.floor(fullText.length * 0.25) && !canSkip) {
        setCanSkip(true);
      }
      
      if (index > fullText.length) {
        clearInterval(interval);
        setTypewriterComplete(true);
        setShowStellarHint(true);
        // Show floating words briefly
        setShowFloatingWords(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onScrollRelease, isStellarActive, canSkip, fullText.length]);

  // Keyboard controls for skip and stellar activation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Skip typewriter if allowed
      if (canSkip && !typewriterComplete && ['Space', 'Enter', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
        setText(fullText);
        setTypewriterComplete(true);
        setShowStellarHint(true);
        setShowFloatingWords(true);
        return;
      }
      
      // Activate stellar message after typewriter completes
      if (typewriterComplete && e.code === 'Enter') {
        e.preventDefault();
        // The main component handles page changes, no need to dispatch here
        // window.dispatchEvent(new CustomEvent('horizontalPageChange', {
        //   detail: { pageIndex: 2 }
        // }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canSkip, typewriterComplete, fullText]);

  // Enhanced Cosmic Environment Component
  const CosmicEnvironment = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: Enhanced Base Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #0f172a 0%, #1e293b 20%, #2d1b4f 40%, rgba(255, 107, 53, 0.15) 70%, rgba(255, 140, 66, 0.1) 100%),
            radial-gradient(ellipse at 20% 80%, rgba(244, 81, 30, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%, 100% 100%, 100% 100%',
        }}
        animate={{ 
          backgroundPosition: ['0% 0%, 0% 0%, 0% 0%', '100% 100%, 10% 10%, -10% -10%'] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Layer 2: Floating Cosmic Orbs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const size = 20 + Math.random() * 60;
        const colors = ['#FF6B35', '#FF8C42', '#F4511E'];
        const color = colors[i % 3];

  return (
      <motion.div
            key={`cosmic-orb-${i}`}
            className="absolute rounded-full pointer-events-none"
        style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, ${color}40 0%, ${color}20 30%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        );
      })}
      
      {/* Layer 3: Enhanced Cosmic Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute inset-0">
          {/* Horizontal perspective grid lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const y = 100 + (i * 80);
            const curve = Math.sin(i * 0.3) * 20;
            return (
              <motion.path
                key={`grid-h-${i}`}
                d={`M 0,${y} Q 500,${y + curve} 1000,${y}`}
                stroke="#FF8C42"
                strokeOpacity="0.3"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="4,12"
                animate={{
                  strokeOpacity: [0.1, 0.4, 0.1],
                  strokeDashoffset: [0, -16]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear"
                }}
              />
            );
          })}
          
          {/* Vertical perspective grid lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 100 + (i * 120);
            const curve = Math.cos(i * 0.4) * 15;
            return (
              <motion.path
                key={`grid-v-${i}`}
                d={`M ${x},0 Q ${x + curve},500 ${x},1000`}
                stroke="#F4511E"
                strokeOpacity="0.25"
                strokeWidth="0.5"
                fill="none"
                strokeDasharray="3,15"
                animate={{
                  strokeOpacity: [0.1, 0.3, 0.1],
                  strokeDashoffset: [0, -18]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear"
                }}
              />
            );
          })}
          
          {/* Central cosmic nexus */}
          <motion.circle
            key="cosmic-nexus"
            cx={500}
            cy={500}
            r={2}
            fill="#FF6B35"
            animate={{
              r: [2, 8, 2],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              willChange: 'transform'
            }}
          />
        </svg>
      </div>
      
      {/* Layer 4: Enhanced Nebula Effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(255, 107, 53, 0.3) 0%, rgba(255, 140, 66, 0.15) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
        <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 75% 60%, rgba(244, 81, 30, 0.25) 0%, rgba(255, 107, 53, 0.12) 35%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ 
          scale: [1.1, 0.9, 1.1],
          x: [-20, 20, -20],
          y: [10, -10, 10]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Layer 5: Dynamic Noise Texture */}
      <div 
        className="absolute inset-0 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmicNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmicNoise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
    </div>
  );

  // Integrated Typography Component
  const IntegratedTypography = () => (
    <div className="absolute inset-0 flex items-center justify-center z-[10]">
      {/* Ghost Text Background - subtle depth layer */}
      <motion.div
        className="absolute text-4xl lg:text-6xl font-bold text-center opacity-5 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, #FF6B35, #FF8C42)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'blur(2px)',
          transform: 'scale(1.2)',
          lineHeight: 1.2
        }}
        animate={{
          scale: [1.2, 1.25, 1.2],
          opacity: isStellarActive ? [0.02, 0.08, 0.02] : 0.05
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        We Care, We Create:<br/>
        Ethical, responsible products<br/>
        with humans at the core.
      </motion.div>
      
      {/* Floating Context Words */}
      <AnimatePresence>
        {showFloatingWords && ['Innovation', 'Ethics', 'Humanity', 'Purpose', 'Future', 'Trust'].map((word, i) => (
          <motion.div
            key={`context-${word}`}
            className="absolute text-sm lg:text-lg font-light text-white/40 pointer-events-none select-none"
            style={{
              top: `${15 + (i * 12) + Math.random() * 20}%`,
              left: `${10 + (i * 14) + Math.random() * 60}%`,
              fontWeight: 300,
              letterSpacing: '0.1em'
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: stellarPhase === 'breathing' ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1],
              y: [0, -15, 0],
              scale: [0.8, 1.1, 0.8]
            }}
            exit={{ opacity: 0, scale: 0.6, y: -30 }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            {word}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // Cosmic UI Elements Component
  const CosmicUI = () => (
    <div className="absolute inset-0 pointer-events-none z-[20]">
      {/* Phase Indicator - Top Left */}
      <AnimatePresence>
        {isStellarActive && (
          <motion.div 
            className="absolute top-8 left-8 flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-orange-400"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-white/70 uppercase tracking-wider">
              {stellarPhase === 'materialization' && 'Initializing System...'}
              {stellarPhase === 'constellation' && 'Connecting Networks...'}
              {stellarPhase === 'breathing' && 'System Active...'}
              {stellarPhase === 'dissolution' && 'Transcending...'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Visualization - Bottom Center */}
      <AnimatePresence>
        {isStellarActive && (
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60">
              {/* Background arc */}
              <path
                d="M 10,50 Q 60,10 110,50"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              {/* Progress arc */}
              <motion.path
                d="M 10,50 Q 60,10 110,50"
                fill="none"
                stroke="#FF6B35"
                strokeWidth="2"
                strokeDasharray="100"
                strokeLinecap="round"
                animate={{
                  strokeDashoffset: 100 - (stellarProgress * 100),
                  strokeOpacity: [0.6, 1, 0.6]
                }}
                transition={{
                  strokeDashoffset: { duration: 0.5, ease: "easeOut" },
                  strokeOpacity: { duration: 2, repeat: Infinity }
                }}
              />
              {/* Progress indicator */}
              <motion.circle
                key="progress-indicator"
                cx={Math.max(10, Math.min(110, 10 + ((stellarProgress || 0) * 100)))}
                cy={Math.max(10, Math.min(50, 50 - Math.sin((stellarProgress || 0) * Math.PI) * 40))}
                r={2}
                fill="#FF8C42"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
            
            {/* Progress percentage */}
            <div className="text-center mt-2">
              <motion.span 
                className="text-xs font-mono text-white/50"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round(stellarProgress * 100)}%
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mission Statement Enhancement - Only during typewriter */}
      <AnimatePresence>
        {!isStellarActive && text.length > 20 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Subtle emphasis lines */}
            <motion.div
              className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleY: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -right-8 top-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-400 to-transparent"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleY: [1.2, 0.8, 1.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Hint - after typewriter completes */}
      <AnimatePresence>
        {!isStellarActive && canSkip && !typewriterComplete && (
          <motion.div
            className="absolute bottom-8 left-8 text-xs text-white/40 font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Press SPACE to skip →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stellar Activation Hint - after typewriter completes */}
      <AnimatePresence>
        {!isStellarActive && typewriterComplete && showStellarHint && (
          <motion.div
            className="absolute bottom-8 right-8 text-sm text-white/60 font-mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="flex items-center space-x-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Press ENTER for Stellar Message</span>
              <motion.div
                className="w-1 h-1 rounded-full bg-orange-400"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Cosmic Environment */}
      <CosmicEnvironment />
      
      {/* Integrated Typography Layer */}
      <IntegratedTypography />
      
      {/* Enhanced Particles - hide when stellar is active */}
      {!isStellarActive && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`cosmic-particle-${i}`}
          className="absolute rounded-full z-[5]"
          style={{ 
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            backgroundColor: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#FF8C42' : '#ffffff',
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${Math.random() * 8 + 4}px currentColor`
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{ 
            duration: 3 + Math.random() * 4, 
            repeat: Infinity, 
            repeatDelay: Math.random() * 2,
            ease: "easeInOut" 
          }}
        />
      ))}
      
      {/* Shooting Star Effects - hide when stellar is active */}
      {!isStellarActive && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-px h-20 z-[5]"
          style={{
            background: `linear-gradient(to bottom, #FF6B35, transparent)`,
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)'
          }}
          animate={{
            x: ['0vw', '100vw'],
            y: ['0vh', '50vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 6,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Main Text Reveal - hide when stellar is active */}
      {!isStellarActive && (
      <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white text-center max-w-2xl z-[15] relative"
          style={{ 
            textShadow: '0 0 20px rgba(255, 107, 53, 0.6), 0 0 40px rgba(255, 140, 66, 0.3)',
            lineHeight: 1.3
          }}
      >
        {text}
          <motion.span 
            className="inline-block ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ color: '#FF6B35' }}
          >
            |
          </motion.span>
      </motion.h2>
      )}

      {/* Cosmic UI Elements */}
      <CosmicUI />

      {/* StellarMessage Component - ONLY active on third page */}
      {isStellarActive && (
        <div className="absolute inset-0 z-[50]">
          <StellarMessageComponent />
        </div>
      )}
    </div>
  );
};

// Debug Mode for visualization
const useDebugMode = () => {
  const [isDebug, setIsDebug] = useState(false);
  
  useEffect(() => {
    const toggleDebug = (e) => {
      if (e.key === 'd' && e.ctrlKey) {
        setIsDebug(prev => !prev);
        console.log('Debug mode:', !isDebug);
      }
    };
    
    window.addEventListener('keydown', toggleDebug);
    return () => window.removeEventListener('keydown', toggleDebug);
  }, [isDebug]);
  
  return isDebug;
};

// Main Component
const HorizontalProductScrollV6 = ({ className = '' }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const containerRef = useRef(null);
  const isDebug = useDebugMode();

  // Component mount effect - ensure ThoughtTrails detects the page
  useEffect(() => {
    // Initial ThoughtTrails detection when component mounts
    const initThoughtTrails = () => {
      if (window.thoughtTrails && typeof window.thoughtTrails.checkRouteAndActivate === 'function') {
        console.log('🌟 Initial ThoughtTrails detection on component mount');
        window.thoughtTrails.checkRouteAndActivate();
      }
    };

    // Run immediately and after a delay to ensure DOM is ready
    initThoughtTrails();
    const timer = setTimeout(initThoughtTrails, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Page data attributes mapping
  const pageDataAttributes = {
    0: 'aegis',
    1: 'products', 
    2: 'services'
  };

  // Handle stellar sequence completion
  useEffect(() => {
    const handleStellarComplete = () => {
      if (currentPage === 2) {
        console.log('🌌 Stellar sequence completed - releasing scroll lock');
        setIsScrollLocked(false);
      }
    };
    
    window.addEventListener('stellarSequenceComplete', handleStellarComplete);
    return () => window.removeEventListener('stellarSequenceComplete', handleStellarComplete);
  }, [currentPage]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrollLocked) return;
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      if (delta > 0 && currentPage < 2) setCurrentPage((prev) => prev + 1);
      else if (delta < 0 && currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleTouchMove = (e) => {
      if (!isScrollLocked) return;
      e.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentPage, isScrollLocked]);

  const handleScrollRelease = () => {
    if (currentPage === 2) setIsScrollLocked(false);
  };

  // Dispatch event when page changes to control ThoughtTrails visibility
  useEffect(() => {
    // Dispatch event to notify ThoughtTrails system about page change
    window.dispatchEvent(new CustomEvent('horizontalPageChange', {
      detail: { 
        pageIndex: currentPage,
        pageName: pageDataAttributes[currentPage],
        timestamp: Date.now()
      }
    }));
    
    console.log(`🌟 Horizontal page changed: ${currentPage} (${pageDataAttributes[currentPage]})`);
    
    // Add data attribute to the current page for easier selection
    const pages = document.querySelectorAll('section > .flex > .w-screen');
    pages.forEach((page, index) => {
      if (index === 1) { // Products page (second page)
        page.setAttribute('data-page', 'products');
      } else {
        page.removeAttribute('data-page');
      }
    });

    // Trigger ThoughtTrails detection after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (window.thoughtTrails && typeof window.thoughtTrails.checkRouteAndActivate === 'function') {
        window.thoughtTrails.checkRouteAndActivate();
      }
    }, 100);
  }, [currentPage]);

  return (
    <section 
      className={`relative w-full h-screen overflow-hidden ${className} ${isDebug ? 'debug-mode' : ''}`} 
      ref={containerRef}
    >
      {/* Debug Grid Overlay */}
      {isDebug && (
        <div className="fixed inset-0 z-[50] pointer-events-none">
          <div className="w-full h-full grid grid-cols-12 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-full border border-red-500 opacity-20" />
            ))}
          </div>
          <div className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded text-xs">
            Debug Mode: Page {currentPage + 1}/3<br />
            Scroll Lock: {isScrollLocked ? 'On' : 'Off'}<br />
            Press Ctrl+D to toggle debug
          </div>
        </div>
      )}
      
      {/* Horizontal Scroll Container */}
      <motion.div
        className="flex w-[300vw] h-full"
        animate={{ x: `-${currentPage * 100}vw` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Page 1: AEGIS */}
        <motion.div className="w-screen h-screen" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <AegisPage />
        </motion.div>
        {/* Page 2: Products */}
        <motion.div className="w-screen h-screen" data-page="products" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <ProductsPage />
        </motion.div>
        {/* Page 3: Services */}
        <motion.div className="w-screen h-screen z-[3]" data-page="services" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <ServicesPage onScrollRelease={handleScrollRelease} />
        </motion.div>
      </motion.div>
      {/* Only pagination in the component - at the main level */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[30]">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full cursor-pointer"
            animate={{ backgroundColor: currentPage === index ? '#d946ef' : 'rgba(255,255,255,0.2)' }}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </section>
  );
};

// Add debug styles to the component
const debugStyles = `
.debug-mode * {
  outline: 1px dashed rgba(255, 0, 0, 0.2);
}
.debug-mode [style*="z-index"], .debug-mode [class*="z-"]:after {
  position: relative;
}
.debug-mode [style*="z-index"]:after, .debug-mode [class*="z-"]:after {
  content: attr(style);
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 8px;
  padding: 2px;
  z-index: [9999];
}
`;

// Inject debug styles if needed
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = debugStyles;
  document.head.appendChild(styleElement);
}

HorizontalProductScrollV6.displayName = 'HorizontalProductScrollV6';
export const metadata = {
  id: 'horizontal_product_scroll_v6',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_horizontal_product_scroll_v6.md',
};

export default HorizontalProductScrollV6;