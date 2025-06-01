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
  // Add flag to control visualization rendering
  const [showVisualization, setShowVisualization] = useState(false);
  
    return (
    <div 
      className="relative w-screen h-screen flex items-center justify-start overflow-hidden"
      style={{
        mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)'
      }}
    >
      {/* Enhanced Cosmic Background with Grid */}
      <div className="absolute inset-0 z-[1]">
        {/* Base gradient - SET TO 0.4 OPACITY */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.15) 100%)',
          }}
        />
        
        {/* AEGIS Background Asset Layer */}
        <div
          className="absolute inset-0 opacity-30 z-[2]"
          style={{
            backgroundImage: 'url(/assets/images/general/Aegis_Background.avif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay',
            filter: 'brightness(0.8) contrast(1.2)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 85%)',
          }}
        />
        
        {/* Dynamic noise texture - STRONGER EFFECT */}
        <div 
          className="absolute inset-0 opacity-40 z-[8]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Enhanced Nebula Effect with Multiple Layers - MOVED UP */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.25) 0%, rgba(98, 153, 16, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* ThoughtTrails Layer */}
      <div className="absolute inset-0 z-[5]" data-thought-trails-layer="true"></div>
      
      {/* Enhanced Content Layout - FULL WIDTH USAGE */}
      <div className="relative z-[10] w-full h-full flex items-center">
        <div className="w-full h-full grid grid-cols-12 gap-16 px-12 lg:px-20">
          
          {/* Left Column - Main Content - EXPANDED */}
          <div className="col-span-12 lg:col-span-8 space-y-8 flex flex-col justify-center pr-8">
            
            {/* Header Section with Enhanced Typography */}
            <div className="space-y-6">
              {/* Mission Control Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-lime-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-lime-400/80 text-sm font-mono uppercase tracking-wider">Mission Control</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                    OPERATIONAL
                  </div>
                  <div className="text-xs text-white/50 font-mono">
                    v2.1.0
                  </div>
                </div>
              </div>
              
              <h2
                className="text-6xl lg:text-8xl font-bold uppercase tracking-tight leading-none"
                style={{ 
                  background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 50%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(132, 204, 22, 0.5)'
                }}
              >
                AEGIS<br />
              <span className="text-white/90 text-5xl lg:text-6xl normal-case">Runtime</span>
              </h2>
              
              <p
                className="text-2xl lg:text-3xl font-medium text-white/80 max-w-2xl leading-relaxed"
              >
                The smart core powering everything we build.
              </p>
            </div>

            {/* Mission Statement with Enhanced Styling */}
            <div className="relative max-w-3xl">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-lime-400 rounded-full" />
              <h3 className="text-4xl lg:text-5xl font-semibold text-cyan-400 leading-tight">
                Adaptive. Auditable. Alive.
              </h3>
              <p className="text-xl text-white/70 mt-4 max-w-2xl leading-relaxed">
                AEGIS is the thinking engine behind CuriousLabs — a precision system built to orchestrate AI, logic, and control across all products.
              </p>
            </div>

            {/* Enhanced Architecture Cards with Status Indicators - WIDER LAYOUT */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <h4 className="text-base font-mono uppercase tracking-wider text-white/70">
                  System Architecture
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Multi-Agent Architecture', 
                  desc: 'Real AI agents in parallel with roles, memory, and autonomy',
                    icon: '🤖',
                    status: 'ACTIVE',
                    metric: '12 agents',
                    uptime: '99.7%'
                },
                { 
                  title: 'State Machine Control', 
                  desc: 'Central mission engine governing every command',
                    icon: '⚙️',
                    status: 'OPERATIONAL',
                    metric: '2.3M ops',
                    uptime: '100%'
                },
                { 
                  title: 'Audit-First Protocol', 
                  desc: 'Complete logs, metrics, and traces for every execution',
                    icon: '📊',
                    status: 'MONITORING',
                    metric: '847K events',
                    uptime: '99.9%'
                },
                { 
                  title: 'Modular & Scalable', 
                  desc: 'Inject only what you need, scale sideways not up',
                    icon: '🔧',
                    status: 'READY',
                    metric: '8 modules',
                    uptime: '100%'
                }
              ].map((feature, index) => (
                  <motion.div
                  key={index}
                    className="group relative p-5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-lime-400/30 transition-all duration-300"
                  style={{
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
                      boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 0 20px rgba(132, 204, 22, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)`
                    }}
                  >
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-lime-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                        <span className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                          {feature.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/60 font-mono">{feature.metric}</div>
                        <div className="text-xs text-lime-400 font-mono">{feature.uptime}</div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex flex-col space-y-3">
                      <span className="text-3xl">{feature.icon}</span>
                    <div>
                        <h5 className="text-white font-semibold text-sm mb-2">{feature.title}</h5>
                        <p className="text-white/70 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>

                    {/* Hover Enhancement */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, rgba(132, 204, 22, 0.1), transparent)`,
                        boxShadow: `inset 0 0 20px rgba(132, 204, 22, 0.2)`
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
                </div>
            </div>

            {/* Developer Toolkit Section - WIDER */}
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="text-base font-mono uppercase tracking-wider text-white/70">
                  Developer Toolkit
                </h4>
              </div>

              {/* Enhanced AEGIS SDK Section */}
              <div className="group/sdk">
                <motion.div 
                  className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10"
                  style={{ 
                    borderColor: 'rgba(34, 211, 238, 0.2)',
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.5))'
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div>
                        <h5 className="text-lg font-semibold text-cyan-400">
                          AEGIS SDK
                        </h5>
                        <p className="text-sm text-white/60">
                          Developer toolkit for mission-critical AI
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        STABLE
                      </div>
                      <div className="text-xs text-white/50 font-mono">
                        v1.2.0
                      </div>
                    </div>
                  </div>
                  
                  {/* Collapsible Content */}
                  <div className="overflow-hidden max-h-0 group-hover/sdk:max-h-60 transition-all duration-500 ease-in-out opacity-0 group-hover/sdk:opacity-100">
                    <div className="pt-4 space-y-4 border-t border-cyan-400/20">
                      {/* SDK Features */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { label: 'Python & JavaScript libraries', status: 'STABLE', icon: '📚' },
                          { label: 'REST API with WebSocket streaming', status: 'ACTIVE', icon: '🔌' },
                          { label: 'Mission templates & blueprints', status: 'BETA', icon: '📋' }
                        ].map((feature, index) => (
                          <motion.div
                            key={`sdk-${index}`}
                            className="flex items-center justify-between p-3 rounded bg-slate-800/50 border border-cyan-400/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: index * 0.1, duration: 0.3 }
                            }}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{feature.icon}</span>
                              <span className="text-sm text-white/80">{feature.label}</span>
                            </div>
                            <span className="text-xs text-cyan-400 font-mono">{feature.status}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Quick Code Example */}
                      <motion.div 
                        className="p-4 rounded bg-slate-900/80 border border-cyan-400/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.4, duration: 0.3 }
                        }}
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-1 h-1 rounded-full bg-cyan-400" />
                          <span className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
                            Quick Start
                          </span>
                        </div>
                        <code className="text-sm font-mono text-cyan-300/90 leading-relaxed block">
                          <span className="text-purple-400">from</span> aegis <span className="text-purple-400">import</span> Mission<br />
                          <span className="text-yellow-400">mission</span> = Mission(<span className="text-green-400">"analyze"</span>)<br />
                          <span className="text-yellow-400">result</span> = mission.execute()
                        </code>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column - AEGIS Core Visualization - POSITIONED TO RIGHT EDGE */}
          <div className="col-span-12 lg:col-span-4 flex items-center justify-end">
            {/* Architecture Diagram Header */}
            <div className="w-full max-w-md space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <h4 className="text-sm font-mono uppercase tracking-wider text-white/80">
                    System Architecture Flow
                  </h4>
          </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Real-time visualization of AEGIS orchestration layers and data flow patterns
                </p>
              </div>
              
              {/* Enhanced Architecture Diagram - MUCH MORE OPAQUE BACKGROUND */}
              <div className="relative p-4 rounded-2xl backdrop-blur-sm border border-white/20 bg-slate-900/95 overflow-hidden">
                {/* Background Grid - SUBTLE */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(132, 204, 22, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(132, 204, 22, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px'
                  }}
                />
                
                {/* Diagram Content - COMPACT */}
                <div className="relative z-10 space-y-3">
                  
                  {/* Input Layer */}
                  <div className="text-center">
                    <motion.div 
                      className="inline-block p-2 rounded-lg border border-orange-400/40 bg-orange-400/20"
                      whileHover={{ scale: 1.05, borderColor: '#ff7f00' }}
                    >
                      <div className="text-xs font-mono text-orange-300 uppercase tracking-wider mb-1">Input Layer</div>
                      <div className="text-xs text-white/80">TelegramBot • File Upload • POS Adapter</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-px h-4 bg-gradient-to-b from-orange-400 to-cyan-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Command Center & Decision Layer */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">Command Center</div>
                      <div className="text-xs text-white/80">Registry</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-lime-400/40 bg-lime-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#84cc16' }}
                    >
                      <div className="text-xs font-mono text-lime-300 uppercase tracking-wider mb-1">Decision Engine</div>
                      <div className="text-xs text-white/80">AI Orchestration</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">Recovery Manager</div>
                      <div className="text-xs text-white/80">Fault Tolerance</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrows */}
                  <div className="flex justify-center space-x-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                        className="w-px h-3 bg-gradient-to-b from-cyan-400 to-lime-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>

                  {/* Processing Layer */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="p-2 rounded-lg border border-lime-400/40 bg-lime-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#84cc16' }}
                    >
                      <div className="text-xs font-mono text-lime-300 uppercase tracking-wider mb-1">Agent Loop</div>
                      <div className="text-xs text-white/80">Multi-Agent</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">FSM + Trace</div>
                      <div className="text-xs text-white/80">State Machine</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-cyan-400/40 bg-cyan-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#44aaff' }}
                    >
                      <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-1">Recovery System</div>
                      <div className="text-xs text-white/80">Fallback Logic</div>
                    </motion.div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-px h-3 bg-gradient-to-b from-lime-400 to-purple-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Output Layer */}
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="p-2 rounded-lg border border-purple-400/40 bg-purple-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#a855f7' }}
                    >
                      <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">Data Exports</div>
                      <div className="text-xs text-white/80">/logs/ /docs/</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-purple-400/40 bg-purple-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#a855f7' }}
                    >
                      <div className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-1">Knowledge Base</div>
                      <div className="text-xs text-white/80">/cards/ /kb/</div>
                    </motion.div>
                    
                    <motion.div 
                      className="p-2 rounded-lg border border-orange-400/40 bg-orange-400/20 text-center"
                      whileHover={{ scale: 1.05, borderColor: '#ff7f00' }}
                    >
                      <div className="text-xs font-mono text-orange-300 uppercase tracking-wider mb-1">Human Layer</div>
                      <div className="text-xs text-white/80">Interfaces</div>
                    </motion.div>
                  </div>

                  {/* Connection Lines - SUBTLE */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Animated connection lines */}
                    <svg className="w-full h-full" style={{ zIndex: 1 }}>
                      <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4"/>
                          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Flowing data lines */}
                      <motion.path
                        d="M 50 30 Q 120 60 200 90 Q 280 120 350 150"
                        stroke="url(#flowGradient)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2,2"
                        animate={{
                          strokeDashoffset: [0, -8],
                          opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Diagram Legend */}
                <div className="mt-3 pt-3 border-t border-white/20">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        <span className="text-white/70">User</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-white/70">Code</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                        <span className="text-white/70">Agent</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        <span className="text-white/70">Data</span>
                      </div>
                    </div>
                    <div className="text-white/50 font-mono text-xs">
                      v2.1.0
                    </div>
                  </div>
                </div>
              </div>

              {/* System Metrics Panel - COMPACT */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Throughput', value: '2.3K/sec', color: 'lime' },
                  { label: 'Latency', value: '45ms', color: 'cyan' },
                  { label: 'Agents', value: '12 active', color: 'purple' },
                  { label: 'Uptime', value: '99.7%', color: 'orange' }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    className="p-2 rounded-lg backdrop-blur-sm border border-white/10 bg-slate-900/60 text-center"
                    whileHover={{ scale: 1.05 }}
                    style={{ borderColor: `var(--${metric.color}-400, rgba(255,255,255,0.1))` }}
                  >
                    <div className={`text-sm font-bold text-${metric.color}-400`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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

// Products Page (Enhanced Mission Control Version)
const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const prevColorRef = useRef(null);

  // Dispatch events to native ThoughtTrails system
  useEffect(() => {
    const activeProduct = OPS_BENTO_ITEMS[currentPage];
    
    // Only dispatch if color has actually changed
    if (prevColorRef.current === activeProduct.accentColor) {
      return;
    }
    
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
      
      // Update the ref to track this color
      prevColorRef.current = activeProduct.accentColor;
    }, 50); // Small delay to ensure DOM update
    
    return () => clearTimeout(timeoutId);
  }, [currentPage]);

  // Enhanced product card component with mission control styling
  const EnhancedProductCard = ({ item, isActive, isFeatured, onHover, onLeave, onClick }) => {
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
        onClick={onClick}
        whileHover={{ 
          filter: "brightness(1.1)",
          scale: 1.02
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        layout={false}
        data-featured-card={isFeatured ? "true" : "false"}
      >
        {/* Status Indicator */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: item.accentColor }}
            />
            <span className="text-xs font-mono text-white/80">
              {isActive ? 'ACTIVE' : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Click indicator */}
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-mono text-white/80">CLICK TO EXPAND</span>
            <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>

        {/* Simplified background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Content */}
        <div className="relative z-[10] p-6 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-3">
            {/* Icon */}
            <div className="relative w-16 h-16 mx-auto mb-4">
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
            
            <div className="text-center">
              <h3
                className="text-2xl font-bold uppercase tracking-wide mb-2"
                style={{ color: item.accentColor, textShadow: `0 0 10px ${item.accentColor}60` }}
              >
                {item.title}
              </h3>
              <p className="text-base font-medium text-white/80 leading-relaxed px-2">
                {item.summary}
              </p>
            </div>
          </div>

          {/* Quick features preview */}
          <div className="space-y-2 mt-4">
            {item.features.slice(0, 2).map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-2"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: item.accentColor }}
                />
                <span className="text-sm text-white/75 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  // Product Detail Modal
  const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20"
          style={{
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9), ${product.accentColor}10)`,
            boxShadow: `0 0 50px ${product.accentColor}40, inset 0 0 30px rgba(255,255,255,0.1)`
          }}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start space-x-6 mb-8">
              <div className="relative w-20 h-20 flex-shrink-0">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 30px ${product.accentColor}60`,
                    background: `radial-gradient(circle at 30% 30%, ${product.accentColor}, ${product.accentColor}90)`
                  }}
                />
                <img
                  src={product.illustrationSrc}
                  alt={`${product.title} illustration`}
                  className="w-full h-full object-cover rounded-full relative z-[10]"
                  onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
                />
              </div>
              
              <div className="flex-1">
                <h2
                  className="text-4xl font-bold uppercase tracking-wide mb-3"
                  style={{ color: product.accentColor, textShadow: `0 0 15px ${product.accentColor}60` }}
                >
                  {product.title}
                </h2>
                <p className="text-xl text-white/80 mb-4">
                  {product.summary}
                </p>
                
                {/* What It Is - Secondary Title */}
                <h3 
                  className="text-xl font-bold font-mono tracking-wider leading-relaxed uppercase"
                  style={{ color: product.accentColor }}
                >
                  {product.title === 'OpsPipe' && (
                    <>
                      Battle-tested document parsing<br />
                      with memory and full visibility
                    </>
                  )}
                  {product.title === 'Curious' && (
                    <>
                      Emotionally aware AI designed<br />
                      for reflection and companionship
                    </>
                  )}
                  {product.title === 'Guardian' && (
                    <>
                      Screen-based emotional companion<br />
                      designed for kids and creativity
                    </>
                  )}
                  {product.title === 'MoonSignal' && (
                    <>
                      GPT-fused quant stack analyzing<br />
                      price action and market data
                    </>
                  )}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* How It Works */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: product.accentColor }}
                  />
                  <span>How It Works</span>
                </h4>
                <div className="space-y-3">
                  {product.fullDescription.howItWorks.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: product.accentColor }}
                      />
                      <span className="text-sm text-white/80 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: product.accentColor }}
                  />
                  <span>Why It Matters</span>
                </h4>
                <div 
                  className="p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <p 
                    className="text-sm leading-relaxed italic"
                    style={{ color: `${product.accentColor}dd` }}
                  >
                    {product.fullDescription.whyItMatters}
                  </p>
              </div>
            </div>
            </div>

            {/* All Features */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: product.accentColor }}
                />
                <span>Key Features</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: product.accentColor }}
                    />
                    <span className="text-sm text-white/80 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tagline */}
            {product.tagline && (
              <div className="mt-8 text-center">
                <p className="text-lg italic text-white/70 font-medium">
                  "{product.tagline}"
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Clean product grid with proper layout
  const ProductGrid = ({ currentPage, setCurrentPage }) => {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
        {OPS_BENTO_ITEMS.map((item, index) => {
          const isActive = index === currentPage;
          const isFeatured = index === currentPage;
          
          return (
              <motion.div
              key={item.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EnhancedProductCard
                item={item}
                isActive={isActive}
                isFeatured={isFeatured}
                onHover={() => setCurrentPage(index)}
                onLeave={() => {}}
                onClick={() => setSelectedProduct(item)}
              />
              </motion.div>
          );
        })}
            </div>
    );
  };

  return (
    <div 
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden z-[3]" 
      data-page="products"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 2vh, rgba(0,0,0,0.3) 4vh, rgba(0,0,0,0.6) 6vh, rgba(0,0,0,0.8) 8vh, black 10vh)'
      }}
    >
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 z-[1]">
        {/* Base gradient */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, #060b14 0%, #0a1120 30%, #131c2f 60%, rgba(98, 153, 16, 0.15) 100%)',
          }}
        />
        
        {/* Dynamic noise texture */}
        <div 
          className="absolute inset-0 opacity-40 z-[8]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noiseFilter)' opacity='0.8'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      </div>

      {/* Enhanced Nebula Effects */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(ellipse at 25% 40%, rgba(98, 153, 16, 0.25) 0%, rgba(98, 153, 16, 0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0.08) 35%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* ThoughtTrails Layer */}
      <div className="absolute inset-0 z-[5]" data-thought-trails-layer="true"></div>
      
      {/* Enhanced Content Layout - Two Column like AEGIS */}
      <div className="relative z-[10] w-full max-w-7xl mx-auto px-8 lg:px-16 h-full flex items-center">
        <div className="grid grid-cols-12 gap-12 w-full">
          
          {/* Left Column - Product Info Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="h-full relative">
              {/* Main AEGIS command card */}
              <div 
                className="backdrop-blur-xl bg-slate-900/80 rounded-2xl border border-white/25 p-7 h-full relative overflow-hidden"
                style={{
                  boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.05)',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.8))'
                }}
              >
                <div className="relative z-[10] h-full flex flex-col">
                  {/* Enhanced AEGIS Header */}
                  <div className="space-y-5 mb-7">
                    {/* Mission Control Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-lime-400"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-mono uppercase tracking-wider text-white/60">
                          MISSION CONTROL
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                          OPERATIONAL
                        </div>
                        <div className="text-xs text-white/50 font-mono">
                          v2.1.0
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Title */}
                    <div className="space-y-3">
                      <h3
                        className="text-3xl font-bold leading-tight"
                        style={{ 
                          background: 'linear-gradient(135deg, #84cc16 0%, #22d3ee 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        AEGIS<br />Command
                      </h3>
                      
                      <div className="relative">
                        <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-lime-400 rounded-full" />
                        <p className="text-white/80 text-sm leading-relaxed font-medium pl-4">
                          Your AI team, led by you. Mission-based orchestration with human oversight at every decision point.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Mission Statement */}
                  <div className="space-y-5 flex-1 overflow-y-auto">
                    {/* Core Philosophy Card */}
                    <div className="p-4 rounded-xl backdrop-blur-sm border border-lime-400/25 bg-lime-400/8">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-lime-400" />
                        <h4 className="font-semibold text-base text-lime-400">
                          Adaptive. Auditable. Alive.
                        </h4>
                      </div>
                      <p className="text-white/80 text-xs leading-relaxed">
                        The thinking engine behind CuriousLabs — orchestrating AI, logic, and control across all products.
                      </p>
                    </div>

                    {/* Core Principles Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <h5 className="text-xs font-mono uppercase tracking-wider text-white/70">
                          CORE PRINCIPLES
                        </h5>
                      </div>
                      
                      <div className="space-y-2">
                        {[
                          { 
                            text: 'Real AI agents in parallel with roles, memory, and autonomy',
                            status: 'ACTIVE',
                            metric: '12 agents'
                          },
                          { 
                            text: 'Central mission engine governing every command',
                            status: 'OPERATIONAL', 
                            metric: '99.7% uptime'
                          },
                          { 
                            text: 'Complete logs, metrics, and traces for every execution',
                            status: 'MONITORING',
                            metric: '2.3M events'
                          }
                        ].map((principle, index) => (
                          <div 
                            key={`principle-${index}`}
                            className="group p-3 rounded-lg bg-slate-800/40 border border-white/15 hover:border-lime-400/35 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1 min-w-0">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-lime-400" />
                                <span className="text-white/80 text-xs leading-relaxed">{principle.text}</span>
                              </div>
                              <div className="text-right ml-2 flex-shrink-0">
                                <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                                  {principle.status}
                                </div>
                                <div className="text-xs text-white/50 font-mono">
                                  {principle.metric}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced AEGIS SDK Section */}
                    <div className="group/aegis-sdk">
                      <div 
                        className="p-3 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-cyan-400/35 hover:bg-white/12"
                        style={{ borderColor: 'rgba(34, 211, 238, 0.25)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-cyan-400 truncate">
                                AEGIS SDK
                              </h4>
                              <p className="text-xs text-white/60 truncate">
                                Developer toolkit for mission-critical AI
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="mt-5 pt-5 border-t border-white/15">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-lime-400/35">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-2.5 h-2.5 rounded-full bg-lime-400"
                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div>
                            <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">System Status</div>
                            <div className="text-white/80 text-xs">All agents operational</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-lime-400 font-mono font-bold">ACTIVE</div>
                          <div className="text-xs text-white/50 font-mono">24/7</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Product Grid */}
          <div className="col-span-12 lg:col-span-8 relative">
            {/* Header Section */}
            <div className="space-y-6 mb-10">
              {/* Mission Control Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-lime-400"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-lime-400/80 text-sm font-mono uppercase tracking-wider">Products Grid</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-lime-400 uppercase tracking-wider">
                    ACTIVE
                  </div>
                  <div className="text-xs text-white/50 font-mono">
                    {OPS_BENTO_ITEMS.length} Systems
                  </div>
                </div>
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
                MISSION<br />
                <span className="text-white/90 text-4xl lg:text-5xl normal-case">Products</span>
              </h2>
              
              <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                Advanced operational systems designed for mission-critical environments.
              </p>
            </div>

            {/* Product Grid - Moderately Larger and Better Spaced */}
            <div className="h-[550px]">
              <div className="grid grid-cols-2 grid-rows-2 gap-8 h-full">
                {OPS_BENTO_ITEMS.map((item, index) => {
                  const isActive = index === currentPage;
                  const isFeatured = index === currentPage;
                  
                  return (
                    <motion.div
                      key={item.id}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border cursor-pointer group"
                        style={{
                          background: isFeatured 
                            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7), ${item.accentColor}20)`
                            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
                          borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.25)',
                          boxShadow: isActive
                            ? `0 0 30px ${item.accentColor}40, inset 0 0 20px rgba(255,255,255,0.1)`
                            : 'inset 0 0 5px rgba(255,255,255,0.05)',
                        }}
                        onMouseEnter={() => setCurrentPage(index)}
                        onMouseLeave={() => {}}
                        onClick={() => setSelectedProduct(item)}
                      >
                        {/* Status Indicator */}
                        <div className="absolute top-6 right-6 z-20">
                          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <div 
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ backgroundColor: item.accentColor }}
                            />
                            <span className="text-sm font-mono text-white/80">
                              {isActive ? 'ACTIVE' : 'STANDBY'}
                            </span>
                          </div>
                        </div>

                        {/* Click indicator */}
                        <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                            <span className="text-sm font-mono text-white/80">CLICK TO EXPAND</span>
                            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </div>
                        </div>

                        {/* Background texture */}
                        <div
                          className="absolute inset-0 opacity-15 pointer-events-none"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                            mixBlendMode: 'overlay',
                          }}
                        />
                        
                        {/* Content */}
                        <div className="relative z-[10] p-8 h-full flex flex-col justify-between">
                          {/* Header */}
                          <div className="space-y-4">
                            {/* Icon */}
                            <div className="relative w-20 h-20 mx-auto mb-6">
                              <div 
                                className="absolute inset-0 rounded-full"
                                style={{
                                  boxShadow: `0 0 25px ${item.accentColor}60`,
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
                            
                            <div className="text-center">
                              <h3
                                className="text-3xl font-bold uppercase tracking-wide mb-3"
                                style={{ color: item.accentColor, textShadow: `0 0 15px ${item.accentColor}60` }}
                              >
                                {item.title}
                              </h3>
                              <p className="text-base font-medium text-white/80 leading-relaxed px-2">
                                {item.summary}
                              </p>
                            </div>
                          </div>

                          {/* Quick features preview */}
                          <div className="space-y-3 mt-6">
                            {item.features.slice(0, 2).map((feature, featureIndex) => (
                              <div 
                                key={featureIndex} 
                                className="flex items-start space-x-3"
                              >
                                <div 
                                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: item.accentColor }}
                                />
                                <span className="text-sm text-white/75 leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
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

  // Page 3 (Services) Cosmic Environment Component
  const ServicesCosmicEnvironment = () => (
    <div className="absolute inset-0 overflow-hidden z-[-20]">
      {/* Layer 1: Services Page Enhanced Base Gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
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
      
      {/* Layer 2: Services Page Floating Cosmic Orbs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const size = 20 + Math.random() * 60;
        const colors = ['#FF6B35', '#FF8C42', '#F4511E'];
        const color = colors[i % 3];

  return (
      <motion.div
            key={`services-cosmic-orb-${i}`}
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
      
      {/* Layer 3: Services Page Enhanced Cosmic Grid - REMOVED */}
      
      {/* Layer 4: Services Page Enhanced Nebula Effects */}
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
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmicNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmicNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px'
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
      <ServicesCosmicEnvironment />
      
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
      style={{ marginTop: '-10vh' }}
      ref={containerRef}
    >
      {/* Spanning Background Gradient - Smooth transitions across all three pages */}
      <motion.div 
        className="absolute inset-0 w-[300vw] h-full z-[-10]"
        animate={{ x: `-${currentPage * 100}vw` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to right,
                /* AEGIS Page (0-33.33%) */
                #060b14 0%,
                #0a1120 8%,
                #131c2f 16%,
                rgba(98, 153, 16, 0.15) 25%,
                rgba(19, 28, 47, 0.8) 30%,
                
                /* Transition to Products (30-40%) */
                rgba(15, 23, 42, 0.9) 33.33%,
                rgba(30, 41, 59, 0.8) 35%,
                rgba(45, 27, 79, 0.7) 38%,
                
                /* Products Page (33.33-66.66%) */
                #0f172a 40%,
                #1e293b 45%,
                #2d1b4f 55%,
                rgba(162, 52, 179, 0.4) 60%,
                rgba(186, 86, 16, 0.3) 63%,
                
                /* Transition to Services (63-70%) */
                rgba(15, 23, 42, 0.8) 66.66%,
                rgba(30, 41, 59, 0.7) 68%,
                rgba(45, 27, 79, 0.6) 70%,
                
                /* Services Page (66.66-100%) */
                #0f172a 72%,
                #1e293b 78%,
                #2d1b4f 85%,
                rgba(255, 107, 53, 0.15) 92%,
                rgba(255, 140, 66, 0.1) 100%
              )
            `,
          }}
        />
        
        {/* Spanning Noise Texture - Consistent across all pages */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='spanningNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23spanningNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px'
          }}
        />
      </motion.div>

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