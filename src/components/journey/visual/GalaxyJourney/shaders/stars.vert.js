// LEGIT metadata declaration
export const metadata = {
  id: 'stars_vertex_shader',
  scs: 'SCS5',
  type: 'shader',
  doc: 'contract_galaxy_journey.md'
};

export default `
attribute vec3 color;
attribute float size;
attribute float randomOffset;

uniform float uTime;
uniform float uPixelRatio;

varying vec3 vColor;
varying float vAlpha;

void main() {
  // Pass original position to model-view-projection matrices
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  
  // Calculate distance from camera
  float distance = length(viewPosition.xyz);
  
  // Make stars twinkle with a subtle effect
  float twinkle = sin(uTime * 0.001 + randomOffset) * 0.2 + 0.8;
  
  // Size based on distance from camera and twinkle effect
  gl_PointSize = size * twinkle * uPixelRatio * (800.0 / distance);
  
  // Pass color to fragment shader
  vColor = color;
  
  // Alpha also affected by twinkling
  vAlpha = 0.7 + sin(uTime * 0.002 + randomOffset * 2.0) * 0.3;
}`; 