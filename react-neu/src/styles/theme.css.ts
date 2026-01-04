import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

// Global Theme Variables
// We consolidate everything into 'neuVars'.
export const neuVars = createGlobalTheme(":root", {
  colors: {
    background: "#e0e0e0",  // The main surface color
    text: "#1e1e1e",        // High contrast text
    primary: "#3b82f6",     // For accents (optional)
  },
  physics: {
    angle: "145deg",        // Default light source
    intensity: "0.15",      // Base shadow opacity
  },
});

// Global Resets
// Ensures the body background matches the neumorphic surface.
globalStyle("body", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  backgroundColor: neuVars.colors.background,
  color: neuVars.colors.text,
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  // Center content (Optional: keeps your current demo layout)
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

// Universal Box Sizing
globalStyle("*", {
  boxSizing: "border-box",
});
