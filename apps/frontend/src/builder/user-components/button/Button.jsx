import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc"
import { ButtonSettings } from "./ButtonSettings";
import Draggable from "../../layout-engine/utils/components/Draggable";

function Button({ component: Component = 'button', onClick, style, children, ...props }) {
    return (
        <Draggable style={style} element={Component} {...props} onClick={onClick}>{children}</Draggable>
    )
}

export const EditableButton = withEditableContent(Button);

EditableButton.craft = {
    props: {
        style: {
            backgroundColor: '#ffff',
            color: '#000000',
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
        onClick: () => alert("Hello world!"),
        text: "Click me!"
    },
    related: {
        settings: ButtonSettings
    }
}