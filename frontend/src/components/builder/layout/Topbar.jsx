import React, { useState, useEffect } from "react";
import { useEditor } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../../../builder/global-state/state-store";
import { save } from "../../../builder/save-load/save-portfolio";
import { useUI } from "../../../DrawerContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Shadcn UI: Dialog imports
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger,
    DialogPortal,
    DialogOverlay
} from "@/components/ui/dialog";

// Example template JSON
import test from "@/../test.json";

export function preparePortfolioSave() {
    return query.serialize();
}



export function Topbar({ sendTemplate }) {
    const { query } = useEditor((s) => ({ query: s.query }));
    const { ui, state } = useUI();
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();
    const [showSubModal, setShowSubModal] = useState(false);
    const onSubscribedTemplate = () => {
        sendTemplate(test);
    };
    const onUnsubscribedTemplate = () => {
        setShowSubModal(true);
    };

    return (
        <>
            <header className="flex items-center justify-between h-10 px-4 border-b bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                    <Button
                        size="xs"
                        variant="ghost"
                        className="lg:hidden p-1"
                        onClick={() => ui.toggleSheet("LEFT")}
                    >
                        ☰
                    </Button>

                    <Button
                        size="xs"
                        variant="secondary"
                        className="p-1"
                        onClick={async () => {
                            await save(query.serialize());
                        }}
                    >
                        Save Portfolio
                    </Button>

                    <ModeToggle />

                    {/* ── “View” Dropdown ── */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="xs" variant="ghost" className="p-1">
                                View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-gray-800 border">
                            <DropdownMenuLabel>Panels</DropdownMenuLabel>
                            <DropdownMenuItem onSelect={() => ui.togglePanel("LEFT")}>
                                {state.showLeftSidebar ? "Hide Left Panel" : "Show Left Panel"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => ui.togglePanel("RIGHT")}>
                                {state.showRightSidebar
                                    ? "Hide Right Panel"
                                    : "Show Right Panel"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => ui.toggleTheme()}>
                                {state.darkMode ? "Light Mode" : "Dark Mode"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* ── “Templates” Dropdown ── */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="xs" variant="ghost" className="p-1">
                                Templates
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white dark:bg-gray-800 border">
                            <DropdownMenuLabel>Select Template</DropdownMenuLabel>

                            {user?.role === "subscribed" ? (
                                <DropdownMenuItem onSelect={onSubscribedTemplate}>
                                    Template 1
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onSelect={onUnsubscribedTemplate}>
                                    Template 1
                                </DropdownMenuItem>
                            )}

                            {/* Add more templates here following the same pattern */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        size="xs"
                        className="px-2 py-1"
                        onClick={() => {
                            handleLogout();
                            navigate("/login");
                        }}
                    >
                        Logout
                    </Button>

                    <Button
                        size="xs"
                        variant="primary"
                        className="lg:hidden p-1"
                        onClick={() => ui.toggleSheet("RIGHT")}
                    >
                        Customize
                    </Button>
                </div>
            </header>

            {showSubModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/75"
                        onClick={() => setShowSubModal(false)}
                    />


                    <div className="relative w-[90vw] max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Subscription Required
                        </h2>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            You need to be subscribed to access templates.
                        </p>

                        <div className="mt-6 flex justify-end space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowSubModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowSubModal(false);
                                    navigate("/subscription");
                                }}
                            >
                                Subscribe Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
