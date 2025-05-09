// LEGIT metadata declaration
export const metadata = {
  id: 'galaxy_fragment_shader',
  scs: 'SCS5',
  type: 'shader',
  doc: 'contract_galaxy_journey.md'
};

export default `
varying vec3 vColor;
varying float vOpacity;

void main() {
  // Calculate distance from center of point (0.5, 0.5)
  float distanceToCenter = length(gl_PointCoord - 0.5);
  
  // Create circular shape with soft edges
  float alpha = smoothstep(0.5, 0.4, distanceToCenter);
  
  // Apply glow effect
  float glow = exp(-distanceToCenter * 5.0) * 0.3;
  
  // Mix base color with glow
  vec3 finalColor = vColor + glow;
  
  // Final color with opacity
  gl_FragColor = vec4(finalColor, alpha * vOpacity);
  
  // Optimization: discard pixels with very low alpha for better performance
  if (gl_FragColor.a < 0.01) discard;
}`; 