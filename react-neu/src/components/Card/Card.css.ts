import { style } from "@vanilla-extract/css";
import { neuVars } from "../../styles/theme.css";

export const baseCard = style({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxSizing: "border-box",
  color: neuVars.colors.text,
  transition: "all 0.3s ease-in-out",
});
