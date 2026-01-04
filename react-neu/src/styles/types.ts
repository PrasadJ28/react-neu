import type { HTMLAttributes, ReactNode } from "react";

// 1. The New Variants
export type NeuVariant = "flat" | "pop" | "sink" | "inset";

// 2. Shape Presets
export type NeuShape = "square" | "rounded" | "circle" | "pill";

export type NeuSurface = "flat" | "convex" | "concave";

// 3. The Core Configuration
export interface NeumorphicConfig {
  distance: number;
  blur: number;
  intensity: number;
  angleDeg: number;
  color: string;
}

// 4. The Configuration Props (User Facing)
export interface NeumorphicProps {
  variant?: NeuVariant;
  surface?: NeuSurface;
  shape?: NeuShape;
  color?: string;
  elevation?: number;
  intensity?: number;
  angleDeg?: number;
  border?: boolean;

  /**
   * If true, active/focus state keeps the outer drop shadow while adding an inner shadow.
   * Creates a "trench" or "ridge" effect where edges stay raised but center sinks.
   * Only applies to 'pop' variant.
   */
  ridge?: boolean;
}

// 5. Shared Component Props
export type NeuComponentProps<T extends HTMLElement> =
  HTMLAttributes<T> &
  NeumorphicProps & {
    disabled?: boolean;
    children?: ReactNode;
  };
