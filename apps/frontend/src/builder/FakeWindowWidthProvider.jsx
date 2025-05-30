import React, { useRef, useEffect } from "react";

export default function FakeWindowWidthProvider({ children }) {
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            get: () => wrapperRef.current.clientWidth,
        });

        const ro = new ResizeObserver((entries) => {
            if (entries[0]) {
                window.dispatchEvent(new Event("resize"));
            }
        });
        ro.observe(wrapperRef.current);

        return () => {
            ro.disconnect();
            delete window.innerWidth;
            window.dispatchEvent(new Event("resize"));
        };
    }, []);

    return (

        <div ref={wrapperRef} className="w-full h-full">
            {children}
        </div>
    );
}
