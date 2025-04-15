import { Element } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import Box, { DroppableBox } from "../../layout-engine/utils/components/Box"
import uniqueId from "../../libs/nanoid"
import { useNode } from "@craftjs/core"

const defaultSectionStyles = {
    padding: '10px',
    minHeight: '100px',
    border: '1px solid gray',
    borderRadius: '5px'
}

export function SectionBody({ component: Component, children }) {
    const { connectors: { connect, drag } } = useNode();
    return (
        <div ref={ref => connect(drag(ref))} style={defaultSectionStyles}>
            {children}
        </div>
    )
}

export default function Section({ component: Component, children }) {
    return (
        <Draggable element={Component}>
            <Element canvas style={defaultSectionStyles} id={uniqueId()} is={DroppableBox}>{children}</Element >
        </Draggable>
    )
}