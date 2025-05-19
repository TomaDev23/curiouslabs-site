/**
 * @metadata
 * @component ProductSectionV6
 * @description Individual product section with alternating layout
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useScene } from './SceneControllerV6';
import PlanetVisualizationV6 from './PlanetVisualizationV6';

// Feature bullet with orbital styling
const FeatureBulletV6 = ({ children, color, delay = 0 }) => {
  return (
    <motion.li
      className="flex items-start mb-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div 
        className="mt-1.5 mr-3 w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{children}</span>
    </motion.li>
  );
};

// CTA button component
const ProductCTAV6 = ({ children, color, delay = 0 }) => {
  return (
    <motion.button
      className="px-6 py-3 rounded-full font-medium transition-all duration-300"
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`,
        boxShadow: `0 4px 20px ${color}30`
      }}
      whileHover={{ 
        boxShadow: `0 6px 25px ${color}50`,
        transform: 'translateY(-2px)'
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.button>
  );
};

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
  // Convert hex to RGB
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  
  // Adjust values
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const ProductSectionV6 = ({ product, index, isActive, isEven }) => {
  const { deviceCapabilities } = useScene();
  const { isMobile } = deviceCapabilities;
  
  // Base animation delay
  const baseDelay = 0.1;
  
  // Create Z-pattern layout: text-right → text-left → text-right
  // On mobile, always stack with image above text
  const textOnLeft = !isMobile && isEven;
  
  return (
    <div 
      className="flex-shrink-0 w-full h-full snap-center"
      id={`product-${product.id}`}
    >
      <div className="relative h-full w-full flex flex-col md:flex-row items-center">
        {/* Text Column */}
        <div 
          className={`w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 ${
            textOnLeft ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            className="max-w-xl"
          >
            {/* Product indicator - show if first product */}
            {index === 0 && (
              <motion.div 
                className="text-sm font-mono text-gray-400 uppercase mb-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                Core Runtime
              </motion.div>
            )}
            
            {/* Product name */}
            <motion.h2 
              className="text-4xl md:text-5xl font-serif mt-2 mb-4"
              style={{ color: product.color }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.name}
            </motion.h2>
            
            {/* Product description */}
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.description}
            </motion.p>
            
            {/* Feature bullets */}
            <motion.ul className="mb-8">
              {product.features.map((feature, i) => (
                <FeatureBulletV6 
                  key={i} 
                  color={product.color}
                  delay={baseDelay + (i * 0.1)}
                >
                  {feature}
                </FeatureBulletV6>
              ))}
            </motion.ul>
            
            {/* CTA button */}
            <ProductCTAV6 
              color={product.color}
              delay={baseDelay + (product.features.length * 0.1) + 0.2}
            >
              Learn More
            </ProductCTAV6>
          </motion.div>
        </div>
        
        {/* Visual Column */}
        <div 
          className={`w-full md:w-1/2 flex items-center justify-center ${
            textOnLeft ? 'md:order-2' : 'md:order-1'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="py-8 md:py-0"
          >
            <PlanetVisualizationV6 
              variant={product.planetVariant}
              color={product.color}
              isCore={index === 0}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductSectionV6;