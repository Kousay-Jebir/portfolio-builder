import React, { useState } from "react";
import { CommonStyleSettings } from "@/builder/customization-engine/shared-customization/CommonStyleSettings";
import { usePropSettings } from "@/builder/customization-engine/shared-customization/customization-hook";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const POSITIONAL_DISPLAYS = ["relative", "absolute", "sticky", "fixed"];
const DISPLAY_OPTIONS = ["default", ...POSITIONAL_DISPLAYS];
const SIDES = ["Top", "Right", "Bottom", "Left"];
const parse = (v) => {
    const str = `${v}`;
    const m = str.match(/^([\d.]+)(px|%)?$/);
    return { num: m ? +m[1] : 0, unit: m && m[2] ? m[2] : "px" };
};

// format { num, unit } back to string
const fmt = ({ num, unit }) => `${num}${unit}`;

// rgb <-> hex helpers
const rgbToHex = ({ r, g, b }) =>
    "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");

const hexToRgb = (hex) => {
    const m = hex.replace("#", "");
    const num = parseInt(m, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

// Exported UnitInput for reuse
export function UnitInput({ label, value = "0px", onChange }) {
    const { num, unit } = parse(value);
    return (
        <div className="space-y-1">
            <Label className="text-xs">{label}</Label>
            <div className="flex space-x-2">
                <Input
                    type="number"
                    className="w-20"
                    value={num}
                    onChange={e => onChange(fmt({ num: e.target.value, unit }))}
                />
                <Select
                    value={unit}
                    onValueChange={u => onChange(fmt({ num, unit: u }))}
                    className="w-20"
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="px">px</SelectItem>
                        <SelectItem value="%">%</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
export function GenericContainerSettings() {
    const { values, updateProp } = usePropSettings(["style"], false);
    const style = values.style || {};
    const update = (key, val) =>
        updateProp("style", { ...style, [key]: val });

    const [displayMode, setDisplayMode] = useState(
        (style.display) || "default"
    );

    return (
        <CommonStyleSettings>
            {/* Width & Height Section */}
            <Card className="shadow-none rounded-xs dark:bg-slate-900 bg-orange-200">
                <CardHeader>
                    <Label className="text-sm">Size</Label>
                </CardHeader>
                <CardContent className="space-y-3">
                    <UnitInput
                        label="Width"
                        value={(style.width) || "0px"}
                        onChange={(v) => update("width", v)}
                    />
                    <UnitInput
                        label="Height"
                        value={(style.height) || "0px"}
                        onChange={(v) => update("height", v)}
                    />
                </CardContent>
            </Card>

            {/* Display Section */}
            <Card className="shadow-none rounded-xs dark:bg-slate-900 bg-orange-200">
                <CardHeader>
                    <Label className="text-sm">Display</Label>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Select
                        value={displayMode}
                        onValueChange={(val) => {
                            setDisplayMode(val);
                            if (val === "default") {
                                // remove positioning props
                                const cleaned = { ...style };
                                delete cleaned.display;
                                SIDES.forEach((side) => delete cleaned[side.toLowerCase()]);
                                updateProp("style", cleaned);
                            } else {
                                update("position", val);
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="default" />
                        </SelectTrigger>
                        <SelectContent>
                            {DISPLAY_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {POSITIONAL_DISPLAYS.includes(displayMode) && (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            {SIDES.map((side) => (
                                <UnitInput
                                    key={side}
                                    label={side}
                                    value={(style[side.toLowerCase()]) || "0px"}
                                    onChange={(v) => update(side.toLowerCase(), v)}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </CommonStyleSettings>
    );
}