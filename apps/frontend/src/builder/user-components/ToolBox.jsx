import { useEditor, Element } from "@craftjs/core";
import { GridColumn, GridRow, Section } from "./layout/Section";
import { Container } from "react-grid-system";
import { EditableTypography } from "./typography/Typography";
import { Image } from "./image/Image";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ToolBox() {
    const { connectors } = useEditor();

    const toolboxItems = [
        { label: "Section", component: <Element canvas fluid component={Container} is={Section} /> },
        { label: "Grid Row", component: <Element canvas is={GridRow} /> },
        { label: "Grid Column", component: <Element canvas is={GridColumn} /> },
        { label: "Paragraph", component: <EditableTypography component="p" /> },
        { label: "Hyperlink", component: <EditableTypography href="#" component="a" /> },
        { label: "Image", component: <Image /> },
    ];

    return (
        <Card className="border border-border rounded-none bg-transparent">
            <CardHeader className="border-b border-border px-0 py-1">
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
