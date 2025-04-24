import { Element, useNode } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import { DroppableBox } from "../../layout-engine/utils/components/Box"
import uniqueId from "../../libs/nanoid"
import { GridColumnSettings } from "./GridColumnSettings"
import { Hidden, Visible } from "react-grid-system"

import { Col, Container, Row } from "react-grid-system"
import { GridRowSettings } from "./GridRowSettings"
import { useState } from "react"
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings"


export const defaultSectionStyles = {
    padding: "10px",

    minHeight: '100px',

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
                style={{ minHeight: style?.minHeight, border: '1px solid red' }}
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

export function DroppableGridRow({ children }) {
    const {
        connectors: { connect }, actions: { setCustom },
        style,
        align,
        justify
    } = useNode((node) => ({ style: node.data.custom.style, align: node.data.custom.align, justify: node.data.custom.justify }));

    return (

        <DroppableBox element={Row} style={{ ...style, minHeight: "100px", border: '1px solid black' }} align={align} justify={justify}>{children}
        </DroppableBox>

    )
}



function GridRow({ children, ...props }) {
    const id = uniqueId();
    return (
        <Draggable fluid element={Container} style={{ padding: "10px", minHeight: "100px", backgroundColor: 'red' }}>
            <Element
                canvas
                id={id}
                is={DroppableGridRow}
            >
                {children}
            </Element>
        </Draggable>
    );
}

DroppableGridRow.craft = {
    custom: {
        style: { ...defaultSectionStyles },
        align: "normal",
        justify: "start"
    },
    related: {
        settings: GridRowSettings
    }
}

export { GridRow }


function DroppableSection() {

}



//Droppable and draggable generic layout component
export function Section({ component: Component, children, style, ...props }) {
    return (
        <Draggable style={{ ...defaultSectionStyles, ...style }}>
            <Element canvas id={uniqueId()} is={DroppableBox} element={Component} {...props} style={{ border: '1px solid green', minHeight: '100px' }}>{children}</Element >
        </Draggable>
    )
}

Section.craft = {
    related: {
        settings: CommonStyleSettings
    }
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