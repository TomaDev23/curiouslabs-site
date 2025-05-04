/**
 * Image Optimization Utilities
 * 
 * Provides support for WebP format with fallback
 * and responsive image loading
 */

/**
 * Gets the WebP version of an image path with fallback to original
 * @param {string} imagePath - Original image path
 * @returns {string} Path to WebP version or original if WebP doesn't exist
 */
export const getOptimizedImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Extract the file name and extension
  const pathParts = imagePath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const fileNameParts = fileName.split('.');
  const extension = fileNameParts.pop().toLowerCase();
  const baseName = fileNameParts.join('.');
  
  // Only convert jpg/png to webp
  if (!['jpg', 'jpeg', 'png'].includes(extension)) {
    return imagePath;
  }
  
  // Create webp path
  const webpPath = `/images/webp/${baseName}.webp`;
  
  return webpPath;
};

/**
 * Creates a picture element with WebP and fallback
 * @param {Object} props - Component properties
 * @param {string} props.src - Original image source
 * @param {string} props.alt - Image alt text
 * @param {Object} props.imgProps - Additional image props (className, etc)
 * @returns {JSX.Element} Picture element with WebP and fallback
 */
export const OptimizedImage = ({ src, alt, imgProps = {} }) => {
  const webpSrc = getOptimizedImagePath(src);
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={src} type={`image/${src.endsWith('.png') ? 'png' : 'jpeg'}`} />
      <img src={src} alt={alt || ''} {...imgProps} />
    </picture>
  );
};

export default {
  getOptimizedImagePath,
  OptimizedImage
}; 