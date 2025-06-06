import React from "react";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";
import { CommonStyleSettings } from "@/builder/customization-engine/shared-customization/CommonStyleSettings";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { handlers } from "./Button";

export function ButtonSettings() {
    // Now track: style, variant, size, text, actionKey, downloadFile, onClick, textColor
    const { values, updateProp } = usePropSettings(
        ["style", "variant", "size", "text", "actionKey", "downloadFile", "onClick", "textColor"],
        false
    );
    const { style, variant, size, text, actionKey, textColor } = values;

    const set = (k) => (v) => updateProp(k, v);

    // When user picks an action, immediately write both actionKey *and* onClick
    function onActionChange(key) {
        set("actionKey")(key);
        const fn =
            key === "download"
                ? () => handlers.download(values.downloadFile)
                : handlers[key];
        updateProp("onClick", fn);
    }

    // When user uploads a file, save it and update the download handler
    function onFileChange(e) {
        const file = e.target.files?.[0] || null;
        set("downloadFile")(file);
        if (actionKey === "download") {
            updateProp("onClick", () => handlers.download(file));
        }
    }

    return (
        <CommonStyleSettings>
            <Card className="shadow-none rounded-xs">
                <CardHeader>
                    <CardTitle>Button Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Label */}
                    <div className="flex flex-col space-y-1">
                        <Label className="text-xs">Label</Label>
                        <Input
                            value={text}
                            onChange={(e) => set("text")(e.target.value)}
                        />
                    </div>

                    {/* Text Color */}
                    <div className="flex flex-col space-y-1">
                        <Label className="text-xs">Text Color</Label>
                        <Input
                            type="color"
                            value={textColor || "#000000"}
                            onChange={(e) => set("textColor")(e.target.value)}
                            className="h-8 w-8 p-0 border-none"
                        />
                    </div>

                    {/* Variant */}
                    <div className="flex flex-col space-y-1">
                        <Label className="text-xs">Variant</Label>
                        <Select value={variant} onValueChange={set("variant")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select variant" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Variants</SelectLabel>
                                    {["default", "outline", "ghost", "link"].map((v) => (
                                        <SelectItem key={v} value={v}>
                                            {v}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Size */}
                    <div className="flex flex-col space-y-1">
                        <Label className="text-xs">Size</Label>
                        <Select value={size} onValueChange={set("size")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sizes</SelectLabel>
                                    {["sm", "lg"].map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col space-y-1">
                        <Label className="text-xs">Action</Label>
                        <Select value={actionKey} onValueChange={onActionChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Actions</SelectLabel>
                                    <SelectItem value="none">No Action</SelectItem>
                                    <SelectItem value="alert">Show Alert</SelectItem>
                                    <SelectItem value="download">Download File</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* File upload, only if “Download File” chosen */}
                    {actionKey === "download" && (
                        <div className="flex flex-col space-y-1">
                            <Label className="text-xs">Upload File</Label>
                            <Input type="file" onChange={onFileChange} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </CommonStyleSettings>
    );
}
