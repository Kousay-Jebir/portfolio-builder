import { Container } from "react-grid-system";
import { withDroppable } from "../utils/hocs/droppable-hoc";
import GridEngineSettings from "./GridEngineSettings";

export const DroppableContainer = withDroppable(Container, { enableDrag: true });

function GridEngine({ children, style, ...props }) {
    return (
        <Container {...props} style={style} fluid>
            {children}
        </Container>
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
