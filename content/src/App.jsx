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
import './App.css';
import { useRef, useEffect } from 'react';

function Drawer({ children }) {
  const { drawerOpen, setDrawerOpen } = useDrawer();
  const drawerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // if click is outside the drawer-content, close it
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDrawerOpen(false);
      }
    }

    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen, setDrawerOpen]);

  return (
    <div className={`drawer ${drawerOpen ? "open" : ""}`}>
      <div ref={drawerRef} className="drawer-content">
        {children}
      </div>
    </div>
  );
}

function App() {
  const { drawerOpen, setDrawerOpen } = useDrawer();

  return (
    <>
      <div className="header">
        <button
          className="drawer-toggle"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? "Close Drawer" : "Open Drawer"}
        </button>
      </div>

      <Editor
        resolver={{
          Draggable,
          GridEngine,
          Grid,
          GridBody,
          Row: Box.Row,
          Col: Box.Col,
          Box,
          DroppableBox,
          Container: Box.Container,
          EditableCol,
          Section,
          GridColumn,
          GridRow,
          EditableTypography,
          EditableButton,
          Image,
        }}
      >
        <Frame>
          <Element is={GridEngine} canvas fluid>
            {/* canvas content */}
          </Element>
        </Frame>

        <ToolBox />

        {/* now using our standalone Drawer */}
        <Drawer>
          <CustomizationMenu />
        </Drawer>
      </Editor>
    </>
  );
}

export default App;