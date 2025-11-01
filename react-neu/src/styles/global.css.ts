import { globalStyle } from "@vanilla-extract/css";
import { neuVars } from "./theme.css";

globalStyle("body", {
  margin: 0,
  backgroundColor: neuVars.color.background,
  fontFamily: "Inter, sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});
