import React from "react";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { AVAILABLE_FONTS } from "./fonts";

export function TypographySettings() {
    const { values, updateProp } = usePropSettings(["style"]);

    const handleStyleChange = (field, value) => {
        updateProp("style", {
            ...values.style,
            [field]: value,
        });
    };

    return (
        <div className="space-y-4 p-4 border rounded-xl shadow-sm max-w-md">
            <h2 className="text-lg font-semibold">Typography Settings</h2>

            {/* Font Family */}
            <div>
                <label>Font Family: </label>
                <select
                    value={values.style?.fontFamily || ""}
                    onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
                >
                    <option value="">Default</option>
                    {AVAILABLE_FONTS.map((font) => (
                        <option key={font} value={font} style={{ fontFamily: font }}>
                            {font}
                        </option>
                    ))}
                </select>
            </div>

            {/* Background & Text Color */}
            <div>
                <label>Background Color: </label>
                <input
                    type="color"
                    value={values.style?.backgroundColor || ""}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                />
            </div>
            <div>
                <label>Text Color: </label>
                <input
                    type="color"
                    value={values.style?.color || ""}
                    onChange={(e) => handleStyleChange("color", e.target.value)}
                />
            </div>

            {/* Text Alignment & Decoration */}
            <div>
                <label>Text Alignment: </label>
                <select
                    value={values.style?.textAlign || "left"}
                    onChange={(e) => handleStyleChange("textAlign", e.target.value)}
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>
            <div>
                <label>Text Decoration: </label>
                <select
                    value={values.style?.textDecoration || "none"}
                    onChange={(e) => handleStyleChange("textDecoration", e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="line-through">Line Through</option>
                    <option value="overline">Overline</option>
                </select>
            </div>

            {/* Font Size */}
            <div>
                <label>Font Size (px): </label>
                <input
                    type="number"
                    value={values.style?.fontSize || 16}
                    onChange={(e) => handleStyleChange("fontSize", parseInt(e.target.value))}
                />
            </div>

            {/* Padding */}
            <fieldset>
                <legend>Padding (px)</legend>
                {["Top", "Right", "Bottom", "Left"].map((side) => (
                    <div key={side}>
                        <label>{side}: </label>
                        <input
                            type="number"
                            value={values.style?.[`padding${side}`] || 0}
                            onChange={(e) =>
                                handleStyleChange(`padding${side}`, parseInt(e.target.value))
                            }
                        />
                    </div>
                ))}
            </fieldset>

            {/* Margin */}
            <fieldset>
                <legend>Margin (px)</legend>
                {["Top", "Right", "Bottom", "Left"].map((side) => (
                    <div key={side}>
                        <label>{side}: </label>
                        <input
                            type="number"
                            value={values.style?.[`margin${side}`] || 0}
                            onChange={(e) =>
                                handleStyleChange(`margin${side}`, parseInt(e.target.value))
                            }
                        />
                    </div>
                ))}
            </fieldset>

            {/* Border Radius */}
            <div>
                <label>Border Radius (px): </label>
                <input
                    type="number"
                    value={values.style?.borderRadius || 0}
                    onChange={(e) => handleStyleChange("borderRadius", parseInt(e.target.value))}
                />
            </div>
        </div>
    );
}
