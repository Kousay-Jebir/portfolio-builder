import { createContext, useContext, useReducer, useEffect } from "react";
import { useEditor } from "@craftjs/core";

const BUILDER_MODE = {
    EDIT: "EDIT",
    PREVIEW: "PREVIEW",
};

const BuilderContext = createContext();

const editModeStyles = {
    border: "1px solid red",
    padding: "10px",
    ":hover": {
        backgroundColor: "lightgray",
    },
};

const initialState = {
    isEnabled: true,
};

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

export const BuilderProvider = ({ children }) => {
    const { actions: { setOptions } } = useEditor();

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        setOptions((options) => {
            options.enabled = state.isEnabled;
        });
    }, [state.isEnabled, setOptions]);

    return (
        <BuilderContext.Provider value={{ state, dispatch }}>
            {children}
        </BuilderContext.Provider>
    );
};

export const useBuilder = () => useContext(BuilderContext);

export function withBuilderEditable(WrappedComponent) {
    return function BuilderEditableComponent(props) {
        const { state } = useBuilder();

        const extraStyles = state.isEnabled ? editModeStyles : {};

        return (
            <WrappedComponent
                {...props}
                style={{
                    ...props.style,
                    ...extraStyles,
                }}
            />
        );
    };
}
