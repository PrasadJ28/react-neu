// src/styles/shadowUtils.ts
import { lighten, darken } from "./colorUtils";

export type NeumorphicMode = "pop" | "drop";
export type NeumorphicState = "default" | "hover" | "active";

interface ShadowOptions {
  mode?: NeumorphicMode;
  color?: string;
  intensity?: number; // base brightness delta
  elevation?: number; // 1–10 scale
  state?: NeumorphicState;
  angleDeg?: number; // 0–360
  customDistance?: number; // optional user override for offset
  customDepth?: number;
}

export function getNeumorphicShadow({
  mode,
  color: buttonColor,
  intensity = 12,
  elevation = 1,
  state = "default",
  angleDeg = 135,
  customDistance,
  customDepth,
}: ShadowOptions) {
  if (!mode) return "none";

  // Clamp elevation to 1–10
  const level = Math.max(1, Math.min(10, elevation));

  // Adjust for hover/active but maintain same strength feel
  const elevationMap = {
    default: level,
    hover: level + 1.2,
    active: level - 0.8,
  } as const;
  const effectiveElevation = elevationMap[state];
  const color = buttonColor || "#e0e0e0";
  // Make big changes to spatial distance and blur
  // Elevation now multiplies both — this gives real visual separation
  const distance = customDistance ?? 2 * effectiveElevation ** 1.4;
  const blur = customDepth ?? 5 * effectiveElevation ** 1.4;


  // Make contrast increase sharply with elevation
  // 1 → soft, 10 → extremely strong
  const effectiveIntensity = intensity + level * 15;

  const darkBoost = 1 + Math.pow(level / 8, 2); // nonlinear dark boost
  const lightBoost = 1 + Math.pow(level / 10, 1.5); // gentle brightening

  const darkShadow = darken(color, intensity * 1.5 * darkBoost);
  const lightShadow = lighten(color, intensity * lightBoost);

  const inset = mode === "drop" ? "inset " : "";

  const angleRad = (angleDeg * Math.PI) / 180;
  const offsetX = Math.cos(angleRad) * distance;
  const offsetY = Math.sin(angleRad) * distance;

 return `
    ${inset}${offsetX.toFixed(1)}px ${offsetY.toFixed(1)}px ${blur.toFixed(1)}px ${darkShadow},
    ${inset}${-offsetX.toFixed(1)}px ${-offsetY.toFixed(1)}px ${blur.toFixed(1)}px ${lightShadow}
  `;
}

