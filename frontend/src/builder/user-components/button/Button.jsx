import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc"
import { ButtonSettings } from "./ButtonSettings";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { Button as ShadcnButton } from "@/components/ui/button";


export const handlers = {
    none: () => { },
    alert: () => window.alert("Hello from your button!"),
    download: (file) => {
        if (!file) return window.alert("Please upload a file first.");
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    },
};

export function EditableButton({ style, onClick, text, variant, size, actionKey, downloadFile, ...props }) {
    return (
        <Draggable style={style} element={ShadcnButton} variant={variant} size={size} actionKey={actionKey} downloadFile={downloadFile} {...props} onClick={onClick} text={text}>{text}</Draggable>
    )
}



EditableButton.craft = {
    props: {
        style: {},
        variant: "default",
        size: "sm",
        actionKey: "none",
        text: "Click me!",
        downloadFile: null,
        onClick: () => { }
    },
    name: "Button",
    related: {
        settings: ButtonSettings
    }
}