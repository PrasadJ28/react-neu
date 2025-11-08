import React from "react";
import * as styles from "./Button.css";
import { getNeumorphicShadow } from "../../styles/shadowUtils";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  mode?: "pop" | "drop";
  shadowAngle?: number;
  depth?: number;
  distance?: number;

  // Visual customization
  radius?: string;
  size?: string;
  padding?: string;
  borderColor?: string;
  borderWidth?: string;
  textColor?: string;
  buttonColor?: string;
  fontFamily?: string;
  fontWeight?: string | number;

  // New style hooks
  hoverStyle?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  disabledStyle?: React.CSSProperties;
}

export const NeuButton: React.FC<ButtonProps> = ({
  mode = "pop",
  shadowAngle,
  depth,
  distance,
  radius,
  size,
  padding,
  borderColor,
  borderWidth,
  textColor,
  buttonColor,
  fontFamily,
  fontWeight,
  hoverStyle,
  activeStyle,
  disabledStyle,
  style,
  disabled,
  ...props
}) => {
  // Base inline CSS variables
  const inlineVars: React.CSSProperties & Record<string, string | number | undefined> = {
    "--shadow-angle": shadowAngle ? `${shadowAngle}deg` : undefined,
    "--shadow-depth": depth ? depth.toString() : undefined,
    "--shadow-distance": distance ? `${distance}px` : undefined,
    "--radius-md": radius,
    "--size-md": size,
    "--padding-md": padding,
    "--border-color": borderColor,
    "--border-width": borderWidth,
    "--text": textColor,
    "--button-color": buttonColor,
    "--font-family": fontFamily,
    "--font-weight": fontWeight?.toString(),
    boxShadow: getNeumorphicShadow(mode),
    ...style,
  };

  // State management
  const [state, setState] = React.useState<"default" | "hover" | "active" | "disabled">(
    disabled ? "disabled" : "default"
  );

  // Merge base + state styles
  const mergedStyle: React.CSSProperties = {
    ...inlineVars,
    ...(state === "hover" && hoverStyle),
    ...(state === "active" && activeStyle),
    ...(state === "disabled" && disabledStyle),
  };

  return (
    <button
      className={styles.baseButton}
      style={mergedStyle}
      disabled={disabled}
      onMouseEnter={() => !disabled && setState("hover")}
      onMouseLeave={() => !disabled && setState("default")}
      onMouseDown={() => !disabled && setState("active")}
      onMouseUp={() => !disabled && setState("hover")}
      {...props}
    />
  );
};
