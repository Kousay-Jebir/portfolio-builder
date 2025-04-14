import { Col, Container, Row } from "react-grid-system";
import Draggable from "../../layout-engine/Draggable";
import { withDroppable } from "../../layout-engine/grid/droppable-hoc";
import { Element } from "@craftjs/core";
import uniqueId from "../../libs/nanoid";
import { useRef } from "react";
import Box from "../../layout-engine/grid/Box";



export const DroppableBox = withDroppable(Box);

export function GridBody({ rows, cols }) {
    const rowsArr = Array.from({ length: rows });
    const colsArr = Array.from({ length: cols });
    return (
        <Element style={{ padding: '10px', border: '1px solid red' }} is={DroppableBox} id={`grid-row-${uniqueId()}`} canvas>
            {
                rowsArr.map((_, rowIndex) => (
                    <Draggable element={Row} key={rowIndex} style={{ border: '1px solid green' }} >
                        {colsArr.map((_, colIndex) => (
                            <Col key={colIndex}>{`Row: ${rowIndex}, Column: ${colIndex}`}</Col>
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
        <Draggable
            id={gridIdRef.current}
            is={DroppableBox}
            element={Element}
            fluid
            canvas
        >
            <GridBody rows={rows} cols={cols} />

        </Draggable >
    );
}



/* {rowsArr.map((_, rowIndex) => (
    <Element canvas key={`${rowIndex}`} id={`grid-row-${rowIndex}`}>
        <Row key={rowIndex}>
            {colsArr.map((_, colIndex) => (
                <Element
                    is={Box}
                    key={`${rowIndex}-${colIndex}`}
                    id={`grid-col-${rowIndex}-${colIndex}`}
                    canvas
                >
                    <Col>Hello world</Col>
                </Element>
            ))}
        </Row>
    </Element>
))} */