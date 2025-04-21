import React from "react";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";

const screenSizes = ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"];

export function GridColumnSettings() {
    const { values, updateProp } = usePropSettings(["colSettings"]);
    const colSettings = values.colSettings || {};

    const handleChange = (screen, field, raw) => {
        const value =
            field === "span" && raw === "content"
                ? "content"
                : raw === ""
                    ? null
                    : parseInt(raw, 10) || 0;

        updateProp("colSettings", {
            ...colSettings,
            [screen]: {
                ...(colSettings[screen] || {}),
                [field]: value,
            },
        });
    };

    const toggleHidden = (screen, isHidden) => {
        updateProp("colSettings", {
            ...colSettings,
            [screen]: {
                ...(colSettings[screen] || {}),
                hidden: isHidden,
            },
        });
    };

    return (
        <div className="space-y-4 p-4 border rounded-xl shadow-sm max-w-md">
            <h2 className="text-lg font-semibold">Column Settings</h2>

            {screenSizes.map((screen) => {
                const cfg = colSettings[screen] || {};
                return (
                    <fieldset key={screen} className="p-3 border rounded space-y-2">
                        <legend className="capitalize font-medium text-gray-800">
                            {screen}
                        </legend>

                        <div className="flex space-x-4">
                            <label className="flex-1 text-sm">
                                Span
                                <input
                                    type="text"
                                    placeholder="1–12 or content"
                                    value={cfg.span ?? ""}
                                    onChange={(e) =>
                                        handleChange(screen, "span", e.target.value)
                                    }
                                    className="w-full border px-2 py-1 rounded text-sm"
                                />
                            </label>

                            <label className="flex-1 text-sm">
                                Offset
                                <input
                                    type="number"
                                    min="0"
                                    max="11"
                                    placeholder="0–11"
                                    value={cfg.offset ?? ""}
                                    onChange={(e) =>
                                        handleChange(screen, "offset", e.target.value)
                                    }
                                    className="w-full border px-2 py-1 rounded text-sm"
                                />
                            </label>
                        </div>

                        <label className="inline-flex items-center text-sm space-x-2">
                            <input
                                type="checkbox"
                                checked={cfg.hidden || false}
                                onChange={(e) =>
                                    toggleHidden(screen, e.target.checked)
                                }
                            />
                            <span>Hide on {screen}</span>
                        </label>
                    </fieldset>
                );
            })}
        </div>
    );
}
