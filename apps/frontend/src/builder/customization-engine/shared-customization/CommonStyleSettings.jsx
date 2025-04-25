import { useState, useEffect } from "react";
import { usePropSettings } from "./customization-hook";

// Helpers
const extractValueAndUnit = (value) => {
    const match = value?.toString().match(/^([\d.]+)(px|%)?$/);
    return match ? [parseFloat(match[1]), match[2] || "px"] : [0, "px"];
};

const rgbaString = (r, g, b, a) => `rgba(${r},${g},${b},${a})`;
const getRGBA = (rgba) => {
    const match = rgba?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([.\d]+)?\)/);
    return match ? [match[1], match[2], match[3], match[4] || 1] : [255, 255, 255, 1];
};

const Sides = ["Top", "Right", "Bottom", "Left"];

// DimensionControl handles padding, margin, border radius, etc.
function DimensionControl({ label, prefix, style, onChange }) {
    const [customSides, setCustomSides] = useState(false);
    const [mainValue, mainUnit] = extractValueAndUnit(style[prefix] || "0px");

    const handleMainChange = (value, unit) => {
        onChange(prefix, `${value}${unit}`);
    };

    const handleSideChange = (side, value, unit) => {
        onChange(`${prefix}${side}`, `${value}${unit}`);
    };

    return (
        <fieldset>
            <legend>{label}</legend>
            {!customSides ? (
                <div>
                    <input
                        type="number"
                        value={mainValue}
                        onChange={(e) => handleMainChange(e.target.value, mainUnit)}
                    />
                    <select value={mainUnit} onChange={(e) => handleMainChange(mainValue, e.target.value)}>
                        <option value="px">px</option>
                        <option value="%">%</option>
                    </select>
                    <button type="button" onClick={() => setCustomSides(true)}>Customize Sides</button>
                </div>
            ) : (
                <>
                    {Sides.map((side) => {
                        const [val, unit] = extractValueAndUnit(style[`${prefix}${side}`] || "0px");
                        return (
                            <div key={side}>
                                <label>{side}</label>
                                <input
                                    type="number"
                                    value={val}
                                    onChange={(e) => handleSideChange(side, e.target.value, unit)}
                                />
                                <select
                                    value={unit}
                                    onChange={(e) => handleSideChange(side, val, e.target.value)}
                                >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                </select>
                            </div>
                        );
                    })}
                    <button type="button" onClick={() => setCustomSides(false)}>Use Single Value</button>
                </>
            )}
        </fieldset>
    );
}

function SizeControl({ label, keyName, style, onChange }) {
    const [val, unit] = extractValueAndUnit(style[keyName] || "0px");
    return (
        <fieldset>
            <legend>{label}</legend>
            <input
                type="number"
                value={val}
                onChange={(e) => onChange(keyName, `${e.target.value}${unit}`)}
            />
            <select
                value={unit}
                onChange={(e) => onChange(keyName, `${val}${e.target.value}`)}
            >
                <option value="px">px</option>
                <option value="%">%</option>
            </select>
        </fieldset>
    );
}

export function CommonStyleSettings({ showBackground = true, customs = false }) {
    const { values, updateProp } = usePropSettings(["style"], customs);
    const style = values.style || {};
    const updateStyle = (key, value) => updateProp("style", { ...style, [key]: value });

    const [r, g, b, a] = getRGBA(style.backgroundColor || "rgba(255,255,255,1)");

    useEffect(() => {
        if (!style.borderStyle) updateStyle("borderStyle", "solid");
    }, [style]);

    return (
        <div className="space-y-4">
            {showBackground && (
                <fieldset>
                    <legend>Background</legend>
                    <input
                        type="color"
                        value={`#${[r, g, b].map((x) => parseInt(x).toString(16).padStart(2, "0")).join("")}`}
                        onChange={(e) => {
                            const hex = e.target.value;
                            const red = parseInt(hex.slice(1, 3), 16);
                            const green = parseInt(hex.slice(3, 5), 16);
                            const blue = parseInt(hex.slice(5, 7), 16);
                            updateStyle("backgroundColor", rgbaString(red, green, blue, a));
                        }}
                    />
                    <label>Opacity</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={a}
                        onChange={(e) =>
                            updateStyle("backgroundColor", rgbaString(r, g, b, e.target.value))
                        }
                    />
                </fieldset>
            )}

            <DimensionControl label="Padding" prefix="padding" style={style} onChange={updateStyle} />
            <DimensionControl label="Margin" prefix="margin" style={style} onChange={updateStyle} />
            <DimensionControl label="Border Radius" prefix="borderRadius" style={style} onChange={updateStyle} />
            <DimensionControl label="Border Width" prefix="borderWidth" style={style} onChange={updateStyle} />

            <fieldset>
                <legend>Border Style</legend>
                <select
                    value={style.borderStyle || "solid"}
                    onChange={(e) => updateStyle("borderStyle", e.target.value)}
                >
                    <option value="none">none</option>
                    <option value="solid">solid</option>
                    <option value="dashed">dashed</option>
                    <option value="dotted">dotted</option>
                </select>
            </fieldset>

            <fieldset>
                <legend>Border Color</legend>
                <input
                    type="color"
                    value={style.borderColor || "#000000"}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                />
            </fieldset>

            <SizeControl label="Width" keyName="width" style={style} onChange={updateStyle} />
            <SizeControl label="Height" keyName="height" style={style} onChange={updateStyle} />
        </div>
    );
}
