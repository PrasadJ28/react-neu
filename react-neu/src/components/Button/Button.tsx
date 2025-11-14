import React from "react";
import * as styles from "./Button.css";
import { filterDOMProps } from "../../styles/filterDomProps";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine"; 

export const NeuButton: React.FC<NeuButtonProps> = ({
  // internal props
  variant = "flat",
  color = "#e0e0e0",
  angleDeg = 135,
  distance = 4,
  blur = 6,
  intensity = 5,
  elevation = 2,
  border = false,
  radius = "0px",
  padding = "14px 28px",
  textColor = "#333",
  fontSize = "1rem",
  fontFamily = "inherit",
  fontWeight = 500,
  transition,
  hoverStyle,
  activeStyle,
  disabledStyle,
  style,
  disabled,
  onClick,
  children,
  ...props
}) => {
  const defaultProps = filterDOMProps(props);

  const [state, setState] = React.useState<"default" | "hover" | "active" | "disabled">(
    disabled ? "disabled" : "default"
  );

  const visualVariant =
    state === "active"
      ? "pressed"
      : state === "hover"
      ? variant === "concave"
        ? "pressed"
        : "convex"
      : variant;

  const { background, boxShadow, border: borderStyle } = getNeumorphicStyle({
    variant: visualVariant,
    color,
    angleDeg,
    distance,
    blur,
    intensity,
    elevation,
    border,
    state,
  });

  const mergedStyle: React.CSSProperties = {
    background,
    boxShadow,
    border: borderStyle,
    borderRadius: radius,
    padding,
    color: textColor,
    fontSize,
    fontFamily,
    fontWeight,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: transition || "all 0.25s ease",
    ...(state === "hover" && hoverStyle),
    ...(state === "active" && activeStyle),
    ...(state === "disabled" && disabledStyle),
    ...style,
  };

  return (
    <button
      className={styles.baseButton}
      style={mergedStyle}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setState("hover")}
      onMouseLeave={() => !disabled && setState("default")}
      onMouseDown={() => !disabled && setState("active")}
      onMouseUp={() => !disabled && setState("hover")}
      {...defaultProps}
    >
      {children}
    </button>
  );
};
