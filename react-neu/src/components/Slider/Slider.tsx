import React, { useRef, useState, useEffect } from "react";
import { sliderContainer, sliderTrack, sliderThumb } from "./Slider.css";
import { getNeumorphicStyle } from "../../styles/neumorphicEngine";
import type { NeumorphicProps } from "../../styles/types";

interface SliderProps extends NeumorphicProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  thumbSize?: string;
}

export const NeuSlider: React.FC<SliderProps> = ({
  // Defaults
  variant = "inset", // Used for the Track
  surface = "flat",
  color,
  elevation = 2,
  intensity,
  angleDeg,
  shape = "pill",
  border = true,     // Slider tracks usually look best with a border
  ridge = false,

  // Logic
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  style,
  disabled,
  thumbSize = "24px",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Parse size to number for calculations
  const sizeNum = parseInt(thumbSize) || 24;
  const padding = 4; // Gap between thumb and track wall

  // 1. STYLE: The Track (The Enclosure)
  const trackStyle = getNeumorphicStyle({
    variant,   // Use the prop (Default "inset")
    surface,
    shape,
    color,
    elevation,
    intensity,
    angleDeg,
    border,    // Use the prop (Default true)
    ridge,
    state: "default",
  });

  // 2. STYLE: The Thumb (The Knob)
  const thumbStyle = getNeumorphicStyle({
    variant: "pop", // Thumbs are always popped
    surface: "convex",
    shape: "circle",
    color,
    elevation: 3,
    intensity,
    angleDeg,
    state: isDragging ? "active" : "default",
  });

  // 3. LOGIC
  const handleUpdate = (clientX: number) => {
    if (disabled || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();

    // Available width for the center of the thumb
    const availableWidth = rect.width - (sizeNum + padding * 2);
    const startX = rect.left + padding + sizeNum / 2;

    // Calculate position relative to the "safe zone"
    const x = clientX - startX;

    let percent = x / availableWidth;

    // Clamp
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const finalValue = Math.max(min, Math.min(max, steppedValue));

    if (finalValue !== value) {
      onChange(finalValue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleUpdate(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    handleUpdate(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => { e.preventDefault(); handleUpdate(e.clientX); };
    const onUp = () => setIsDragging(false);

    const onTouchMove = (e: TouchEvent) => { handleUpdate(e.touches[0].clientX); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, min, max, step, sizeNum]);

  // Visual Position
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div
      className={`${sliderContainer} ${className || ""}`}
      style={{
        ...style,
        opacity: disabled ? 0.6 : 1,
        height: `${sizeNum + padding * 2}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* The Track acts as the Capsule Enclosure */}
      <div
        ref={trackRef}
        className={sliderTrack}
        style={{
          ...trackStyle,
          borderRadius: "999px",
          height: "100%",
          width: "100%",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* The Thumb */}
        <div
          className={sliderThumb}
          style={{
            ...thumbStyle,
            // Dynamic Positioning using CSS Calc to stay within padding
            left: `calc(${padding}px + (${percentage / 100} * (100% - ${sizeNum + padding * 2}px)))`,
            top: "50%",
            transform: "translateY(-50%)",
            width: `${sizeNum}px`,
            height: `${sizeNum}px`,
            color: isDragging ? "#3b82f6" : "inherit"
          }}
        />
      </div>
    </div>
  );
};
