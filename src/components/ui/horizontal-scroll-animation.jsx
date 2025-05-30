"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const HorizontalScroll = ({
  titleComponent,
  pages,
  currentPage,
  setCurrentPage,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Transform scrollY to horizontal movement
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, -100 * (currentPage), -100 * (currentPage + 1), -100 * (pages.length - 1)]
  );

  // Parallax effect for background elements
  const parallaxBg = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -30]
  );

  // Page indicator opacity
  const pageIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Handle scroll events to update current page
  React.useEffect(() => {
    const handleScrollUpdate = () => {
      const progress = scrollYProgress.get();
      if (progress < 0.33) {
        setCurrentPage(0);
      } else if (progress < 0.66) {
        setCurrentPage(1);
      } else {
        setCurrentPage(2);
      }
    };

    const unsubscribe = scrollYProgress.onChange(handleScrollUpdate);
    return () => unsubscribe();
  }, [scrollYProgress, setCurrentPage]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 overflow-hidden"
      ref={containerRef}
    >
      {/* Fixed Header */}
      {titleComponent && (
        <motion.div
          style={{
            opacity: pageIndicatorOpacity,
          }}
          className="absolute top-10 left-0 right-0 z-50"
        >
          {titleComponent}
        </motion.div>
      )}

      {/* Horizontal Scroll Container */}
      <motion.div
        className="flex w-[300vw] h-full absolute left-0"
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
                translateX: index === currentPage ? 0 : parallaxBg,
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
        style={{
          opacity: pageIndicatorOpacity,
        }}
      >
        {Array.from({ length: pages.length }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentPage ? "bg-white" : "bg-white/30"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}; 