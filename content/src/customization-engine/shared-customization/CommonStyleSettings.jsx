import React from "react";
import { usePropSettings } from "./customization-hook";

export function CommonStyleSettings({ showBackground = true }) {
    const { values, updateProp } = usePropSettings(["style"]);

    const handleStyleChange = (field, value) => {
        updateProp("style", {
            ...values.style,
            [field]: value,
        });
    };

    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleStyleChange("backgroundImage", `url("${imageUrl}")`);
        }
    };

    return (
        <div className="space-y-4">
            {/* Background */}
            {showBackground && (
                <div>
                    <label>Background Color: </label>
                    <input
                        type="color"
                        value={values.style?.backgroundColor || "rgba(250,250,250,0)"}
                        onChange={(e) =>
                            handleStyleChange("backgroundColor", e.target.value)
                        }
                    />
                </div>
            )}

            {/* Background Image File Picker */}
            {showBackground && (
                <div>
                    <label>Background Image: </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackgroundImageUpload}
                    />
                </div>
            )}

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

            {/* Border */}
            <fieldset>
                <legend>Border (CSS syntax)</legend>
                {["Top", "Right", "Bottom", "Left"].map((side) => (
                    <div key={side}>
                        <label>{side}: </label>
                        <input
                            type="text"
                            placeholder="e.g. 1px solid #000"
                            value={values.style?.[`border${side}`] || "none"}
                            onChange={(e) =>
                                handleStyleChange(`border${side}`, e.target.value)
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
                    onChange={(e) =>
                        handleStyleChange("borderRadius", parseInt(e.target.value))
                    }
                />
            </div>
        </div>
    );
}
