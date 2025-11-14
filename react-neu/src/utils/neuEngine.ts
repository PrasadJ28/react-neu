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

}
