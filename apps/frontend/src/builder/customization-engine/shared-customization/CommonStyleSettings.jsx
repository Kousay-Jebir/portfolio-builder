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
                            <div key={side} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                <label style={{ width: 50 }}>{side}</label>
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

// SizeControl handles width and height
function SizeControl({ label, keyName, style, onChange }) {
    const [val, unit] = extractValueAndUnit(style[keyName] || "0px");
    return (
        <fieldset>
            <legend>{label}</legend>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
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
            </div>
        </fieldset>
    );
}

// BoxShadowControl handles box-shadow editing in a user-friendly way
function BoxShadowControl({ style, onChange }) {
    const raw = style.boxShadow || "0px 0px 0px 0px rgba(0,0,0,0.2)";
    const parts = raw.split(" ");
    const [oxRaw, oyRaw, blurRaw, spreadRaw, ...colorParts] = parts;
    const colorRaw = colorParts.join(" ");

    const [ox, oxU] = extractValueAndUnit(oxRaw);
    const [oy, oyU] = extractValueAndUnit(oyRaw);
    const [blur, blurU] = extractValueAndUnit(blurRaw);
    const [spread, spreadU] = extractValueAndUnit(spreadRaw);
    const [r, g, b, a] = getRGBA(colorRaw);

    const build = (nox, noxU, noy, noyU, nbl, nblU, nsp, nspU, na) =>
        `${nox}${noxU} ${noy}${noyU} ${nbl}${nblU} ${nsp}${nspU} ${rgbaString(r, g, b, na)}`;

    return (
        <fieldset>
            <legend>Box Shadow</legend>

            {[
                ["Offset X", ox, oxU, (v, u) => onChange("boxShadow", build(v, u, oy, oyU, blur, blurU, spread, spreadU, a))],
                ["Offset Y", oy, oyU, (v, u) => onChange("boxShadow", build(ox, oxU, v, u, blur, blurU, spread, spreadU, a))],
                ["Blur", blur, blurU, (v, u) => onChange("boxShadow", build(ox, oxU, oy, oyU, v, u, spread, spreadU, a))],
                ["Spread", spread, spreadU, (v, u) => onChange("boxShadow", build(ox, oxU, oy, oyU, blur, blurU, v, u, a))]
            ].map(([label, val, unit, fn]) => (
                <div key={label} style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 4 }}>
                    <label style={{ width: 70 }}>{label}</label>
                    <input
                        type="number"
                        value={val}
                        onChange={(e) => fn(parseFloat(e.target.value), unit)}
                    />
                    <select value={unit} onChange={(e) => fn(val, e.target.value)}>
                        <option value="px">px</option>
                        <option value="%">%</option>
                    </select>
                </div>
            ))}

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <label>Color</label>
                <input
                    type="color"
                    value={`#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`}
                    onChange={(e) => {
                        const hex = e.target.value;
                        const nr = parseInt(hex.slice(1, 3), 16);
                        const ng = parseInt(hex.slice(3, 5), 16);
                        const nb = parseInt(hex.slice(5, 7), 16);
                        onChange("boxShadow", build(ox, oxU, oy, oyU, blur, blurU, spread, spreadU, a));
                        onChange("boxShadow", `${ox}${oxU} ${oy}${oyU} ${blur}${blurU} ${spread}${spreadU} ${rgbaString(nr, ng, nb, a)}`);
                    }}
                />
                <label>Opacity</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={a}
                    onChange={(e) => onChange("boxShadow", build(ox, oxU, oy, oyU, blur, blurU, spread, spreadU, parseFloat(e.target.value)))}
                />
            </div>
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

            <BoxShadowControl style={style} onChange={updateStyle} />
        </div>
    );
}
