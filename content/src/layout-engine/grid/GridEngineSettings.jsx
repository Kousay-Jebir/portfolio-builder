import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
export default function GridEngineSettings() {
    const { values, updateProp } = usePropSettings(["style"]);
    const handleStyleChange = (field, value) => {
        updateProp("style", {
            ...values.style,
            [field]: value,
        });
    };

    return (
        <div className="space-y-4 p-4 border rounded-xl shadow-sm max-w-md">
            <h2 className="text-lg font-semibold">Canvas settings</h2>

            {/* Background & Text Color */}
            <div>
                <label>Background Color: </label>
                <input
                    type="color"
                    value={values.style?.backgroundColor || ""}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
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
        </div>
    );

}