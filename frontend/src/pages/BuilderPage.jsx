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



export default function BuilderPage() {
    const { state } = useUI();
    const { user } = useAuth();
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                if (!user?.id) return; // Early return if no user

                const result = await getPortfoliosOfUser(user.id);
                setPortfolio(result[result.length - 1].content);
            } catch (error) {
                console.error("Failed to fetch portfolio:", error);
                setPortfolio(null);
            }
        }

        fetchPortfolio();
    }, [user]);

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
                            {portfolio ? <Frame data={portfolio} key='not-empty'>
                                <Element is={DroppableGridEngine} canvas className="h-full p-4">
                                    Builder Canvas
                                </Element>
                            </Frame> : <Frame key='empty' >
                                <Element is={DroppableGridEngine} canvas className="h-full p-4">
                                    Builder Canvas
                                </Element>
                            </Frame>}
                        </FakeWindowWidthProvider>
                    </AppLayout>
                </BuilderProvider>
            </Editor>
        </div>
    );
}
