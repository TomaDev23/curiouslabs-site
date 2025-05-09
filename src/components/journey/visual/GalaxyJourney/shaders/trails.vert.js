// LEGIT metadata declaration
export const metadata = {
  id: 'trails_vertex_shader',
  scs: 'SCS5',
  type: 'shader',
  doc: 'contract_galaxy_journey.md'
};

export default `
attribute vec3 color;
attribute float size;
attribute vec3 aVelocity;

uniform float uTime;
uniform float uSize;
uniform float uTrailIntensity;
uniform float uPixelRatio;

varying vec3 vColor;
varying float vOpacity;
varying float vTrailLength;

void main() {
  // Use time and velocity to animate particles toward camera
  vec3 animatedPosition = position;
  animatedPosition += aVelocity * uTime * 20.0;
  
  // Reset particles that have moved too far
  if (animatedPosition.z > 30.0) {
    animatedPosition.z = -100.0 + mod(animatedPosition.z, 130.0);
  }
  
  // Transform position
  vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  
  // Base size
  float baseSize = uSize * size;
  
  // Increase size of trails closer to camera
  float distance = length(viewPosition.xyz);
  float distanceScale = 1.0 / (1.0 + 0.05 * distance);
  
  // Calculate velocity magnitude for trail length
  float velocityMag = length(aVelocity);
  vTrailLength = velocityMag * 10.0;
  
  gl_PointSize = baseSize * distanceScale * uPixelRatio;
  
  // Pass color to fragment shader
  vColor = color;
  
  // Control trail opacity with uniform
  vOpacity = uTrailIntensity;
}`; 