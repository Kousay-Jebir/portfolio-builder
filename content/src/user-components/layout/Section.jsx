import { Element, useNode } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import { DroppableBox } from "../../layout-engine/utils/components/Box"
import uniqueId from "../../libs/nanoid"
import { GridColumnSettings } from "./GridColumnSettings"
import { Hidden, Visible } from "react-grid-system"

import { Col, Container, Row } from "react-grid-system"

export const defaultSectionStyles = {
    padding: '10px',
    minHeight: '100px',
    border: '1px solid gray',
    borderRadius: '5px'
}


function GridColumn({ colSettings = {}, children, style, ...props }) {
    const spanProps = {};
    const offsetProps = {};
    const hiddenBreakpoints = [];

    Object.entries(colSettings).forEach(([breakpoint, { span, offset, hidden }]) => {
        if (span != null) spanProps[breakpoint] = span;
        if (offset != null) offsetProps[breakpoint] = offset;
        if (hidden) hiddenBreakpoints.push(breakpoint);
    });

    const column = (
        <Draggable
            element={Col}
            {...spanProps}
            offset={Object.keys(offsetProps).length ? offsetProps : undefined}
            style={style}
            {...props}
        >
            <Element
                canvas
                id={uniqueId()}
                is={DroppableBox}
                element="div"
                style={{ minHeight: style?.minHeight }}
            >
                {children}
            </Element>
        </Draggable>
    );

    // Only wrap in <Hidden> if needed
    return hiddenBreakpoints.length > 0
        ? <Hidden {...Object.fromEntries(hiddenBreakpoints.map(bp => [bp, true]))}>{column}</Hidden>
        : column;
}


GridColumn.craft = {
    props: {

        colSettings: {

        },
        style: { ...defaultSectionStyles }
    },
    related: {
        settings: GridColumnSettings,
    },
};

export { GridColumn }

export function GridRow({ children, style, ...props }) {
    return (
        <Draggable element={Container} fluid>
            <Element canvas style={{ ...defaultSectionStyles, ...style }} id={uniqueId()} is={DroppableBox} element={Row} {...props}>{children}</Element >
        </Draggable>
    )
}

//Droppable and draggable generic layout component
export function Section({ component: Component, children, style, ...props }) {
    return (
        <Draggable>
            <Element canvas style={{ ...defaultSectionStyles, ...style }} id={uniqueId()} is={DroppableBox} element={Component} {...props}>{children}</Element >
        </Draggable>
    )
}

/* export const Section = new ComponentBuilder()
    .setComponentResolver((props) => props.component || "div")
    .useElement({ canvas: true }) // Make it a Craft canvas
    .setDraggable(true)
    .setCraftConfig({
        props: {
            style: {
                padding: "20px",
                backgroundColor: "#f8f9fa",
                minHeight: '150px'
            },
        }
    })
    .build(); */