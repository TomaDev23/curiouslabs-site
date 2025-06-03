// Fallback for three/tsl module
// This provides empty exports to prevent build errors when three-globe tries to import TSL features

// Common TSL exports that might be imported
export const uniform = () => ({});
export const attribute = () => ({});
export const varying = () => ({});
export const texture = () => ({});
export const sampler = () => ({});
export const vec2 = () => ({});
export const vec3 = () => ({});
export const vec4 = () => ({});
export const mat3 = () => ({});
export const mat4 = () => ({});
export const float = () => ({});
export const int = () => ({});
export const bool = () => ({});

// Additional exports that three-globe specifically needs
export const Fn = () => ({});
export const If = () => ({});
export const Loop = () => ({});
export const storage = () => ({});
export const instanceIndex = () => ({});
export const asin = () => ({});
export const exp = () => ({});
export const negate = () => ({});
export const sqrt = () => ({});
export const sin = () => ({});
export const cos = () => ({});

// Export empty object as default
const tsl = {};
export default tsl; 