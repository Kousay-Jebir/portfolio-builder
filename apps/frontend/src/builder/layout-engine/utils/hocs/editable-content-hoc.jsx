import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { useNode, useEditor } from '@craftjs/core';

/**
 * HOC that makes a component's text prop editable in Craft.js via double-click.
 * @param WrappedComponent - The component to wrap.
 * @param textProp - The name of the prop containing text (default: 'text').
 */
export function withEditableContent(WrappedComponent, textProp = 'text') {
    const EditableComponent = (props) => {
        const { connectors: { connect }, actions: { setProp } } = useNode((node) => ({
        }));
        const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));

        const [localText, setLocalText] = useState(props[textProp]);
        const [isEditing, setIsEditing] = useState(false);
        const ref = useRef(null);


        useEffect(() => {
            setLocalText(props[textProp]);
        }, [props[textProp]]);


        const finishEditing = () => {
            if (!ref.current) return;
            const newText = ref.current.innerText;
            if (newText !== localText) {
                setProp((p) => { p[textProp] = newText; });
                setLocalText(newText);
            }
            setIsEditing(false);
        };

        const handleBlur = () => finishEditing();
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
            }
        };


        const handleDoubleClick = () => {
            if (!enabled) return;
            setIsEditing(true);
        };


        const combinedRef = (el) => {
            if (el) connect(el);
            ref.current = el;
        };


        const editableProps = isEditing
            ? {
                contentEditable: true,
                suppressContentEditableWarning: true,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                style: { outline: '1px dashed #999', minWidth: 20, display: 'inline-block', ...props.style },
            }
            : { style: { ...props.style } };

        return (
            <WrappedComponent
                {...props}
                {...editableProps}
                ref={combinedRef}
                onDoubleClick={handleDoubleClick}
            />

        );
    };


    return forwardRef((props, ref) => <EditableComponent {...props} forwardedRef={ref} />);
}
