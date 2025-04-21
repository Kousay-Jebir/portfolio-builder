import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
import { TypographySettings } from "./TypographySettings";

export function Typography({ component: Component, style, children, ...props }) {

    return (
        <Draggable style={style} element={Component} {...props}>{children}</Draggable>
    )
}

const EditableTypography = withEditableContent(Typography)
EditableTypography.craft = {
    props: {
        style: new CustomizableStyle()
            .setMultiple({
                fontSize: { value: 16 },
                fontFamily: { value: "sans-serif" },
                color: { value: "#000000" },
            })
            .get(),
        text: "Change me!"
    },
    related: {
        settings: TypographySettings
    }
}
export { EditableTypography }


/* // EditableTypography.js
import React from "react";
import { ComponentBuilder } from "../user-component-builder";
import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";
import { TypographySettings } from "./TypographySettings";

// 1) Define your default Craft.js style with units, etc.
const defaultTypographyStyles = new CustomizableStyle()
    .setMultiple({
        fontSize: { value: 16 },      // → “16px” by default
        fontFamily: { value: "sans-serif" },
        color: { value: "#000000" },
        textAlign: { value: "left" },
    })
    .get();

// 2) Build your component in a fully declarative way:
export const EditableTypography = new ComponentBuilder()
    .setComponentType("p")           // this will render a <p>
    .setStyle(defaultTypographyStyles) // style goes right onto the <p>
    .setEditable(true)               // wraps with withEditableContent(…)
    .setDraggable(true)              // wraps everything in <Draggable>
    .setCraftConfig({
        props: {
            style: defaultTypographyStyles,
            text: "Change me!"
        },
        related: {
            settings: TypographySettings
        }
    })
    .build(); */