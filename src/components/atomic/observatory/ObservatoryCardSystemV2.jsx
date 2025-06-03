/**
 * @file ObservatoryCardSystemV2.jsx
 * @description Enhanced Observatory Card System with ThoughtTrails integration
 * @version 2.0.0
 * @author CuriousLabs
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion, useThoughtTrailsEvents, observatoryVariants } from './ObservatoryHooks';
import DynamicProductMetrics from './DynamicProductMetrics';

const ObservatoryCardSystemV2 = ({ currentPage, setCurrentPage, OPS_BENTO_ITEMS }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const { dispatchHover, dispatchHoverEnd, dispatchSelect, dispatchDeepDive } = useThoughtTrailsEvents();

  // ThoughtTrails integration - dispatch events on hover
  useEffect(() => {
    if (hoveredCard) {
      const cardElement = document.querySelector(`[data-card-id="${hoveredCard}"]`);
      const bounds = cardElement?.getBoundingClientRect();
      const activeItem = OPS_BENTO_ITEMS.find(item => item.id === hoveredCard);
      
      if (bounds && activeItem) {
        dispatchHover(hoveredCard, bounds, activeItem.accentColor);
      }
    } else {
      dispatchHoverEnd();
    }
  }, [hoveredCard, dispatchHover, dispatchHoverEnd, OPS_BENTO_ITEMS]);

  // Observatory Card - Progressive Disclosure Component
  const ObservatoryCard = ({ item, isActive, isFeatured, onClick }) => {
    const isHovered = hoveredCard === item.id;

    const handleCardClick = () => {
      if (isFeatured) {
        // Featured card opens deep dive modal
        dispatchDeepDive(item.id);
        console.log(`🌌 Deep Dive: ${item.title}`);
      } else {
        // Supporting cards switch to featured
        onClick();
        dispatchSelect(item.id, item.accentColor);
      }
    };

    return (
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden backdrop-blur-sm border cursor-pointer group"
        style={{
          background: isFeatured
            ? `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.7), ${item.accentColor}20)`
            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
          borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.2)',
          minHeight: isFeatured ? '400px' : '180px',
        }}
        onMouseEnter={() => setHoveredCard(item.id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={handleCardClick}
        variants={observatoryVariants.card}
        initial="hidden"
        animate="visible"
        whileHover={prefersReducedMotion ? {} : "hover"}
        transition={{ duration: 0.3, ease: "easeOut" }}
        data-card-id={item.id}
        data-featured-card={isFeatured ? "true" : "false"}
      >
        {/* ThoughtTrails Anchor Point */}
        <div className="absolute inset-0" data-thought-trails-anchor={`card-${item.id}`} />

        {/* Observatory Content - Staged Reveal */}
        <div className="relative z-[10] p-6 h-full flex flex-col">
          {/* Stage 1: Always Visible - Radar View */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: item.accentColor }}
                animate={isActive && !prefersReducedMotion ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                </div>
              </motion.div>
              <motion.h3
                className={`font-bold uppercase tracking-wide ${isFeatured ? 'text-xl' : 'text-base'}`}
                style={{ color: item.accentColor }}
                custom={0}
                variants={observatoryVariants.text}
              >
                {item.title}
              </motion.h3>
            </div>
            <motion.div
              className="px-3 py-1 rounded-full text-xs font-mono border"
              style={{
                borderColor: `${item.accentColor}40`,
                backgroundColor: `${item.accentColor}10`,
                color: item.accentColor,
              }}
              animate={isActive && !prefersReducedMotion ? { 
                scale: [1, 1.05, 1], 
                opacity: [0.8, 1, 0.8] 
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {isActive ? 'ACTIVE' : 'STANDBY'}
            </motion.div>
          </div>

          {/* Stage 2: Hover Expansion - Scan View */}
          <AnimatePresence>
            {(isHovered || isFeatured) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-4"
              >
                <motion.p
                  className="text-sm text-white/80 font-medium"
                  custom={1}
                  variants={observatoryVariants.text}
                >
                  {item.summary || item.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {(item.features || []).slice(0, isFeatured ? 3 : 2).map((feature, index) => (
                    <motion.div
                      key={index}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/70 border border-white/20"
                      custom={2 + index}
                      variants={observatoryVariants.text}
                    >
                      {typeof feature === 'string' ? feature.split(',')[0] : feature}
                    </motion.div>
                  ))}
                </div>
                {isFeatured && item.tagline && (
                  <motion.p
                    className="text-sm italic text-white/60 mt-4"
                    custom={5}
                    variants={observatoryVariants.text}
                  >
                    {item.tagline}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer - Always Visible */}
          <div className="flex items-center justify-between mt-4">
            <motion.span
              className="font-mono uppercase tracking-wider text-white/40 text-xs"
              custom={6}
              variants={observatoryVariants.text}
            >
              {isFeatured ? 'Deep Dive' : 'Select'}
            </motion.span>
            <motion.div
              className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center"
              whileHover={prefersReducedMotion ? {} : {
                scale: 1.1,
                borderColor: item.accentColor,
                backgroundColor: `${item.accentColor}20`,
              }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative h-full w-full" data-page="products">
      <div className="grid grid-cols-8 grid-rows-3 gap-6 h-full">
        {/* Featured Card */}
        <motion.div 
          className="col-span-5 row-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ObservatoryCard
            item={OPS_BENTO_ITEMS[currentPage]}
            isActive={true}
            isFeatured={true}
            onClick={() => {
              dispatchDeepDive(OPS_BENTO_ITEMS[currentPage].id);
              console.log(`🌌 Deep Dive: ${OPS_BENTO_ITEMS[currentPage].title}`);
            }}
          />
        </motion.div>

        {/* Supporting Cards */}
        <div className="col-span-3 row-span-3 flex flex-col gap-6">
          {OPS_BENTO_ITEMS.filter((_, i) => i !== currentPage).slice(0, 2).map((item, index) => {
            const originalIndex = OPS_BENTO_ITEMS.findIndex(p => p.id === item.id);
            return (
              <motion.div
                key={item.id}
                className="flex-1 min-h-0"
                variants={observatoryVariants.supportingCard}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => {
                  setCurrentPage(originalIndex);
                  dispatchSelect(item.id, item.accentColor);
                }}
              >
                <ObservatoryCard
                  item={item}
                  isActive={false}
                  isFeatured={false}
                  onClick={() => setCurrentPage(originalIndex)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Metrics Panel */}
        <div className="col-span-5 row-span-1">
          <DynamicProductMetrics activeProduct={OPS_BENTO_ITEMS[currentPage]} />
        </div>
      </div>
    </div>
  );
};

export default ObservatoryCardSystemV2; 