import React, { useRef, useEffect, useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';

export function withEditableContent(WrappedComponent, textProp = 'text') {
    return function EditableTextComponent(props) {
        const { enabled } = useEditor((state) => ({
            enabled: state.options.enabled,
        }));

        const { connectors: { connect }, actions: { setProp }, selected } = useNode((node) => ({
            selected: node.events.selected,
        }));

        const ref = useRef(null);
        const [localText, setLocalText] = useState(props[textProp]);

        useEffect(() => {
            setLocalText(props[textProp]);
        }, [props[textProp]]);

        const handleBlur = () => {
            if (!ref.current) return;
            const newText = ref.current.innerText;
            if (newText !== localText) {
                setProp((p) => {
                    p[textProp] = newText;
                });
            }
        };

        const combinedRef = (el) => {
            if (el) connect(el);
            ref.current = el;
        };

        const extraProps = enabled && selected
            ? {
                contentEditable: true,
                suppressContentEditableWarning: true,
                onBlur: handleBlur,
                style: {
                    outline: '1px dashed #999',
                    minWidth: 20,
                    display: 'inline-block',
                    ...props.style, // keep user style
                },
            }
            : {};

        return (
            <WrappedComponent
                {...props}
                {...extraProps}
                ref={combinedRef}
            >
                {localText}
            </WrappedComponent>
        );
    };
}
