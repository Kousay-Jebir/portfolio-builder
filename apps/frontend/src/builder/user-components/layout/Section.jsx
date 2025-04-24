import { Element, useNode } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import { DroppableBox } from "../../layout-engine/utils/components/Box"
import uniqueId from "../../../libs/nanoid"
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
    const { connectors: { connect, drag } } = useNode();
    Object.entries(colSettings).forEach(([breakpoint, { span, offset, hidden }]) => {
        if (span != null) spanProps[breakpoint] = span;
        if (offset != null) offsetProps[breakpoint] = offset;
        if (hidden) hiddenBreakpoints.push(breakpoint);
    });

    const column = (
        <Draggable
            {...spanProps}
            offset={Object.keys(offsetProps).length ? offsetProps : undefined}
            style={style}
            {...props}
            element={Col}
        >
            {children}
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
        style: { height: "100px", border: "1px solid red" }
    },
    related: {
        settings: GridColumnSettings,
    },
};

export { GridColumn }

function GridRow({ children, style, align, justify, ...props }) {
    const id = uniqueId();
    return (
        <Draggable element={Row} style={style} align={align} justify={justify} {...props}>
            {children}
        </Draggable>
    );
}

GridRow.craft = {
    props: {
        style: { height: "100px", border: "1px solid green" },
        align: "normal",
        justify: "start"
    },
    related: {
        settings: GridRowSettings
    }
}

export { GridRow }

//Droppable and draggable generic layout component
export function Section({ component: Component, children, style, ...props }) {
    return (
        <Draggable style={style} element={Component} {...props}>
            {children}
        </Draggable>
    )
}

Section.craft = {
    props: {
        style: { height: "100px", border: "1px solid blue" },
    },

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