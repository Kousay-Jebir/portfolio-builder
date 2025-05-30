import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const CanvasContext = createContext();

export function CanvasProvider({ children }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <CanvasContext.Provider value={{ width, ref }}>
            {children}
        </CanvasContext.Provider>
    );
}

export function useCanvas() {
    const ctx = useContext(CanvasContext);
    if (!ctx) throw new Error('useCanvas must be used within CanvasProvider');
    return ctx;
}