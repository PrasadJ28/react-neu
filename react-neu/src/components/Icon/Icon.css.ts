import { style } from "@vanilla-extract/css";

export const iconWrapper = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  cursor: "pointer",
  transition: "transform 0.1s ease",
  ":active": {
    transform: "scale(0.95)",
  },
  // Ensure the stacking context is clean
  isolation: "isolate",
});

export const layer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
});

export const svgStyle = style({
  width: "50%", // Icon is 50% of the container
  height: "50%",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2px",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  transition: "all 0.3s ease",
});
