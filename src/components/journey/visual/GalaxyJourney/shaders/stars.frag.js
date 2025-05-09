// LEGIT metadata declaration
export const metadata = {
  id: 'stars_fragment_shader',
  scs: 'SCS5',
  type: 'shader',
  doc: 'contract_galaxy_journey.md'
};

export default `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Calculate distance from center of point (0.0-1.0)
  float distanceToCenter = length(gl_PointCoord - 0.5);
  
  // Create smooth circular shape
  float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
  
  // Apply radial gradient with stronger center
  float centerGlow = 0.4 + 0.6 * (1.0 - distanceToCenter * 2.0);
  
  // Combine color and alpha
  vec3 finalColor = vColor * centerGlow;
  float alpha = strength * vAlpha;
  
  // Output final color
  gl_FragColor = vec4(finalColor, alpha);
  
  // Discard fragments with very low alpha for better performance
  if (gl_FragColor.a < 0.01) discard;
}`; 