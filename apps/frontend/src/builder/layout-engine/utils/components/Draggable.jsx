/* import React from "react";
import { useEditor, useNode } from "@craftjs/core";
import { useDrawer } from "../../../DrawerContext";
import CustomizableStyle from "../../../customization-engine/shared-customization/shared-style-config";
function DragHandle({ refCallback, selected, onClick }) {
    return (
        <div
            ref={refCallback}
            style={new CustomizableStyle().setMultiple({
                position: { value: "absolute" },
                top: { value: 4 },
                right: { value: 4 },
                width: { value: 20 },
                height: { value: 20 },
                display: { value: "flex" },
                alignItems: { value: "center" },
                justifyContent: { value: "center" },
                cursor: { value: "grab" },
                zIndex: { value: 10 },
                borderRadius: { value: 4 },
                backgroundColor: {
                    value: selected
                        ? "rgba(0,123,255,0.2)"
                        : "transparent"
                },
                pointerEvents: { value: "auto" },
                userSelect: { value: "none" },
                fontSize: { value: 12 }
            }).get()}
            onClick={onClick}
        >
            <span style={{ lineHeight: 1 }}>☰</span>
        </div>
    );
}

export default function Draggable({
    element: Component = "div",
    children,
    style,
    ...props
}) {
    const {
        connectors: { connect, drag },
        selected,
    } = useNode((node) => ({ selected: node.events.selected }));
    const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));
    const { setDrawerOpen } = useDrawer();

    const refCallback = (ref) => {
        if (ref) connect(drag(ref));
    };

    const handleClick = (e) => {
        e.stopPropagation();
        setDrawerOpen(true);
    };

    return (
        <Component
            {...props}
            style={new CustomizableStyle()
                .set("position", "relative")
                .mutate(opts => Object.assign(opts, style))
                .get()}
        >
            {children}
            {enabled && (
                <DragHandle
                    refCallback={refCallback}
                    selected={selected}
                    onClick={handleClick}
                />
            )}
        </Component>
    );
}
 */


import React from "react";
import { useNode } from "@craftjs/core";

const Draggable = React.forwardRef(
    ({ element: ElementComponent = "div", children, ...props }, forwardedRef) => {
        const {
            connectors: { connect, drag },
        } = useNode();

        // a single refCallback that wires up both the forwardedRef and Craft connectors
        const refCallback = (el) => {
            if (el) {
                connect(drag(el));
            }
            if (typeof forwardedRef === "function") {
                forwardedRef(el);
            } else if (forwardedRef) {
                forwardedRef.current = el;
            }
        };

        // Render the element directly, no extra wrapper
        return (
            <ElementComponent ref={refCallback} {...props}>
                {children}
            </ElementComponent>
        );
    }
);

export default Draggable;
