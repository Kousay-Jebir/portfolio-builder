// src/App.js
import React, { useRef, useEffect, useState } from "react";
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
import { useUI } from "./DrawerContext";
import Layers from "./builder/Layers";
import ToolBox from "./builder/user-components/ToolBox";
import { CustomizationMenu } from "./builder/customization-engine/CustomizationMenu";
import { EditableTypography } from "./builder/user-components/typography/Typography";
import {
  BaseGridContainer,
  BuilderEditableGridColumn,
  BuilderEditableGridRow,
  BuilderEditableSection,
  GridColumn,
  GridRow,
  Section,
} from "./builder/user-components/layout/Section";
import { Image } from "./builder/user-components/image/Image";
import DroppableGridEngine from "./builder/layout-engine/grid/GridEngine";
import { BuilderProvider, ModeToggle } from "./builder/global-state/state-store";
import { AspectRatio } from "./components/ui/aspect-ratio";
import { Carousel } from "./builder/user-components/showcase/Carousel";
import { CarouselItem } from "./builder/user-components/showcase/CarouselItem";
import "./App.css";
import { EditableButton } from "./builder/user-components/button/Button";
import test from "../test.json"
import test2 from "../test2.json"
import test3 from "../test3.json"
import { Container } from "react-grid-system";
import FakeWindowWidthProvider from "./builder/FakeWindowWidthProvider";
import { GenericContainer } from "./builder/user-components/generic/GenericContainer";

const MIN_PANEL_WIDTH = 200;
const MAX_PANEL_WIDTH = 1000;
const DEFAULT_PANEL_WIDTH = 250;

// hook for resizing panels
function useResizablePanel(isLeft) {
  const [width, setWidth] = useState(DEFAULT_PANEL_WIDTH);
  useEffect(() => setWidth(DEFAULT_PANEL_WIDTH), []);
  const startResize = (e) => {
    e.preventDefault();
    const onMove = (evt) => {
      const totalWidth = document.documentElement.clientWidth;
      const w = isLeft
        ? evt.clientX
        : totalWidth - evt.clientX;
      if (w >= MIN_PANEL_WIDTH && w <= MAX_PANEL_WIDTH) setWidth(w);
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

function Topbar({ ui, state }) {
  const { query } = useEditor((s) => ({ query: s.query }));
  return (
    <header className="flex items-center justify-between h-10 px-4 border-b bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <Button
          size="xs"
          variant="ghost"
          className="lg:hidden p-1"
          onClick={() => ui.toggleSheet('LEFT')}
        >
          ☰
        </Button>
        <Button
          size="xs"
          variant="secondary"
          className="p-1"
          onClick={() => console.log(query.serialize())}
        >
          Serialize
        </Button>
        <Button
          size="xs"
          variant="secondary"
          className="p-1"
          onClick={() => console.log(query.dese())}
        >
          Serialize
        </Button>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="xs" variant="ghost" className="p-1">
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 border">
            <DropdownMenuLabel>Panels</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              onCheckedChange={() => ui.togglePanel('LEFT')}
              checked={state.showLeftSidebar}
            >
              Left Panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              onCheckedChange={() => ui.togglePanel('RIGHT')}
              checked={state.showRightSidebar}
            >
              Right Panel
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              onCheckedChange={() => ui.toggleTheme()}
              checked={state.darkMode}
            >
              Dark Mode
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button
        size="xs"
        variant="primary"
        className="lg:hidden p-1"
        onClick={() => ui.toggleSheet('RIGHT')}
      >
        Customize
      </Button>
    </header>
  );
}

function Sidebar({ width, children, side, onResize }) {
  const borderClass = side === "left" ? "border-r" : "border-l";
  const resizerClass = side === "left" ? "right-0" : "left-0";
  return (
    <div
      className={`relative hidden lg:flex flex-col bg-gray-50 dark:bg-gray-800 ${borderClass}`}
      style={{ width, overflow: 'auto' }}
    >
      {children}
      <div
        className={`absolute top-0 ${resizerClass} h-full w-1 cursor-col-resize`}
        onMouseDown={onResize}
      />
    </div>
  );
}

export default function App() {
  const { state, ui } = useUI();
  const drawerRef = useRef(null);

  // theme toggling
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode]);

  // panel widths
  const [leftWidth, resizeLeft] = useResizablePanel(true);
  const [rightWidth, resizeRight] = useResizablePanel(false);

  // close right sheet on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (
        state.showRightSheet &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        ui.setSheet('Right', false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [state.showRightSheet, ui]);

  const [layersOpenMap, setLayersOpenMap] = useState({});

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Editor
        resolver={{
          EditableTypography,
          Section,
          GridRow,
          GridColumn,
          Image,
          BaseGridContainer,
          DroppableGridEngine,
          BuilderEditableSection,
          BuilderEditableGridColumn,
          BuilderEditableGridRow,
          AspectRatio,
          Carousel,
          CarouselItem,
          EditableButton,
          Container,
          GenericContainer
        }}
      >
        <BuilderProvider>
          <Topbar ui={ui} state={state} />

          <div className="flex flex-1 overflow-hidden">
            {state.showLeftSidebar && (
              <Sidebar width={leftWidth} side="left" onResize={resizeLeft}>
                <div className="p-2 space-y-4">
                  <ToolBox />
                  <Layers openMap={layersOpenMap} setOpenMap={setLayersOpenMap} />
                </div>
              </Sidebar>
            )}

            <main className="flex-1 bg-white overflow-auto">
              <FakeWindowWidthProvider>
                <Frame data={test}>
                  <Element is={DroppableGridEngine} canvas className="h-full p-4">
                    Builder Canvas
                  </Element>
                </Frame>
              </FakeWindowWidthProvider>
            </main>

            {state.showRightSidebar && (
              <Sidebar width={rightWidth} side="right" onResize={resizeRight}>
                <div className="p-2">
                  <CustomizationMenu />
                </div>
              </Sidebar>
            )}
          </div>

          {/* mobile left sheet */}
          <Sheet
            open={state.showLeftSheet}
            onOpenChange={() => ui.toggleSheet('LEFT')}
          >
            <SheetContent side="left" className="w-60 p-0">
              <SheetHeader>
                <SheetTitle>
                  Menu
                  <SheetClose asChild>
                    <Button>×</Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <ToolBox />
                <Layers openMap={layersOpenMap} setOpenMap={setLayersOpenMap} />
              </div>
            </SheetContent>
          </Sheet>

          {/* mobile right sheet */}
          <Sheet
            open={state.showRightSheet}
            onOpenChange={() => ui.toggleSheet('RIGHT')}
          >
            <SheetContent side="right" className="w-60 p-0">
              <SheetHeader>
                <SheetTitle>
                  Customization
                  <SheetClose asChild>
                    <Button>×</Button>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <div ref={drawerRef} className="p-4">
                <CustomizationMenu />
              </div>
            </SheetContent>
          </Sheet>
        </BuilderProvider>
      </Editor>
    </div>
  );
}
