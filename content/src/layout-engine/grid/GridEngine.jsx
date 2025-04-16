import { Container } from "react-grid-system";
import { withDroppable } from "../utils/hocs/droppable-hoc";
import GridEngineSettings from "./GridEngineSettings";

export const DroppableContainer = withDroppable(Container, { enableDrag: true });

function GridEngine({ children, style, ...props }) {
    return (
        <Container {...props} style={style} fluid >
            {children}
        </Container>

    )
}

const DroppableGridEngine = withDroppable(GridEngine);
DroppableGridEngine.craft = {
    props: {
        style: {
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingTop: 0,
            margin: 0,
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            backgroundColor: '#ffffff',
            minHeight: '50vh',
            border: '2px solid lightGray',
            borderRadius: '10px'

        }
    },
    related: { settings: GridEngineSettings }
}
export default DroppableGridEngine