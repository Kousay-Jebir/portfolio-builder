import { Editor, Element, Frame } from "@craftjs/core"
import GridEngine from "./layout-engine/grid/GridEngine";
import Draggable from "./layout-engine/utils/components/Draggable";
import Grid, { EditableCol, GridBody } from "./user-components/layout/Grid";
import Box from "./layout-engine/utils/components/Box";
import { Col, Container, Row } from "react-grid-system";
import { DroppableBox } from "./layout-engine/utils/components/Box";
import ToolBox from "./user-components/ToolBox";
import Section, { GridColumn, GridRow, } from "./user-components/layout/Section";
import { Typography, EditableTypography } from "./user-components/typography/Typography";
import { CustomizationMenu } from "./customization-engine/CustomizationMenu";
import { EditableButton } from "./user-components/button/Button";


function App() {
  return (
    <>
      <Editor resolver={{ Draggable, GridEngine, Grid, GridBody, Row, Col, Box, DroppableBox, Container, EditableCol, Section, GridColumn, GridRow, Typography, EditableTypography, EditableButton }}>

        <Frame>
          <Element is={GridEngine} canvas fluid >

          </Element>
        </Frame>
        <ToolBox />
        <CustomizationMenu />
      </Editor >

    </>
  )
}

export default App
