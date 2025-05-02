varying vec3 vColor;

void main() {
  // Create a soft circular point
  float distance = length(gl_PointCoord - vec2(0.5, 0.5));
  if (distance > 0.5) discard;
  
  // Add soft edges with smoothstep
  float opacity = 1.0 - smoothstep(0.3, 0.5, distance);
  gl_FragColor = vec4(vColor, opacity);
} 