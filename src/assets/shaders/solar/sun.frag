uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Calculate distance from center (0-1 range)
  float intensity = 1.0 - length(vPosition) / 10.0;
  
  // Apply power curve for sharper falloff
  intensity = pow(intensity, 2.0);
  
  // Pulsating effect based on time
  intensity *= 0.8 + 0.2 * sin(uTime * 2.0);
  
  // Color transition effect
  vec3 color = mix(uColor1, uColor2, 0.5 + 0.5 * sin(uTime * 0.5));
  
  // Increase intensity for better visibility
  intensity *= 1.5;
  
  // Final color with higher alpha for visibility
  gl_FragColor = vec4(color, intensity);
} 