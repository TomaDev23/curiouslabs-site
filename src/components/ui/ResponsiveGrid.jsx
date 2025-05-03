import React from 'react';
import useBreakpoint from '../../hooks/useBreakpoint';

/**
 * ResponsiveGrid - Component for creating responsive grid layouts
 * Features:
 * - Configurable columns for each breakpoint
 * - Automatic gap spacing that scales with viewport
 * - Optimized for mobile-first approach
 * - Even distribution of items with adjustable alignment
 */
const ResponsiveGrid = ({
  children,
  className = '',
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = { xs: 4, sm: 6, md: 8, lg: 8, xl: 10 },
  rowGap,
  colGap,
  autoFill = false,
  minWidth,
  maxWidth,
}) => {
  const { isMobile, isSm, isMd, isLg, isXl } = useBreakpoint();
  
  // Determine the number of columns based on current breakpoint
  const getColumns = () => {
    if (isXl && cols.xl) return cols.xl;
    if (isLg && cols.lg) return cols.lg;
    if (isMd && cols.md) return cols.md;
    if (isSm && cols.sm) return cols.sm;
    return cols.xs;
  };
  
  // Determine the gap based on current breakpoint
  const getGap = () => {
    const gapValue = 
      isXl && gap.xl ? gap.xl :
      isLg && gap.lg ? gap.lg :
      isMd && gap.md ? gap.md :
      isSm && gap.sm ? gap.sm :
      gap.xs;
    
    return gapValue * 0.25; // Convert to rem (4 = 1rem in Tailwind)
  };
  
  // Create grid style based on config
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: autoFill && minWidth
      ? `repeat(auto-fill, minmax(${minWidth}px, 1fr))`
      : `repeat(${getColumns()}, minmax(0, 1fr))`,
    gap: `${rowGap ? rowGap * 0.25 : getGap()}rem ${colGap ? colGap * 0.25 : getGap()}rem`,
  };
  
  if (maxWidth) {
    gridStyle.maxWidth = maxWidth;
  }
  
  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  );
};

export default ResponsiveGrid; 