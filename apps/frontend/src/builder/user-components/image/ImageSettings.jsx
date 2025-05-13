import React from "react";
import { useNode } from "@craftjs/core";
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const OBJECT_FIT_OPTIONS = [
    "object-contain",
    "object-cover",
    "object-fill",
    "object-none",
    "object-scale-down",
];

export const ImageSettings = () => {
    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props,
    }));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProp((props) => (props.imageUrl = reader.result));
        };
        reader.readAsDataURL(file);
    };

    const handleObjectFitChange = (value) => {
        setProp((props) => {
            const classes = props.className.split(" ").filter(c => !c.startsWith("object-"));
            props.className = [...classes, value].join(" ");
        });
    };

    const handleRatioChange = (axis, value) => {
        setProp((props) => {
            const currentRatio = props.ratio || 1;
            if (axis === 'x') props.ratio = value / (props.ratioY || 1);
            if (axis === 'y') props.ratio = (props.ratioX || 1) / value;
            props[axis === 'x' ? 'ratioX' : 'ratioY'] = value;
        });
    };

    return (
        <CommonStyleSettings>
            <Card className="shadow-none rounded-xs dark:bg-slate-900 p-4">
                <Label className="text-sm mb-2 block">Upload Image</Label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </Card>

            <Card className="shadow-none rounded-xs dark:bg-slate-900 p-4">
                <Label className="text-sm mb-2 block">Object Fit</Label>
                <Select
                    value={
                        props.className.split(" ").find(c => c.startsWith("object-")) || OBJECT_FIT_OPTIONS[0]
                    }
                    onValueChange={handleObjectFitChange}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {OBJECT_FIT_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Card>

            <Card className="shadow-none rounded-xs dark:bg-slate-900 p-4">
                <Label className="text-sm mb-2 block">Aspect Ratio (X / Y)</Label>
                <div className="flex space-x-2">
                    <Input type="number" value={props.ratioX || 16} onChange={(e) => handleRatioChange('x', Number(e.target.value))} />
                    <span className="self-center">/</span>
                    <Input type="number" value={props.ratioY || 9} onChange={(e) => handleRatioChange('y', Number(e.target.value))} />
                </div>
            </Card>
        </CommonStyleSettings>
    );
};