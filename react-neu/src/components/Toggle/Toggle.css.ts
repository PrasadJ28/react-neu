import { style } from "@vanilla-extract/css";

export const switchLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  userSelect: "none",
  position: "relative",
});

export const hiddenInput = style({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
});

export const switchTrack = style({
  position: "relative",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
});

export const switchThumb = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.3s ease",
  zIndex: 2,
});

export const iconContainer = style({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});

// Added missing export
export const svgIcon = style({
  width: "60%",
  height: "60%",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
});
