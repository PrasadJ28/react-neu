import React from "react";
import { radioLabel, hiddenRadio, visualBox, iconContainer, radioDot, svgIcon } from "./Radio.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeumorphicProps } from "../../styles/types";

interface RadioProps extends NeumorphicProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  /**
   * Visual style when selected.
   * - 'dot': Standard radio circle.
   * - 'check': Checkmark.
   * - 'cross': X mark.
   * - 'fill': Sinks in (Inset) without an icon.
   * @default "dot"
   */
  selectionStyle?: "dot" | "check" | "cross" | "fill";

  /**
   * Color of the Dot/Icon.
   * @default "#1e1e1e"
   */
  selectedColor?: string;

  /**
   * Size of the radio button.
   * @default "26px"
   */
  size?: number | string;
}

export const NeuRadio: React.FC<RadioProps> = ({
  // Neumorphic Defaults
  variant = "pop",
  surface = "flat",
  color,
  elevation = 2,
  intensity,
  shape = "circle", // Default for Radio
  angleDeg,
  border = false,
  ridge = false,

  // Custom Logic
  selectionStyle = "dot",
  selectedColor = "#1e1e1e",
  size = "26px",

  // Standard Props
  checked,
  defaultChecked,
  children,
  className,
  style,
  disabled,
  ...htmlProps
}) => {
  // Controlled/Uncontrolled logic
  const isChecked = checked || false;

  // LOGIC: If checked, we go "active" (pressed/sink) unless it's just a dot on a flat surface
  const engineState = isChecked ? "active" : "default";

  const boxStyle = getNeumorphicStyle({
    variant,
    surface,
    color,
    elevation,
    intensity,
    shape,
    angleDeg,
    border,
    ridge,
    state: engineState,
  });

  const showIcon = selectionStyle !== "fill";

  return (
    <label
      className={`${radioLabel} ${className || ""}`}
      style={{ opacity: disabled ? 0.6 : 1, ...style }}
    >
      <input
        type="radio"
        className={hiddenRadio}
        checked={isChecked}
        disabled={disabled}
        {...htmlProps}
      />

      <div
        className={visualBox}
        style={{
          width: size,
          height: size,
          ...boxStyle,
          color: selectedColor, // Inherited by radioDot
        }}
      >
        {showIcon && (
          <div className={iconContainer} style={{ opacity: isChecked ? 1 : 0 }}>
            {selectionStyle === "dot" ? (
               // Standard Dot
               <div
                 className={radioDot}
                 style={{ transform: isChecked ? "scale(1)" : "scale(0)" }}
               />
            ) : (
               // SVG Icons (Check/Cross)
               <svg
                  viewBox="0 0 24 24"
                  className={svgIcon}
                  style={{ stroke: selectedColor, strokeWidth: 3 }}
               >
                 {selectionStyle === "check" && <polyline points="20 6 9 17 4 12" />}
                 {selectionStyle === "cross" && (
                   <>
                     <line x1="18" y1="6" x2="6" y2="18" />
                     <line x1="6" y1="6" x2="18" y2="18" />
                   </>
                 )}
               </svg>
            )}
          </div>
        )}
      </div>

      {children && <span>{children}</span>}
    </label>
  );
};
