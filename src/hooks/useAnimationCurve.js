/**
 * @module useAnimationCurve
 * @version 1.0.0
 * @component Animation Curve Hook
 * @implements LEGIT/Hook.Animation
 * @contract contract_animation_curve.md
 */

import { useMemo } from 'react';

/**
 * Provides smooth interpolation between values based on progress
 * @param {number} progress - Current progress (0-1)
 * @param {number[]} breakpoints - Array of progress breakpoints
 * @param {number[]} values - Array of values to interpolate between
 * @returns {number} Interpolated value
 */
export const useAnimationCurve = (progress, breakpoints, values) => {
  return useMemo(() => {
    // Find the appropriate segment
    let segmentIndex = 0;
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (progress >= breakpoints[i] && progress <= breakpoints[i + 1]) {
        segmentIndex = i;
        break;
      }
    }

    // Get the values for this segment
    const startValue = values[segmentIndex];
    const endValue = values[segmentIndex + 1];
    const startBreakpoint = breakpoints[segmentIndex];
    const endBreakpoint = breakpoints[segmentIndex + 1];

    // Calculate the interpolation factor
    const segmentProgress = (progress - startBreakpoint) / (endBreakpoint - startBreakpoint);
    
    // Linear interpolation
    return startValue + (endValue - startValue) * segmentProgress;
  }, [progress, breakpoints, values]);
};

export default useAnimationCurve; 