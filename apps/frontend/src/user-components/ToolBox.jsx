import { useEditor } from "@craftjs/core";
import { GridColumn, GridRow, Section } from "./layout/Section";
import { Container } from "react-grid-system";
import { EditableTypography } from "./typography/Typography";
import { EditableButton } from "./button/Button";
import { Image } from "./image/Image";

// Styles (add this to your App.css or inline styles)
import './ToolBox.css';

export default function ToolBox() {
    const { connectors } = useEditor();

    const toolboxItems = [

        { label: "Section", component: <Section component={Container} style={{ background: 'lightGray' }} fluid /> },
        { label: "Grid Column", component: <GridColumn /> },
        { label: "Grid Row", component: <GridRow /> },
        { label: "Paragraph", component: <EditableTypography component="p" /> },
        { label: "Hyperlink", component: <EditableTypography href="#" component="a" /> },
        { label: "Image", component: <Image /> },
    ];

    return (
        <div className="toolbox-container">
            {toolboxItems.map((item, index) => (
                <div key={index} className="toolbox-item">
                    <button
                        ref={ref => connectors.create(ref, item.component)}
                        className="toolbox-button"
                    >
                        {item.label}
                    </button>
                </div>
            ))}
        </div>
    );
}
