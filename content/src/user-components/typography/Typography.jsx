import { useNode, useEditor } from "@craftjs/core";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
import { usePropSettings } from "../../customization-engine/shared-customization/customization-hook";

import React from 'react';


export function TypographySettings() {
    const { values, updateProp } = usePropSettings(["style"]);

    const handleStyleChange = (field, value) => {
        updateProp("style", {
            ...values.style,
            [field]: value,
        });
    };

    return (
        <div className="space-y-4 p-4 border rounded-xl shadow-sm max-w-md">
            <h2 className="text-lg font-semibold">Typography Settings</h2>

            {/* Background & Text Color */}
            <div>
                <label>Background Color: </label>
                <input
                    type="color"
                    value={values.style?.backgroundColor || ""}
                    onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                />
            </div>
            <div>
                <label>Text Color: </label>
                <input
                    type="color"
                    value={values.style?.color || ""}
                    onChange={(e) => handleStyleChange("color", e.target.value)}
                />
            </div>

            {/* Text Alignment & Decoration */}
            <div>
                <label>Text Alignment: </label>
                <select
                    value={values.style?.textAlign || "left"}
                    onChange={(e) => handleStyleChange("textAlign", e.target.value)}
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>
            <div>
                <label>Text Decoration: </label>
                <select
                    value={values.style?.textDecoration || "none"}
                    onChange={(e) => handleStyleChange("textDecoration", e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                    <option value="line-through">Line Through</option>
                    <option value="overline">Overline</option>
                </select>
            </div>

            {/* Font Size */}
            <div>
                <label>Font Size (px): </label>
                <input
                    type="number"
                    value={values.style?.fontSize || 16}
                    onChange={(e) => handleStyleChange("fontSize", parseInt(e.target.value))}
                />
            </div>

            {/* Padding */}
            <fieldset>
                <legend>Padding (px)</legend>
                {["Top", "Right", "Bottom", "Left"].map((side) => (
                    <div key={side}>
                        <label>{side}: </label>
                        <input
                            type="number"
                            value={values.style?.[`padding${side}`] || 0}
                            onChange={(e) =>
                                handleStyleChange(`padding${side}`, parseInt(e.target.value))
                            }
                        />
                    </div>
                ))}
            </fieldset>

            {/* Margin */}
            <fieldset>
                <legend>Margin (px)</legend>
                {["Top", "Right", "Bottom", "Left"].map((side) => (
                    <div key={side}>
                        <label>{side}: </label>
                        <input
                            type="number"
                            value={values.style?.[`margin${side}`] || 0}
                            onChange={(e) =>
                                handleStyleChange(`margin${side}`, parseInt(e.target.value))
                            }
                        />
                    </div>
                ))}
            </fieldset>

            {/* Border Radius */}
            <div>
                <label>Border Radius (px): </label>
                <input
                    type="number"
                    value={values.style?.borderRadius || 0}
                    onChange={(e) => handleStyleChange("borderRadius", parseInt(e.target.value))}
                />
            </div>
        </div>
    );
}

export function Typography({ component: Component, style, children, ...props }) {

    return (
        <Draggable style={style} element={Component} {...props}>{children}</Draggable>
    )
}

const EditableTypography = withEditableContent(Typography)
EditableTypography.craft = {
    props: {
        style: {
            backgroundColor: '#ffffff',
            color: '#000000',
            textAlign: 'left',
            textDecoration: 'none',
            fontSize: 16,
            padding: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            margin: 0,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            borderRadius: 0,
        },
        text: "Change me!"
    },
    related: {
        settings: TypographySettings
    }
}
export { EditableTypography }


//specific implementations

export function EditableParagraph({ children }) {
    return (
        <EditableTypography component="p" >{children}</EditableTypography>
    )
}

export function EditableHyperLink() {
    return (
        <EditableTypography component="a" href="#">Helo</EditableTypography>
    )
}





export const SettingsPanel = () => {
    const { selected } = useEditor((state) => {
        const [currentNodeId] = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings
            };
        }

        return {
            selected
        }
    });

    return selected ? (
        <div>

            {
                selected.settings && React.createElement(selected.settings)
            }
        </div>
    ) : null
}