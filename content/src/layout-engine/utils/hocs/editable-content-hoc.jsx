import React, { useRef } from 'react';
import { useNode, useEditor } from '@craftjs/core';

export const withEditableContent = (WrappedComponent, textProp = 'text') => {
    return function EditableTextComponent(props) {
        const { enabled } = useEditor((state) => ({
            enabled: state.options.enabled,
        }));
        const {
            connectors: { connect },
            actions: { setProp },
            selected,
        } = useNode((node) => ({
            selected: node.events.selected,
        }));

        // ref to the actual <span> so we can read its text later
        const editableRef = useRef(null);

        const handleBlur = () => {
            if (!editableRef.current) return;
            const newText = editableRef.current.innerText;
            setProp((p) => {
                p[textProp] = newText;
            });
        };

        // shared ref callback for drag/selection
        const combineRef = (el) => {
            if (el) connect(el);
            editableRef.current = el;
        };

        return (
            <WrappedComponent {...props}>
                {enabled && selected ? (
                    <span
                        ref={combineRef}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={handleBlur}
                        style={{
                            outline: '1px dashed #999',
                            minWidth: 20,
                            display: 'inline-block',
                        }}
                    >
                        {props[textProp]}
                    </span>
                ) : (
                    <span ref={connect}>{props[textProp]}</span>
                )}
            </WrappedComponent>
        );
    };
};
