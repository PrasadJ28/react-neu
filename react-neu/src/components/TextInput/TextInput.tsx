import React, { useState } from "react";
import { baseInput } from "./TextInput.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeumorphicProps } from "../../styles/types";

// FIX: Use InputHTMLAttributes instead of generic HTMLAttributes
// This ensures 'placeholder', 'value', 'type', etc. are valid.
type TextInputProps = NeumorphicProps & React.InputHTMLAttributes<HTMLInputElement>;

export const NeuTextInput: React.FC<TextInputProps> = ({
  // Default to 'inset' as that is standard for inputs
  variant = "inset",
  color,
  elevation = 2,
  intensity,
  shape = "rounded",
  angleDeg,
  border = false,
  ridge = false,

  // Standard Props
  className,
  style,
  disabled,
  onFocus,
  onBlur,
  ...htmlProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Map Focus -> Active
  const neuStyles = getNeumorphicStyle({
    variant,
    color,
    elevation,
    intensity,
    shape,
    angleDeg,
    border,
    ridge,
    state: isFocused ? "active" : "default",
  });

  return (
    <input
      className={`${baseInput} ${className || ""}`}
      disabled={disabled}

      // Events
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e);
      }}

      // Styling
      style={{
        ...neuStyles,
        ...style,
        // Ensure background adapts if user overrides color
        background: style?.background || neuStyles.background,
        color: style?.color || "inherit",
      }}

      {...htmlProps}
    />
  );
};
