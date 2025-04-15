import { Container } from "react-grid-system";
import { withDroppable } from "../utils/hocs/droppable-hoc";

export const DroppableContainer = withDroppable(Container, { enableDrag: true });

function GridEngine({ children, ...props }) {
    return (
        <Container {...props} style={{ border: '1px solid blue', padding: '5px', minHeight: '50vh' }}>
            {children}
        </Container>

    )
}

const DroppableGridEngine = withDroppable(GridEngine);
export default DroppableGridEngine