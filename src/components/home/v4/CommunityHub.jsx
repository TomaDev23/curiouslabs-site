import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CommunityHub - Community section showcasing forum-like discussion and activity
 * Features animated posts, user avatars, and interaction elements
 */
const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState('trending');
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.section 
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/80"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Join Our Curious Community</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with developers, share your projects, and learn from real success stories. Our community is where innovation happens.
          </p>
        </motion.div>
        
        {/* Community board with tabs */}
        <div className="max-w-5xl mx-auto">
          {/* Tab navigation */}
          <motion.div 
            className="flex mb-6 bg-gray-800/50 rounded-lg p-1 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {['trending', 'recent', 'projects', 'discussions'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
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
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {posts.map((post) => (
              <CommunityPost key={post.id} post={post} variants={itemVariants} />
            ))}
          </motion.div>
          
          {/* Join button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-purple-500/20"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Join The Community
            </motion.button>
            <p className="text-gray-400 mt-4">
              Already 2,500+ curious devs sharing their knowledge
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Community post component
const CommunityPost = ({ post, variants }) => {
  return (
    <motion.div 
      className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/30 transition-all"
      variants={variants}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="flex items-start">
        {/* Author avatar */}
        <div className="flex-shrink-0 mr-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">
            {post.avatar}
          </div>
        </div>
        
        {/* Post content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-400 text-sm">
                Posted by <span className="text-purple-400">{post.author}</span> • {post.timeAgo}
              </p>
            </div>
            <motion.button 
              className="text-gray-400 hover:text-white"
              whileHover={{ scale: 1.1 }}
            >
              ⋮
            </motion.button>
          </div>
          
          <p className="text-gray-300 mb-4">{post.content}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-700/60 text-blue-300 text-xs py-1 px-2 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center text-sm text-gray-400">
            <motion.button 
              className="flex items-center mr-6 hover:text-purple-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-1">👍</span> {post.likes} Likes
            </motion.button>
            <motion.button 
              className="flex items-center mr-6 hover:text-purple-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-1">💬</span> {post.comments} Comments
            </motion.button>
            <motion.button 
              className="flex items-center hover:text-purple-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-1">↗️</span> Share
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHub; 