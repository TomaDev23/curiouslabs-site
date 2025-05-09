// LEGIT metadata declaration
export const metadata = {
  id: 'galaxy_vertex_shader',
  scs: 'SCS5',
  type: 'shader',
  doc: 'contract_galaxy_journey.md'
};

export default `
attribute vec3 color;
attribute float size;
attribute vec3 aRandomness;
attribute float aFormationFactor;
attribute float aExplosionFactor;

uniform float uTime;
uniform float uSize;
uniform float uCompactFactor;
uniform float uFormationProgress;
uniform float uExplosionProgress;
uniform float uDistanceFactor;
uniform float uRotationSpeed;
uniform float uOpacity;
uniform float uPixelRatio;

varying vec3 vColor;
varying float vOpacity;

void main() {
  // Preserve original position
  vec3 originalPosition = position;
  
  // Calculate randomness based on formation progress
  vec3 randomPos = originalPosition + aRandomness * uFormationProgress;
  
  // Calculate compact position (small distant galaxy)
  vec3 compactPosition = originalPosition * uCompactFactor;
  
  // Calculate explosion effect
  float explosionStrength = uExplosionProgress * aExplosionFactor * 5.0;
  vec3 explosionPosition = randomPos * (1.0 + explosionStrength);
  
  // Interpolate between compact and full galaxy based on formation progress
  vec3 finalPosition = mix(compactPosition, explosionPosition, uFormationProgress);
  
  // Apply distance factor (z translation)
  finalPosition.z -= uDistanceFactor;
  
  // Apply rotation
  float angle = uTime * uRotationSpeed;
  mat3 rotationMatrix = mat3(
    cos(angle), 0.0, sin(angle),
    0.0, 1.0, 0.0,
    -sin(angle), 0.0, cos(angle)
  );
  finalPosition = rotationMatrix * finalPosition;
  
  // Pass position to model-view-projection matrices
  vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  
  // Point size based on scale and formation progress
  // Make distance stars smaller
  float sizeFactor = mix(0.3, 1.0, uFormationProgress);
  
  // Size decrease with distance
  float distance = length(viewPosition.xyz);
  float distanceScale = 1.0 / (1.0 + 0.05 * distance);
  
  // Size variation over time
  float sizeVariation = 1.0 + sin(uTime + aFormationFactor * 10.0) * 0.2;
  
  gl_PointSize = uSize * size * sizeFactor * distanceScale * sizeVariation * uPixelRatio;
  
  // Pass color to fragment shader
  vColor = color;
  
  // Fade in particles based on formation factor
  float formationVisibility = smoothstep(0.0, 0.2 + aFormationFactor * 0.8, uFormationProgress);
  
  // Overall opacity
  vOpacity = uOpacity * formationVisibility;
}
`; 