/**
 * @module AnimationCurveTest
 * @version 1.0.0
 * @component Test Component
 * @implements LEGIT/Test.Animation
 * @contract contract_test_animation.md
 */

import React from 'react';
import useAnimationCurve from '../../../hooks/useAnimationCurve';

const metadata = {
  id: 'animation_curve_test',
  scs: 'SCS-TEST',
  type: 'test',
  doc: 'contract_test_animation.md'
};

export default function AnimationCurveTest({ progress = 0 }) {
  // Test values for particle density
  const density = useAnimationCurve(
    progress,
    [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    [0.2, 0.4, 0.6, 1.0, 0.8, 0.4]
  );

  // Test values for FPS
  const fps = useAnimationCurve(
    progress,
    [0, 0.5, 1.0],
    [20, 30, 20]
  );

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 p-4 rounded-lg text-white text-sm font-mono">
      <div>Progress: {(progress * 100).toFixed(1)}%</div>
      <div>Density: {density.toFixed(2)}</div>
      <div>FPS: {fps.toFixed(1)}</div>
    </div>
  );
} 