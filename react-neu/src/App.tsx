import React from "react";
import { NeuButton } from "./components/Button/Button";
import { NeuTextInput } from "./components/TextInput/TextInput";
import { NeuCard } from "./components/Card/Card";
import { NeuRidge } from "./components/Ridge/Ridge";
import { NeuCheckbox } from "./components/Checkbox/Checkbox";
import { NeuRadio } from "./components/Radio/Radio";
import { NeuSlider } from "./components/Slider/Slider";
import type { NeuVariant, NeuSurface } from "./styles/types";
import { NeuSwitch } from "./components/Toggle/Toggle";
import { NeuIcon } from "./components/Icon/Icon";
import { iconRegistry, type IconName } from "./components/Icon/IconPaths";

function App() {
  const [active, setActive] = React.useState(false);
  const [isOn, setIsOn] = React.useState(false);
  const [sliderVal, setSliderVal] = React.useState(30);
  const [val, setVal] = React.useState("dot");
  const [shapeVal, setShapeVal] = React.useState("circle");
  const variants: NeuVariant[] = ["flat", "pop", "inset"];
  const surfaces: NeuSurface[] = ["flat", "convex", "concave"];
  const [isLiked, setIsLiked] = React.useState(false);
  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "40px",
    width: "100%",
    maxWidth: "400px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#888",
    marginBottom: "10px",
    textAlign: "center",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#888",
    marginBottom: "5px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px"
  };
  const headingStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#777",
    borderBottom: "1px solid #ccc",
    paddingBottom: "5px",
    marginBottom: "10px"
  };

  const allIcons = Object.keys(iconRegistry) as IconName[];

  // State to track which icons are "active" (filled)
  const [activeSet, setActiveSet] = React.useState<Set<string>>(new Set());

  const toggleIcon = (name: string) => {
    const next = new Set(activeSet);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setActiveSet(next);
  };


  return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {/* SECTION 1: BUTTON VARIANTS */}
      <div style={sectionStyle}>
        <div style={labelStyle}>1. Button Variants</div>

        {/* Flat: Flush -> Sinks */}
        <div style={rowStyle}>
          <NeuButton variant="flat">Flat</NeuButton>
        </div>

        {/* Pop: Raised -> Sinks (Mechanical Feel) */}
        <div style={rowStyle}>
          <NeuButton variant="pop" color="#e0e0e0">Pop</NeuButton>
          <NeuButton variant="pop" color="#3b82f6" style={{ color: "white" }}>
            Blue Pop
          </NeuButton>
        </div>

        {/* Inset: Recessed -> Deeper Press */}
        <div style={rowStyle}>
          <NeuButton variant="inset">Inset</NeuButton>
        </div>
      </div>


      {/* SECTION 2: SHAPES & SIZES */}
      <div style={sectionStyle}>
        <div style={labelStyle}>2. Shapes & Sizes</div>
        <div style={rowStyle}>
          <NeuButton variant="pop" shape="square" style={{ width: "50px", height: "50px", padding: 0 }}>
            Sq
          </NeuButton>
          <NeuButton variant="pop" shape="rounded">Rounded</NeuButton>
          <NeuButton variant="pop" shape="pill">Pill Shape</NeuButton>
          <NeuButton variant="pop" shape="circle" style={{ width: "50px", height: "50px", padding: 0 }}>
            ●
          </NeuButton>
              <div onClick={() => setActive(!active)} style={{ cursor: 'pointer' }}>
           {/* STATE OFF: Convex Surface (Bulges out) + Pop Button
              STATE ON:  Concave Surface (Dips in)   + Inset Button
           */}
           <NeuButton
             variant={active ? "inset" : "pop"}
             surface={active ? "concave" : "convex"}
             shape="circle"
             style={{ width: '80px', height: '80px' }}
           >
             {active ? "ON" : "OFF"}
           </NeuButton>

           <NeuButton variant="pop" surface="concave" >Convex</NeuButton>

           <NeuButton
        variant="pop"                 // Stays elevated (Drop Shadow)
        surface={isOn ? "concave" : "convex"} // The Morphing Magic
        shape="circle"
        onClick={() => setIsOn(!isOn)}

        // 1. Customize the Transition Speed
        // Slower transition (0.5s) makes the "morph" more visible and luxurious
        style={{
          width: "80px",
          height: "80px",
          transition: "all 0.5s ease-in-out",
          color: isOn ? "#3b82f6" : "#888",
          fontSize: "0.8rem"
        }}
      >
        {isOn ? "ON" : "OFF"}
      </NeuButton>

      {/* Helper Text */}
      <span style={{ color: '#888', fontSize: '14px' }}>
        Current Surface: <b>{isOn ? "Concave" : "Convex"}</b>
      </span>
        </div>
        </div>
      </div>


      {/* SECTION 3: INPUT BEHAVIORS */}
      <div style={sectionStyle}>
        <div style={labelStyle}>3. Input Behaviors</div>

        {/* Standard Inset: Deep -> Sharp Focus */}
        <NeuTextInput
          variant="inset"
          placeholder="Inset (Standard)"
        />

        {/* Pop Input: Raised -> Sinks on Focus */}
        <NeuTextInput
          variant="pop"
          placeholder="Pop (Sinks on Focus)"
        />

        {/* Flat Input: Flush -> Sinks on Focus */}
        <NeuTextInput
          variant="flat"
          placeholder="Flat (Flush)"
        />
        <NeuTextInput variant="pop" ridge={true} placeholder="Type here..." />

      </div>
      <div style={sectionStyle}>
        <div style={titleStyle}>2. Ridge Container</div>
        <div style={rowStyle}>
          {/* A Ridge creates a tight seam around content */}
          <NeuRidge ridgeWidth="10px">
            <NeuButton>Content</NeuButton>
          </NeuRidge>

          {/* 2. Using a number (Defaults to pixels) */}
          <NeuRidge ridgeWidth={30}>
            <NeuButton>Content</NeuButton>
          </NeuRidge>

          {/* 3. Combined with other props */}
          <NeuRidge
            ridgeWidth="1rem"
            variant="inset"
            shape="rounded"
          >
            <NeuButton>Content</NeuButton>
          </NeuRidge>
        </div>
      </div>

      {/* 3. CARDS */}
      <div style={{
      padding: "40px",
      backgroundColor: "#e0e0e0",
      minHeight: "100vh",
      fontFamily: "sans-serif"
    }}>

      <h1 style={{ color: "#555", textAlign: "center", marginBottom: "40px" }}>
        Neumorphic Engine Matrix (3x3)
      </h1>

      {/* THE MATRIX GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "150px repeat(3, 1fr)",
        gap: "40px",
        alignItems: "center",
        maxWidth: "1000px",
        margin: "0 auto"
      }}>

        {/* Header Row */}
        <div></div>
        {surfaces.map(s => (
          <div key={s} style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#888"
          }}>
            Surface: {s}
          </div>
        ))}

        {/* Rows */}
        {variants.map((variant) => (
          <React.Fragment key={variant}>
            {/* Row Label */}
            <div style={{
              textAlign: "right",
              textTransform: "uppercase",
              fontWeight: "bold",
              color: "#888"
            }}>
              Variant: {variant}
            </div>

            {/* Columns */}
            {surfaces.map((surface) => (
              <div key={`${variant}-${surface}`} style={{ display: 'flex', justifyContent: 'center' }}>
                <NeuCard
                  variant={variant}
                  surface={surface}
                  elevation={4} // Higher elevation makes the curve more visible
                  style={{
                    width: "160px",
                    height: "160px",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#666",
                    fontWeight: 500
                  }}
                >
                  {variant}
                  <br />
                  +
                  <br />
                  {surface}
                </NeuCard>
              </div>
            ))}
          </React.Fragment>
        ))}

      </div>
    </div>
      <div style={sectionStyle}>
        <div style={titleStyle}>5. Checkbox & Radio</div>

        {/* Checkboxes */}
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#444", textAlign: "center" }}>Checkbox Gallery</h1>

      {/* 1. SELECTION STYLES */}
      <div style={sectionStyle}>
        <div style={headingStyle}>1. Selection Styles (Pop Variant)</div>
        <div style={rowStyle}>

          <NeuCheckbox selectionStyle="check" defaultChecked>
            Check (Default)
          </NeuCheckbox>

          <NeuCheckbox selectionStyle="cross" defaultChecked>
            Cross
          </NeuCheckbox>

          <NeuCheckbox selectionStyle="fill" defaultChecked>
            Fill (Sink Only)
          </NeuCheckbox>

        </div>
      </div>

      {/* 2. SHAPES */}
      <div style={sectionStyle}>
        <div style={headingStyle}>2. Shapes</div>
        <div style={rowStyle}>

          <NeuCheckbox shape="square" defaultChecked>
            Square
          </NeuCheckbox>

          <NeuCheckbox shape="rounded" defaultChecked>
            Rounded
          </NeuCheckbox>

          <NeuCheckbox shape="circle" selectionStyle="check" defaultChecked>
            Circle
          </NeuCheckbox>

        </div>
      </div>

      {/* 3. VARIANTS (Base Physics) */}
      <div style={sectionStyle}>
        <div style={headingStyle}>3. Variants (Unchecked State)</div>
        <div style={rowStyle}>

          {/* Pop: Raised -> Sinks */}
          <NeuCheckbox variant="pop">
            Pop
          </NeuCheckbox>

          {/* Inset: Recessed -> Deeper Recess */}
          <NeuCheckbox variant="inset">
            Inset
          </NeuCheckbox>

          {/* Flat: Flush -> Sinks */}
          <NeuCheckbox variant="flat">
            Flat
          </NeuCheckbox>

        </div>
      </div>

      {/* 4. RIDGE & COLOR */}
      <div style={sectionStyle}>
        <div style={headingStyle}>4. Special Features</div>
        <div style={rowStyle}>

          {/* Ridge: Adds a border seam */}
          <NeuCheckbox ridge={true} variant="pop" defaultChecked>
            Ridge Mode
          </NeuCheckbox>

          {/* Custom Color */}
          <NeuCheckbox
            selectionStyle="check"
            selectedColor="#ef4444" // Red Icon
            defaultChecked
          >
            Red Check
          </NeuCheckbox>

           <NeuCheckbox
            selectionStyle="cross"
            selectedColor="#3b82f6" // Blue Icon
            defaultChecked
          >
            Blue Cross
          </NeuCheckbox>

        </div>
      </div>

      {/* 5. SIZES */}
      <div style={sectionStyle}>
        <div style={headingStyle}>5. Custom Sizes</div>
        <div style={rowStyle}>
          <NeuCheckbox size="20px" defaultChecked />
          <NeuCheckbox size="30px" defaultChecked />
          <NeuCheckbox size="40px" selectionStyle="cross" defaultChecked />
        </div>
      </div>

    </div>

        {/* Radios */}
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#444", textAlign: "center" }}>Radio Gallery</h1>

      {/* 1. STYLES */}
      <div style={sectionStyle}>
        <div style={headingStyle}>1. Styles (Group A)</div>
        <div style={rowStyle}>
          <NeuRadio
            name="g1"
            checked={val === "dot"}
            onChange={() => setVal("dot")}
            selectionStyle="dot"
          >
            Dot (Standard)
          </NeuRadio>

          <NeuRadio
            name="g1"
            checked={val === "check"}
            onChange={() => setVal("check")}
            selectionStyle="check"
            selectedColor="#3b82f6"
          >
            Check
          </NeuRadio>

          <NeuRadio
            name="g1"
            checked={val === "fill"}
            onChange={() => setVal("fill")}
            selectionStyle="fill"
          >
            Fill (Sink)
          </NeuRadio>
        </div>
      </div>

      {/* 2. SHAPES */}
      <div style={sectionStyle}>
        <div style={headingStyle}>2. Shapes (Group B)</div>
        <div style={rowStyle}>
          <NeuRadio name="g2" shape="circle" checked={shapeVal === "circle"} onChange={() => setShapeVal("circle")}>
            Circle
          </NeuRadio>
          <NeuRadio name="g2" shape="rounded" checked={shapeVal === "rounded"} onChange={() => setShapeVal("rounded")}>
            Rounded
          </NeuRadio>
          <NeuRadio name="g2" shape="square" checked={shapeVal === "square"} onChange={() => setShapeVal("square")}>
            Square
          </NeuRadio>
        </div>
      </div>

      {/* 3. VARIANTS & RIDGE */}
      <div style={sectionStyle}>
        <div style={headingStyle}>3. Variants</div>
        <div style={rowStyle}>
          <NeuRadio checked={true} variant="pop">Pop</NeuRadio>
          <NeuRadio checked={true} variant="inset">Inset</NeuRadio>
          <NeuRadio checked={true} variant="pop" ridge={true}>Ridge</NeuRadio>
        </div>
      </div>

    </div>

      {/* 3. VARIANTS & RIDGE */}
      <div style={sectionStyle}>
        <div style={headingStyle}>3. Variants</div>
        <div style={rowStyle}>
          <NeuRadio checked={true} variant="pop">Pop</NeuRadio>
          <NeuRadio checked={true} variant="inset">Inset</NeuRadio>
          <NeuRadio checked={true} variant="pop" ridge={true}>Ridge</NeuRadio>
        </div>
      </div>

    </div>

      {/* 6. SLIDER */}
      <div style={sectionStyle}>
        <div style={headingStyle}>3. Sliders (Value: {sliderVal})</div>

        {/* Standard Inset Track */}
        <NeuSlider
          value={sliderVal}
          onChange={setSliderVal}
          min={0}
          max={100}
        />

        {/* Ridged Track with Larger Thumb */}
        <div style={{ marginTop: "10px" }}>
            <NeuSlider
              value={sliderVal}
              onChange={setSliderVal}
              thumbSize="32px"
              ridge={true} // Adds the border seam to the track
            />
        </div>
      </div>

      {/* 4. SWITCHES */}
