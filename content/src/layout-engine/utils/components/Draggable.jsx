import React from 'react';
import { useNode } from '@craftjs/core';

export default function Draggable({ element: Component = 'div', children, ...props }) {
    const {
        connectors: { connect, drag }, actions: { setProp },
    } = useNode();

    const refCallback = (ref) => {
        if (ref) {
            connect(drag(ref));
        }
    };

    // Render the passed component with the ref callback.
    return <Component ref={refCallback} {...props}>{children}</Component>;
}
