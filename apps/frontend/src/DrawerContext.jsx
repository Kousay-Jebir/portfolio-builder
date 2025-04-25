import { createContext, useContext, useState } from 'react';

// Create a context for managing the drawer state
const DrawerContext = createContext();

// Create a provider component to wrap the app
export const DrawerProvider = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <DrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};

// Custom hook to access the drawer context
export const useDrawer = () => useContext(DrawerContext);
