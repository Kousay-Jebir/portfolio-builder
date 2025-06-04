import { useState, useEffect } from "react";

const MIN_PANEL_WIDTH = 200;
const MAX_PANEL_WIDTH = 1000;
const DEFAULT_PANEL_WIDTH = 250;

export default function useResizablePanel(isLeft) {
    const [width, setWidth] = useState(DEFAULT_PANEL_WIDTH);

    useEffect(() => {
        setWidth(DEFAULT_PANEL_WIDTH);
    }, []);

    const startResize = (e) => {
        e.preventDefault();
        const onMove = (evt) => {
            const totalWidth = document.documentElement.clientWidth;
            const w = isLeft ? evt.clientX : totalWidth - evt.clientX;
            if (w >= MIN_PANEL_WIDTH && w <= MAX_PANEL_WIDTH) {
                setWidth(w);
            }
        };

        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    };

    return [width, startResize];
}
