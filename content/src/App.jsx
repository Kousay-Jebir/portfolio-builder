import { useDrawer } from './DrawerContext';
import { Editor, Element, Frame } from "@craftjs/core";
import GridEngine from "./layout-engine/grid/GridEngine";
import Draggable from "./layout-engine/utils/components/Draggable";
import Grid, { EditableCol, GridBody } from "./user-components/layout/Grid";
import Box from "./layout-engine/utils/components/Box";
import { Col, Container, Row } from "react-grid-system";
import { DroppableBox } from "./layout-engine/utils/components/Box";
import ToolBox from "./user-components/ToolBox";
import { Section, GridColumn, GridRow } from "./user-components/layout/Section";
import { EditableTypography } from "./user-components/typography/Typography";
import { CustomizationMenu } from "./customization-engine/CustomizationMenu";
import { EditableButton } from "./user-components/button/Button";
import { Image } from "./user-components/image/Image";

// Styles
import './App.css';

function App() {
  const { drawerOpen, setDrawerOpen } = useDrawer(); // Use the drawer context

  return (
    <>
      {/* Header section with the toggle button */}
      <div className="header">
        <button className="drawer-toggle" onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? "Close Drawer" : "Open Drawer"}
        </button>
      </div>

      {/* Editor context */}
      <Editor resolver={{
        Draggable, GridEngine, Grid, GridBody, Row, Col, Box, DroppableBox, Container,
        EditableCol, Section, GridColumn, GridRow, EditableTypography, EditableButton, Image,
      }}>
        {/* Main editor content */}
        <Frame>
          <Element is={GridEngine} canvas fluid>
            {/* This is where your canvas content goes */}
          </Element>
        </Frame>

        {/* ToolBox remains at the bottom */}
        <ToolBox />

        {/* Drawer inside Editor */}
        <div className={`drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            <CustomizationMenu />
          </div>
        </div>
      </Editor>
    </>
  );
}

export default App;
