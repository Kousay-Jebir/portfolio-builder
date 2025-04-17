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

            })
            .get(),
        text: "Change me!"
    },
    related: {
        settings: TypographySettings
    }
}
export { EditableTypography }
