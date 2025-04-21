import { Element } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import { DroppableBox } from "../../layout-engine/utils/components/Box"
import uniqueId from "../../libs/nanoid"


import { Col, Container, Row } from "react-grid-system"

export const defaultSectionStyles = {
    padding: '10px',
    minHeight: '100px',
    border: '1px solid gray',
    borderRadius: '5px'
}



export function GridColumn({ children, style, ...props }) {
    return (
        <Element canvas style={{ ...defaultSectionStyles }} id={uniqueId()} is={DroppableBox} element={Col} {...props}>{children}</Element >
    )
}

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