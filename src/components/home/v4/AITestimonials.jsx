import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * AITestimonials - Section with orbiting AI testimonial bubbles
 * Features typewriter effect and radar animation
 */
const AITestimonials = () => {
  // Mock data for AI testimonials
  const aiTestimonials = [
    {
      name: "GPT-4",
      model: "Large Language Model",
      avatar: "🤖",
      avatarBg: "bg-gradient-to-br from-teal-400 to-blue-500",
      text: "CuriousLabs helped refactor my prompt handling code. Now I'm 30% more accurate and way less hallucinate-y."
    },
    {
      name: "DALL-E",
      model: "Image Generation",
      avatar: "🎨",
      avatarBg: "bg-gradient-to-br from-pink-400 to-purple-500",
      text: "They fixed a bug where I'd sometimes draw people with six fingers. Humans only have 5, apparently."
    },
    {
      name: "Midjourney",
      model: "Visual AI",
      avatar: "🖼️",
      avatarBg: "bg-gradient-to-br from-blue-400 to-indigo-500",
      text: "Their code optimization reduced my render times by 40%. Now I can dream up worlds twice as fast!"
    },
    {
      name: "Copilot",
      model: "Code Assistant",
      avatar: "👨‍💻",
      avatarBg: "bg-gradient-to-br from-gray-400 to-gray-600",
      text: "Their team taught me to write cleaner React hooks. No more infinite loops from me... mostly."
    },
    {
      name: "Whisper",
      model: "Speech Recognition",
      avatar: "🎤",
      avatarBg: "bg-gradient-to-br from-green-400 to-blue-400",
      text: "Now I can understand even the strongest accents. Scottish English no longer crashes my parser."
    }
  ];

  return (
    <motion.section 
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-purple-900/10 to-gray-900/0"></div>
      
      <div className="container mx-auto px-4">
        <div className="relative h-[700px] mx-[-15%] w-[130%]">
          {/* Radar animation */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            <motion.div 
              className="w-[200px] h-[200px] rounded-full border border-purple-500/20"
              animate={{
                scale: [1, 1.5],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="w-[300px] h-[300px] rounded-full border border-purple-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            />
            <motion.div 
              className="w-[400px] h-[400px] rounded-full border border-purple-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5],
                opacity: [0.4, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
            />
          </div>
          
          {/* Testimonial bubbles */}
          {aiTestimonials.map((testimonial, index) => (
            <AITestimonialBubble 
              key={index}
              testimonial={testimonial}
              index={index}
              totalTestimonials={aiTestimonials.length}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Floating testimonial bubble with typing effect
const AITestimonialBubble = ({ testimonial, index, totalTestimonials }) => {
  // Calculate position based on index (in a circle around the center)
  const angle = (index / totalTestimonials) * Math.PI * 2;
  const orbitRadius = 230; // Base radius for positioning
  // Add some randomness to the radius to make it look more organic
  const radius = orbitRadius + (index % 2 === 0 ? 20 : -20);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Custom animation timing
  const delay = index * 0.2;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-64"
      initial={{ 
        x: 0, 
        y: 0, 
        opacity: 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
      whileInView={{
        x,
        y,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        damping: 15,
        delay
      }}
    >
      <motion.div
        className="p-4 bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center mb-3">
          <div className={`w-8 h-8 rounded-full ${testimonial.avatarBg} flex items-center justify-center mr-3`}>
            <span>{testimonial.avatar}</span>
          </div>
          <div>
            <div className="font-bold">{testimonial.name}</div>
            <div className="text-xs text-gray-400">{testimonial.model}</div>
          </div>
        </div>
        
        {/* Text with typing effect */}
        <TypewriterEffect text={testimonial.text} delay={delay + 0.5} />
      </motion.div>
    </motion.div>
  );
};

// Typewriter effect component
const TypewriterEffect = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let isMounted = true;
    
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length && isMounted) {
          setDisplayText(text.substring(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [text, delay]);
  
  return (
    <p className="text-sm relative">
      {displayText}
      <span className="inline-block w-1 h-4 bg-purple-400 ml-0.5 align-middle animate-pulse"></span>
    </p>
  );
};

export default AITestimonials; 