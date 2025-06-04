import { useEffect } from "react";

export default function useAutoSave(handler) {
    useEffect(() => {
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [handler]);
}