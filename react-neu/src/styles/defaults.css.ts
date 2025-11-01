import { createGlobalTheme } from "@vanilla-extract/css";
import { neuVars } from "./theme.css";

createGlobalTheme(":root", neuVars, {
  color: {
    background: "#e0e0e0",
    primary: "#ffffff",
    secondary: "#c8c8c8",
    text: "#111111",
  },
  neumorphic: {
    angle: "135deg",
    depth: "0.3",
    distance: "10px",
  },
});
