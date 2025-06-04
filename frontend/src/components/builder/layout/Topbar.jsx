import React from "react";
import { useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../../../builder/global-state/state-store";
import { compressPortfolio } from "../../../builder/save-load/save-portfolio";
import { useUI } from "../../../DrawerContext";
import { save } from "../../../builder/save-load/save-portfolio";

export function preparePortfolioSave() {
    return query.serialize()
}


export function Topbar() {
    const { query } = useEditor((s) => ({ query: s.query }));
    const { ui, state } = useUI();

    return (
        <header className="flex items-center justify-between h-10 px-4 border-b bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-2">
                <Button size="xs" variant="ghost" className="lg:hidden p-1" onClick={() => ui.toggleSheet("LEFT")}>
                    ☰
                </Button>
                <Button
                    size="xs"
                    variant="secondary"
                    className="p-1"
                    onClick={async () => { await save(query.serialize()) }}
                >
                    Save Portfolio
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
                            onCheckedChange={() => ui.togglePanel("LEFT")}
                            checked={state.showLeftSidebar}
                        >
                            Left Panel
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            onCheckedChange={() => ui.togglePanel("RIGHT")}
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

            <Button size="xs" variant="primary" className="lg:hidden p-1" onClick={() => ui.toggleSheet("RIGHT")}>
                Customize
            </Button>
        </header>
    );
}
