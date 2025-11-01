import { createThemeContract } from "@vanilla-extract/css";

export const neuVars = createThemeContract({
  color: {
    background: "var(--background, #e0e0e0)",
    primary: "var(--primary, #ffffff)",
    secondary: "var(--secondary, #c8c8c8)",
    text: "var(--text, #111111)",
  },
  neumorphic: {
    angle: "var(--shadow-angle, 135deg)",
    depth: "var(--shadow-depth, 0.3)",
    distance: "var(--shadow-distance, 10px)",
  },
});
