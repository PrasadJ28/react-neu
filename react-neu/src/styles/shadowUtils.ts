export function getNeumorphicShadow(mode: "pop" | "drop" = "pop") {
  const distance = 10;
  const depth = 0.3;
  const angleDeg = 135;

  const angleRad = (angleDeg * Math.PI) / 180;
  const offsetX = Math.cos(angleRad) * distance;
  const offsetY = Math.sin(angleRad) * distance;

  const darkShadow = "rgba(0, 0, 0, 0.25)";
  const lightShadow = "rgba(255, 255, 255, 0.7)";
  const inset = mode === "drop" ? "inset " : "";

  return `
    ${inset}${offsetX}px ${offsetY}px ${depth * 30}px ${darkShadow},
    ${inset}${-offsetX}px ${-offsetY}px ${depth * 30}px ${lightShadow}
  `;
}
