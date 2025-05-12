import React, { useState, useMemo, useEffect } from "react";
import { usePropSettings } from "./customization-hook";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const SIDES = ["Top", "Right", "Bottom", "Left"];
const parse = (v) => {
    const m = `${v}`.match(/^([\d.]+)(px|%)?$/);
    return { num: m ? +m[1] : 0, unit: m && m[2] ? m[2] : "px" };
};
const fmt = ({ num, unit }) => `${num}${unit}`;

// rgb ↔ hex helpers
const rgbToHex = ({ r, g, b }) =>
    "#" +
    [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
const hexToRgb = (hex) => {
    const m = hex.replace("#", "");
    const num = parseInt(m, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
};

function UnitInput({ label, value = "0px", onChange }) {
    const { num, unit } = parse(value);
    return (
        <div className="space-y-1">
            <Label className="text-xs">{label}</Label>
            <div className="flex space-x-2">
                <Input
                    type="number"
                    className="w-20"
                    value={num}
                    onChange={(e) => onChange(fmt({ num: e.target.value, unit }))}
                />
                <Select
                    value={unit}
                    onValueChange={(u) => onChange(fmt({ num, unit: u }))}
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

export function CommonStyleSettings({ showBackground = true, customs = false, children }) {
    const { values, updateProp } = usePropSettings(["style"], customs);
    const style = values.style || {};
    const update = (k, v) => updateProp("style", { ...style, [k]: v });

    const [modes, setModes] = useState({
        padding: "shorthand",
        margin: "shorthand",
        borderRadius: "shorthand",
    });

    function toggleMode(prop) {
        const next = modes[prop] === "shorthand" ? "per-side" : "shorthand";
        const newStyle = { ...style };

        if (next === "shorthand") {
            const sideVal = style[`${prop}Top`] ?? style[prop] ?? "0px";
            SIDES.forEach((s) => delete newStyle[`${prop}${s}`]);
            newStyle[prop] = sideVal;
        } else {
            const base = style[prop] || "0px";
            SIDES.forEach((s) => {
                newStyle[`${prop}${s}`] = base;
            });
            delete newStyle[prop];
        }

        updateProp("style", newStyle);
        setModes((m) => ({ ...m, [prop]: next }));
    }

    // Background color + opacity
    const [{ r, g, b }, bgOpacity] = useMemo(() => {
        const m =
            (style.backgroundColor || "rgba(255,255,255,1)").match(
                /rgba\((\d+),(\d+),(\d+),([\d.]+)\)/
            ) || [];
        return [{ r: +m[1], g: +m[2], b: +m[3] }, +m[4]];
    }, [style.backgroundColor]);
    const [draftBgOpacity, setDraftBgOpacity] = useState(bgOpacity);

    // Box-shadow parsing
    const [inCoords, inColor, inOpacity] = useMemo(() => {
        const parts = (
            style.boxShadow || "0px 0px 0px 0px rgba(0,0,0,0.2)"
        ).split(/\s+/);
        const coords = parts.slice(0, 4).map(parse);
        const colorPart = parts.slice(4).join(" ");
        const m =
            (colorPart.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/) || []);
        return [
            coords,
            { r: +m[1], g: +m[2], b: +m[3] },
            +m[4],
        ];
    }, [style.boxShadow]);

    // Local state for interactive shadow editing
    const [coords, setCoords] = useState(inCoords);
    const [draftShadowOpacity, setDraftShadowOpacity] = useState(inOpacity);
    const [shadowColor, setShadowColor] = useState(inColor);

    // Resync when style.boxShadow changes externally
    useEffect(() => {
        setCoords(inCoords);
        setDraftShadowOpacity(inOpacity);
        setShadowColor(inColor);
    }, [inCoords, inOpacity, inColor]);

    const buildShadow = (c = coords, a = draftShadowOpacity, col = shadowColor) => {
        const coordStr = c.map(fmt).join(" ");
        return `${coordStr} rgba(${col.r},${col.g},${col.b},${a})`;
    };

    return (
        <ScrollArea className="h-full">
            <div className="space-y-4">
                {children}
                {showBackground && (

                    <Card className="shadow-none rounded-xs">
                        <CardHeader>
                            <Label className="text-sm">Background</Label>
                        </CardHeader>
                        <CardContent className="flex items-center space-x-4">
                            <Input
                                type="color"
                                className="w-12 h-8 p-0"
                                value={rgbToHex({ r, g, b })}
                                onChange={(e) => {
                                    const { r: nr, g: ng, b: nb } = hexToRgb(e.target.value);
                                    update(
                                        "backgroundColor",
                                        `rgba(${nr},${ng},${nb},${draftBgOpacity})`
                                    );
                                }}
                            />
                            <div className="flex-1">
                                <Label className="text-xs">Opacity</Label>
                                <Slider
                                    value={[draftBgOpacity]}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onValueChange={([v]) => {
                                        setDraftBgOpacity(v);
                                        update(
                                            "backgroundColor",
                                            `rgba(${r},${g},${b},${v})`
                                        );
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {["padding", "margin", "borderRadius"].map((prop) => {
                    const label = prop.charAt(0).toUpperCase() + prop.slice(1);
                    const mode = modes[prop];
                    return (
                        <Card className="shadow-none rounded-xs" key={prop}>
                            <CardHeader className="flex items-center justify-between">
                                <Label className="text-sm">{label}</Label>
                                <div className="flex items-center space-x-1">
                                    <Switch
                                        checked={mode === "per-side"}
                                        onCheckedChange={() => toggleMode(prop)}
                                    />
                                    <Label className="text-xs">Per-side</Label>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {mode === "shorthand" ? (
                                    <UnitInput
                                        label="All sides"
                                        value={style[prop] || "0px"}
                                        onChange={(v) => update(prop, v)}
                                    />
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {SIDES.map((side) => (
                                            <UnitInput
                                                key={side}
                                                label={side}
                                                value={style[`${prop}${side}`] || "0px"}
                                                onChange={(v) => update(`${prop}${side}`, v)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}

                <Card className="shadow-none rounded-xs">
                    <CardHeader>
                        <Label className="text-sm">Border</Label>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <UnitInput
                            label="Width"
                            value={style.borderWidth || "0px"}
                            onChange={(v) => update("borderWidth", v)}
                        />
                        <div className="space-y-1">
                            <Label className="text-xs">Style</Label>
                            <Select
                                value={style.borderStyle || "solid"}
                                onValueChange={(v) => update("borderStyle", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {["none", "solid", "dashed", "dotted"].map((v) => (
                                        <SelectItem key={v} value={v}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-xs">Color</Label>
                            <Input
                                type="color"
                                className="w-12 h-8 p-0"
                                value={style.borderColor || "#000000"}
                                onChange={(e) => update("borderColor", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-none rounded-xs">
                    <CardHeader>
                        <Label className="text-sm">Box Shadow</Label>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {coords.map((_, i) => (
                            <UnitInput
                                key={i}
                                label={["Offset X", "Offset Y", "Blur", "Spread"][i]}
                                value={fmt(coords[i])}
                                onChange={(v) => {
                                    const parsed = parse(v);
                                    const next = [...coords];
                                    next[i] = parsed;
                                    setCoords(next);
                                    update("boxShadow", buildShadow(next, draftShadowOpacity, shadowColor));
                                }}
                            />
                        ))}
                        <div className="flex items-center space-x-2">
                            <Label className="w-20 text-xs">Color</Label>
                            <Input
                                type="color"
                                className="w-12 h-8 p-0"
                                value={rgbToHex(shadowColor)}
                                onChange={(e) => {
                                    const col = hexToRgb(e.target.value);
                                    setShadowColor(col);
                                    update("boxShadow", buildShadow(coords, draftShadowOpacity, col));
                                }}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label className="w-20 text-xs">Opacity</Label>
                            <Slider
                                value={[draftShadowOpacity]}
                                min={0}
                                max={1}
                                step={0.01}
                                onValueChange={([v]) => {
                                    setDraftShadowOpacity(v);
                                    update("boxShadow", buildShadow(coords, v, shadowColor));
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    );
}
