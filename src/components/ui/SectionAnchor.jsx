import React from 'react';

/**
 * SectionAnchor - Adds appropriate section ID and scroll margin for smooth navigation
 * ✅ Tile W1.2 — Section Anchors
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Section identifier
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.as - Element type to render (default: 'section')
 * @param {number} props.scrollMargin - Top margin for scroll positioning (in rem)
 */
const SectionAnchor = ({
  id,
  children,
  className = "",
  as: Element = 'section',
  scrollMargin = 6,
  ...props
}) => {
  const scrollMarginClass = `scroll-mt-[${scrollMargin}rem]`;
  const combinedClassName = `${scrollMarginClass} ${className}`.trim();
  
  return (
    <Element 
      id={id}
      className={combinedClassName}
      data-section-name={id}
      {...props}
    >
      {children}
    </Element>
  );
};

export default SectionAnchor; 