import { useEditor } from "@craftjs/core";
import Grid from "./layout/Grid";
import Section from "./layout/Section";
import { Col } from "react-grid-system";

export default function ToolBox() {
    const { connectors, query } = useEditor();
    return (
        <section>
            <div>
                Drag a grid
                <button ref={ref => connectors.create(ref, <Grid rows={1} cols={0} />)} >Grid</button>
            </div>
            <div>
                Drag a section
                <button ref={ref => connectors.create(ref, <Section component={Col} />)} >Section</button>
            </div>
        </section>



    )
}