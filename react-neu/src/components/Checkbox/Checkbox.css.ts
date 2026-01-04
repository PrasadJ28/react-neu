import { style } from "@vanilla-extract/css";

export const checkboxLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  userSelect: "none",
  fontSize: "1rem",
  position: "relative",
});

export const hiddenInput = style({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
});

export const visualBox = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
});

// The Icon container
export const iconContainer = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});

// SVG styles
export const svgIcon = style({
  width: "60%",
  height: "60%",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Bouncy transition
});
