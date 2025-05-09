// LEGIT metadata declaration
export const metadata = {
  id: 'trails_fragment_shader',
  scs: 'SCS5',
  type: 'shader',
  doc: 'contract_galaxy_journey.md'
};

export default `
varying vec3 vColor;
varying float vOpacity;
varying float vTrailLength;

void main() {
  // Convert point coord to [-1, 1] range
  vec2 uv = 2.0 * gl_PointCoord - 1.0;
  
  // Elongate on X axis for trail effect
  // Use the calculated trail length to determine elongation
  uv.x *= 3.0 + vTrailLength;
  
  // Calculate distance from center with elongation
  float distance = length(uv);
  
  // Create soft particle edge with trail effect
  float alpha = smoothstep(1.0, 0.0, distance) * vOpacity;
  
  // Apply glow
  float glow = exp(-distance * 2.0) * 0.4;
  vec3 finalColor = vColor + glow;
  
  // Trail fade out toward the end
  finalColor *= mix(1.0, 0.5, gl_PointCoord.x);
  alpha *= mix(1.0, 0.0, gl_PointCoord.x);
  
  gl_FragColor = vec4(finalColor, alpha);
  
  // Discard invisible pixels
  if (gl_FragColor.a < 0.01) discard;
}`; 