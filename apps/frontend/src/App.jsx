import React, { useRef, useEffect, useReducer, useState } from "react";
import { Editor, Element, Frame, useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useDrawer } from "./DrawerContext";
import Layers from "./builder/Layers";
import "./App.css";
import { CustomizationMenu } from "./builder/customization-engine/CustomizationMenu";
import ToolBox from "./builder/user-components/ToolBox";
import { EditableTypography } from "./builder/user-components/typography/Typography";
import { Container, Section } from "lucide-react";
import { BaseSection, GridColumn, GridRow } from "./builder/user-components/layout/Section";
import { Image } from "./builder/user-components/image/Image";
import DroppableGridEngine from "./builder/layout-engine/grid/GridEngine";

// -- Constants & Initial State -------------------------------------------------
const MIN_PANEL_WIDTH = 200;
const MAX_PANEL_WIDTH = 400;
const DEFAULT_PANEL_WIDTH = 240;
const initialPanelState = {
  showLeft: true,
  showRight: true,
  darkMode: false,
};

// -- Reducer -------------------------------------------------------------------
function panelReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_LEFT":
      return { ...state, showLeft: !state.showLeft };
    case "TOGGLE_RIGHT":
      return { ...state, showRight: !state.showRight };
    case "TOGGLE_THEME":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}

// -- Custom Hook: Resizable Panel ---------------------------------------------
function useResizablePanel(isLeft) {
  const [width, setWidth] = useState(DEFAULT_PANEL_WIDTH);
  const startResize = (e) => {
    e.preventDefault();
    const onMove = (evt) => {
      const newWidth = isLeft ? evt.clientX : window.innerWidth - evt.clientX;
      if (newWidth >= MIN_PANEL_WIDTH && newWidth <= MAX_PANEL_WIDTH) {
        setWidth(newWidth);
      }
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };
  return [width, startResize];
}

// -- Component: Topbar ---------------------------------------------------------
function Topbar({ onMenuToggle, dispatch, darkMode }) {
  const { query } = useEditor((state) => ({ query: state.query }));
  const { setDrawerOpen } = useDrawer();

  return (
    <header className="flex items-center justify-between h-10 px-4 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <Button size="xs" variant="ghost" className="lg:hidden p-1" onClick={onMenuToggle}>
          ☰
        </Button>
        <Button size="xs" variant="ghost" className="p-1" onClick={() => console.log(query.serialize())}>
          Serialize
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="xs" variant="ghost" className="p-1">
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 border">
            <DropdownMenuLabel>Panels</DropdownMenuLabel>
            <DropdownMenuCheckboxItem onCheckedChange={() => dispatch({ type: "TOGGLE_LEFT" })} checked>
              Left Panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem onCheckedChange={() => dispatch({ type: "TOGGLE_RIGHT" })} checked>
              Right Panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem onCheckedChange={() => dispatch({ type: "TOGGLE_THEME" })} checked={darkMode}>
              Dark Mode
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button size="xs" variant="ghost" className="lg:hidden p-1" onClick={() => setDrawerOpen(true)}>
        Customize
      </Button>
    </header>
  );
}

// -- Component: Sidebar --------------------------------------------------------
function Sidebar({ width, children, side, onResize }) {
  const borderClass = side === "left" ? "border-r" : "border-l";
  const resizerPositionClass = side === "left" ? "right-0" : "left-0";
  return (
    <div className={`relative hidden lg:flex flex-col bg-gray-50 dark:bg-gray-800 ${borderClass}`} style={{ width }}>
      {children}
      <div
        className={`absolute top-0 ${resizerPositionClass} h-full w-1 hover:w-2 cursor-col-resize bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all`}
        onMouseDown={onResize}
      />
    </div>
  );
}


// -- Main App -----------------------------------------------------------------
export default function App() {
  const { drawerOpen, setDrawerOpen } = useDrawer();
  const [leftOpen, setLeftOpen] = useState(false);
  const drawerRef = useRef(null);
  const [state, dispatch] = useReducer(panelReducer, initialPanelState);

  // Toggle dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode]);

  // Panel resizing
  const [leftWidth, resizeLeft] = useResizablePanel(true);
  const [rightWidth, resizeRight] = useResizablePanel(false);

  // Close customization drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Editor resolver={{ EditableTypography, Section, GridRow, GridColumn, Image, BaseSection, DroppableGridEngine }}>
        <Topbar onMenuToggle={() => setLeftOpen(true)} dispatch={dispatch} darkMode={state.darkMode} />
        <div className="flex flex-1 overflow-hidden">

          {state.showLeft && (
            <Sidebar width={leftWidth} side="left" onResize={resizeLeft}>
              <div className="p-2 text-gray-700 dark:text-gray-300">
                <ToolBox />
                <Layers />
              </div>
            </Sidebar>
          )}

          <main className="flex-1 bg-white overflow-auto">
            <Frame>
              <Element is={DroppableGridEngine} canvas className="h-full p-4 text-gray-700 dark:text-gray-200">
                Builder Canvas
              </Element>
            </Frame>
          </main>

          {state.showRight && (
            <Sidebar width={rightWidth} side="right" onResize={resizeRight}>
              <div className="p-2 text-gray-700 dark:text-gray-300">
                <h3 className="text-sm font-medium mb-1">Customization</h3>
                <p className="text-xs"><CustomizationMenu /></p>
              </div>
            </Sidebar>
          )}
        </div>

        {/* Mobile Drawers omitted for brevity */}
        <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
          <SheetContent side="left" className="w-60 p-0">
            <SheetHeader className="p-4 border-b bg-gray-50 dark:bg-gray-800">
              <SheetTitle>Menu</SheetTitle>
              <SheetClose asChild>
                <Button size="icon" variant="ghost">×</Button>
              </SheetClose>
            </SheetHeader>
            <div className="p-4 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-sm font-medium mb-2">Left Panel</h3>
              <div className="text-xs">ToolBox & Layers</div>
            </div>
          </SheetContent>
        </Sheet>
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent side="right" className="w-60 p-0">
            <SheetHeader className="p-4 border-b bg-gray-50 dark:bg-gray-800">
              <SheetTitle>Customization</SheetTitle>
              <SheetClose asChild>
                <Button size="icon" variant="ghost">×</Button>
              </SheetClose>
            </SheetHeader>
            <div ref={drawerRef} className="p-4 bg-gray-50 dark:bg-gray-800">
              <div className="text-xs">Customization menu</div>
            </div>
          </SheetContent>
        </Sheet>
      </Editor>
    </div>
  );
}