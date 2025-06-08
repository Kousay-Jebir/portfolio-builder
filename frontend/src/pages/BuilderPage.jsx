import React, { useEffect, useState } from "react";
import { Editor, Frame, Element } from "@craftjs/core";
import { useUI } from "../DrawerContext";
import { BuilderProvider } from "../builder/global-state/state-store";
import AppLayout from "../components/builder/layout/AppLayout";
import FakeWindowWidthProvider from "../builder/FakeWindowWidthProvider";

import { EditableTypography } from "../builder/user-components/typography/Typography";
import {
  Section,
  GridRow,
  GridColumn,
  BaseGridContainer,
  BuilderEditableSection,
  BuilderEditableGridColumn,
  BuilderEditableGridRow,
} from "../builder/user-components/layout/Section";
import { Image } from "../builder/user-components/image/Image";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { Carousel } from "../builder/user-components/showcase/Carousel";
import { CarouselItem } from "../builder/user-components/showcase/CarouselItem";
import { EditableButton } from "../builder/user-components/button/Button";
import { Container } from "react-grid-system";
import { GenericContainer } from "../builder/user-components/generic/GenericContainer";
import DroppableGridEngine from "../builder/layout-engine/grid/GridEngine";
import { useAuth } from "@/context/AuthContext";
import { getPortfoliosOfUser } from "@/api/consulting/user";
import useExitPrompt from "@/hooks/useExitPrompt";
import resolver from "@/builder/resolver";

export default function BuilderPage() {
  const { state } = useUI();
  const { user } = useAuth();

  // the “loaded template” JSON (set via AppLayout’s loadTemplate callback)
  const [loadedTemplate, setLoadedTemplate] = useState(null);

  // Ask React Router / window to warn about unsaved changes
  useExitPrompt(true);

  const isUsingTemplate = !!loadedTemplate;
  const dataToLoad = loadedTemplate;
  const frameKey = "full"
  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Editor
        resolver={resolver}
      >
        <BuilderProvider>
          <AppLayout
            loadTemplate={(templateJson) => {
              // When a template is selected in AppLayout,
              // store its JSON here. That will override portfolio.
              setLoadedTemplate(templateJson);
            }}
          >
            <FakeWindowWidthProvider>
              {/*
                If dataToLoad is truthy (a non-null object), pass it into <Frame data={…} />.
                Otherwise render a Frame with no data so it’s blank.
              */}
              {dataToLoad ? (
                <Frame data={dataToLoad} key={frameKey}>
                  <Element
                    is={DroppableGridEngine}
                    canvas
                    className="h-full p-4"
                  >
                    {/* The canvas will be populated by the serialized JSON. */}
                  </Element>
                </Frame>
              ) : (
                <Frame key="empty">
                  <Element
                    is={DroppableGridEngine}
                    canvas
                    className="h-full p-4"
                  >
                    {/* No data → empty canvas "Builder Canvas" */}
                  </Element>
                </Frame>
              )}
            </FakeWindowWidthProvider>
          </AppLayout>
        </BuilderProvider>
      </Editor>
    </div>
  );
}
