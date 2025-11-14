const internalProps = new Set([
  "variant",
  "color",
  "angleDeg",
  "distance",
  "blur",
  "intensity",
  "elevation",
  "border",
  "radius",
  "padding",
  "textColor",
  "fontSize",
  "fontFamily",
  "fontWeight",
  "transition",
  "hoverStyle",
  "activeStyle",
  "disabledStyle",
]);

export function filterDOMProps<T extends Record<string, any>>(props: T):Partial<T> {
  const result: Partial<T> = {};
  for(const key in props) {
    if(!internalProps.has(key)) result[key] = props[key];
  }
  return result;
}
