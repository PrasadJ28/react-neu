import { style } from "@vanilla-extract/css";
import { neuVars } from "../../styles/theme.css";

export const baseButton = style({
  // Layout
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  // Text defaults (inherits from parent for maximum reusability)
  fontFamily: "inherit",
  fontSize: "1rem",
  fontWeight: 600,
  color: neuVars.colors.text,

  // Resets
  border: "none",
  outline: "none",
  cursor: "pointer",
  textDecoration: "none",
  WebkitTapHighlightColor: "transparent",

  // Prevent text selection during clicking
  userSelect: "none",

  // Touch Action
  touchAction: "manipulation",
});
