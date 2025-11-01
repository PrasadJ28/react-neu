import React from "react";
import * as styles from "./Button.css";
import { getNeumorphicShadow } from "../../styles/shadowUtils";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  mode?: "pop" | "drop";
  shadowAngle?: number; // 0–360
  depth?: number;
  distance?: number;
}

export const NeuButton: React.FC<ButtonProps> = ({
  mode = "pop",
  shadowAngle,
  depth,
  distance,
  style,
  ...props
}) => {

const inlineVars: React.CSSProperties & Record<string, string | number | undefined> = {
  "--shadow-angle": shadowAngle ? `${shadowAngle}deg` : undefined,
  "--shadow-depth": depth ? depth.toString() : undefined,
  "--shadow-distance": distance ? `${distance}px` : undefined,
  boxShadow: getNeumorphicShadow(mode),
  ...style,
}


  return <button className={styles.baseButton} style={inlineVars} {...props} />;
};
