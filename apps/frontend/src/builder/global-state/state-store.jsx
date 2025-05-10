import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useEditor } from "@craftjs/core";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { mergeStyles } from "./utils";
import { useUI } from "@/DrawerContext";

const BUILDER_MODE = {
    EDIT: "EDIT",
    PREVIEW: "PREVIEW",
};

const BuilderContext = createContext();


const editModeStyles = {

    borderWidth: "1px",
    borderColor: 'gray',
    borderStyle: 'solid',
    paddingRight: '10px',
    paddingBottom: '10px',
    paddingTop: '10px',
    paddingLeft: '10px',
    padding: "10px",
};

const editModeHoverStyles = "hover-styles"

const initialState = { isEnabled: true };

function reducer(state, action) {
    switch (action.type) {
        case BUILDER_MODE.EDIT:
            return { isEnabled: true };
        case BUILDER_MODE.PREVIEW:
            return { isEnabled: false };
        default:
            return state;
    }
}

export function BuilderProvider({ children }) {
    const {
        actions: { setOptions },
    } = useEditor();
    const [state, dispatch] = useReducer(reducer, initialState);

    // sync Craft.js enabled flag
    useEffect(() => {
        setOptions((opts) => {
            opts.enabled = state.isEnabled;
        });
    }, [state.isEnabled, setOptions]);

    return (
        <BuilderContext.Provider value={{ state, dispatch }}>
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilder() {
    return useContext(BuilderContext);
}

/**
 * HOC: injects edit-mode styles at render-time,
 * while preserving any existing style props.
 */
export function withBuilderEditable(WrappedComponent) {
    return function BuilderEditableComponent(props) {
        const { state } = useBuilder();

        // Safely merge whatever props.style was,
        // then layer on our editModeStyles if enabled.
        const combinedStyle = mergeStyles(
            state.isEnabled ? editModeStyles : {},
            props.style
        );
        const className = state.isEnabled ? `${editModeHoverStyles} ${props.className || ''}` : props.className;
        return <WrappedComponent {...props} style={combinedStyle} className={className} />;
    };
}

/**
 * ModeToggle UI: use this to switch between EDIT / PREVIEW
 */
export function ModeToggle() {
    const { state, dispatch } = useBuilder();
    const { ui } = useUI();

    return (
        <ToggleGroup
            type="single"
            value={state.isEnabled ? "edit" : "preview"}
            onValueChange={(val) => {
                dispatch({
                    type:
                        val === "edit" ? BUILDER_MODE.EDIT : BUILDER_MODE.PREVIEW,
                })
                ui.setPanel('LEFT', val === "edit")
                ui.setPanel('RIGHT', val === "edit")
            }
            }
            className="bg-transparent"
        >
            <ToggleGroupItem value="edit" className="px-2 py-1 text-xs">
                Edit
            </ToggleGroupItem>
            <ToggleGroupItem value="preview" className="px-2 py-1 text-xs">
                Preview
            </ToggleGroupItem>
        </ToggleGroup >
    );
}
