import Draggable from "../../layout-engine/utils/components/Draggable";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";


function Typography({ component: Component, style, children, ...props }) {
    return (
        <Draggable style={{ ...style, minHeight: '100px', border: '1px solid blue', margin: '0', padding: '0' }} element={Component} {...props}>{children}</Draggable>
    )
}

export const EditableTypography = withEditableContent(Typography)


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
