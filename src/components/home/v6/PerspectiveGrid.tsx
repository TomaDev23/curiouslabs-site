import React from 'react';

interface PerspectiveGridProps {
  color: string;
  strokeOpacity?: number;
  strokeWidth?: number;
}

const PerspectiveGrid: React.FC<PerspectiveGridProps> = ({ 
  color,
  strokeOpacity = 0.15, 
  strokeWidth = 1 
}) => {
  const horizontalLines = 20;
  const verticalLines = 20;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {Array.from({ length: horizontalLines }).map((_, i) => {
          const yBase = 500 + (i - horizontalLines / 2) * (1000 / horizontalLines);
          const curvatureFactor = 50;
          return (
            <path 
              key={`h-${i}`} 
              d={`M 0,${yBase} C 300,${yBase + (i - horizontalLines/2) * curvatureFactor/horizontalLines} 700,${yBase - (i - horizontalLines/2) * curvatureFactor/horizontalLines} 1000,${yBase}`}
              stroke={color} 
              strokeOpacity={strokeOpacity} 
              strokeWidth={strokeWidth} 
              fill="none" 
            />
          );
        })}
        {Array.from({ length: verticalLines }).map((_, i) => {
          const xBase = (i) * (1000 / verticalLines);
          const curvatureFactor = 30;
          return (
            <path 
              key={`v-${i}`} 
              d={`M ${xBase},0 C ${xBase - (i - verticalLines/2) * curvatureFactor/verticalLines},300 ${xBase + (i - verticalLines/2) * curvatureFactor/verticalLines},700 ${xBase},1000`}
              stroke={color} 
              strokeOpacity={strokeOpacity} 
              strokeWidth={strokeWidth} 
              fill="none" 
            />
          );
        })}
      </svg>
    </div>
  );
};

export default PerspectiveGrid; 