import { withBuilderEditable } from "@/builder/global-state/state-store";
import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
import { TypographySettings } from "./TypographySettings";

export function Typography({ component: Component, style, children, ...props }) {
    const defaultStyles = {
        fontSize: "16px",
        fontFamily: "sans-serif",

    }
    return (
        <Draggable style={{ ...defaultStyles, ...style }} element={Component} {...props}>{children}</Draggable>
    )
}

const EditableTypography = withEditableContent(withBuilderEditable(Typography))
EditableTypography.craft = {
    props: {
        text: "Change me!"
    },
    related: {
        settings: TypographySettings
    }
}
export { EditableTypography }