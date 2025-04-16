import React from 'react';
import { useNode } from '@craftjs/core';

export const withEditableContent = (WrappedComponent) => {
    return function EditableContentComponent(props) {

        const { text, children, ...rest } = props;
        const {
            actions: { setProp },
        } = useNode();

        const handleBlur = (e) => {
            setProp((props) => {
                props.text = e.target.innerText.replace(/<\/?[^>]+(>|$)/g, "");
            });
        };

        return (
            <WrappedComponent
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur}
                {...rest}>
                {text}
                {children}
            </WrappedComponent>
        );
    };
};
