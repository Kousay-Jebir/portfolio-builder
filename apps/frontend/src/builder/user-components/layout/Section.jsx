import { useNode } from "@craftjs/core"
import Draggable from "../../layout-engine/utils/components/Draggable"
import { GridColumnSettings } from "./GridColumnSettings"
import { Container, Hidden } from "react-grid-system"
import { Col, Row } from "react-grid-system"
import { GridRowSettings } from "./GridRowSettings"
import { CommonStyleSettings } from "../../customization-engine/shared-customization/CommonStyleSettings"
import { withCustomizableSettings } from "../../customization-engine/shared-customization/customizable-hoc"
import { withBuilderEditable } from "@/builder/global-state/state-store"

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

const BuilderEditableGridColumn = withBuilderEditable(BaseGridColumn);

const GridColumn = withCustomizableSettings(BuilderEditableGridColumn, GridColumnSettings, {
    style: { minHeight: "50px" }
}, { name: 'Grid column' })



function BaseGridRow({ children, style, align, justify, ...props }) {
    return (
        <Draggable element={Row} style={style} align={align} justify={justify} {...props}>
            {children}
        </Draggable>
    );
}

const BuilderEditableGridRow = withBuilderEditable(BaseGridRow);

const GridRow = withCustomizableSettings(BaseGridRow, GridRowSettings, {
    style: { minHeight: "50px", border: '1px solid gray' },
    align: "normal",
    justify: "start"
}, { name: 'Grid row' })



//Droppable and draggable generic layout component
export function BaseGridContainer({ children, style, ...props }) {
    return (
        <Draggable element={Container} style={style} {...props}>{children}</Draggable>
    )
}
const BuilderEditableSection = withBuilderEditable(BaseGridContainer)
const Section = withCustomizableSettings(BaseGridContainer, CommonStyleSettings, { style: { minHeight: "50px", border: '1px solid gray' } }, { name: 'Grid container' })

export { Section, GridRow, GridColumn, BuilderEditableSection, BuilderEditableGridColumn, BuilderEditableGridRow }
