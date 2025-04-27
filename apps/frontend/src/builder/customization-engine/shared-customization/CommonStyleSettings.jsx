// CommonStyleSettings.jsx
import React, { useState, useEffect, useRef } from "react";
import { usePropSettings } from "./customization-hook";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const SIDES = ["Top", "Right", "Bottom", "Left"];
const extractValueAndUnit = (value = "0px") => {
    const m = value.toString().match(/^([\d.]+)(px|%)?$/);
    return m ? [m[1], m[2] || "px"] : ["0", "px"];
};
const rgbaString = (r, g, b, a) => `rgba(${r},${g},${b},${a})`;
const getRGBA = (rgba = "rgba(255,255,255,1)") => {
    const m = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([.\d]+)?\)/);
    return m ? [+m[1], +m[2], +m[3], +m[4]] : [255, 255, 255, 1];
};

export function CommonStyleSettings({ showBackground = true, customs = false }) {
    const { values, updateProp } = usePropSettings(["style"], customs);
    const style = values.style || {};
    const update = (k, v) => updateProp("style", { ...style, [k]: v });

    // Background RGBA & local draft for opacity
    const [r, g, b, initialA] = getRGBA(style.backgroundColor);
    const [draftOpacity, setDraftOpacity] = useState(initialA);
    useEffect(() => { setDraftOpacity(initialA); }, [initialA]);

    // ensure borderStyle default
    useEffect(() => {
        if (!style.borderStyle) update("borderStyle", "solid");
    }, [style]);

    // Box-shadow parse & local draft for opacity
    const rawShadow = style.boxShadow || "0px 0px 0px 0px rgba(0,0,0,0.2)";
    const [oxRaw, oyRaw, blurRaw, spreadRaw, ...colorParts] = rawShadow.split(/\s+/);
    const colorRaw = colorParts.join(" ");
    const [ox, oxU] = extractValueAndUnit(oxRaw);
    const [oy, oyU] = extractValueAndUnit(oyRaw);
    const [bl, blU] = extractValueAndUnit(blurRaw);
    const [sp, spU] = extractValueAndUnit(spreadRaw);
    const [sr, sg, sb, initialA2] = getRGBA(colorRaw);
    const [draftShadowOpacity, setDraftShadowOpacity] = useState(initialA2);
    useEffect(() => { setDraftShadowOpacity(initialA2); }, [initialA2]);

    const buildShadow = (x, xU, y, yU, bb, bbU, ss, ssU, a) => `${x}${xU} ${y}${yU} ${bb}${bbU} ${ss}${ssU} ${rgbaString(sr, sg, sb, a)}`;

    // Dimension control component
    function DimensionControl({ label, prop }) {
        const [useSides, setUseSides] = useState(false);
        const [allV, allU] = extractValueAndUnit(style[prop]);
        const [draftAll, setDraftAll] = useState(allV);
        const [draftUnit, setDraftUnit] = useState(allU);
        const [sideDraft, setSideDraft] = useState(
            SIDES.reduce((acc, side) => {
                const [v, u] = extractValueAndUnit(style[`${prop}${side}`]);
                acc[side] = { v, u };
                return acc;
            }, {})
        );
        useEffect(() => {
            setDraftAll(allV);
            setDraftUnit(allU);
        }, [allV, allU]);

        const commitAll = () => update(prop, `${draftAll}${draftUnit}`);
        const commitSide = (side) => {
            const { v, u } = sideDraft[side];
            update(`${prop}${side}`, `${v}${u}`);
        };

        return (
            <Card className="border border-border rounded-none shadow-none">
                <CardHeader className="flex items-center justify-between">
                    <Label className="text-sm">{label}</Label>
                    <div className="flex items-center space-x-1">
                        <Switch checked={useSides} onCheckedChange={setUseSides} />
                        <Label className="text-xs">Per side</Label>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {!useSides ? (
                        <div className="flex items-center space-x-2">
                            <Input
                                type="number" className="w-20"
                                value={draftAll}
                                onChange={e => setDraftAll(e.target.value)}
                                onBlur={commitAll}
                                onKeyDown={e => e.key === "Enter" && commitAll()}
                            />
                            <Select
                                value={draftUnit}
                                onValueChange={u => { setDraftUnit(u); update(prop, `${draftAll}${u}`); }}
                                className="w-20"
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="px">px</SelectItem>
                                    <SelectItem value="%">%</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            {SIDES.map(side => {
                                const { v, u } = sideDraft[side];
                                return (
                                    <div key={side} className="flex items-center space-x-2">
                                        <Label className="w-12 text-xs">{side}</Label>
                                        <Input
                                            type="number" className="w-16"
                                            value={v}
                                            onChange={e => setSideDraft(sd => ({ ...sd, [side]: { v: e.target.value, u } }))}
                                            onBlur={() => commitSide(side)}
                                            onKeyDown={e => e.key === "Enter" && commitSide(side)}
                                        />
                                        <Select
                                            value={u}
                                            onValueChange={nu => {
                                                setSideDraft(sd => ({ ...sd, [side]: { v, u: nu } }));
                                                update(`${prop}${side}`, `${v}${nu}`);
                                            }}
                                            className="w-16"
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="px">px</SelectItem>
                                                <SelectItem value="%">%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <ScrollArea className="h-full p-2">
            <div className="space-y-4">
                {/* Background */}
                {showBackground && (
                    <Card className="border border-border rounded-none shadow-none">
                        <CardHeader><Label className="text-sm">Background</Label></CardHeader>
                        <CardContent className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                            <Input
                                type="color" className="w-12 h-8 p-0"
                                value={`#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`}
                                onChange={e => {
                                    const hex = e.target.value;
                                    const nr = parseInt(hex.slice(1, 3), 16),
                                        ng = parseInt(hex.slice(3, 5), 16),
                                        nb = parseInt(hex.slice(5, 7), 16);
                                    update("backgroundColor", rgbaString(nr, ng, nb, draftOpacity));
                                }}
                            />
                            <div className="flex-1">
                                <Label className="text-xs">Opacity</Label>
                                <Slider
                                    value={[draftOpacity]} min={0} max={1} step={0.01}
                                    onValueChange={([v]) => {
                                        setDraftOpacity(v);
                                        update("backgroundColor", rgbaString(r, g, b, v));
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Padding, Margin, Border Radius */}
                <DimensionControl label="Padding" prop="padding" />
                <DimensionControl label="Margin" prop="margin" />
                <DimensionControl label="Border Radius" prop="borderRadius" />

                {/* Border */}
                <Card className="border border-border rounded-none shadow-none">
                    <CardHeader><Label className="text-sm">Border</Label></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* width */}
                        {(() => {
                            const [v, u] = extractValueAndUnit(style.borderWidth);
                            return (
                                <div className="space-y-1">
                                    <Label className="text-xs">Width</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            type="number" className="w-20" value={v}
                                            onChange={e => update("borderWidth", `${e.target.value}${u}`)}
                                        />
                                        <Select
                                            value={u}
                                            onValueChange={nu => update("borderWidth", `${v}${nu}`)}
                                            className="w-20"
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="px">px</SelectItem>
                                                <SelectItem value="%">%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            );
                        })()}
                        {/* style */}
                        <div className="space-y-1">
                            <Label className="text-xs">Style</Label>
                            <Select
                                value={style.borderStyle || "solid"}
                                onValueChange={v => update("borderStyle", v)}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">none</SelectItem>
                                    <SelectItem value="solid">solid</SelectItem>
                                    <SelectItem value="dashed">dashed</SelectItem>
                                    <SelectItem value="dotted">dotted</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* color */}
                        <div className="space-y-1">
                            <Label className="text-xs">Color</Label>
                            <Input
                                type="color" className="w-12 h-8 p-0"
                                value={style.borderColor || "#000000"}
                                onChange={e => update("borderColor", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Size */}
                <Card className="border border-border rounded-none shadow-none">
                    <CardHeader><Label className="text-sm">Size</Label></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["width", "height"].map(key => {
                            const [v, u] = extractValueAndUnit(style[key]);
                            return (
                                <div key={key} className="space-y-1">
                                    <Label className="text-xs">{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            type="number" className="w-20" value={v}
                                            onChange={e => update(key, `${e.target.value}${u}`)}
                                        />
                                        <Select value={u} onValueChange={nu => update(key, `${v}${nu}`)} className="w-20">
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="px">px</SelectItem>
                                                <SelectItem value="%">%</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Box Shadow */}
                <Card className="border border-border rounded-none shadow-none">
                    <CardHeader><Label className="text-sm">Box Shadow</Label></CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            ["Offset X", ox, oxU, (v, u) => update("boxShadow", buildShadow(v, u, oy, oyU, bl, blU, sp, spU, draftShadowOpacity))],
                            ["Offset Y", oy, oyU, (v, u) => update("boxShadow", buildShadow(ox, oxU, v, u, bl, blU, sp, spU, draftShadowOpacity))],
                            ["Blur", bl, blU, (v, u) => update("boxShadow", buildShadow(ox, oxU, oy, oyU, v, u, sp, spU, draftShadowOpacity))],
                            ["Spread", sp, spU, (v, u) => update("boxShadow", buildShadow(ox, oxU, oy, oyU, bl, blU, v, u, draftShadowOpacity))]
                        ].map(([lbl, val, unit, fn]) => (
                            <div key={lbl} className="flex items-center gap-2">
                                <Label className="w-20 text-xs">{lbl}</Label>
                                <Input type="number" className="w-20" value={val} onChange={e => fn(parseFloat(e.target.value), unit)} />
                                <Select value={unit} onValueChange={nu => fn(val, nu)} className="w-20">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="px">px</SelectItem>
                                        <SelectItem value="%">%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}

                        <div className="flex items-center gap-2">
                            <Label className="w-20 text-xs">Color</Label>
                            <Input
                                type="color" className="w-12 h-8 p-0"
                                value={`#${[sr, sg, sb].map(x => x.toString(16).padStart(2, "0")).join("")}`}
                                onChange={e => {
                                    const hex = e.target.value;
                                    const [nr, ng, nb] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
                                    update("boxShadow", buildShadow(ox, oxU, oy, oyU, bl, blU, sp, spU, draftShadowOpacity));
                                    update("boxShadow", `${ox}${oxU} ${oy}${oyU} ${bl}${blU} ${sp}${spU} ${rgbaString(nr, ng, nb, draftShadowOpacity)}`);
                                }}
                            />
                            <div className="flex-1">
                                <Label className="text-xs">Opacity</Label>
                                <Slider
                                    value={[draftShadowOpacity]} min={0} max={1} step={0.01}
                                    onValueChange={([v]) => {
                                        setDraftShadowOpacity(v);
                                        update("boxShadow", buildShadow(ox, oxU, oy, oyU, bl, blU, sp, spU, v));
                                    }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    );
}
