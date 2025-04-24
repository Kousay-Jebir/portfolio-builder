import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";


export function ButtonSettings() {
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



            {/* Background & Text Color */}
            <div>
                <label>Background Color: </label>
                <input
                    type="color"
                    value={values.style?.backgroundColor || ""}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                />
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
