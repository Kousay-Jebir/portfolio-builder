import { useNode } from '@craftjs/core';

const Draggable = ({ element: ElementComponent, children, ...props }) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <div ref={(ref) => ref && connect(drag(ref))}>
            {ElementComponent ?
                <ElementComponent {...props}>
                    {children}
                </ElementComponent> :
                <div {...props}>
                    {children}
                </div>}
        </div>
    );
};

export default Draggable;
