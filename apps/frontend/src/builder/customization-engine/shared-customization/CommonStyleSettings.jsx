import { useState, useEffect } from "react";
import { usePropSettings } from "./customization-hook";

// Helper functions to extract values and units
const extractValueAndUnit = (value) => {
    const match = value?.toString().match(/^([\d.]+)(px|%)?$/);
    return match ? [parseFloat(match[1]), match[2] || "px"] : [0, "px"];
};

const getRGBA = (rgba) => {
    const match = rgba?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([.\d]+)?\)/);
    return match ? [match[1], match[2], match[3], match[4] || 1] : [255, 255, 255, 1];
};

const rgbaString = (r, g, b, a) => `rgba(${r},${g},${b},${a})`;

const Sides = ["Top", "Right", "Bottom", "Left"];

function DimensionControl({ label, prefix, style, onChange }) {
    const [isCustom, setIsCustom] = useState(false);
    const [unit, setUnit] = useState("px");

    const baseKey = `${prefix}`;
    const [value, defaultUnit] = extractValueAndUnit(style[baseKey] || "0px");

    const handleChange = (side, val, unitOverride) => {
        // Update specific side value
        onChange(`${prefix}${side}`, `${val}${unitOverride}`);
    };

    return (
        <fieldset>
            <legend>{label}</legend>
            {!isCustom ? (
                <div>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleChange("", e.target.value, unit)}
                    />
                    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option value="px">px</option>
                        <option value="%">%</option>
                    </select>
                    <button type="button" onClick={() => setIsCustom(true)}>
                        Customize Sides
                    </button>
                </div>
            ) : (
                <>
                    {Sides.map((side) => {
                        const [val, sideUnit] = extractValueAndUnit(style[`${prefix}${side}`] || "0px");
                        return (
                            <div key={side}>
                                <label>{side}:</label>
                                <input
                                    type="number"
                                    value={val}
                                    onChange={(e) => handleChange(side, e.target.value, sideUnit)}
                                />
                                <select
                                    value={sideUnit}
                                    onChange={(e) => handleChange(side, val, e.target.value)}
                                >
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                </select>
                            </div>
                        );
                    })}
                    <button type="button" onClick={() => setIsCustom(false)}>
                        Use All Sides
                    </button>
                </>
            )}
        </fieldset>
    );
}

export function CommonStyleSettings({ showBackground = true, customs = false }) {
    const { values, updateProp } = usePropSettings(["style"], customs);
    const style = values.style || {};

    const updateStyle = (key, value) => {
        updateProp("style", { ...style, [key]: value });
    };

    const [r, g, b, a] = getRGBA(style.backgroundColor || "rgba(255,255,255,1)");

    // Border Style fix to ensure it updates immediately
    const handleBorderStyleChange = (e) => {
        updateStyle("borderStyle", e.target.value);
    };

    useEffect(() => {
        // Set the default borderStyle to 'solid' if not set
        if (!style.borderStyle) {
            updateStyle("borderStyle", "solid");
        }
    }, [style, updateStyle]);

    return (
        <div className="space-y-4">
            {/* Background color with opacity */}
            {showBackground && (
                <fieldset>
                    <legend>Background Color</legend>
                    <div>
                        <input
                            type="color"
                            value={`#${[r, g, b]
                                .map((x) => parseInt(x).toString(16).padStart(2, "0"))
                                .join("")}`}
                            onChange={(e) => {
                                const hex = e.target.value;
                                const red = parseInt(hex.slice(1, 3), 16);
                                const green = parseInt(hex.slice(3, 5), 16);
                                const blue = parseInt(hex.slice(5, 7), 16);
                                updateStyle("backgroundColor", rgbaString(red, green, blue, a));
                            }}
                        />
                    </div>
                    <div>
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
                    </div>
                </fieldset>
            )}

            {/* Padding */}
            <DimensionControl
                label="Padding"
                prefix="padding"
                style={style}
                onChange={updateStyle}
            />

            {/* Margin */}
            <DimensionControl
                label="Margin"
                prefix="margin"
                style={style}
                onChange={updateStyle}
            />

            {/* Border Width */}
            <DimensionControl
                label="Border Width"
                prefix="borderWidth"
                style={style}
                onChange={updateStyle}
            />

            {/* Border Radius */}
            <DimensionControl
                label="Border Radius"
                prefix="borderRadius"
                style={style}
                onChange={updateStyle}
            />

            {/* Border Style */}
            <fieldset>
                <legend>Border Style</legend>
                <select
                    value={style.borderStyle || "solid"}
                    onChange={handleBorderStyleChange}
                >
                    <option value="none">none</option>
                    <option value="solid">solid</option>
                    <option value="dashed">dashed</option>
                    <option value="dotted">dotted</option>
                </select>
            </fieldset>

            {/* Border Color */}
            <fieldset>
                <legend>Border Color</legend>
                <input
                    type="color"
                    value={style.borderColor || "#000000"}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                />
            </fieldset>
        </div>
    );
}
