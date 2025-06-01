import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
// LEGACY: import NavBar from '../components/NavBar';
import Footer from '../components/Footer_legacy';
import BackgroundLayerAtomic from '../components/atomic/BackgroundLayerAtomic';
import { IMAGES } from '../utils/assets';

export default function Blog() {
  const [activeSection, setActiveSection] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI Development",
      excerpt: "Exploring how artificial intelligence is reshaping the development landscape and what it means for the future.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Technology",
      status: "Coming Soon",
      icon: "🤖"
    },
    {
      id: 2,
      title: "Building Scalable Web Applications",
      excerpt: "Best practices and architectural patterns for creating applications that can grow with your business.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Development",
      status: "Coming Soon",
      icon: "🏗️"
    },
    {
      id: 3,
      title: "Mission Control: Our Design Philosophy",
      excerpt: "How we approach user experience design with a mission control mindset for maximum efficiency.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Design",
      status: "Coming Soon",
      icon: "🎯"
    }
  ];

  const categories = [
    { name: "All", icon: "📡", count: 12 },
    { name: "AI & Technology", icon: "🤖", count: 4 },
    { name: "Development", icon: "⚡", count: 5 },
    { name: "Design", icon: "🎨", count: 3 }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Helmet>
        <title>Transmissions - Insights & Updates | CuriousLabs</title>
        <meta name="description" content="Read the latest insights, case studies and updates from the CuriousLabs mission control team." />
        <meta property="og:title" content="CuriousLabs Transmissions - Mission Insights" />
        <meta property="og:description" content="Read the latest insights, case studies and updates from the CuriousLabs mission control team." />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://curiouslabs.io/blog" />
      </Helmet>
      
      {/* Background System */}
      <BackgroundLayerAtomic />
      
      {/* Mission Control Navbar */}
      <MissionControlNavbar />
      
      {/* Atmospheric glow effects */}
      <div
        className="absolute z-[15] w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none"
        style={{
          top: '20%',
          right: '10%',
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
                Mission <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">Transmissions</span>
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 w-32 mx-auto"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-space text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
            >
              Intelligence reports, technical briefings, and mission updates from the CuriousLabs command center.
            </motion.p>
          </div>

          {/* Mission Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-6 shadow-2xl shadow-black/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-lime-400 text-sm tracking-wider font-semibold">TRANSMISSION STATUS</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full border border-lime-400/30 bg-black/40">
                  <span className="text-xs font-mono text-white/70">ARTICLES:</span>
                  <span className="text-xs font-mono text-lime-400 font-semibold">INCOMING</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    className="group cursor-pointer p-3 rounded-lg bg-gradient-to-br from-lime-400/5 to-emerald-500/5 border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300"
                    onMouseEnter={() => setActiveSection(category.name)}
                    onMouseLeave={() => setActiveSection(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-space text-sm text-white font-medium">{category.name}</span>
                      </div>
                      <div className="text-xs font-mono text-lime-400 bg-black/30 px-2 py-0.5 rounded">
                        {category.count}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group cursor-pointer"
              >
                <div className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-xl p-6 hover:border-lime-400/30 transition-all duration-500 hover:bg-black/50 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{post.icon}</div>
                    <div className="text-xs font-mono text-white/50 bg-black/30 px-2 py-1 rounded">
                      {post.category}
                    </div>
                  </div>
                  
                  <h3 className="font-space text-lg font-semibold text-white mb-3 group-hover:text-lime-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-xs font-mono text-white/50">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                      <span className="text-xs font-mono text-yellow-400">{post.status}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Coming Soon Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="backdrop-blur-2xl bg-black/40 border border-lime-400/20 rounded-xl p-8 shadow-2xl shadow-black/60 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-lime-400/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              
              <h2 className="font-space text-2xl font-bold text-white mb-4">
                Transmission Array <span className="text-lime-400">Initializing</span>
              </h2>
              
              <p className="text-white/70 max-w-lg mx-auto mb-6 leading-relaxed">
                Our content transmission systems are currently being calibrated. 
                Expect incoming articles, technical briefings, and mission reports soon.
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-lime-400/30 bg-black/40">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-lime-400 tracking-wider">SYSTEM ONLINE</span>
                </div>
                
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-black/40">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-yellow-400 tracking-wider">CONTENT LOADING</span>
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