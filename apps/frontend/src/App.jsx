import { useDrawer } from './DrawerContext';
import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import GridEngine from "./builder/layout-engine/grid/GridEngine";
import Draggable from "./builder/layout-engine/utils/components/Draggable";
import Grid, { EditableCol, GridBody } from "./builder/user-components/layout/Grid";
import Box from "./builder/layout-engine/utils/components/Box";
import { DroppableBox } from "./builder/layout-engine/utils/components/Box";
import ToolBox from "./builder/user-components/ToolBox";
import { Section, GridColumn, GridRow } from "./builder/user-components/layout/Section";
import { EditableTypography } from "./builder/user-components/typography/Typography";
import { CustomizationMenu } from "./builder/customization-engine/CustomizationMenu";
import { EditableButton } from "./builder/user-components/button/Button";
import { Image } from "./builder/user-components/image/Image";
import './App.css';
import { useRef, useEffect } from 'react';
import Layers from './builder/Layers';

const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  const handleSerializeClick = () => {
    console.log(query.serialize());
  };

  return (
    <div style={{ padding: "16px", marginTop: "24px", marginBottom: "8px", backgroundColor: "#cbe8e7" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center" }}>

        <div style={{ padding: "8px" }}>
          <button
            onClick={handleSerializeClick}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              border: "1px solid #d32f2f",
              backgroundColor: "transparent",
              color: "#d32f2f",
              cursor: "pointer",
            }}
          >
            Serialize JSON to console
          </button>
        </div>
      </div>
    </div>
  );
};




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
        <Layers />
        <Topbar />

        {/* now using our standalone Drawer */}
        <Drawer>
          <CustomizationMenu />
        </Drawer>
      </Editor>
    </>
  );
}

export default App;