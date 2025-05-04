import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import { useBreakpoint } from '../../../hooks/useBreakpoint.js';

/**
 * CommunityHub - Community section showcasing forum-like discussion and activity
 * Features animated posts, user avatars, and interaction elements
 */
const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const { ref, inView } = useScrollReveal(0.2);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
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
  
  // Show fewer posts on mobile for better performance
  const displayPosts = isMobile ? posts.slice(0, 3) : posts;
  
  return (
    <motion.section 
      ref={ref}
      className="relative py-8 md:py-12 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/80"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
      </div>
      
      {/* Floating particles - fewer on mobile for better performance */}
      {[...Array(isMobile ? 8 : 15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-500/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            opacity: [0.2, 0.8, 0.2],
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
        {/* Community board with tabs */}
        <div className="max-w-5xl mx-auto">
          {/* Tab navigation - scrollable on mobile */}
          <motion.div 
            className={`${isMobile ? 'flex overflow-x-auto pb-2' : 'flex'} mb-4 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm`}
            variants={itemVariants}
          >
            {['trending', 'recent', 'projects', 'discussions'].map((tab) => (
              <button
                key={tab}
                className={`${isMobile ? 'flex-none' : 'flex-1'} py-2 px-4 rounded-md transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>
          
          {/* Posts list */}
          <motion.div
            className="space-y-3 md:space-y-4 trending-posts"
            variants={itemVariants}
          >
            {displayPosts.map((post, index) => (
              <CommunityPost 
                key={post.id} 
                post={post} 
                custom={index} 
                isMobile={isMobile}
              />
            ))}
          </motion.div>
          
          {/* Show "View More" button on mobile when posts are truncated */}
          {isMobile && posts.length > displayPosts.length && (
            <motion.div 
              className="text-center mt-3"
              variants={itemVariants}
            >
              <button className="text-purple-400 hover:text-purple-300 underline text-sm">
                View More Posts
              </button>
            </motion.div>
          )}
          
          {/* Join button */}
          <motion.div 
            className="text-center mt-6 md:mt-8"
            variants={itemVariants}
          >
            <MagneticButton
              className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/20 ${isMobile ? 'w-full' : ''}`}
            >
              Join The Community
            </MagneticButton>
            <p className="text-gray-400 mt-2 text-sm md:text-base">
              Already 2,500+ curious devs sharing their knowledge
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Community post component with responsive design
const CommunityPost = ({ post, custom, isMobile }) => {
  return (
    <motion.div 
      className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700 hover:border-purple-500/30 transition-all"
      variants={itemVariants}
      custom={custom}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex items-start">
        {/* Author avatar - smaller on mobile */}
        <div className="flex-shrink-0 mr-3 md:mr-4">
          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {post.avatar}
          </div>
        </div>
        
        {/* Post content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="min-w-0 pr-2">
              <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} truncate`}>{post.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                Posted by <span className="text-purple-400">{post.author}</span> • {post.timeAgo}
              </p>
            </div>
            <motion.button 
              className="text-gray-400 hover:text-white flex-shrink-0"
              whileHover={{ scale: 1.1 }}
            >
              ⋮
            </motion.button>
          </div>
          
          {/* Content - truncated on mobile */}
          <p className={`text-gray-300 mb-4 ${isMobile ? 'text-sm line-clamp-2' : ''}`}>{post.content}</p>
          
          {/* Tags - smaller on mobile */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className={`bg-gray-700/60 text-blue-300 ${isMobile ? 'text-xs py-0.5 px-1.5' : 'text-xs py-1 px-2'} rounded-full`}
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Interaction buttons - with responsive text size */}
          <div className="flex items-center space-x-4 text-gray-400">
            <button className="flex items-center space-x-1 hover:text-purple-300">
              <span>❤️</span>
              <span className={isMobile ? 'text-xs' : 'text-sm'}>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-300">
              <span>💬</span>
              <span className={isMobile ? 'text-xs' : 'text-sm'}>{post.comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-300">
              <span>🔄</span>
              <span className={isMobile ? 'text-xs' : 'text-sm'}>Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHub; 