import { Editor, Element, Frame, useNode } from "@craftjs/core"
import GridEngine from "./layout-engine/grid/GridEngine";
import Draggable from "./layout-engine/Draggable";
import Grid, { GridBody } from "./user-components/layout/Grid";
import Box from "./layout-engine/grid/Box";
import { Col, Container, Row } from "react-grid-system";
import { DroppableBox } from "./user-components/layout/Grid";

function App() {

  return (
    <>
      <Editor resolver={{ Draggable, GridEngine, Grid, GridBody, Row, Col, Box, DroppableBox, Container }}>
        <Frame>
          <Element is={GridEngine} canvas fluid >
            <Grid rows={5} cols={2} ></Grid>


            <Grid rows={2} cols={4} />

          </Element>
        </Frame>
      </Editor >
    </>
  )
}

export default App
