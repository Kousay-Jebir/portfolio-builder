import { Container } from "react-grid-system";
import { withDroppable } from "../utils/hocs/droppable-hoc";
import GridEngineSettings from "./GridEngineSettings";

export const DroppableContainer = withDroppable(Container, { enableDrag: true });

function GridEngine({ children, style, ...props }) {
    return (
        <main {...props} style={style} fluid className="
        /* force white background in both modes */
        bg-white        dark:bg-white
        /* force black text in both modes */
        text-black      dark:text-black
        /* if you had a border, force its light‐mode color too: */
        border          dark:border
        border-gray-200 dark:border-gray-200
        /* any other Tailwind “color” utilities you need: */
        /* e.g. if you use p-4, font-sizes, etc., those don’t need dark: overrides */
        p-4
      ">
            {children}
        </main>
    );
}

const DroppableGridEngine = withDroppable(GridEngine);

DroppableGridEngine.craft = {
    props: {
        style: {}
    },
    related: {
        settings: GridEngineSettings
    }
};

export default DroppableGridEngine;
