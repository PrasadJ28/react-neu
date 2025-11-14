import React from "react";
import * as styles from "./TextInput.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import { filterDOMProps } from "../../styles/filterDomProps";

export const NeuTextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  variant = "pressed",
  color = "#cccccc",
  distance = 5,
  blur = 10,
  intensity = 6,
  elevation = 2,
  border = false,
  radius = "15px",
  padding = "1em",
  fontSize = "1rem",
  textColor = "#333",
  transition = "all 0.3s ease-in-out",
  style,
  disabled,
  ...props
}) => {
  const domProps = filterDOMProps(props);
  const [focused, setFocused] = React.useState(false);

  // Base neumorphic shadow (pressed = inset)
  const { background, boxShadow } = getNeumorphicStyle({
    variant: "pressed",
    color,
    distance,
    blur,
    intensity,
    elevation,
    border,
    state: focused ? "active" : "default",
  });

  const mergedStyle: React.CSSProperties = {
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    background: background || color,
    border: "none",
    outline: "none",
    borderRadius: radius,
    padding,
    color: textColor,
    fontSize,
    width: "100%",
    boxSizing: "border-box",
    transition,
    boxShadow: focused
      ? "13px 13px 100px #969696, -13px -13px 100px #ffffff" // your custom glow
      : boxShadow || "inset 2px 5px 10px rgba(0,0,0,0.3)",
    transform: focused ? "scale(1.05)" : "scale(1)",
    backgroundColor: focused ? "white" : color,
    cursor: disabled ? "not-allowed" : "text",
    ...style,
  };

  return (
    <input
      className={styles.baseInput}
      style={mergedStyle}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...domProps}
    />
  );
};

