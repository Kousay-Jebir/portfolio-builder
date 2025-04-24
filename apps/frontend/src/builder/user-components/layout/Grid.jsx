import { Col, Row } from "react-grid-system";
import Draggable from "../../layout-engine/utils/components/Draggable";
import { Element } from "@craftjs/core";
import uniqueId from "../../../libs/nanoid";
import { useRef } from "react";
import { withEditableContent } from "../../layout-engine/utils/hocs/editable-content-hoc";
import { DroppableBox } from "../../layout-engine/utils/components/Box";

export const EditableCol = withEditableContent(Col);

const defaultContainerStyles = {
    padding: '10px',
    border: '1px solid gray',
    borderRadius: '5px'
}

export function GridBody({ rows, cols }) {
    const rowsArr = Array.from({ length: rows });
    const colsArr = Array.from({ length: cols });
    return (
        <Element style={defaultContainerStyles} is={DroppableBox} id={`grid-row-${uniqueId()}`} canvas>
            {
                rowsArr.map((_, rowIndex) => (
                    <Draggable element={Row} key={rowIndex}>
                        {colsArr.map((_, colIndex) => (
                            <EditableCol />
                        ))}
                    </Draggable>

                ))
            }
        </Element>
    );
}

export default function Grid({ rows, cols, children }) {
    const gridIdRef = useRef(`grid-${uniqueId()}`);
    return (
        <Draggable>
            <GridBody rows={rows} cols={cols} />
            {children}
        </Draggable>
    );
}
