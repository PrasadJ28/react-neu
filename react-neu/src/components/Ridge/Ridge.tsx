import React from "react";
import { ridgeContainer } from "./Ridge.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeumorphicProps } from "../../styles/types";

interface RidgeProps extends NeumorphicProps {
  children: React.ReactNode;
  /**
   * Sets the thickness of the ridge frame (padding).
   * Can be a number (pixels) or string (e.g., "1rem").
   * @default "10px"
   */
  ridgeWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const NeuRidge: React.FC<RidgeProps> = ({
  children,
  // 1. Expose all Neumorphic Props with "Ridge-like" defaults
  variant = "flat",     // Default to flat surface
  surface = "flat",
  color,
  shape = "rounded",
  elevation = 2,
  intensity,
  angleDeg,
  border = true,        // Default to showing the seam
  ridge = false,

  // 2. New specific prop
  ridgeWidth = "10px",

  className,
  style,
}) => {
  // Generate styles allowing full customization
  const ridgeStyle = getNeumorphicStyle({
    variant,
    surface,
    border,
    color,
    shape,
    elevation,
    intensity,
    angleDeg,
    ridge,
    state: "default",
  });

  return (
    <div
      className={`${ridgeContainer} ${className || ""}`}
      style={{
        ...ridgeStyle,
        ...style,
        // Apply the custom width as padding
        padding: typeof ridgeWidth === 'number' ? `${ridgeWidth}px` : ridgeWidth,
        // Ridges are usually static structural elements
        transition: style?.transition || "none",
      }}
    >
      {children}
    </div>
  );
};
