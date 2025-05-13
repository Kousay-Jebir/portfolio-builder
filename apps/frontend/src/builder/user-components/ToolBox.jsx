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

export default function ToolBox() {
    const { connectors } = useEditor();

    const toolboxItems = [
        { label: "Grid Container", component: <Element canvas fluid is={Section} /> },
        { label: "Grid Row", component: <Element canvas is={GridRow} /> },
        { label: "Grid Column", component: <Element canvas is={GridColumn} /> },
        { label: "Carousel", component: <Element canvas is={Carousel} loop /> },
        { label: "Carousel item", component: <Element canvas is={CarouselItem} /> },
        { label: "Paragraph", component: <EditableTypography component="p" /> },
        { label: "Hyperlink", component: <EditableTypography href="http://google.com" component="a" /> },
        { label: "Button", component: <EditableButton /> },
        { label: "Image", component: <Image /> },
    ];

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
                        {toolboxItems.map((item, index) => (
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
