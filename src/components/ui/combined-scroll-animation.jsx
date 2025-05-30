"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VerticalScroll } from "./vertical-scroll-animation";

export const CombinedScrollAnimation = ({
  verticalTitle,
  horizontalTitle,
  verticalContent,
  pages,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollPhase, setScrollPhase] = useState("vertical"); // "vertical" or "horizontal"
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Handle vertical scroll progress to determine when to switch to horizontal
  const handleVerticalProgress = (progress) => {
    if (progress >= 0.9 && scrollPhase === "vertical") {
      setScrollPhase("horizontal");
    } else if (progress < 0.9 && scrollPhase === "horizontal") {
      setScrollPhase("vertical");
    }
  };

  // Transform scrollY to horizontal movement once in horizontal mode
  const translateX = useTransform(
    scrollYProgress,
    [0.9, 1],
    [0, -100 * (pages.length - 1)]
  );

  // Adjust current page based on scroll progress in horizontal phase
  useEffect(() => {
    if (scrollPhase === "horizontal") {
      const handleScrollUpdate = () => {
        const progress = scrollYProgress.get();
        const normalizedProgress = (progress - 0.9) / 0.1; // 0.9-1.0 range normalized to 0-1
        const pageIndex = Math.min(
          Math.floor(normalizedProgress * pages.length),
          pages.length - 1
        );
        setCurrentPage(pageIndex);
      };

      const unsubscribe = scrollYProgress.onChange(handleScrollUpdate);
      return () => unsubscribe();
    }
  }, [scrollYProgress, scrollPhase, pages.length]);

  return (
    <div className="relative" ref={containerRef}>
      {/* Vertical Scroll Section */}
      <div className={`transition-opacity duration-500 ${scrollPhase === "horizontal" ? "opacity-0" : "opacity-100"}`}>
        <VerticalScroll
          titleComponent={verticalTitle}
          onProgressChange={handleVerticalProgress}
        >
          {verticalContent}
        </VerticalScroll>
      </div>

      {/* Horizontal Scroll Section - Appears after vertical scroll reaches threshold */}
      <div 
        className={`fixed inset-0 transition-opacity duration-500 ${scrollPhase === "vertical" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ zIndex: scrollPhase === "vertical" ? -1 : 10 }}
      >
        {/* Header for horizontal section */}
        <motion.div
          className="absolute top-10 left-0 right-0 z-50 text-center"
        >
          {horizontalTitle}
        </motion.div>

        {/* Horizontal Scroll Container */}
        <motion.div
          className="flex w-[300vw] h-full absolute left-0 top-0"
          style={{
            translateX,
          }}
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className="w-screen h-full flex items-center justify-center px-10 md:px-20"
            >
              <motion.div
                style={{
                  translateX: index === currentPage ? 0 : (index < currentPage ? -30 : 30),
                }}
                className="w-full h-full max-w-7xl mx-auto"
              >
                {page}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Page Indicators */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4"
        >
          {Array.from({ length: pages.length }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentPage ? "bg-white" : "bg-white/30"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator for vertical section */}
      <motion.div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-opacity duration-300 ${
          scrollPhase === "horizontal" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0])
        }}
      >
        <div className="text-white/50 text-sm mb-2">Scroll Down</div>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
            animate={{ 
              y: [0, 4, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}; 