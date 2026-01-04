// =========================================
// 1. COMPONENTS
// =========================================

// Structural & Layout
export { NeuCard } from "./components/Card/Card";
export { NeuRidge } from "./components/Ridge/Ridge";

// Interactive Elements
export { NeuButton } from "./components/Button/Button";
export { NeuIcon } from "./components/Icon/Icon";

// Form Controls
export { NeuTextInput } from "./components/TextInput/TextInput";
export { NeuCheckbox } from "./components/Checkbox/Checkbox";
export { NeuRadio } from "./components/Radio/Radio";
export { NeuSwitch } from "./components/Toggle/Toggle";
export { NeuSlider } from "./components/Slider/Slider";

// =========================================
// 2. TYPES & INTERFACES
// =========================================

// Core Styling Types
export type {
  NeumorphicProps,
  NeuComponentProps,
  NeuVariant,
  NeuSurface,
  NeuShape,
} from "./styles/types";

// Icon Types (for IntelliSense on the 'icon' prop)
export type { IconName } from "./components/Icon/IconPaths";

// =========================================
// 3. UTILITIES & ENGINE
// =========================================

// Expose the engine so consumers can build custom components
export { getNeumorphicStyle } from "./styles/neumorphicEngine";

// Expose color utilities if consumers need to match theme colors
export { lighten, darken, hexToRgb } from "./styles/colorUtils";
