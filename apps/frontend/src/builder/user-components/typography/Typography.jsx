import { withBuilderEditable } from "@/builder/global-state/state-store";
import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
import { TypographySettings } from "./TypographySettings";

export function Typography({ component: Component, style, children, text, ...props }) {

    return (
        <Draggable style={style} element={Component} {...props}>{text}{children}</Draggable>
    )
}

const EditableTypography = withEditableContent(withBuilderEditable(Typography))
EditableTypography.craft = {
    props: {
        text: "Change me!",
        style: {
            maxWidth: '100%',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
        }
    },
    related: {
        settings: TypographySettings
    }
}
export { EditableTypography }