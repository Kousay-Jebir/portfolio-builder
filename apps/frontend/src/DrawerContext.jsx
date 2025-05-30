// src/contexts/UIContext.js
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
    showLeftSidebar: true,
    showRightSidebar: true,
    showLeftSheet: false,
    showRightSheet: false,
    darkMode: false,
    leftWidth: 240,
    rightWidth: 240,
};

function uiReducer(state, action) {
    switch (action.type) {
        // toggles
        case 'TOGGLE_LEFT_SIDEBAR':
            return { ...state, showLeftSidebar: !state.showLeftSidebar };
        case 'TOGGLE_RIGHT_SIDEBAR':
            return { ...state, showRightSidebar: !state.showRightSidebar };
        case 'TOGGLE_LEFT_SHEET':
            return { ...state, showLeftSheet: !state.showLeftSheet };
        case 'TOGGLE_RIGHT_SHEET':
            return { ...state, showRightSheet: !state.showRightSheet };
        case 'TOGGLE_THEME':
            return { ...state, darkMode: !state.darkMode };

        // explicit sets
        case 'SET_LEFT_SIDEBAR':
            return { ...state, showLeftSidebar: action.value };
        case 'SET_RIGHT_SIDEBAR':
            return { ...state, showRightSidebar: action.value };
        case 'SET_LEFT_SHEET':
            return { ...state, showLeftSheet: action.value };
        case 'SET_RIGHT_SHEET':
            return { ...state, showRightSheet: action.value };
        case 'SET_THEME':
            return { ...state, darkMode: action.value };

        // widths
        case 'SET_LEFT_WIDTH':
            return { ...state, leftWidth: action.width };
        case 'SET_RIGHT_WIDTH':
            return { ...state, rightWidth: action.width };

        default:
            return state;
    }
}

const UIContext = createContext();

export function UIProvider({ children }) {
    const [state, dispatch] = useReducer(uiReducer, initialState);

    const ui = {
        // theme
        toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
        setTheme: (val) => dispatch({ type: 'SET_THEME', value: val }),

        // sidebars
        togglePanel: (side) =>
            dispatch({ type: `TOGGLE_${side}_SIDEBAR` }),
        setPanel: (side, val) =>
            dispatch({ type: `SET_${side}_SIDEBAR`, value: val }),

        // sheets
        toggleSheet: (side) =>
            dispatch({ type: `TOGGLE_${side}_SHEET` }),
        setSheet: (side, val) =>
            dispatch({ type: `SET_${side}_SHEET`, value: val }),

        // widths
        setLeftWidth: (w) => dispatch({ type: 'SET_LEFT_WIDTH', width: w }),
        setRightWidth: (w) => dispatch({ type: 'SET_RIGHT_WIDTH', width: w }),
    };

    return (
        <UIContext.Provider value={{ state, ui }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error('useUI must be inside UIProvider');
    return ctx;
}
