import { useEditor, Element } from "@craftjs/core";
import { GridColumn, GridRow, Section, } from "./layout/Section";
import { EditableTypography } from "./typography/Typography";
import { Image } from "./image/Image";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { EditableButton } from "./button/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel } from "./showcase/Carousel";
import { CarouselItem } from "./showcase/CarouselItem";
import { Button } from "@/components/ui/button";
import { GenericContainer } from "./generic/GenericContainer";
import { useAuth } from "@/context/AuthContext";

const USER_COMPONENTS = {
    GENERIC_CONTAINER: {
        label: 'Generic container',
        component: <Element canvas is={GenericContainer} />,
        isPremium: false
    },
    GRID_CONTAINER: {
        label: 'Grid container',
        component: <Element canvas fluid is={Section} />,
        isPremium: false
    },
    GRID_ROW: {
        label: 'Grid row',
        component: <Element canvas is={GridRow} />,
        isPremium: false
    },
    GRID_COLUMN: {
        label: 'Grid column',
        component: <Element canvas is={GridColumn} />,
        isPremium: false
    },
    CAROUSEL: {
        label: 'Carousel',
        component: <Element canvas is={Carousel} loop />,
        isPremium: true
    },
    CAROUSEL_ITEM: {
        label: 'Carousel item',
        component: <Element canvas is={CarouselItem} />,
        isPremium: true
    },
    PARAGRAPH: {
        label: 'Paragraph',
        component: <EditableTypography component="p" />,
        isPremium: false
    },
    HYPERLINK: {
        label: 'Hyperlink',
        component: <EditableTypography href="http://google.com" component="a" />,
        isPremium: false
    },
    BUTTON: {
        label: 'Button',
        component: <EditableButton />,
        isPremium: false
    },
    IMAGE: {
        label: 'Image',
        component: <Image />,
        isPremium: true
    }
}

export default function ToolBox() {
    const { connectors } = useEditor();
    const { user } = useAuth()
    function filterUserComponents(component) {
        if (user.role === 'subscribed') return true;
        else if (user.role === 'user') {
            return (!component.isPremium)
        }
    }

    return (
        <Card className="rounded-xs shadow-none dark:bg-slate-900">
            <CardHeader className="border-b px-0 py-1">
                <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide px-2">
                    Toolbox
                </CardTitle>
            </CardHeader>

            <CardContent className="px-0 py-0">
                <ScrollArea className="h-full pr-1">
                    <div className="grid grid-cols-2 gap-1 px-2 py-2">
                        {Object.values(USER_COMPONENTS).filter(filterUserComponents).map((item, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full justify-center text-xs h-7"
                                ref={(ref) => connectors.create(ref, item.component)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
