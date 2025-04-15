import { Editor, Element, Frame, useEditor } from "@craftjs/core"
import GridEngine from "./layout-engine/grid/GridEngine";
import Draggable from "./layout-engine/utils/components/Draggable";
import Grid, { EditableCol, GridBody } from "./user-components/layout/Grid";
import Box from "./layout-engine/utils/components/Box";
import { Col, Container, Row } from "react-grid-system";
import { DroppableBox } from "./layout-engine/utils/components/Box";
import { withDroppable } from "./layout-engine/utils/hocs/droppable-hoc";
import ToolBox from "./user-components/ToolBox";
import Section, { GridColumn, GridRow, } from "./user-components/layout/Section";

function App() {
  return (
    <>
      <Editor resolver={{ Draggable, GridEngine, Grid, GridBody, Row, Col, Box, DroppableBox, Container, EditableCol, Section, GridColumn, GridRow }}>

        <Frame>
          <Element is={GridEngine} canvas fluid >


          </Element>
        </Frame>
        <ToolBox />
      </Editor >

    </>
  )
}

export default App
