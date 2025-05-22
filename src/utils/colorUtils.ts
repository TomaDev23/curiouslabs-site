export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const darkenColor = (hex: string, amount: number): string => {
  let rgb = hexToRgb(hex);

  if (!rgb) {
    return hex; // Return original hex if conversion fails
  }

  const factor = 1 - Math.min(1, Math.max(0, amount)); // Ensure amount is between 0 and 1

  rgb.r = Math.max(0, Math.floor(rgb.r * factor));
  rgb.g = Math.max(0, Math.floor(rgb.g * factor));
  rgb.b = Math.max(0, Math.floor(rgb.b * factor));

  // Convert back to hex
  const rHex = rgb.r.toString(16).padStart(2, '0');
  const gHex = rgb.g.toString(16).padStart(2, '0');
  const bHex = rgb.b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}; 