import React from "react";
import { useNode } from "@craftjs/core";

export const withDroppable = (Component, { enableDrag = false } = {}) => {
    return React.forwardRef((props, ref) => {
        const { connectors: { connect, drag } } = useNode();

        const attachRef = (node) => {
            if (!node) return;
            if (enableDrag) {
                drag(connect(node));
            } else {
                connect(node);
            }

            if (ref) {
                if (typeof ref === "function") {
                    ref(node);
                } else {
                    ref.current = node;
                }
            }
        };

        return <Component {...props} ref={attachRef} />;
    });
};
