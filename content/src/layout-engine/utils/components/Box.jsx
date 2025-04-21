import { withDroppable } from "../hocs/droppable-hoc";

export default function Box({
    element: Component = 'div',
    children,
    ...props
}) {
    return (
        <Component {...props}>
            {children}
        </Component>
    );
}

export const DroppableBox = withDroppable(Box);