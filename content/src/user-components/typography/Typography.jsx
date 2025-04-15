import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";

export const EditableTypography = withEditableContent(Typography)

function Typography({ component: Component, style, children, ...props }) {
    return (
        <Draggable style={{ ...style, mineHeight: '10px', border: '1px solid blue', margin: '0' }} element={Component} {...props}>{children}</Draggable>
    )
}