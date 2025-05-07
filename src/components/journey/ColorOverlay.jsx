import { useRef } from 'react';
import { useScrollProgress } from './useScrollProgress';

/** Dawn‑story palette — HSL triples */
const palette = [
  [0, 0, 0],        // 0 %   #000000
  [277, 73, 9],     // 10 %  #15002B
  [268, 100, 22],   // 30 %  #31006E
  [213, 100, 27],   // 55 %  #002C88
  [192, 100, 35],   // 80 %  #004768
  [28,  100, 45],   // 90 %  #A44500
  [46,  100, 70],   // 100 % #FFDD66
];

const lerp = (a, b, t) => a + (b - a) * t;
const interpolate = (c1, c2, t) => c1.map((v, i) => lerp(v, c2[i], t));

export default function ColorOverlay() {
  const ref = useRef(null);
  const prog = useScrollProgress(ref);      // 0‑1 across the whole doc
  
  // Debug - log the progress value
  console.log("Color overlay progress:", prog);
  
  // Calculate color based on scroll progress
  const seg  = prog * (palette.length - 1);
  const idx  = Math.min(Math.floor(seg), palette.length - 2);
  const t    = seg - idx;
  const [h, s, l] = interpolate(palette[idx], palette[idx + 1], t);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        background: `hsl(${h}deg ${s}% ${l}%)`,
        mixBlendMode: 'screen',
        opacity: 0.6,
      }}
    />
  );
} 