<div style={sectionStyle}>
  <div style={headingStyle}>4. Switches (Toggle)</div>
  <div style={rowStyle}>

    {/* A. Standard Pill (Default) */}
    <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '0.8rem' }}>Standard</div>
        <NeuSwitch
           width="60px"
           defaultChecked={false}
        />
    </div>

    {/* B. Square Shape + Check Icon + Blue */}
    <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '0.8rem' }}>Square Check</div>
        <NeuSwitch
           width="60px"
           shape="square"
           selectionStyle="check"
           selectedColor="#3b82f6" // Blue
           defaultChecked={true}
        />
    </div>

    {/* C. Ridge Track + Cross Icon + Red */}
    <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '0.8rem' }}>Ridge Cross</div>
        <NeuSwitch
           width="70px"
           ridge={true} // Adds the border frame
           selectionStyle="cross"
           selectedColor="#ef4444" // Red
           defaultChecked={true}
        />
    </div>

    {/* D. Flat Variant (Subtle) */}
    <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '0.8rem' }}>Flat Variant</div>
        <NeuSwitch
           width="50px"
           variant="flat"
           defaultChecked={false}
        />
    </div>

  </div>
</div>
<NeuIcon
  icon="heart"
  transparent={true}
  filled={isLiked}
  onClick={() => setIsLiked(!isLiked)}
