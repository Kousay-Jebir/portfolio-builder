import { useEffect } from 'react';

const useExitPrompt = (shouldPrompt) => {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (!shouldPrompt) return;
            e.preventDefault();
            e.returnValue = ''; // Required for Chrome to show the prompt
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [shouldPrompt]);
};
export default useExitPrompt