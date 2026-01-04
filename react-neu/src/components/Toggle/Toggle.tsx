import React, { useState } from "react";
import { switchLabel, hiddenInput, switchTrack, switchThumb, iconContainer, svgIcon } from "./Toggle.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeumorphicProps } from "../../styles/types";

interface SwitchProps extends NeumorphicProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color" | "shape"> {
  /**
   * Visual style of the thumb when active.
   * - 'plain': Standard empty thumb.
   * - 'check': Shows a checkmark when ON.
   * - 'cross': Shows an X when ON.
   */
  selectionStyle?: "plain" | "check" | "cross";

  /**
   * Color of the Icon (if used).
   * @default "#1e1e1e"
   */
  selectedColor?: string;

  /**
   * Width of the switch track. Height is automatically calculated (approx 1/2 of width).
   * @default "50px"
   */
  width?: string;

  /**
   * Shape of the switch.
   * - 'pill': Standard capsule.
   * - 'square': Rectangular box.
   */
  shape?: "pill" | "square" | "rounded";
}

export const NeuSwitch: React.FC<SwitchProps> = ({
  // Neumorphic Defaults
  variant = "inset", // Track is usually a channel
  surface = "flat",
  color,
  elevation = 2,
  intensity,
  shape = "pill",
  angleDeg,
  border = false,
  ridge = false,

  // Custom Logic
  selectionStyle = "plain",
  selectedColor = "#1e1e1e",
  width = "50px",

  // Standard Props
  checked,
  defaultChecked,
  onChange,
  className,
  style,
  disabled,
  ...htmlProps
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (checked === undefined) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  // --- DIMENSIONS ---
  const widthNum = parseInt(width) || 50;
  const heightNum = widthNum / 2; // Standard 2:1 ratio
  const padding = 4;
  const thumbSize = heightNum - (padding * 2);

  // --- STYLES ---

  // 1. TRACK (The Container)
  const trackStyle = getNeumorphicStyle({
    variant,
    surface,
    color,
    elevation,
    intensity,
    shape, // Pill or Square
    angleDeg,
    border,
    ridge,
    state: "default",
  });

  // 2. THUMB (The Moving Part)
  const thumbStyle = getNeumorphicStyle({
    variant: "pop", // Thumb is always popped
    surface: "convex", // Slight curve feels better
    color,
    elevation: 3,
    intensity,
    shape: shape === "pill" ? "circle" : "square", // Thumb matches track shape logic
    angleDeg,
    state: isChecked ? "active" : "default", // Optional: Press effect when ON
  });

  // Calculate Slide Distance
  // Left position = padding
  // Right position = width - padding - thumbSize
  const translateDist = widthNum - (padding * 2) - thumbSize;

  return (
    <label
      className={`${switchLabel} ${className || ""}`}
      style={{ opacity: disabled ? 0.6 : 1, ...style }}
    >
      <input
        type="checkbox"
        className={hiddenInput}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...htmlProps}
      />

      <div
        className={switchTrack}
        style={{
          width: `${widthNum}px`,
          height: `${heightNum}px`,
          ...trackStyle,
          borderRadius: shape === "pill" ? "999px" : (shape === "square" ? "4px" : "12px"),
        }}
      >
        <div
          className={switchThumb}
          style={{
            width: `${thumbSize}px`,
            height: `${thumbSize}px`,
            left: `${padding}px`,
            ...thumbStyle,
            borderRadius: shape === "pill" ? "50%" : (shape === "square" ? "3px" : "8px"),
            // Animation
            transform: isChecked ? `translateX(${translateDist}px)` : "translateX(0)",
            color: isChecked ? selectedColor : "inherit"
          }}
        >
          {/* OPTIONAL ICONS */}
          {selectionStyle !== "plain" && (
             <div className={iconContainer} style={{ opacity: isChecked ? 1 : 0, transition: "opacity 0.2s" }}>
               <svg
                  viewBox="0 0 24 24"
                  className={svgIcon}
                  style={{ stroke: selectedColor, strokeWidth: 3 }}
               >
                 {selectionStyle === "check" && <polyline points="20 6 9 17 4 12" />}
                 {selectionStyle === "cross" && (
                   <>
                     <line x1="18" y1="6" x2="6" y2="18" />
                     <line x1="6" y1="6" x2="18" y2="18" />
                   </>
                 )}
               </svg>
             </div>
          )}
        </div>
      </div>
    </label>
  );
};
