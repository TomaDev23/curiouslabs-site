uniform vec3 uColor;
uniform float uTime;
uniform float uOpacity;
varying vec3 vPosition;

void main() {
  // Create pulsating intensity based on time and position
  float intensity = 0.6 + 0.4 * sin(uTime * 2.0 + length(vPosition) * 0.2);
  
  // Set final color with opacity based on the uniform and intensity
  gl_FragColor = vec4(uColor, uOpacity * intensity);
} 