/>

// 2. STANDARD BUTTON (With Circle Container)
<NeuIcon
  icon="heart"
  filled={isLiked}
  // transparent={false} is default
/>
<div style={{
      padding: "40px",
      backgroundColor: "#e0e0e0",
      minHeight: "100vh",
      fontFamily: "sans-serif",
      color: "#555"
    }}>

      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Icon Library</h1>
      <p style={{ textAlign: "center", marginBottom: "50px", opacity: 0.7 }}>
        Click any icon to toggle its active state
      </p>

      {/* THE GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "40px",
        maxWidth: "1000px",
        margin: "0 auto"
      }}>

        {allIcons.map((iconName) => (
          <div
            key={iconName}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px"
            }}
          >
            {/* The Icon Component */}
            <NeuIcon
              icon={iconName}
              size="60px"
              filled={activeSet.has(iconName)}
              onClick={() => toggleIcon(iconName)}
              // Optional: Customize based on icon type
              shape={["circle", "search", "user"].includes(iconName) ? "circle" : "rounded"}
              fillColor="#ef4444" // Uniform color for the demo
            />

            {/* The Label */}
            <span style={{
              fontSize: "0.85rem",
              opacity: 0.6,
              fontFamily: "monospace"
            }}>
              {iconName}
            </span>
          </div>
        ))}

      </div>
    </div>

    </div>
  );
}

export default App;
