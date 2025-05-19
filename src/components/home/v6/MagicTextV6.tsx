/**
 * @component MagicTextV6
 * @description Enhanced text reveal component with scroll-based animation
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - MagicTextV6 passes LEGIT protocol
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useScene } from './SceneControllerV6';

export interface MagicTextProps {
  text: string;
  className?: string;
  textStyle?: string;
  offset?: [string, string];
  immediate?: boolean;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  immediate?: boolean;
}

const Word: React.FC<WordProps> = ({ 
  children, 
  progress, 
  range, 
  className = "text-3xl font-semibold",
  immediate = false 
}) => {
  const { deviceCapabilities } = useScene();
  const prefersReduced = deviceCapabilities.prefersReducedMotion;
  
  // If reduced motion is preferred or immediate is true, skip animation
  const opacity = immediate || prefersReduced 
    ? 1 
    : useTransform(progress, range, [0, 1]);

  return (
    <span className={`relative mt-[12px] mr-1 ${className}`}>
      <span 
        className="absolute opacity-20"
        aria-hidden="true"
      >
        {children}
      </span>
      <motion.span 
        style={{ opacity: immediate || prefersReduced ? 1 : opacity }}
        initial={immediate || prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={immediate || prefersReduced ? { opacity: 1 } : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const MagicTextV6: React.FC<MagicTextProps> = ({ 
  text,
  className = "flex flex-wrap leading-[0.5] p-4",
  textStyle = "text-3xl font-semibold",
  offset = ["start 0.9", "start 0.25"],
  immediate = false
}) => {
  const container = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: offset
  });

  return (
    <p 
      ref={container} 
      className={className}
      role="text"
      aria-label={text}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            className={textStyle}
            immediate={immediate}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

export default MagicTextV6; 