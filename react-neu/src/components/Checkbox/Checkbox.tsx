import React, { useState } from "react";
import { checkboxLabel, hiddenInput, visualBox, iconContainer, svgIcon } from "./Checkbox.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeumorphicProps } from "../../styles/types";

// Extend standard input props but omit ones we override or don't need
interface CheckboxProps extends NeumorphicProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  /**
   * The visual style when checked.
   * - 'check': Shows a checkmark.
   * - 'cross': Shows an X.
   * - 'fill': No icon, the button just sinks (simulates pressing/filling).
   */
  selectionStyle?: "check" | "cross" | "fill";

  /**
   * Color of the Check or Cross icon.
   * @default "#333"
   */
  selectedColor?: string;

  /**
   * Width/Height of the checkbox.
   * @default "26px"
   */
  size?: number | string;
}

export const NeuCheckbox: React.FC<CheckboxProps> = ({
  // Neumorphic Defaults
  variant = "pop", // Default: Popped out, then sinks when checked
  surface = "flat",
  color,
  elevation = 2,
  intensity,
  shape = "rounded", // "square" or "circle" also valid
  angleDeg,
  border = false,
  ridge = false,

  // Custom Logic
  selectionStyle = "check",
  selectedColor = "#1e1e1e",
  size = "26px",

  // Standard React Props
  checked,
  defaultChecked,
  onChange,
  children,
  className,
  style,
  disabled,
  ...htmlProps
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  // LOGIC:
  // When checked, the element enters "active" state in the engine.
  // This typically causes "Pop" items to become "Inset" (Sink).
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
      className={`${checkboxLabel} ${className || ""}`}
      style={{ opacity: disabled ? 0.6 : 1, ...style }}
    >
      <input
        type="checkbox"
        className={hiddenInput}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...htmlProps}
      />

      {/* The Visual Box */}
      <div
        className={visualBox}
        style={{
          width: size,
          height: size,
          ...boxStyle, // Applies Shadow, Radius, Border, Transform
        }}
      >
        {showIcon && (
           <div className={iconContainer} style={{ opacity: isChecked ? 1 : 0 }}>
             <svg
                viewBox="0 0 24 24"
                className={svgIcon}
                style={{ stroke: selectedColor, strokeWidth: 3 }}
             >
               {selectionStyle === "check" && (
                 <polyline points="20 6 9 17 4 12" />
               )}
               {selectionStyle === "cross" && (
                 <>
                   <line x1="18" y1="6" x2="6" y2="18" />
                   <line x1="6" y1="6" x2="18" y2="18" />
                 </>
               )}
             </svg>
           </div>
        )}
      </div>

      {children && <span>{children}</span>}
    </label>
  );
};
