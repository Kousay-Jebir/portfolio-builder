import React from "react";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { AVAILABLE_FONTS } from "./fonts";
import { CommonStyleSettings } from "@/builder/customization-engine/shared-customization/CommonStyleSettings";

export function TypographySettings() {
    const { values, updateProp } = usePropSettings(["style"]);

    const handleStyleChange = (field, value) => {
        updateProp("style", {
            ...values.style,
            [field]: value,
        });
    };

    return (
        <>
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
            <div>
                <label>Font Weight: </label>
                <select
                    value={values.style?.fontWeight || "normal"}
                    onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
                >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="lighter">Lighter</option>
                    <option value="bolder">Bolder</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                </select>
            </div>
            <CommonStyleSettings />
        </>
    );
}
