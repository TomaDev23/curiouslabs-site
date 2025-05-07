import { useEffect, useState } from 'react';

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      // Calculate total scrollable height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      // Calculate current scroll position (0 to 1)
      const scrollPosition = window.scrollY;
      const p = Math.max(0, Math.min(1, scrollPosition / scrollHeight));
      setProgress(p);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    onScroll();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]); // ref is not actually used but kept for API consistency

  return progress;
}

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v)); 