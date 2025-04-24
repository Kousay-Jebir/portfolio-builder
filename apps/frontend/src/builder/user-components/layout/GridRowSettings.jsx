import React from "react";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings";
import { useNode } from "@craftjs/core";

export function GridRowSettings() {
    const { values, updateProp } = usePropSettings(["style"]);
    const {
        connectors: { connect }, actions: { setCustom },
        style,
        align,
        justify
    } = useNode((node) => ({ style: node.data.custom.style, align: node.data.custom.align, justify: node.data.custom.justify }));
    return (
        <div className="space-y-4 p-4 border rounded-xl shadow-sm max-w-md">
            <h2 className="text-lg font-semibold">Grid Row Settings</h2>

            {/* Common Style Settings (Padding, Margin, Border, Background) */}
            <CommonStyleSettings customs={true} />

            {/* Horizontal Alignment (justify) */}
            <div>
                <label>Horizontal Alignment (justify): </label>
                <select
                    value={justify}
                    onChange={(e) => setCustom(props => (props.justify = e.target.value))}
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
                    value={align}
                    onChange={(e) => setCustom(props => (props.align = e.target.value))}
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
