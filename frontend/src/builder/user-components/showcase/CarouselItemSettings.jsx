import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings";

export function CarouselItemSettings() {
    const { values, updateProp } = usePropSettings([
        "imageUrl",
        "alt",
    ]);

    const imageUrl = values.imageUrl ?? "";
    const alt = values.alt ?? "";

    return (
        <>
            <h2 className="text-lg font-semibold mb-2">Carousel Item</h2>

            <div className="space-y-4 mb-4">
                <label className="block text-sm">
                    Image URL
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => updateProp("imageUrl", e.target.value)}
                        placeholder="https://…"
                        className="w-full border px-2 py-1 rounded text-sm"
                    />
                </label>

                <label className="block text-sm">
                    Alt Text
                    <input
                        type="text"
                        value={alt}
                        onChange={(e) => updateProp("alt", e.target.value)}
                        placeholder="Descriptive alt text"
                        className="w-full border px-2 py-1 rounded text-sm"
                    />
                </label>
            </div>

            <CommonStyleSettings />
        </>
    );
}
