import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import { useBreakpoint } from '../../../hooks/useBreakpoint.js';
import { createPortal } from 'react-dom';
import { useMediaQuery } from '../../../hooks/useMediaQuery.js';

/**
 * CommunityHub Component
 * 
 * A modern community section with:
 * - Fixed height posts view
 * - Floating page experience
 * - Responsive design
 * - Accessibility features
 * - Visual indicators and animations
 * 
 * NOTE: There is a duplicate FacebookStylePost component in this file.
 * To fix this issue, we need to:
 * 1. Keep only one FacebookStylePost component
 * 2. Make sure all references use the same component
 */

/**
 * CommunityHub - Community section showcasing forum-like discussion and activity
 * Features animated posts, user avatars, and interaction elements
 * Now with float page functionality for full experience
 */
const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [floatPageOpen, setFloatPageOpen] = useState(false);
  const { ref, inView } = useScrollReveal(0.2);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleOpenFloatPage = () => {
    if (typeof window !== 'undefined') {
      // Store current scroll position for accessibility
      sessionStorage.setItem('scrollPosition', window.scrollY);
      
      // Show loading indicator first
      setIsLoading(true);
      
      // Small delay before showing the float page for smoother transition
      setTimeout(() => {
        setFloatPageOpen(true);
        
        // Hide loading indicator after content is visible
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }, 100);
    }
  };
  
  // Mock community posts data
  const posts = [
    {
      id: 1,
      author: 'DevExplorer',
      avatar: '👩‍💻',
      title: 'Just shipped my first React project with CuriousLabs!',
      content: 'After struggling with state management for weeks, the team at CuriousLabs helped me implement a clean Redux architecture. My app is now 3x faster!',
      likes: 42,
      comments: 12,
      tags: ['react', 'redux', 'performance'],
      timeAgo: '2 days ago'
    },
    {
      id: 2,
      author: 'AIEnthusiast',
      avatar: '🤖',
      title: 'How we integrated GPT-4 with our codebase',
      content: 'CuriousLabs guided us through the entire process of adding AI-powered code suggestions to our IDE. Our dev team productivity is through the roof now!',
      likes: 78,
      comments: 23,
      tags: ['ai', 'gpt4', 'devtools'],
      timeAgo: '1 week ago'
    },
    {
      id: 3,
      author: 'CloudArchitect',
      avatar: '☁️',
      title: 'Serverless migration success story',
      content: 'Our monolithic app was costing us a fortune to maintain. The serverless architecture designed by CuriousLabs reduced our costs by 60% while improving scalability.',
      likes: 54,
      comments: 17,
      tags: ['serverless', 'aws', 'architecture'],
      timeAgo: '3 days ago'
    },
    {
      id: 4,
      author: 'SecurityGuru',
      avatar: '🔒',
      title: 'How we fixed critical vulnerabilities in our authentication system',
      content: 'CuriousLabs performed a security audit that uncovered several issues we never knew existed. All fixed now, and we have proper testing in place!',
      likes: 36,
      comments: 8,
      tags: ['security', 'auth', 'testing'],
      timeAgo: '5 days ago'
    }
  ];
  
  // Rotate posts every 5 seconds
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationIndex(prevIndex => (prevIndex + 1) % posts.length);
    }, 5000);
    
    return () => clearInterval(rotationInterval);
  }, [posts.length]);
  
  // Get posts for display based on rotation index - memoized
  const getRotatedPosts = () => {
    const count = isMobile ? 2 : 3;
    const rotatedPosts = [];
    
    for (let i = 0; i < count; i++) {
      const index = (rotationIndex + i) % posts.length;
      rotatedPosts.push(posts[index]);
    }
    
    return rotatedPosts;
  };
  
  // Memoize posts to prevent unnecessary re-renders
  const displayPosts = React.useMemo(() => getRotatedPosts(), [rotationIndex, isMobile, posts]);
  
  // Preload float page for instant open
  useEffect(() => {
    // Preload the float page component after initial render
    const timer = setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.href = window.location.href;
      document.head.appendChild(link);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Debug logging only in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Float page state:", floatPageOpen);
    }
  }, [floatPageOpen]);
  
  return (
    <>
      {/* Inject CSS animation */}
      <style>{`
        @keyframes borderGlow {
          0% { box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.3), 0 0 15px 2px rgba(253, 224, 71, 0.2); }
          50% { box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.9), 0 0 20px 5px rgba(253, 224, 71, 0.5); }
          100% { box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.3), 0 0 15px 2px rgba(253, 224, 71, 0.2); }
        }
        
        .border-glow {
          animation: borderGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Added 50vh padding top */}
      <div className="h-[50vh]"></div>
      
      {/* Construction site wrapper with yellow glow and ribbon */}
      <div className="relative">
        {/* Construction ribbon - more modern and subtle */}
        <div className="absolute -top-5 left-0 w-full overflow-hidden h-5 z-20">
          <div className="w-full h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 flex items-center relative">
            <div className="animate-marquee whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-2 text-gray-800 font-medium text-xs tracking-wider">🚧 UNDER CONSTRUCTION 🚧 COMING SOON 🚧</span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Construction corner ribbons - more elegant */}
        <div className="absolute -top-2 -left-2 w-24 h-24 overflow-hidden z-20">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-center text-gray-800 font-medium text-xs rotate-45 transform origin-bottom-right absolute top-0 right-0 left-0 w-32 py-1 shadow-md">
            🚧 COMING SOON
          </div>
        </div>
        
        {/* Yellow construction glow effect - more subtle */}
        <div className="absolute inset-0 z-0" 
          style={{
            boxShadow: '0 0 35px 2px rgba(234, 179, 8, 0.2), 0 0 15px 2px rgba(234, 179, 8, 0.1) inset',
            pointerEvents: 'none'
          }}>
        </div>
        
        {/* Caution tape borders - more refined */}
        <div className="absolute top-0 left-0 right-0 h-2 z-10" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #222, #222 10px, #eab308 10px, #eab308 20px)'
          }}>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 z-10" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #222, #222 10px, #eab308 10px, #eab308 20px)'
          }}>
        </div>
        
        {/* Construction icons - more subtle placement */}
        <div className="absolute top-8 right-6 text-2xl z-20 opacity-80">🏗️</div>
        <div className="absolute bottom-8 left-6 text-2xl z-20 opacity-80">👷</div>
        
    <motion.section 
      ref={ref}
          className="relative py-10 md:py-14 overflow-hidden border border-yellow-500/50 rounded-xl shadow-lg border-glow"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
          {/* Background elements - enhanced with more modern gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/90"></div>
      <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-500/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
      </div>
      
          {/* Floating particles - more refined with blur */}
      {[...Array(isMobile ? 8 : 15)].map((_, i) => (
        <motion.div
          key={i}
              className="absolute w-1 h-1 rounded-full bg-indigo-500/40 blur-[0.5px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
                opacity: [0.2, 0.7, 0.2],
            scale: [1, Math.random() * 0.5 + 1, 1]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
            {/* Community board with tabs - more modern styling */}
        <div className="max-w-5xl mx-auto">
          {/* Tab navigation - scrollable on mobile */}
          <motion.div 
                className={`${isMobile ? 'flex overflow-x-auto pb-2' : 'flex'} mb-6 bg-gray-800/60 rounded-xl p-1.5 backdrop-blur-md shadow-inner`}
            variants={itemVariants}
                role="tablist"
                aria-label="Content categories"
          >
            {['trending', 'recent', 'projects', 'discussions'].map((tab) => (
              <button
                key={tab}
                    className={`${isMobile ? 'flex-none' : 'flex-1'} py-2.5 px-5 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`panel-${tab}`}
                    id={`tab-${tab}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>
          
              {/* Posts list - refined styling with rotation */}
          <motion.div
                className="relative"
            variants={itemVariants}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
          >
                <div className="space-y-4 md:space-y-5 trending-posts" style={{ height: isMobile ? "180px" : "250px", overflow: "hidden" }}>
                  <AnimatePresence mode="wait">
            {displayPosts.map((post, index) => (
              <CommunityPost 
                        key={`${post.id}-${rotationIndex}`}
                post={post} 
                custom={index} 
                isMobile={isMobile}
              />
            ))}
                  </AnimatePresence>
                </div>
                
                {/* Post rotation indicator */}
                <div className="absolute bottom-24 left-0 right-0 flex justify-center space-x-2 z-20">
                  {posts.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === rotationIndex ? 'bg-indigo-500 w-3' : 'bg-gray-500/50'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Gradient fade overlay - more refined */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
          </motion.div>
          
              {/* View Full Page button - more modern styling */}
            <motion.div 
                className="text-center mt-8 md:mt-10"
              variants={itemVariants}
            >
                <motion.button
                  type="button"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3.5 px-10 rounded-full shadow-lg shadow-indigo-500/30 mx-auto transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={handleOpenFloatPage}
                  aria-label="View full community hub page"
                  aria-haspopup="dialog"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-2">Loading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="ml-2">View Full Community</span>
                    </>
                  )}
                </motion.button>
                
                <p className="text-gray-400 mt-3 text-sm md:text-base">
              Already 2,500+ curious devs sharing their knowledge
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
      </div>
      
      {/* Added 50vh padding bottom */}
      <div className="h-[50vh]"></div>
      
      {/* Float page implementation using portal for better rendering */}
      {typeof document !== 'undefined' && createPortal(
        <FloatPageContent 
          isOpen={floatPageOpen} 
          onClose={() => setFloatPageOpen(false)}
          posts={posts}
        />,
        document.body
      )}
    </>
  );
};

// Separated float page content component
const FloatPageContent = React.memo(({ isOpen, onClose, posts }) => {
  const [activeTab, setActiveTab] = useState('latest');
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Save previous focus
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus when closing
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore scroll position
      if (!isOpen && typeof window !== 'undefined') {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition, 10));
          }, 100);
        }
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleClose = () => {
    // Set closing state for animation
    setIsClosing(true);
    
    // Delay actual close to allow animation
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Early return if not open
  if (!isOpen) return null;

  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => 
    activeTab === 'latest' || post.tags.includes(activeTab)
  );

  return createPortal(
    <>
      {/* Inject CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-out forwards;
        }
        
        @keyframes borderGlow {
          0% { box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.3), 0 0 15px 2px rgba(253, 224, 71, 0.2); }
          50% { box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.9), 0 0 20px 5px rgba(253, 224, 71, 0.5); }
          100% { box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.3), 0 0 15px 2px rgba(253, 224, 71, 0.2); }
        }
      `}</style>
    
      <div 
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-hub-title"
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
          onClick={handleClose}
        />

        {/* Content container */}
        <div 
          ref={modalRef}
          className={`absolute bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl border-glow ${
            isMobile ? 'inset-0 rounded-none' : ''
          } ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          style={{ 
            maxWidth: isMobile ? "100%" : "98%", 
            maxHeight: isMobile ? "100%" : "90vh",
            width: isMobile ? "100%" : "1200px"
          }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Construction banner */}
          <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 border-b border-gray-800/20 overflow-hidden">
            <div className="flex items-center justify-center h-8 relative">
              <div className="absolute inset-0 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-2 text-gray-800 font-medium text-xs tracking-wider">🚧 UNDER CONSTRUCTION 🚧 COMING SOON 🚧</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Header with subtle gradient accent */}
          <div className="relative bg-gradient-to-r from-indigo-600/90 to-blue-600/90 h-14 flex items-center justify-between px-6">
            <h2 id="community-hub-title" className="text-xl font-bold text-white">Community Hub</h2>
            <div 
              className="text-white cursor-pointer z-20 relative"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              style={{ pointerEvents: 'auto' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          {/* Main content area */}
          <div className={`flex ${isMobile ? 'h-[calc(100vh-56px-68px)]' : 'h-[calc(90vh-56px-68px)]'}`}>
            {/* Left sidebar - navigation */}
            <div className="hidden md:block w-56 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2">Feeds</h3>
                <nav>
                  <button 
                    className="w-full flex items-center space-x-2 py-2.5 px-3 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm"
                  >
                    <span className="text-blue-600 dark:text-blue-400">📰</span>
                    <span>Latest Posts</span>
                  </button>
                  {['Trending', 'Popular', 'Following', 'Bookmarks'].map(item => (
                    <button 
                      key={item}
                      className="w-full flex items-center space-x-2 py-2.5 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 font-medium text-sm mt-1.5"
                    >
                      <span className="text-gray-500 dark:text-gray-400">{item === 'Trending' ? '🔥' : item === 'Popular' ? '⭐' : item === 'Following' ? '👥' : '🔖'}</span>
                      <span>{item}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2">Categories</h3>
                <nav>
                  {['Projects', 'Discussions', 'Questions', 'Resources', 'Events'].map(item => (
                    <button 
                      key={item}
                      className="w-full flex items-center space-x-2 py-2.5 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 font-medium text-sm mt-1.5"
                    >
                      <span className="text-gray-500 dark:text-gray-400">{
                        item === 'Projects' ? '📂' : 
                        item === 'Discussions' ? '💬' : 
                        item === 'Questions' ? '❓' : 
                        item === 'Resources' ? '📚' : 
                        '📅'
                      }</span>
                      <span>{item}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main content area - wider */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
              {/* Tab navigation - mobile only */}
              <div 
                className="md:hidden flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                role="tablist"
                aria-label="Content categories"
              >
                {['Latest', 'Trending', 'Projects', 'Discussions', 'Questions'].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`flex-none py-3 px-5 text-sm font-medium border-b-2 ${
                      activeTab === tab.toLowerCase()
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                        : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                    }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    role="tab"
                    aria-selected={activeTab === tab.toLowerCase()}
                    aria-controls={`panel-${tab.toLowerCase()}`}
                    id={`tab-${tab.toLowerCase()}`}
                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    whileTap={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
              
              {/* Content header with search */}
              <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Latest Posts</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search posts..." 
                    className="pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 dark:text-gray-200 w-64"
                    aria-label="Search posts"
                  />
                  <svg className="w-5 h-5 absolute left-2.5 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Posts feed - wider layout */}
              <div 
                className={`flex-1 overflow-y-auto ${isMobile ? 'p-3 space-y-4' : 'p-6 space-y-6'}`}
                role="tabpanel"
                id={`panel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                {/* New post composer */}
                <div className={`bg-white dark:bg-gray-800 rounded-lg shadow ${isMobile ? 'p-3' : 'p-4'} border border-gray-200 dark:border-gray-700`}>
                  <div className={`flex items-center ${isMobile ? 'space-x-3 mb-2' : 'space-x-4 mb-3'}`}>
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center ${isMobile ? 'text-sm' : 'text-base'} text-white`}>
                      👤
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Share something with the community..." 
                        className={`w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full ${
                          isMobile ? 'px-4 py-2 text-sm' : 'px-5 py-2.5 text-base'
                        } focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 dark:text-gray-200`}
                        aria-label="Create a new post"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                    {/* On mobile, show only icons */}
                    <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center space-x-1.5 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50">
                      <span>📷</span>
                      {!isMobile && <span>Photo</span>}
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center space-x-1.5 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50">
                      <span>📎</span>
                      {!isMobile && <span>Attach</span>}
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm flex items-center space-x-1.5 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50">
                      <span>🏷️</span>
                      {!isMobile && <span>Tag</span>}
                    </button>
                  </div>
                </div>
                
                {/* Posts - vertical feed layout */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  {filteredPosts.map((post) => (
                    <FacebookStylePost key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right sidebar - stats and trending - narrower */}
            <div className="hidden lg:block w-56 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Community Stats</h3>
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Members</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">2,500+</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Posts</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">14,320</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Active now</span>
                    <span className="font-medium text-green-600 dark:text-green-400">142</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['react', 'javascript', 'webdev', 'ai', 'design', 'performance'].map(tag => (
                    <span 
                      key={tag}
                      className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs py-1 px-2.5 rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
});

// Optimize FacebookStylePost with fixed dimensions to reduce layout shifts
const FacebookStylePost = React.memo(({ post }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <motion.div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow ${isMobile ? 'p-3' : 'p-5'} border border-gray-200 dark:border-gray-700`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      style={{
        willChange: 'transform',
        contain: 'content'
      }}
    >
      {/* Post header */}
      <div className={`flex items-start justify-between ${isMobile ? 'mb-2' : 'mb-4'}`}>
        <div className="flex items-start">
          <div className={`${isMobile ? 'w-10 h-10 mr-2' : 'w-12 h-12 mr-3'} rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white`}>
            {post.avatar}
          </div>
          <div>
            <h4 className={`font-medium text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{post.author}</h4>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400`}>{post.timeAgo}</p>
          </div>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      
      {/* Post content */}
      <div className={`${isMobile ? 'mb-3' : 'mb-4'}`}>
        <h3 className={`font-medium text-gray-900 dark:text-white ${isMobile ? 'text-base mb-1' : 'text-lg mb-2'}`}>{post.title}</h3>
        <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm line-clamp-3' : 'text-base'} leading-relaxed`}>{post.content}</p>
      </div>
      
      {/* Tags */}
      <div className={`flex flex-wrap gap-1.5 ${isMobile ? 'mb-3' : 'gap-2 mb-4'}`}>
        {post.tags.map(tag => (
          <span 
            key={tag} 
            className={`bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ${isMobile ? 'text-xs py-0.5 px-2' : 'text-sm py-1 px-2.5'} rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer`}
          >
            #{tag}
          </span>
        ))}
      </div>
      
      {/* Post stats */}
      <div className={`flex items-center justify-between ${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-700`}>
        <div className="flex items-center space-x-1.5">
          <span className="flex items-center space-x-0.5">
            <span className={`bg-blue-500 text-white rounded-full ${isMobile ? 'w-4 h-4' : 'w-5 h-5'} flex items-center justify-center ${isMobile ? 'text-[10px]' : 'text-xs'}`}>👍</span>
            <span className={`bg-red-500 text-white rounded-full ${isMobile ? 'w-4 h-4' : 'w-5 h-5'} flex items-center justify-center ${isMobile ? 'text-[10px]' : 'text-xs'} -ml-1`}>❤️</span>
          </span>
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>{post.comments} comments</span>
          {!isMobile && <span>3 shares</span>}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between pt-3">
        <button className="flex-1 flex items-center justify-center space-x-2 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          {!isMobile && <span className="text-sm">Like</span>}
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {!isMobile && <span className="text-sm">Comment</span>}
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {!isMobile && <span className="text-sm">Share</span>}
        </button>
      </div>
    </motion.div>
  );
});

// Optimize CommunityPost with fixed dimensions to reduce layout shifts
const CommunityPost = React.memo(({ post, custom, isMobile }) => {
  return (
    <motion.div 
      className="bg-gray-800/70 backdrop-blur-md rounded-xl p-4 md:p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all"
      variants={itemVariants}
      custom={custom}
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        willChange: 'transform',
        contain: 'content'
      }}
    >
      <div className="flex items-start">
        {/* Author avatar - smaller on mobile */}
        <div className="flex-shrink-0 mr-3 md:mr-4">
          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ${isMobile ? 'text-lg' : 'text-xl'} shadow-md`}>
            {post.avatar}
          </div>
        </div>
        
        {/* Post content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="min-w-0 pr-2">
              <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} truncate text-white`}>{post.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                Posted by <span className="text-indigo-400">{post.author}</span> • {post.timeAgo}
              </p>
            </div>
            <motion.button 
              className="text-gray-400 hover:text-white flex-shrink-0 p-1 rounded-full hover:bg-gray-700/50"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </motion.button>
          </div>
          
          {/* Content - truncated on mobile */}
          <p className={`text-gray-300 mb-4 ${isMobile ? 'text-sm line-clamp-2' : 'leading-relaxed'}`}>{post.content}</p>
          
          {/* Tags - smaller on mobile */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className={`bg-gray-700/60 text-indigo-300 ${isMobile ? 'text-xs py-0.5 px-2' : 'text-xs py-1 px-2.5'} rounded-full`}
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Interaction buttons - with responsive text size */}
          <div className="flex items-center space-x-5 text-gray-400">
            <button className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className={isMobile ? 'text-xs' : 'text-sm'}>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className={isMobile ? 'text-xs' : 'text-sm'}>{post.comments}</span>
            </button>
            <button className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className={isMobile ? 'text-xs' : 'text-sm'}>Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default React.memo(CommunityHub); 