import React from "react";
import { iconWrapper, layer, svgStyle } from "./Icon.css";
import type { IconName } from "./IconPaths";
import { iconRegistry } from "./IconPaths";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import { lighten, darken } from "../../styles/colorUtils";
import type { NeumorphicProps } from "../../styles/types";

interface IconProps extends NeumorphicProps {
  icon: IconName;
  filled?: boolean;
  fillColor?: string;
  size?: string;

  /** * If true, removes the background button shape entirely.
   * You will see ONLY the icon.
   */
  transparent?: boolean;

  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const NeuIcon: React.FC<IconProps> = ({
  icon,
  filled = false,
  fillColor = "#ef4444",
  size = "50px",
  transparent = false,

  // Neumorphic Defaults
  variant = "pop",
  surface = "flat",
  color = "#e0e0e0",
  elevation = 2,
  intensity,
  shape = "circle",
  angleDeg,
  border = false,
  ridge = false,

  className,
  style,
  onClick
}) => {
  const iconSvg = iconRegistry[icon];

  // =========================================================
  // MODE 1: TRANSPARENT (Pure Icon, No Container)
  // =========================================================
  if (transparent) {
    // 1. Calculate Shadow for the SVG itself (Floating effect)
    // We use drop-shadow filter because box-shadow creates a box around the SVG
    let svgFilter = "none";

    if (variant === "pop" && !filled) {
      const dist = elevation * 1.5;
      const rad = ((angleDeg || 145) * Math.PI) / 180;
      const dx = (Math.cos(rad) * dist).toFixed(1);
      const dy = (Math.sin(rad) * dist).toFixed(1);
      const blur = (dist * 2).toFixed(1);
      const light = lighten(color, 80);
      const dark = darken(color, 20);

      // Floating shadow
      svgFilter = `drop-shadow(${dx}px ${dy}px ${blur}px ${dark}) drop-shadow(${-dx}px ${-dy}px ${blur}px ${light})`;
    }

    return (
      <div
        className={`${iconWrapper} ${className || ""}`}
        style={{ width: size, height: size, ...style }} // Wrapper just holds size
        onClick={onClick}
      >
        <svg
          viewBox="0 0 24 24"
          className={svgStyle}
          style={{
            // Scale up slightly since we have no padding
            width: "80%",
            height: "80%",

            // Logic: If filled, use color. If not, use standard text color.
            stroke: filled ? fillColor : "#666",
            fill: filled ? fillColor : "none",

            // Apply the floating shadow
            filter: svgFilter,
            transition: "all 0.2s ease"
          }}
        >
          {iconSvg}
        </svg>
      </div>
    );
  }

  // =========================================================
  // MODE 2: CONTAINER (Standard Neumorphic Button)
  // =========================================================

  // Top Layer (The Surface)
  const topLayerStyle = getNeumorphicStyle({
    variant, surface, color, elevation, intensity, shape, angleDeg, border, ridge,
    state: "default",
  });

  // Bottom Layer (The Reveal Color)
  const bottomLayerStyle = {
    backgroundColor: fillColor,
    borderRadius: topLayerStyle.borderRadius,
    boxShadow: `inset 2px 2px 5px rgba(0,0,0,0.2)`,
  };

  // Animation Logic
  // If Pop + Filled: Top layer opacity -> 0 (Reveals bottom)
  const topOpacity = (filled && variant === "pop") ? 0 : 1;

  // Icon Stroke/Fill Logic inside the container
  // If we are revealing the bottom layer (Pop + Filled), the top icon is invisible anyway.
  // If we are Inset + Filled, we color the icon on top.
  const iconStroke = (filled && variant !== "pop") ? fillColor : "#666";
  const iconFill = (filled && variant !== "pop") ? `${fillColor}33` : "none";

  return (
    <div
      className={`${iconWrapper} ${className || ""}`}
      style={{ width: size, height: size, ...style }}
      onClick={onClick}
    >
      {/* LAYER 1: The Colored Underlay (Only visible when Pop + Filled) */}
      <div
        className={layer}
        style={{
          ...bottomLayerStyle,
          zIndex: 1,
          opacity: variant === "pop" ? 1 : 0
        }}
      >
        <svg viewBox="0 0 24 24" className={svgStyle} style={{ stroke: "#fff", fill: "rgba(255,255,255,0.2)" }}>
           {iconSvg}
        </svg>
      </div>

      {/* LAYER 2: The Neumorphic Surface */}
      <div
        className={layer}
        style={{
          ...topLayerStyle,
          zIndex: 2,
          opacity: topOpacity,
          transform: (filled && variant === "pop") ? "scale(0.95)" : "scale(1)",
          pointerEvents: topOpacity === 0 ? "none" : "auto"
        }}
      >
        <svg viewBox="0 0 24 24" className={svgStyle} style={{ stroke: iconStroke, fill: iconFill }}>
           {iconSvg}
        </svg>
      </div>
    </div>
  );
};
