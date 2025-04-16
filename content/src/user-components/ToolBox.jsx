import { useEditor } from "@craftjs/core";
import Grid from "./layout/Grid";
import Section, { GridColumn, GridRow, } from "./layout/Section";
import { Container, Row } from "react-grid-system";
import { EditableTypography, Typography } from "./typography/Typography";

export default function ToolBox() {
    const { connectors, query } = useEditor();
    return (
        <section>
            <div>
                Drag a grid
                <button ref={ref => connectors.create(ref, <Grid rows={1} cols={0} />)} >Grid</button>
            </div>
            <div>
                Drag a Grid container
                <button ref={ref => connectors.create(ref, <Section component={Container} style={{ background: 'lightGray' }} fluid />)} >Section</button>
            </div>
            <div>
                Drag a Grid Column
                <button ref={ref => connectors.create(ref, <GridColumn style={{ background: 'cyan' }} />)} >Section</button>
            </div>
            <div>
                Drag a Grid Row
                <button ref={ref => connectors.create(ref, <GridRow component={Row} />)} >Section</button>
            </div>

            <div>
                Drag a Paragraph
                <button ref={ref => connectors.create(ref, <EditableTypography component="p" />)} >Section</button>
            </div>


            <div>
                Drag a hyperlink
                <button ref={ref => connectors.create(ref, <EditableTypography href="#" component="a"></EditableTypography>)} >Section</button>
            </div>


        </section>



    )
}