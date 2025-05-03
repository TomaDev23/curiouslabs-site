import React from "react";

/**
 * SectionHeader component
 * Provides consistent styling for section titles with animations
 */
export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-12 text-center opacity-0 animate-fade-in-up">
      <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg mt-2 text-purple-300 font-medium">{subtitle}</p>
      )}
    </div>
  );
} 