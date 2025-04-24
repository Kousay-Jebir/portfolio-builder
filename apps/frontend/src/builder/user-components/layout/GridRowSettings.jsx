import React from "react";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings";
import { useNode } from "@craftjs/core";

export function GridRowSettings() {
    const { values, updateProp } = usePropSettings(["style", "align", "justify"]);
    return (
        <div className="space-y-4 p-4 border rounded-xl shadow-sm max-w-md">
            <h2 className="text-lg font-semibold">Grid Row Settings</h2>

            {/* Common Style Settings (Padding, Margin, Border, Background) */}
            <CommonStyleSettings />

            {/* Horizontal Alignment (justify) */}
            <div>
                <label>Horizontal Alignment (justify): </label>
                <select
                    value={values.justify}
                    onChange={(e) => updateProp("justify", e.target.value)}
                >
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                    <option value="between">Space Between</option>
                    <option value="around">Space Around</option>
                    <option value="initial">Initial</option>
                </select>
            </div>

            {/* Vertical Alignment (align) */}
            <div>
                <label>Vertical Alignment (align): </label>
                <select
                    value={values.align}
                    onChange={(e) => updateProp("align", e.target.value)}
                >
                    <option value="normal">Normal</option>
                    <option value="start">Start</option>
                    <option value="center">Center</option>
                    <option value="end">End</option>
                    <option value="stretch">Stretch</option>
                </select>
            </div>
        </div>
    );
}
