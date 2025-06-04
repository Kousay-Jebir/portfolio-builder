import React from "react";
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



export default function BuilderPage() {
    const { state } = useUI();

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
                    GenericContainer,
                }}
            >
                <BuilderProvider>
                    <AppLayout>
                        <FakeWindowWidthProvider>
                            <Frame >
                                <Element is={DroppableGridEngine} canvas className="h-full p-4">
                                    Builder Canvas
                                </Element>
                            </Frame>
                        </FakeWindowWidthProvider>
                    </AppLayout>
                </BuilderProvider>
            </Editor>
        </div>
    );
}
