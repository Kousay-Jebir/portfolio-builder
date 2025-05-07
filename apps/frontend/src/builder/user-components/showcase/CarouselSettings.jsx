import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings";

export function CarouselSettings() {
    const { values, updateProp } = usePropSettings(["loop"]);
    const loop = values.loop || false;

    const handleLoopToggle = (e) => {
        updateProp("loop", e.target.checked);
    };

    return (
        <>
            <h2 className="text-lg font-semibold mb-2">Carousel Settings</h2>
            <div className="mb-4">
                <label className="inline-flex items-center space-x-2 text-sm">
                    <input type="checkbox" checked={loop} onChange={handleLoopToggle} />
                    <span>Enable Looping</span>
                </label>
            </div>

            <CommonStyleSettings />
        </>
    );
}
