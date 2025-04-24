import { Container } from "react-grid-system";
import { withDroppable } from "../utils/hocs/droppable-hoc";
import GridEngineSettings from "./GridEngineSettings";
import CustomizableStyle from "../../customization-engine/shared-customization/shared-style-config";

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
        style: new CustomizableStyle()
            .setMultiple({
                minHeight: { value: 75, unit: "vh" },
                outline: { value: "2px solid lightGray" },
                backgroundSize: { value: "cover" },
                backgroundRepeat: { value: "no-repeat" },
                backgroundPosition: { value: "center" }
            })
            .get()
    },
    related: {
        settings: GridEngineSettings
    }
};

export default DroppableGridEngine;
