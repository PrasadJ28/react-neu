import { style } from "@vanilla-extract/css";

export const ridgeContainer = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  // Ensures no gaps between the ridge border and the child content
  padding: 0,
  overflow: "hidden",
});
