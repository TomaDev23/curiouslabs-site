import React, { useState, useEffect } from 'react';

const metadata = {
  id: 'scroll_debug_overlay',
  scs: 'SCS-DEBUG-OVERLAY',
  type: 'utility',
  doc: 'contract_scroll_debug_overlay.md'
};

export function ScrollDebugOverlay() {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    scrollPercent: 0,
    vhPosition: 0
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercent = (scrollY / scrollHeight) * 100;
      const vhPosition = (scrollY / window.innerHeight) * 100;

      setScrollInfo({
        scrollY: scrollY.toFixed(0),
        scrollPercent: scrollPercent.toFixed(2),
        vhPosition: vhPosition.toFixed(2)
      });
    };

    const handleKeyPress = (e) => {
      if (e.key === 'd') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 font-mono text-sm">
      <div className="flex flex-col space-y-1">
        <p>Scroll Position: <span className="text-green-400">{scrollInfo.scrollY}px</span></p>
        <p>Scroll Progress: <span className="text-blue-400">{scrollInfo.scrollPercent}%</span></p>
        <p>VH Position: <span className="text-purple-400">{scrollInfo.vhPosition}vh</span></p>
        <div className="h-px w-full bg-gray-600 my-1"></div>
        <p className="text-xs text-gray-400">Press 'd' to toggle</p>
      </div>
    </div>
  );
} 