import React from "react";
import { useEditor, useNode } from "@craftjs/core";
import { useDrawer } from "../../../DrawerContext";

function DragHandle({ refCallback, selected, onClick }) {
    return (
        <div
            ref={refCallback}
            style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "grab",
                zIndex: 10,
                borderRadius: 4,
                backgroundColor: selected ? "rgba(0,123,255,0.2)" : "transparent",
                pointerEvents: "auto",
                userSelect: "none",
                fontSize: 12,
            }}
            onClick={onClick} // Only apply onClick to the DragHandle
        >
            {/* simple “handle” character */}
            <span style={{ lineHeight: 1 }}>☰</span>
        </div>
    );
}

export default function Draggable({ element: Component = "div", children, style, ...props }) {
    const {
        connectors: { connect, drag },
        selected,
    } = useNode((node) => ({ selected: node.events.selected }));
    const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));

    const refCallback = (ref) => {
        if (ref) connect(drag(ref));
    };

    const { setDrawerOpen } = useDrawer(); // Get setDrawerOpen from the context

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent the click event from propagating to the parent component
        setDrawerOpen(true); // Open the drawer when the handle is clicked
    };

    return (
        <Component {...props} style={{ position: "relative", ...style }}>
            {children}
            {enabled && <DragHandle refCallback={refCallback} selected={selected} onClick={handleClick} />}
        </Component>
    );
}
