import React, { useRef, useEffect, useState } from "react";
import { useUI } from "../../../DrawerContext";
import { Topbar } from "./Topbar";
import Sidebar from "./Sidebar";
import MobileSheet from "./MobileSheet";
import useResizablePanel from "../../../hooks/useResizablePanel";
import ToolBox from "../../../builder/user-components/ToolBox";
import Layers from "../../../builder/Layers";
import { CustomizationMenu } from "../../../builder/customization-engine/CustomizationMenu";

export default function AppLayout({ children }) {
    const { state, ui } = useUI();
    const [layersOpenMap, setLayersOpenMap] = useState({});
    const drawerRef = useRef(null);

    const [leftWidth, resizeLeft] = useResizablePanel(true);
    const [rightWidth, resizeRight] = useResizablePanel(false);


    useEffect(() => {
        document.documentElement.classList.toggle("dark", state.darkMode);
    }, [state.darkMode]);

    useEffect(() => {
        const onClick = (e) => {
            if (
                state.showRightSheet &&
                drawerRef.current &&
                !drawerRef.current.contains(e.target)
            ) {
                ui.setSheet("Right", false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [state.showRightSheet, ui]);

    return (
        <>
            <Topbar />

            <div className="flex flex-1 overflow-hidden">

                {state.showLeftSidebar && (
                    <Sidebar width={leftWidth} side="left" onResize={resizeLeft}>
                        <div className="p-2 space-y-4">
                            <ToolBox />
                            <Layers openMap={layersOpenMap} setOpenMap={setLayersOpenMap} />
                        </div>
                    </Sidebar>
                )}

                <main className="flex-1 bg-white overflow-auto">{children}</main>

                {state.showRightSidebar && (
                    <Sidebar width={rightWidth} side="right" onResize={resizeRight}>
                        <div className="p-2">
                            <CustomizationMenu />
                        </div>
                    </Sidebar>
                )}
            </div>


            <MobileSheet
                side="left"
                title="Menu"
                open={state.showLeftSheet}
                onOpenChange={() => ui.toggleSheet("LEFT")}
            >
                <ToolBox />
                <Layers openMap={layersOpenMap} setOpenMap={setLayersOpenMap} />
            </MobileSheet>

            <MobileSheet
                side="right"
                title="Customization"
                open={state.showRightSheet}
                onOpenChange={() => ui.toggleSheet("RIGHT")}
                drawerRef={drawerRef}
            >
                <CustomizationMenu />
            </MobileSheet>
        </>
    );
}
