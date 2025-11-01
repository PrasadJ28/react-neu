import { style } from "@vanilla-extract/css";
import { neuVars } from "../../styles/theme.css";

export const baseButton = style({
  background: neuVars.color.background,
  color: neuVars.color.text,
  border: "none",
  borderRadius: "12px",
  padding: "14px 28px",
  cursor: "pointer",
  transition: "all 0.2s ease",
});
