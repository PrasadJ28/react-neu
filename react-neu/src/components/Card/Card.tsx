import React from "react";
import { baseCard } from "./Card.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import { lighten, darken } from "../../styles/colorUtils";
import type { NeuComponentProps } from "../../styles/types";

export const NeuCard: React.FC<NeuComponentProps<HTMLDivElement>> = ({
  // Defaults
  variant = "flat",
  surface = "flat",
  color = "#e0e0e0", // Explicit default needed for local calculations
  elevation = 2,
  intensity = 0.15,
  shape = "rounded",
  angleDeg = 145,
  border = false,
  ridge = false,

  children,
  className,
  style,
  ...htmlProps
}) => {

  // 1. Get Base Style (Handles Variant: Pop, Flat, Inset)
  const baseStyles = getNeumorphicStyle({
    variant,
    surface: "flat", // We force flat here to handle surface manually below
    color,
    elevation,
    intensity,
    shape,
    angleDeg,
    border,
    ridge,
    state: "default",
  });

  // 2. Calculate Local Surface Logic (The "Curve")
  // We use the user's preferred aesthetic: Smooth, soft gradients using INSET shadows.
  // This allows them to stack on top of Pop/Inset/Flat variants.

  const getSurfaceOverlay = () => {
    if (surface === "flat") return "";

    // Utilities specifically for the curve
    const shift = Math.max(5, Math.min(100, intensity * 200));
    const light = lighten(color, shift);
    const dark = darken(color, shift);

    // We scale the curve blur based on elevation to keep it proportional
    const dist = elevation * 2; // Distance of the curve
    const blur = elevation * 4; // Soft blur (smoothen it out)
    const spread = -(elevation / 2); // Negative spread blends it internally

    // Calculate Coordinates based on Angle
    const rad = (angleDeg * Math.PI) / 180;
    const dx = (Math.cos(rad) * dist).toFixed(1);
    const dy = (Math.sin(rad) * dist).toFixed(1);
    const negDx = (-Math.cos(rad) * dist).toFixed(1);
    const negDy = (-Math.sin(rad) * dist).toFixed(1);

    if (surface === "convex") {
      // BULGE: Light on Top-Left (Inside), Dark on Bottom-Right (Inside)
      return `inset ${dx}px ${dy}px ${blur}px ${spread}px ${light},
              inset ${negDx}px ${negDy}px ${blur}px ${spread}px ${dark}`;
    }

    if (surface === "concave") {
      // DISH: Dark on Top-Left (Inside), Light on Bottom-Right (Inside)
      return `inset ${dx}px ${dy}px ${blur}px ${spread}px ${dark},
              inset ${negDx}px ${negDy}px ${blur}px ${spread}px ${light}`;
    }

    return "";
  };

  const surfaceShadow = getSurfaceOverlay();

  // 3. Merge Shadows
  // If base has a shadow (Pop/Inset), we append our curve.
  // If base is Flat (no shadow), we just use the curve.
  let finalShadow = baseStyles.boxShadow;

  if (surfaceShadow) {
    if (finalShadow && finalShadow !== "none") {
      finalShadow = `${finalShadow}, ${surfaceShadow}`;
    } else {
      finalShadow = surfaceShadow;
    }
  }

  return (
    <div
      className={`${baseCard} ${className || ""}`}
      style={{
        ...baseStyles,
        boxShadow: finalShadow, // Override with our merged shadow
        ...style,
      }}
      {...htmlProps}
    >
      {children}
    </div>
  );
};
