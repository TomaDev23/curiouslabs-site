attribute float size;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;

void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  // Twinkle effect based on time and position
  float twinkle = 0.7 + 0.3 * sin(uTime + position.x * 10.0 + position.y * 5.0 + position.z * 7.0);
  
  gl_PointSize = size * uPixelRatio * twinkle;
  gl_Position = projectionMatrix * mvPosition;
} 