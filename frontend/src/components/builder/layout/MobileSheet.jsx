import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function MobileSheet({
    side,
    title,
    open,
    onOpenChange,
    drawerRef,
    children,
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side={side} className="w-60 p-0">
                <SheetHeader>
                    <SheetTitle>
                        {title}
                        <SheetClose asChild>
                            <Button>×</Button>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <div ref={drawerRef} className="p-4 space-y-4">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}
