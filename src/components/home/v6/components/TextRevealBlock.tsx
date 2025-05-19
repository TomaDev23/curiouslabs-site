/**
 * @component TextRevealBlock
 * @description Handles text reveal animations with character-by-character animation
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - TextRevealBlock passes LEGIT protocol
 */

import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useScene } from '../SceneControllerV6';

// Use explicit phase strings since we can't import the constants
const PHASE_VOID = 'void';
const PHASE_EMERGENCE = 'emergence';
const PHASE_ACTIVATION = 'activation';

interface TextRevealBlockProps {
  className?: string;
}

export const TextRevealBlock: React.FC<TextRevealBlockProps> = ({ 
  className = "" 
}) => {
  const { scenePhase } = useScene();
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const resetTimer = useRef<number | null>(null);
  
  // Split text into characters for animation
  const title = "We bring you a universe of solutions";
  const titleChars = title.split('');

  // Handle forward animation (void -> emergence)
  useEffect(() => {
    if (scenePhase === PHASE_EMERGENCE && !hasAnimated.current && textRef.current) {
      hasAnimated.current = true;
      
      // We'll start text animation 0.7s after planet begins growing
      // Total planet animation is 1.5s
      const startDelay = 0.7;
      
      // Animate container in
      const container = textRef.current;
      container.style.opacity = '0';
      container.style.transform = 'translateX(-30px)';
      
      // Clear any previous reset timer
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
      
      resetTimer.current = window.setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateX(0)';
        container.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Get all character spans
        const chars = container.querySelectorAll('.char');
        chars.forEach((char, i) => {
          const span = char as HTMLSpanElement;
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
          span.style.transitionDelay = `${i * 0.03}s`;
          
          setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          }, 50); // Small delay to ensure styles are applied before animation
        });
        
        // Animate paragraph after chars
        const paragraph = container.querySelector('.paragraph');
        if (paragraph) {
          const p = paragraph as HTMLParagraphElement;
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          p.style.transitionDelay = `${titleChars.length * 0.03 + 0.1}s`;
          
          setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 50);
        }
        
        // Animate button last
        const button = container.querySelector('.button');
        if (button) {
          const btn = button as HTMLButtonElement;
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(20px) scale(0.95)';
          btn.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          btn.style.transitionDelay = `${titleChars.length * 0.03 + 0.5}s`;
          
          setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0) scale(1)';
          }, 50);
        }
      }, startDelay * 1000);
    }
  }, [scenePhase, titleChars.length]);
  
  // Handle scroll back animation reset (emergence/activation -> void)
  useEffect(() => {
    if (scenePhase === PHASE_VOID && hasAnimated.current && textRef.current) {
      hasAnimated.current = false;
      
      const container = textRef.current;
      
      // Reset all animations fast
      container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      container.style.opacity = '0';
      container.style.transform = 'translateX(-30px)';
      
      // Reset all character spans
      const chars = container.querySelectorAll('.char');
      chars.forEach((char) => {
        const span = char as HTMLSpanElement;
        span.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        span.style.transitionDelay = '0s';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
      });
      
      // Reset paragraph
      const paragraph = container.querySelector('.paragraph');
      if (paragraph) {
        const p = paragraph as HTMLParagraphElement;
        p.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        p.style.transitionDelay = '0s';
        p.style.opacity = '0';
        p.style.transform = 'translateY(20px)';
      }
      
      // Reset button
      const button = container.querySelector('.button');
      if (button) {
        const btn = button as HTMLButtonElement;
        btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        btn.style.transitionDelay = '0s';
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px) scale(0.95)';
      }
    }
  }, [scenePhase]);
  
  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  return (
    <div 
      ref={textRef}
      className={`${className} transition-all duration-800 ease-out`}
      style={{ opacity: 0, transform: 'translateX(-30px)' }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white overflow-hidden">
        {titleChars.map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{ 
              opacity: 0, 
              transform: 'translateY(20px)',
              display: 'inline-block'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>

      <p
        className="paragraph text-xl text-gray-300 leading-relaxed"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        We're building next-generation digital experiences 
        powered by cutting-edge AI technology. Join us in 
        shaping tomorrow's web.
      </p>

      <button
        className="button mt-8 px-8 py-4 bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold rounded-full"
        style={{ opacity: 0, transform: 'translateY(20px) scale(0.95)' }}
      >
        Explore Our Universe
      </button>
    </div>
  );
};

export default TextRevealBlock; 