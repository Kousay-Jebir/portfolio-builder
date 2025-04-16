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
        style: {
            backgroundColor: 'none',
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
            fontFamily: 'sans-serif'
        },
        text: "Change me!"
    },
    related: {
        settings: TypographySettings
    }
}
export { EditableTypography }
