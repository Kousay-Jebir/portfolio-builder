import { useNode } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import { GridColumnSettings } from "./GridColumnSettings"
import { Hidden } from "react-grid-system"
import { Col, Row } from "react-grid-system"
import { GridRowSettings } from "./GridRowSettings"
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings"
import { withCustomizableSettings } from "../../customization-engine/shared-customization/customizable-hoc"

function BaseGridColumn({ colSettings = {}, children, style, ...props }) {
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

const GridColumn = withCustomizableSettings(BaseGridColumn, GridColumnSettings, {
    style: { height: "100px", border: "1px solid red" }
})



function BaseGridRow({ children, style, align, justify, ...props }) {
    return (
        <Draggable element={Row} style={style} align={align} justify={justify} {...props}>
            {children}
        </Draggable>
    );
}

const GridRow = withCustomizableSettings(BaseGridRow, GridRowSettings, {
    style: { height: "100px", border: "1px solid green" },
    align: "normal",
    justify: "start"
})



//Droppable and draggable generic layout component
function BaseSection({ component: Component, children, style, ...props }) {
    return (
        <Draggable style={style} element={Component} {...props}>
            {children}
        </Draggable>
    )
}
const Section = withCustomizableSettings(BaseSection, CommonStyleSettings, { style: { height: "100px", border: "1px solid blue" } })

export { Section, GridRow, GridColumn }
