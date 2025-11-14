// src/styles/neumorphicEngine.ts
import { lighten, darken } from "./colorUtils";

export type NeumorphicVariant = "flat" | "convex" | "concave" | "pressed";
export type NeumorphicState = "default" | "hover" | "active" | "disabled" | "focus";

export interface NeumorphicOptions {
  variant?: NeumorphicVariant;
  color?: string;
  angleDeg?: number;
  distance?: number;   // 1–10 (or px if you want)
  blur?: number;       // 1–10
  intensity?: number;  // 1–10
  elevation?: number;  // 1–10
  border?: boolean;
  state?: NeumorphicState;

  // New: control composite behavior without hardcoding in components
  focusGlow?: boolean;     // add an outer glow on focus
  glowScale?: number;      // multiplier for distance/blur on glow
}

function pairShadows({
  color, intensity, distance, blur, angleDeg, inset = false,
}: {
  color: string;
  intensity: number;
  distance: number;
  blur: number;
  angleDeg: number;
  inset?: boolean;
}) {
  const darkShadow = darken(color, intensity * 2);
  const lightShadow = lighten(color, intensity * 2);
  const ang = (angleDeg * Math.PI) / 180;
  const ox = Math.cos(ang) * distance;
  const oy = Math.sin(ang) * distance;
  const pre = inset ? "inset " : "";
  return `${pre}${ox}px ${oy}px ${blur}px ${darkShadow}, ${pre}${-ox}px ${-oy}px ${blur}px ${lightShadow}`;
}

export function getNeumorphicStyle({
  variant = "convex",
  color = "#f6f5f4",
  angleDeg = 135,
  distance = 6,
  blur = 12,
  intensity = 6,
  elevation = 2,
  border = false,
  state = "default",
  focusGlow = false,
  glowScale = 3,
}: NeumorphicOptions) {
  // Elevation scaling (kept mild so component props remain the main control)
  const level = Math.max(1, Math.min(10, elevation));
  const effDistance = distance * level ** 1.2;
  const effBlur = blur * level ** 1.2;

  // Base background by variant
  let background = color;
  if (variant === "convex") {
    background = `linear-gradient(225deg, ${lighten(color, 4)}, ${darken(color, 4)})`;
  } else if (variant === "concave") {
    background = `linear-gradient(225deg, ${darken(color, 4)}, ${lighten(color, 4)})`;
  } else if (variant === "pressed") {
    background = lighten(color, 3);
  }

  // Base shadows by variant
  let base = "";
  if (variant === "flat") {
    base = pairShadows({ color, intensity, distance: effDistance, blur: effBlur, angleDeg });
  } else if (variant === "convex") {
    base = pairShadows({ color, intensity, distance: effDistance, blur: effBlur, angleDeg });
  } else if (variant === "concave") {
    base = pairShadows({ color, intensity, distance: effDistance, blur: effBlur, angleDeg, inset: true });
  } else if (variant === "pressed") {
    // deeper inset for pressed
    base = pairShadows({
      color,
      intensity: intensity + 2,
      distance: effDistance * 1.6,
      blur: effBlur * 1.8,
      angleDeg,
      inset: true,
    });
  }

  // Optional focus glow layer (outer) – engine-driven, not hardcoded
  let composite = base;
  if (state === "focus" && focusGlow) {
    const glow = pairShadows({
      color,
      intensity: Math.max(1, intensity - 1),
      distance: effDistance * glowScale,
      blur: effBlur * glowScale,
      angleDeg,
      inset: false,
    });
    // outer glow first, then base inset so it feels “halo + pressed”
    composite = `${glow}, ${base}`;
    // Slight brighten on focus to mimic your white-on-focus without hardcoding white
    background = lighten(color, 6);
  }

  const borderStyle = border ? `2px solid ${darken(color, 10)}` : "none";
  return { background, boxShadow: composite, border: borderStyle };
}

