import { Element } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import Box, { DroppableBox } from "../../layout-engine/utils/components/Box"
import uniqueId from "../../libs/nanoid"
import React from "react"
import { useNode } from "@craftjs/core"
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
export default function Section({ component: Component, children, style, ...props }) {
    return (
        <Draggable>
            <Element canvas style={{ ...defaultSectionStyles, ...style }} id={uniqueId()} is={DroppableBox} element={Component} {...props}>{children}</Element >
        </Draggable>
    )
}