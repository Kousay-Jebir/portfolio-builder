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
            padding: "5px",
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
            minHeight: '75vh',
            outline: '2px solid lightGray',


            backgroundSize: 'cover',         // Makes the image cover the entire area
            backgroundRepeat: 'no-repeat',   // Prevents the image from repeating
            backgroundPosition: 'center',    // Centers the image within the element

        }
    },
    related: { settings: GridEngineSettings }
}
export default DroppableGridEngine