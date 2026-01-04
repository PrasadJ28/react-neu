import { style } from "@vanilla-extract/css";

export const sliderContainer = style({
  position: "relative",
  width: "100%",
  height: "32px", // Increased height for better touch target
  display: "flex",
  alignItems: "center",
  touchAction: "none",
  cursor: "pointer",
  userSelect: "none",
});

export const sliderTrack = style({
  width: "100%",
  height: "12px", // Slightly thicker track for "Ridge" visibility
  position: "relative",
});

export const sliderThumb = style({
  position: "absolute",
  top: "50%",
  // We don't set 'left' here, it's set inline via React
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  // Center the thumb vertically, but horizontally we handle it via calculation to prevent overflow
  transform: "translate(-50%, -50%)",
  cursor: "grab",
  transition: "box-shadow 0.2s ease, transform 0.1s ease",
  zIndex: 2,
  ":active": {
    cursor: "grabbing",
    transform: "translate(-50%, -50%) scale(0.95)", // Subtle shrink on press
  },
});
