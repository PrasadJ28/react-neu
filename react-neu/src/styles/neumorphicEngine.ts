// src/styles/neumorphicEngine.ts
import { lighten, darken } from "./colorUtils";
import type { NeumorphicProps } from "./types";

interface EngineOptions extends NeumorphicProps {
  state?: "default" | "hover" | "active";
}

export function getNeumorphicStyle(options: EngineOptions) {
  const {
    variant = "flat",
    surface = "flat", // New Prop: 'flat', 'convex', 'concave'
    color = "#e0e0e0",
    intensity = 0.15,
    elevation = 2,
    angleDeg = 145,
    border = false,
    shape = "rounded",
    ridge = false,
    state = "default",
  } = options;

  // --- 1. Utilities ---
  const shiftAmount = Math.max(5, Math.min(100, intensity * 200));
  const lightColor = lighten(color, shiftAmount);
  const darkColor = darken(color, shiftAmount);
  const outlineColor = darken(color, 20);
  const definitionBorder = border ? darken(color, 10) : "transparent";

  // --- 2. Shadow Generators ---

  // A. Standard Drop Shadow (Elevates the element)
  const getDropShadow = (dist: number) => {
    const blur = dist * 2;
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad) * dist;
    const dy = Math.sin(rad) * dist;
    return `${dx.toFixed(1)}px ${dy.toFixed(1)}px ${blur}px ${darkColor},
            ${-dx.toFixed(1)}px ${-dy.toFixed(1)}px ${blur}px ${lightColor}`;
  };

  // B. Standard Inset Shadow (Creates a hole) - RESTORED
  const getInsetShadow = (dist: number, tight = false) => {
    const blur = tight ? dist : dist * 2;
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad) * dist;
    const dy = Math.sin(rad) * dist;
    return `inset ${dx.toFixed(1)}px ${dy.toFixed(1)}px ${blur}px ${darkColor},
            inset ${-dx.toFixed(1)}px ${-dy.toFixed(1)}px ${blur}px ${lightColor}`;
  };

  // C. Surface Curve (The "Layer" you requested)
  // This adds a subtle inner shadow to simulate curvature WITHOUT removing the element's main shadow.
  const getSurfaceCurve = (type: "convex" | "concave", dist: number) => {
    // We use a softer blur for the surface curve so it looks like a smooth deformation
    const blur = dist * 1.5;
    const spread = 0; // Keep it contained
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad) * dist;
    const dy = Math.sin(rad) * dist;

    if (type === "convex") {
      // Bulge Out: Light Top-Left, Dark Bottom-Right (Inside)
      return `inset ${dx.toFixed(1)}px ${dy.toFixed(1)}px ${blur}px ${spread}px ${lightColor},
              inset ${-dx.toFixed(1)}px ${-dy.toFixed(1)}px ${blur}px ${spread}px ${darkColor}`;
    } else {
      // Dish In: Dark Top-Left, Light Bottom-Right (Inside)
      return `inset ${dx.toFixed(1)}px ${dy.toFixed(1)}px ${blur}px ${spread}px ${darkColor},
              inset ${-dx.toFixed(1)}px ${-dy.toFixed(1)}px ${blur}px ${spread}px ${lightColor}`;
    }
  };

  // --- 3. The State Machine ---

  let finalShadow = "none";
  let transform = "translateY(0px)";
  let finalBorder = `1px solid ${definitionBorder}`;

  // Logic: Base Shadow (Variant) + Surface Shadow (Curve)

  switch (variant) {
    case "flat":
      if (state === "active") {
        finalShadow = getInsetShadow(elevation);
        finalBorder = `1px solid transparent`;
      } else {
        finalShadow = "none";
        finalBorder = `1px solid ${outlineColor}`;
      }
      break;

    case "pop":
      // 1. Base: Always Elevated (Drop Shadow)
      const drop = getDropShadow(elevation * 2);

      // 2. Layer: Add Surface Curve if requested
      // If 'ridge' is active, we use standard inset.
      // If 'surface' is convex/concave, we overlay the curve.

      if (state === "active") {
        if (ridge) {
           // Ridge: Sharp inset + Drop
           finalShadow = `${drop}, ${getInsetShadow(elevation)}`;
           transform = "scale(0.99)";
        } else {
           // Standard Pop Active:
           // If user wants "Rubbery" (Concave active), we layer it.
           // Otherwise we just sink slightly (scale).
           const activeSurface = surface === "convex" ? "concave" : surface;

           if (activeSurface === "concave") {
             // RUBBER EFFECT: Elevated Body + Concave Top
             finalShadow = `${drop}, ${getSurfaceCurve("concave", elevation)}`;
             transform = "scale(0.98)";
           } else {
             // Standard Mechanical Press (Just sinks physically)
             finalShadow = getInsetShadow(elevation);
             transform = "translateY(1px)";
           }
        }
      } else {
        // Default State
        if (surface !== "flat") {
           // Apply static curvature (e.g. a permanent Convex button)
           finalShadow = `${drop}, ${getSurfaceCurve(surface as "convex"|"concave", elevation)}`;
        } else {
           finalShadow = drop;
        }
      }
      break;

    case "sink":
    case "inset":
      if (state === "active") {
        finalShadow = getInsetShadow(Math.max(1, elevation * 0.5), true);
      } else {
        finalShadow = getInsetShadow(elevation);
      }
      break;
  }

  // --- 4. Shape Handling ---
  const radiusMap: Record<string, string> = {
    square: "4px",
    rounded: "12px",
    circle: "50%",
    pill: "9999px",
  };

  return {
    background: color,
    boxShadow: finalShadow,
    borderRadius: radiusMap[shape] || "12px",
    border: finalBorder,
    transform,
    outline: "none",
    transition: "box-shadow 0.2s ease-in-out, transform 0.1s ease-out",
  };
}
