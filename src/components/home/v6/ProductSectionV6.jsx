/**
 * @metadata
 * @component ProductSectionV6
 * @description Individual product section with alternating layout - Updated with AEGIS Universe Experience design
 * @legit true
 * @version 2.0.0
 * @author CuriousLabs
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useScene } from './SceneControllerV6';
import PlanetVisualizationV6 from './PlanetVisualizationV6';
import SolarSystemV6 from './SolarSystemV6';
import OpsBentoCluster from './ops/OpsBentoCluster';

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
      <span className="text-sm text-gray-400">{children}</span>
    </motion.li>
  );
};

// CTA button component
const ProductCTAV6 = ({ children, color, delay = 0 }) => {
  return (
    <motion.button
      className="px-6 py-3 rounded-full font-medium transition-all duration-300 ml-auto"
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

// Nebula effect component
const NebulaEffect = ({ product }) => {
  // Get the correct background style based on product
  const getNebulaStyle = () => {
    switch (product.id) {
      case 'aegis':
        return {
          position: 'absolute',
          width: '150%',
          height: '150%',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
          transform: 'translate(-25%, -25%)',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, rgba(132, 204, 22, 0.1) 0%, rgba(132, 204, 22, 0.05) 25%, rgba(0, 0, 0, 0) 70%)'
        };
      case 'opspipe':
        return {
          position: 'absolute',
          width: '150%',
          height: '150%',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
          transform: 'translate(-25%, -25%)',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.07) 30%, rgba(0, 0, 0, 0) 70%)'
        };
      case 'moonsignal':
        return {
          position: 'absolute',
          width: '150%',
          height: '150%',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
          transform: 'translate(-25%, -25%)',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, rgba(126, 34, 206, 0.15) 0%, rgba(126, 34, 206, 0.07) 30%, rgba(0, 0, 0, 0) 70%)'
        };
      case 'guardian':
        return {
          position: 'absolute',
          width: '150%',
          height: '150%',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
          transform: 'translate(-25%, -25%)',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, rgba(13, 148, 136, 0.15) 0%, rgba(13, 148, 136, 0.07) 30%, rgba(0, 0, 0, 0) 70%)'
        };
      default:
        return {};
    }
  };

  return <div style={getNebulaStyle()}></div>;
};

// Get the background gradient style based on product
const getBackgroundStyle = (product) => {
  switch (product.id) {
    case 'aegis':
      return { background: 'linear-gradient(135deg, #0a0a0a 0%, #10101c 100%)' };
    case 'opspipe':
      return { background: 'linear-gradient(135deg, #10101c 0%, #0d1527 75%, #13182e 100%)' };
    case 'moonsignal':
      return { background: 'linear-gradient(135deg, #13182e 0%, #2a1b44 80%, #331b55 100%)' };
    case 'guardian':
      return { background: 'linear-gradient(135deg, #331b55 0%, #0e3b3b 75%, #124242 100%)' };
    default:
      return { background: 'black' };
  }
};

const ProductSectionV6 = ({ product, index, isActive, isEven }) => {
  const { deviceCapabilities } = useScene();
  const { isMobile } = deviceCapabilities;
  
  // Base animation delay
  const baseDelay = 0.1;
  
  // Create Z-pattern layout: text-right → text-left → text-right
  // On mobile, always stack with image above text
  const textOnLeft = !isMobile && isEven;
  
  // Determine layout structure based on product
  const getLayoutStructure = () => {
    if (product.id === 'aegis') {
      // Centered design for AEGIS
      return (
        <div className="relative h-full w-full flex flex-col items-center justify-center">
          <NebulaEffect product={product} />
          
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            className="relative z-10 flex flex-col items-center text-center p-8 max-w-2xl"
          >
            {/* Planet Visualization */}
            <div className="mb-8">
              <PlanetVisualizationV6 
                variant={product.planetVariant}
                color={product.color}
                isCore={index === 0}
              />
            </div>
            
            {/* Product name and description */}
            <div className="mb-4">
              <motion.h2 
                className="text-3xl md:text-5xl font-serif mb-4"
                style={{ color: product.color }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                {product.name}
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                {product.description}
              </motion.p>
            </div>
            
            {/* Features */}
            <div className="mb-6 text-left self-center w-auto">
              <motion.ul className="text-gray-300 space-y-2 inline-block">
                {product.features.slice(0, 2).map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3 shrink-0" style={{backgroundColor: product.color}}></span>
                    {feature}
                  </li>
                ))}
              </motion.ul>
            </div>
            
            {/* CTA button */}
            <motion.button 
              className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80"
              style={{ background: product.color }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
              }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      );
    } else if (product.id === 'opspipe' || product.id === 'guardian') {
      // Determine if this is OpsPipe (replace planet with bento grid) or Guardian (keep planet)
      const LeftVisual = product.id === 'opspipe' ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 w-2/5 md:w-2/5 flex justify-start items-center"
        >
          <OpsBentoCluster className="transform scale-90 md:scale-100" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-1/3 flex justify-start items-center"
        >
          <PlanetVisualizationV6 
            variant={product.planetVariant}
            color={product.color}
            isCore={false}
          />
        </motion.div>
      );
      
      return (
        <div className="relative h-full w-full flex items-center justify-between p-8 md:p-16 lg:p-24">
          <NebulaEffect product={product} />
          
          {/* Left side - Either Bento grid (OpsPipe) or Planet (Guardian) */}
          {LeftVisual}
          
          {/* Right side - Content */}
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            className={`relative z-10 w-3/5 md:w-2/3 flex flex-col items-end text-right max-w-lg pl-8 ${product.id === 'opspipe' ? 'hidden' : ''}`}
          >
            {/* Product indicator - showing the category */}
            <motion.div 
              className="text-xs font-mono text-gray-500 uppercase mb-1 self-end"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.id === 'opspipe' ? '' : 'AI Companion'}
            </motion.div>
            
            {/* Product name with increased visibility */}
            <motion.h2 
              className="text-3xl md:text-5xl font-serif mb-4 text-right w-full"
              style={{ 
                color: product.color,
                textShadow: `0 0 10px ${product.color}40`
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.name}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-300 mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.description}
            </motion.p>
            
            {/* Features - Ensure these are right-aligned with proper spacing */}
            <motion.ul className="text-gray-300 space-y-2 mb-6 self-end text-right w-full">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-end">
                  <span className="text-sm text-gray-300">{product.id === 'opspipe' ? '' : feature}</span>
                  <span className="w-2 h-2 rounded-full ml-3 shrink-0" style={{backgroundColor: product.id === 'opspipe' ? 'transparent' : product.color}}></span>
                </li>
              ))}
            </motion.ul>
            
            {/* CTA button */}
            <motion.button 
              className={`px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80 ${product.id === 'opspipe' ? 'absolute bottom-8 left-1/2 transform -translate-x-1/2' : ''}`}
              style={{ background: product.color }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
              }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      );
    } else {
      // MoonSignal card - add category indicator like others
      return (
        <div className="relative h-full w-full flex items-center justify-between p-12 md:p-24">
          <NebulaEffect product={product} />
          
          {/* Left side - Content */}
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
            }}
            className="relative z-10 w-2/3 flex flex-col items-start text-left max-w-lg pr-8"
          >
            {/* Product indicator - showing the category */}
            <motion.div 
              className="text-xs font-mono text-gray-500 uppercase mb-1"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              Trading & Signals
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-serif mb-4 text-left w-full"
              style={{ 
                color: product.color,
                textShadow: `0 0 10px ${product.color}40`
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.name}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {product.description}
            </motion.p>
            
            {/* Features - Show all features */}
            <motion.ul className="text-gray-300 space-y-2 mb-6">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3 shrink-0" style={{backgroundColor: product.color}}></span>
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </motion.ul>
            
            {/* CTA button */}
            <motion.button 
              className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300 hover:opacity-80"
              style={{ background: product.color }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
              }}
            >
              Learn More
            </motion.button>
          </motion.div>
          
          {/* Right side - Planet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 w-1/3 flex justify-end items-center"
          >
            <PlanetVisualizationV6 
              variant={product.planetVariant}
              color={product.color}
              isCore={false}
            />
          </motion.div>
        </div>
      );
    }
  };

  return (
    <div 
      className="flex-shrink-0 w-full h-full snap-center"
      id={`product-${product.id}`}
      style={getBackgroundStyle(product)}
    >
      {getLayoutStructure()}
    </div>
  );
};

export default ProductSectionV6;