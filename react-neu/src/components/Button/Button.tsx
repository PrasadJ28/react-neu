import React, { useState } from "react";
import { baseButton } from "./Button.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeuComponentProps } from "../../styles/types";

export const NeuButton: React.FC<NeuComponentProps<HTMLButtonElement>> = ({
  // Neumorphic Props (with defaults)
  variant = "flat",
  surface = "flat",
  color,       // If undefined, Engine uses theme default
  elevation = 2,
  intensity,
  shape = "rounded",
  angleDeg,
  border,
  ridge = false,

  // Standard React Props
  children,
  style,
  className,
  disabled,
  ...htmlProps // Spread standard HTML attributes (onClick, id, type, etc.)
}) => {
  // 1. Interaction State
  // We track if the user is pressing the button
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 2. Determine State for Engine
  // Priority: Active (Pressed) > Hover > Default
  let visualState: "default" | "hover" | "active" = "default";

  if (isPressed) {
    visualState = "active";
  } else if (isHovered) {
    visualState = "hover";
  }

  // 3. Generate Styles from Engine
  const neuStyles = getNeumorphicStyle({
    variant,
    surface,
    color,
    elevation,
    intensity,
    shape,
    angleDeg,
    border,
    ridge,
    state: visualState,
  });

  return (
    <button
      className={`${baseButton} ${className || ""}`}
      disabled={disabled}

      // Mouse & Touch Events
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}

      // Touch support for mobile feeling
      onTouchStart={() => !disabled && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}

      // Apply Generated Styles
      style={{
        ...neuStyles, // The Engine's output (Shadows, Background, Radius)
        ...style,     // User overrides (if any)
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}

      {...htmlProps}
    >
      {children}
    </button>
  );
};
