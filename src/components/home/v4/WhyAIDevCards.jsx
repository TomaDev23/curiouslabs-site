import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';
import ServiceCardShell from './ServiceCardShell';

/**
 * WhyAIDevCards - Section displaying benefits of AI-assisted development
 * Features animated cards with hover effects and visual polish
 */
const WhyAIDevCards = () => {
  // Get scroll reveal functionality
  const { ref, inView } = useScrollReveal(0.2);

  // Cards data for AI development benefits
  const aiDevBenefits = [
    {
      title: "Accelerated Development",
      description: "Reduce development time by up to 40% with AI pair programming and code generation tools.",
      icon: "🚀",
      color: "from-curious-blue-500 to-curious-green-500"
    },
    {
      title: "Higher Code Quality",
      description: "Leverage AI code reviews and testing to catch bugs early and ensure adherence to best practices.",
      icon: "✅",
      color: "from-curious-purple-500 to-curious-blue-500"
    },
    {
      title: "Knowledge Amplification",
      description: "Instantly access documentation, libraries, and patterns without breaking your flow state.",
      icon: "🧠",
      color: "from-curious-purple-500 to-curious-pink-500"
    },
    {
      title: "Cost Efficiency",
      description: "Reduce development costs and technical debt with AI-assisted planning and architecture.",
      icon: "💰",
      color: "from-curious-green-500 to-curious-blue-500"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="relative py-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Background elements with soft fading edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>
      
      {/* Animated nebula - top right */}
      <motion.div 
        className="absolute top-[10%] right-0 w-[30rem] h-[20rem] rounded-full filter blur-[80px]"
        initial={{ 
          opacity: 0.4,
          background: 'radial-gradient(ellipse at 60% 40%, rgba(168, 85, 247, 0.25), rgba(139, 92, 246, 0.15) 40%, transparent 80%)'
        }}
        animate={{ 
          opacity: 0.4,
          background: [
            'radial-gradient(ellipse at 60% 40%, rgba(168, 85, 247, 0.25), rgba(139, 92, 246, 0.15) 40%, transparent 80%)',
            'radial-gradient(ellipse at 62% 38%, rgba(139, 92, 246, 0.22), rgba(59, 130, 246, 0.18) 45%, transparent 82%)',
            'radial-gradient(ellipse at 61% 39%, rgba(168, 85, 247, 0.25), rgba(139, 92, 246, 0.15) 40%, transparent 80%)'
          ]
        }}
        style={{
          transform: 'rotate(-15deg)'
        }}
        transition={{ 
          background: {
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.45, 0.05, 0.55, 0.95]
          }
        }}
      />
      
      {/* Animated nebula - bottom left */}
      <motion.div 
        className="absolute bottom-[10%] left-0 w-[30rem] h-[20rem] rounded-full filter blur-[80px]"
        initial={{ 
          opacity: 0.4,
          background: 'radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.25), rgba(147, 197, 253, 0.15) 45%, transparent 85%)'
        }}
        animate={{ 
          opacity: 0.4,
          background: [
            'radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.25), rgba(147, 197, 253, 0.15) 45%, transparent 85%)',
            'radial-gradient(ellipse at 32% 68%, rgba(79, 70, 229, 0.18), rgba(59, 130, 246, 0.22) 50%, transparent 82%)',
            'radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.25), rgba(147, 197, 253, 0.15) 45%, transparent 85%)'
          ]
        }}
        style={{
          transform: 'rotate(15deg)'
        }}
        transition={{ 
          background: {
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: [0.45, 0.05, 0.55, 0.95],
            delay: 3
          }
        }}
      />
      
      {/* Section Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Glassy container with subtle depth and purple glow */}
        <div className="absolute inset-0 -mx-20 -my-10 bg-gray-900/40 backdrop-blur-[2px] rounded-3xl border border-gray-700/15 shadow-[0_0_70px_-15px_rgba(167,139,250,0.3)] z-0"></div>
        {/* Subtle inner glow layer */}
        <div className="absolute inset-0 -mx-20 -my-10 bg-gradient-to-br from-gray-800/10 via-transparent to-purple-900/10 rounded-3xl z-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 w-[70%] h-[30%] -translate-x-1/2 bg-purple-500/15 blur-[100px]"></div>
        </div>
        
        {/* Outer neon glow effect */}
        <div className="absolute inset-0 -mx-20 -my-10 rounded-3xl z-[-1] overflow-hidden">
          <div className="absolute inset-0 opacity-40 overflow-hidden">
            <div className="absolute -inset-[2px] rounded-3xl border-[3px] border-purple-500/5"></div>
            <div className="absolute -inset-[1px] rounded-3xl border border-purple-400/5 blur-[1px]"></div>
            <div className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 w-[85%] h-[50%] bg-purple-500/10 blur-[120px]"></div>
          </div>
        </div>
        
        <motion.div variants={itemVariants} className="text-center mb-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Why AI-Assisted Development?
          </h2>
          <p className="text-lg md:text-xl text-purple-300 max-w-3xl mx-auto">
            Discover how AI tools and techniques can supercharge your development workflow, 
            reduce tedious tasks, and help you focus on what truly matters.
          </p>
        </motion.div>
        
        {/* Cards Grid - unchanged, just adding relative z-10 to ensure it's above the container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
          {aiDevBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              custom={index}
            >
              <ServiceCardShell
                title={benefit.title}
                description={benefit.description}
                icon={
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-xl`}>
                    {benefit.icon}
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          variants={itemVariants} 
          custom={4}
          className="mt-12 text-center relative z-20"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-curious-purple-600 to-curious-blue-600 text-white font-medium shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-shadow"
            whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
          >
            Start Your AI Development Journey
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyAIDevCards; 