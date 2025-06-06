import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
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

export function EditableButton({
    style,
    onClick,
    text,
    variant,
    size,
    actionKey,
    downloadFile,
    textColor,
    ...props
}) {
    return (
        <Draggable
            style={{
                ...style,
                color: textColor,
            }}
            element={ShadcnButton}
            variant={variant}
            size={size}
            actionKey={actionKey}
            downloadFile={downloadFile}
            {...props}
            onClick={onClick}
            className={`
        bg-white           /* light‐mode background */
        dark:bg-white      /* force white in dark mode */
        border             /* give it a border so it doesn’t look flat */
        border-gray-300    /* light‐mode border */
        dark:border-gray-300 /* same border in dark mode */
        hover:bg-gray-50   /* still get a hover state in light mode */
        dark:hover:bg-gray-50 /* and same hover in dark mode */
      `}
        >
            {text}
        </Draggable>
    );
}

EditableButton.craft = {
    props: {
        style: {},
        variant: "default",
        size: "sm",
        actionKey: "none",
        text: "Click me!",
        downloadFile: null,
        textColor: "#000000",
        onClick: () => { },
    },
    name: "Button",
    related: {
        settings: ButtonSettings,
    },
};
