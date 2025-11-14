import { createVar, style, globalStyle } from "@vanilla-extract/css";

export const neuVars = {
  color: {
    background: createVar(),
    text: createVar(),
    shadowLight: createVar(),
    shadowDark: createVar(),
  },
  shadow: {
    depth: createVar(),
    distance: createVar(),
  },
};

globalStyle(":root", {
  vars: {
    [neuVars.color.background]: "var(--background-color, #e0e0e0)",
    [neuVars.color.text]: "var(--text-color, #2c2c2c)",
    [neuVars.color.shadowLight]: "rgba(255,255,255,0.7)",
    [neuVars.color.shadowDark]: "rgba(0,0,0,0.25)",
    [neuVars.shadow.depth]: "0.3",
    [neuVars.shadow.distance]: "8px",
  },
});

