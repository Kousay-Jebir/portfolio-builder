import { Container } from "react-grid-system";
import { withDroppable } from "../utils/hocs/droppable-hoc";
import GridEngineSettings from "./GridEngineSettings";

export const DroppableContainer = withDroppable(Container, { enableDrag: true });

function GridEngine({ children, style, ...props }) {
    return (
        <main {...props} style={style} fluid>
            {children}
        </main>
    );
}

const DroppableGridEngine = withDroppable(GridEngine);

DroppableGridEngine.craft = {
    props: {
        style: { border: '1px solid gray', minHeight: '75vh' }
    },
    related: {
        settings: GridEngineSettings
    }
};

export default DroppableGridEngine;
